import * as React from 'react';
import { useState } from 'react';
import deepmerge from 'deepmerge';
import { ErrorObjectType, WebformContextType } from './types';
import strtotime from 'strtotime';

export function getChildElements(containerElement): Array<string | number> {
  const count = Object.keys(containerElement).length;
  let i = 0;
  const childWeights = [];
  for (const key of Object.keys(containerElement)) {
    if (key.charAt(0) === '#') {
      continue;
    }

    // Skip `type` key since it's reserved for this application.
    // @todo should we get rid of this?
    // @see WebformElementType
    if (key === 'type') {
      continue;
    }

    const element = containerElement[key];
    let weight;
    if (typeof element['#weight'] !== 'undefined') {
      weight = element['#weight'];
    } else {
      weight = 0;
    }
    // Supports weight with up to three digit precision and conserve
    // the insertion order.
    childWeights.push({
      weight: Math.floor(weight * 1000) + i / count,
      key,
    });
    i++;
  }
  childWeights.sort((a, b) => {
    return a.weight - b.weight;
  });

  return childWeights.map((childWeight) => {
    return childWeight.key;
  });
}

export const WebformContext = React.createContext<WebformContextType | null>(
  null,
);

const drupalRenderedMarkup = (message: string): React.ReactNode => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: message,
      }}
    />
  );
};

export const getNormalizedErrorMessages = (errors): ErrorObjectType => {
  if (!errors) {
    return null;
  }

  return Object.keys(errors).reduce((currentValue, key) => {
    const parts = key.split('][');
    if (parts.length > 1) {
      if (!currentValue[parts[0]]) {
        currentValue[parts[0]] = {};
      }

      if (parts.length === 2) {
        // This is handling the field cardinality data structure:
        // `${id}][items][{$i}][_item_` when `_item_` is a primitive value.
        if (parts[1] === '_item_') {
          currentValue[parts[0]] = drupalRenderedMarkup(errors[key]);
        } else {
          currentValue[parts[0]][parts[1]] = drupalRenderedMarkup(errors[key]);
        }
      } else {
        // This is handling the field cardinality data structure:
        // `${id}][items][{$i}][_item_`, and cases where field cardinality has
        // structured data, e.g. composite element.
        if (parts[1] === 'items' || parts[1] === '_item_') {
          const newKey = [...parts.slice(2)].join('][');
          currentValue[parts[0]] = {
            ...currentValue[parts[0]],
            ...getNormalizedErrorMessages({
              [newKey]: errors[key],
            }),
          };
        } else {
          const newKey = [...parts.slice(1)].join('][');
          currentValue[parts[0]] = {
            ...currentValue[parts[0]],
            ...getNormalizedErrorMessages({
              ...currentValue[parts[0]],
              [newKey]: errors[key],
            }),
          };
        }
      }
    } else {
      currentValue[key] = drupalRenderedMarkup(errors[key]);
    }

    return currentValue;
  }, {});
};

export function toPath(key: string): Array<string> {
  return key.split('][');
}

export function toKey(path: Array<string>): string {
  return path
    .filter((item) => item !== 'items' && item !== '_item_')
    .join('][');
}

export function setIn(obj: object, path: string, value: unknown) {
  const pathArray = toPath(path);
  let current = obj;
  for (let i = 0; i < pathArray.length; i++) {
    const currentPath: string = pathArray[i];
    if (pathArray.length - 1 === i) {
      current[currentPath] = value;
    } else {
      if (!current[currentPath]) {
        const nextPath: string = pathArray[i + 1];
        if (isInteger(nextPath) && Number(nextPath) >= 0) {
          current[currentPath] = [];
        } else {
          current[currentPath] = {};
        }
      }
    }
    current = current[currentPath];
  }

  return obj;
}

export function isObject(item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

export const isInteger = (obj: unknown): boolean =>
  Number.isInteger(obj) || String(Math.floor(Number(obj))) === obj;

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (object: unknown): object is Function => {
  return typeof object === 'function';
};

export function isIterable(item): item is Iterable<unknown> {
  if (item === null || item === undefined) {
    return false;
  }
  return typeof item[Symbol.iterator] === 'function';
}

export const useConstructor = (callback) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callback();
  setHasBeenCalled(true);
};

// Converts a CSS style from string to an object supported by React.
// E.g. `border: 3px solid green; border-radius: 4px;` is converted into
// `{ border: '3px solid green', borderRadius: '4px'}`.
export const cssStringToObject = (string) => {
  const regExp = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g;
  const result = {};
  if (typeof string === 'string') {
    string.replace(regExp, (declaration, property, value) => {
      // The property name must be converted from kebab-case to camelCase.
      // @see https://reactjs.org/docs/dom-elements.html#style
      const camelizedProperty = property.replace(/-./g, (part) =>
        part[1].toUpperCase(),
      );
      return (result[camelizedProperty] = value);
    });
  }
  return result;
};

// @see https://github.com/facebook/react/blob/v18.2.0/packages/react-dom/src/shared/possibleStandardNames.js#L11
export const reactPropertyMap = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  class: 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  default: 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  disablepictureinpicture: 'disablePictureInPicture',
  disableremoteplayback: 'disableRemotePlayback',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  enterkeyhint: 'enterKeyHint',
  for: 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  imagesizes: 'imageSizes',
  imagesrcset: 'imageSrcSet',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nomodule: 'noModule',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',
};

// Get the index from the webform key if the element is multi-value.
export const getIndexOfMultiValue = (string) => {
  const matchArr = string.match(/\[(\d.*?)\]/g);
  // In case the webform key contains other indexes, we only want the last one.
  return matchArr.pop();
};

export const getCurrentError = (clientSideError, serverSideError) => {
  if (clientSideError) {
    return clientSideError;
  }
  if (
    typeof serverSideError === 'string' ||
    React.isValidElement(serverSideError)
  ) {
    return serverSideError;
  }
  return;
};

/**
 * deepmerge array merging algorithm
 * https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
 */
export const arrayMerge = (
  target: any[],
  source: any[],
  options: any,
): any[] => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = deepmerge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });

  return destination;
};

// Updates the name and ID of every child element recursively.
export function updateNameAndIdWithIndex(index, element) {
  const childElements = getChildElements(element);
  if (childElements.length) {
    // Make a deep copy of the element item that we can change the id and name of.
    for (const nestedElement of childElements) {
      const id = element[nestedElement]['#id'];
      const idLength = id.length;
      const name = element[nestedElement]['#name'];
      if (id.charAt(idLength - 1) === ']') {
        const updatedId = id.replace(/\[(.+?)\]/g, '[' + index + ']');
        const updatedName = name.replace(/\[(.+?)\]/g, '[' + index + ']');
        element[nestedElement]['#id'] = updatedId;
        element[nestedElement]['#name'] = updatedName;
      } else {
        element[nestedElement][
          '#id'
        ] = `${element[nestedElement]['#id']}[${index}]`;
        element[nestedElement][
          '#name'
        ] = `${element[nestedElement]['#name']}[${index}]`;
      }
      updateNameAndIdWithIndex(index, element[nestedElement]);
    }
  } else {
    return;
  }
}

// Accesses an object property with a given path that is in the format of a string
// with properties separated by periods.
export function resolvePath(path: string, obj: object) {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : null;
  }, obj || self);
}

export const checkDateMinMax = (value: string, element: object) => {
  if (element['#date_date_min']) {
    const min = element['#date_date_min'];
    const minAsISO = convertDateToISO(min);
    if (strtotime(value) < strtotime(minAsISO)) {
      return `Date must be on or after ${minAsISO}.`;
    }
  }
  if (element['#date_date_max']) {
    const max = element['#date_date_max'];
    const maxAsISO = convertDateToISO(max);
    if (strtotime(value) > strtotime(maxAsISO)) {
      return `Date must be on or before ${maxAsISO}.`;
    }
  }
  return;
};

export const convertDateToISO = (date) => {
  if (date === 'today') {
    return new Date().toISOString().substring(0, 10);
  } else if (typeof strtotime(date) === 'number') {
    return new Date(date).toISOString().split('T')[0];
  } else {
    return strtotime(date).toISOString().substring(0, 10);
  }
};
