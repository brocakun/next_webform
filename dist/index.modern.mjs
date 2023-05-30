import * as React from 'react';
import { useState, useEffect, useContext, createElement, useRef } from 'react';
import deepmerge from 'deepmerge';
import strtotime from 'strtotime';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import classNames from 'classnames';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function getChildElements(containerElement) {
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
      key
    });
    i++;
  }
  childWeights.sort((a, b) => {
    return a.weight - b.weight;
  });
  return childWeights.map(childWeight => {
    return childWeight.key;
  });
}
const WebformContext = /*#__PURE__*/React.createContext(null);
const drupalRenderedMarkup = message => {
  return /*#__PURE__*/jsx("div", {
    dangerouslySetInnerHTML: {
      __html: message
    }
  });
};
const getNormalizedErrorMessages = errors => {
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
          currentValue[parts[0]] = _extends({}, currentValue[parts[0]], getNormalizedErrorMessages({
            [newKey]: errors[key]
          }));
        } else {
          const newKey = [...parts.slice(1)].join('][');
          currentValue[parts[0]] = _extends({}, currentValue[parts[0]], getNormalizedErrorMessages(_extends({}, currentValue[parts[0]], {
            [newKey]: errors[key]
          })));
        }
      }
    } else {
      currentValue[key] = drupalRenderedMarkup(errors[key]);
    }
    return currentValue;
  }, {});
};
function toPath(key) {
  return key.split('][');
}
function toKey(path) {
  return path.filter(item => item !== 'items' && item !== '_item_').join('][');
}
function setIn(obj, path, value) {
  const pathArray = toPath(path);
  let current = obj;
  for (let i = 0; i < pathArray.length; i++) {
    const currentPath = pathArray[i];
    if (pathArray.length - 1 === i) {
      current[currentPath] = value;
    } else {
      if (!current[currentPath]) {
        const nextPath = pathArray[i + 1];
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
function isObject(item) {
  return typeof item === 'object' && !Array.isArray(item) && item !== null;
}
const isInteger = obj => Number.isInteger(obj) || String(Math.floor(Number(obj))) === obj;
// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = object => {
  return typeof object === 'function';
};
function isIterable(item) {
  if (item === null || item === undefined) {
    return false;
  }
  return typeof item[Symbol.iterator] === 'function';
}
const useConstructor = callback => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callback();
  setHasBeenCalled(true);
};
// Converts a CSS style from string to an object supported by React.
// E.g. `border: 3px solid green; border-radius: 4px;` is converted into
// `{ border: '3px solid green', borderRadius: '4px'}`.
const cssStringToObject = string => {
  const regExp = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g;
  const result = {};
  if (typeof string === 'string') {
    string.replace(regExp, (declaration, property, value) => {
      // The property name must be converted from kebab-case to camelCase.
      // @see https://reactjs.org/docs/dom-elements.html#style
      const camelizedProperty = property.replace(/-./g, part => part[1].toUpperCase());
      return result[camelizedProperty] = value;
    });
  }
  return result;
};
// @see https://github.com/facebook/react/blob/v18.2.0/packages/react-dom/src/shared/possibleStandardNames.js#L11
const reactPropertyMap = {
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
  wrap: 'wrap'
};
// Get the index from the webform key if the element is multi-value.
const getIndexOfMultiValue = string => {
  const matchArr = string.match(/\[(\d.*?)\]/g);
  // In case the webform key contains other indexes, we only want the last one.
  return matchArr.pop();
};
const getCurrentError = (clientSideError, serverSideError) => {
  if (clientSideError) {
    return clientSideError;
  }
  if (typeof serverSideError === 'string' || /*#__PURE__*/React.isValidElement(serverSideError)) {
    return serverSideError;
  }
  return;
};
/**
 * deepmerge array merging algorithm
 * https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
 */
const arrayMerge = (target, source, options) => {
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
function updateNameAndIdWithIndex(index, element) {
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
        element[nestedElement]['#id'] = `${element[nestedElement]['#id']}[${index}]`;
        element[nestedElement]['#name'] = `${element[nestedElement]['#name']}[${index}]`;
      }
      updateNameAndIdWithIndex(index, element[nestedElement]);
    }
  } else {
    return;
  }
}
// Accesses an object property with a given path that is in the format of a string
// with properties separated by periods.
function resolvePath(path, obj) {
  return path.split('.').reduce(function (prev, curr) {
    return prev ? prev[curr] : null;
  }, obj || self);
}
const checkDateMinMax = (value, element) => {
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
const convertDateToISO = date => {
  if (date === 'today') {
    return new Date().toISOString().substring(0, 10);
  } else if (typeof strtotime(date) === 'number') {
    return new Date(date).toISOString().split('T')[0];
  } else {
    return strtotime(date).toISOString().substring(0, 10);
  }
};

const deleteKeys = ['#process', '#groups', '#after_build', '#pre_render', '#value_callback', '#theme_wrappers', '#allowed_tags', '#attached', '#element_validate', '#cache', '#prefix', '#suffix', '#webform_children', '#webform_parents', '#array_parents', '#autocomplete_route_parameters', '#autocomplete_route_name', '#ajax', '#ajax_processed', '#ajax_prefix', '#ajax_suffix', '#child_keys', '#ajax_attributes', '#tabledrag', '#sorted', '#processed', '#after_build_done', '#tree'];
const normalizeElements = result => {
  deleteKeys.forEach(key => {
    delete result[key];
  });
  getChildElements(result).forEach(function (key) {
    result[key] = normalizeElements(result[key]);
  });
  return result;
};
async function resolveWebformContent(id, drupal, fetchOptions) {
  const url = drupal.buildUrl(`/webform/${id}?_format=json`);
  const elementsUrl = drupal.buildUrl(`/webform_rest/${id}/elements?_format=json`);
  const [result, elementsResult] = await Promise.all([drupal.fetch(url.toString(), _extends({}, fetchOptions, {
    headers: {
      'Content-Type': 'application/json'
    }
  })), drupal.fetch(elementsUrl.toString(), _extends({}, fetchOptions, {
    headers: {
      'Content-Type': 'application/json'
    }
  }))]);
  if (!result.ok) {
    const message = await result.json();
    throw new Error(message);
  }
  if (!elementsResult.ok) {
    const message = await elementsResult.json();
    throw new Error(message);
  }
  // Clean up some commonly provided, unused properties to reduce the overall
  // size of props.
  const normalizedElements = normalizeElements(await elementsResult.json());
  const webform = await result.json();
  return {
    id: id,
    uuid: webform.uuid,
    title: webform.title,
    description: webform.description,
    status: webform.status,
    confirmation: {
      type: webform.settings.confirmation_type,
      url: webform.settings.confirmation_url,
      message: webform.settings.confirmation_message
    },
    elements: normalizedElements
  };
}
async function defaultOnSubmit({
  id,
  event,
  data,
  setData,
  setStatus,
  setErrors,
  apiUrl
}) {
  const body = _extends({}, data, {
    webform_id: id
  });
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    setStatus('error');
    const message = await response.json();
    setErrors(getNormalizedErrorMessages(message.message.error));
  } else {
    setStatus('success');
    setData({});
    // Clear webform element errors.
    setErrors({});
  }
}

const withDefaultValue = EnhancedComponent => {
  return function WebformElementWithDefaultValue(props) {
    useEffect(() => {
      if (!props.value && props.element['#default_value'] && !props.element['#default_value']['headers']) {
        props.setValue(props.element['#default_value']);
      }
    }, []);
    return /*#__PURE__*/jsx(EnhancedComponent, _extends({}, props));
  };
};

const normalizeAttributes = attributes => {
  const ignoreList = ['id', 'data-drupal-selector', 'webform-remove-for-attribute'];
  const filteredAttributes = Object.keys(attributes).filter(attribute => {
    return !ignoreList.includes(attribute);
  });
  return filteredAttributes.reduce((currentValue, attribute) => {
    if (attribute === 'class') {
      currentValue['className'] = classNames(attributes[attribute]);
    } else if (reactPropertyMap[attribute]) {
      currentValue[reactPropertyMap[attribute]] = attributes[attribute];
    } else {
      currentValue[attribute] = attributes[attribute];
    }
    return currentValue;
  }, {});
};
const withAttributes = EnhancedComponent => {
  return function WebformElementWithAttributes(props) {
    var _props$element$Attri, _props$fieldProps, _props$element$Label, _props$labelProps, _props$element$Wrapp, _props$wrapperProps;
    const normalizedFieldAttributes = normalizeAttributes((_props$element$Attri = props.element['#attributes']) != null ? _props$element$Attri : {});
    const field = _extends({}, normalizedFieldAttributes, (_props$fieldProps = props.fieldProps) != null ? _props$fieldProps : {});
    if (field['style']) {
      field['style'] = cssStringToObject(field['style']);
    }
    const normalizedLabelAttributes = normalizeAttributes((_props$element$Label = props.element['#label_attributes']) != null ? _props$element$Label : {});
    const label = _extends({}, normalizedLabelAttributes, (_props$labelProps = props.labelProps) != null ? _props$labelProps : {});
    if (label['style']) {
      label['style'] = cssStringToObject(label['style']);
    }
    const normalizedWrapperAttributes = normalizeAttributes((_props$element$Wrapp = props.element['#wrapper_attributes']) != null ? _props$element$Wrapp : {});
    const wrapper = _extends({}, normalizedWrapperAttributes, (_props$wrapperProps = props.wrapperProps) != null ? _props$wrapperProps : {});
    if (wrapper['style']) {
      wrapper['style'] = cssStringToObject(wrapper['style']);
    }
    return /*#__PURE__*/jsx(EnhancedComponent, _extends({}, props, {
      fieldProps: field,
      labelProps: label,
      wrapperProps: wrapper
    }));
  };
};

const getDependencies = states => {
  if (!states || Object.keys(states).includes('headers')) {
    return [];
  }
  const dependencies = [];
  for (const effect of Object.keys(states)) {
    // Loop through indexes or selectors.
    for (const indexOrSelector of Object.keys(states[effect])) {
      // If indexOrSelector is not an index, then ALL conditions must be true
      // for the attribute to take effect.
      if (isNaN(Number(indexOrSelector))) {
        const elementName = getElementName(indexOrSelector);
        dependencies.push(elementName);
      } else if (states[effect][indexOrSelector] !== 'or' && states[effect][indexOrSelector] !== 'xor') {
        const selectorString = Object.keys(states[effect][indexOrSelector])[0];
        const elementName = getElementName(selectorString);
        dependencies.push(elementName);
      }
    }
  }
  return dependencies;
};
// Returns substring with the element selector.
function getElementName(string) {
  const match = string.match(/\[name=["|']([A-z][A-z\d-_.:]*)["|']\]$/);
  return match && match[1];
}
// Checks if the condition is true or not and returns a boolean value.
function getConditionState(trigger, value) {
  if (isObject(trigger[Object.keys(trigger)[0]])) {
    switch (Object.keys(trigger[Object.keys(trigger)[0]])[0]) {
      case 'pattern':
        {
          if (typeof value !== 'string') {
            return false;
          }
          const re = new RegExp(trigger['value']['pattern']);
          return re.test(value);
        }
      case '!pattern':
        {
          if (typeof value !== 'string') {
            return false;
          }
          const re = new RegExp(trigger['value']['pattern']);
          return !re.test(value);
        }
      case 'less':
        return value < trigger['value']['less'];
      case 'less_equal':
        return value <= trigger['value']['less_equal'];
      case 'greater':
        return value > trigger['value']['greater'];
      case 'greater_equal':
        return value >= trigger['value']['greater_equal'];
      case 'between':
      case '!between':
        {
          const betweenValues = trigger['value']['between'];
          const min = betweenValues.substring(0, betweenValues.indexOf(':'));
          const max = betweenValues.substring(betweenValues.indexOf(':'), betweenValues.length - 1);
          if (Object.keys(trigger)[0] == 'between') {
            return value >= min && value <= max;
          } else {
            return value < min || value > max;
          }
        }
    }
  } else {
    switch (trigger && Object.keys(trigger)[0]) {
      case 'empty':
        return !value;
      case 'filled':
        return !!value;
      case 'checked':
        return value == true;
      case 'unchecked':
        return value == false;
      case 'value':
        return value == trigger['value'];
      case '!value':
        return value != trigger['value'];
    }
  }
}
const getStateConditions = (states, data) => {
  const allConditionsForTrue = {};
  const anyConditionForTrue = {};
  const oneConditionForTrue = {};
  let webformStates;
  if (states && !Object.keys(states).includes('headers')) {
    webformStates = states;
    for (const effect of Object.keys(webformStates)) {
      allConditionsForTrue[effect] = {};
      anyConditionForTrue[effect] = {};
      oneConditionForTrue[effect] = {};
      // Loop through indexes or selectors.
      for (const indexOrSelector of Object.keys(webformStates[effect])) {
        // If indexOrSelector is not an index, then ALL conditions must be true
        // for the attribute to take effect.
        if (isNaN(Number(indexOrSelector))) {
          var _data$elementName;
          const elementName = getElementName(indexOrSelector);
          if (Object.prototype.hasOwnProperty.call(data, elementName) && typeof data[elementName] !== 'string' && typeof data[elementName] !== 'boolean') {
            console.warn(`Unexpected type "${typeof data[elementName]}" for element "${elementName}"`);
            continue;
          }
          allConditionsForTrue[effect][elementName] = getConditionState(webformStates[effect][indexOrSelector], (_data$elementName = data[elementName]) != null ? _data$elementName : undefined);
        } else if (webformStates[effect][indexOrSelector] !== 'or' && webformStates[effect][indexOrSelector] !== 'xor') {
          const selectorString = Object.keys(webformStates[effect][indexOrSelector])[0];
          const elementName = getElementName(selectorString);
          const trigger = Object.values(webformStates[effect][indexOrSelector])[0];
          if (Object.prototype.hasOwnProperty.call(data, elementName) && typeof data[elementName] !== 'string' && typeof data[elementName] !== 'boolean') {
            console.warn(`Unexpected type "${typeof data[elementName]}" for element "${elementName}"`);
            continue;
          }
          if (Object.values(webformStates[effect]).includes('or')) {
            var _data$elementName2;
            anyConditionForTrue[effect][elementName] = getConditionState(trigger, (_data$elementName2 = data[elementName]) != null ? _data$elementName2 : undefined);
          } else if (Object.values(webformStates[effect]).includes('xor')) {
            var _data$elementName3;
            oneConditionForTrue[effect][elementName] = getConditionState(trigger, (_data$elementName3 = data[elementName]) != null ? _data$elementName3 : undefined);
          }
        }
      }
    }
  }
  return {
    allConditionsForTrue,
    anyConditionForTrue,
    oneConditionForTrue,
    webformStates
  };
};
const getEffect = effect => {
  switch (effect) {
    case 'invisible':
    case 'invisible-slide':
    case '!visible':
      return {
        '#access': false
      };
    case 'visible':
    case 'visible-slide':
    case '!invisible':
      return {
        '#access': true
      };
    case 'enabled':
    case '!disabled':
      return {
        '#disabled': false
      };
    case 'disabled':
    case '!enabled':
      return {
        '#disabled': true
      };
    case 'required':
    case '!optional':
      return {
        '#required': true
      };
    case 'optional':
    case '!required':
      return {
        '#required': false
      };
    case 'checked':
    case '!unchecked':
      return {
        '#checked': true
      };
    case 'unchecked':
    case '!checked':
      return {
        '#unchecked': true
      };
    case 'readonly':
    case '!readwrite':
      return {
        '#readonly': true
      };
    case 'readwrite':
    case '!readonly':
      return {
        '#readonly': false
      };
  }
};
const getStatesForData = (states, data) => {
  // Initialize the list of conditions and set whether they are true or not.
  const {
    allConditionsForTrue,
    anyConditionForTrue,
    oneConditionForTrue,
    webformStates
  } = getStateConditions(states, data);
  if (!webformStates || Object.keys(webformStates).length === 0 || !Object.keys(webformStates)[0].length) {
    return;
  }
  const effects = {};
  // Set the state accordingly based on our list of conditions.
  for (const effect of Object.keys(webformStates)) {
    // Check if EVERY condition is true.
    if (Object.keys(allConditionsForTrue[effect]).length && Object.values(allConditionsForTrue[effect]).every(value => value === true)) {
      Object.assign(effects, getEffect(effect));
      // Check if ANY condition is true (OR).
    } else if (Object.keys(anyConditionForTrue[effect]).length && Object.values(anyConditionForTrue[effect]).includes(true)) {
      Object.assign(effects, getEffect(effect));
      // Check if ONE condition is true (XOR).
    } else if (Object.keys(oneConditionForTrue[effect]).length) {
      const filterByTrue = Object.values(oneConditionForTrue[effect]).filter(item => item == true);
      if (filterByTrue.length == 1) {
        Object.assign(effects, getEffect(effect));
      } else {
        const falseEffect = '!' + effect;
        Object.assign(effects, getEffect(falseEffect));
      }
    } else {
      const falseEffect = '!' + effect;
      Object.assign(effects, getEffect(falseEffect));
    }
  }
  return effects;
};
// Higher order component to handle the conditional logic for Webform elements.
const withStates = WrappedComponent => {
  return function WebformElementWithStates(props) {
    const [state, setState] = useState({});
    const {
      data
    } = useContext(WebformContext);
    const {
      element
    } = props;
    // Multi-value elements don't have #states in its render array so we need to use #_webform_states.
    const elementStates = element['add'] ? element['#_webform_states'] : element['#states'];
    const dependencyElements = getDependencies(elementStates);
    useEffect(() => {
      setState(getStatesForData(elementStates, data));
    }, []);
    useEffect(() => {
      setState(getStatesForData(elementStates, data));
    }, dependencyElements.map(key => data[key]));
    // Override element object with the dynamic states.
    return /*#__PURE__*/jsx(WrappedComponent, _extends({}, props, {
      element: _extends({}, element, state)
    }));
  };
};

const _excluded$3 = ["children", "label", "labelProps", "labelFor", "isRequired", "description", "descriptionDisplay", "descriptionProps", "labelDisplay", "error", "access"];
const WebformElementWrapper = _ref => {
  let {
      children,
      label,
      labelProps = {},
      labelFor,
      isRequired,
      description,
      descriptionDisplay,
      descriptionProps = {},
      labelDisplay = 'before',
      error,
      access
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
  const css = `
.required-field:after {
  content: ' *';
  color: red;
}
.invalid-feedback {
  color: red;
}
.visually-hidden {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  height: 1px;
  width: 1px;
  word-wrap: normal;
}
        `;
  const labelClasses = classNames(labelProps['className'], {
    'required-field': isRequired,
    'visually-hidden': labelDisplay === 'invisible'
  });
  const descriptionClasses = classNames(descriptionProps['className'], {
    'visually-hidden': descriptionDisplay === 'invisible'
  });
  const labelElement = /*#__PURE__*/jsx("label", _extends({}, labelProps, {
    className: labelClasses,
    htmlFor: labelFor,
    children: label
  }));
  return access ? /*#__PURE__*/jsxs("div", _extends({}, props, {
    children: [/*#__PURE__*/jsx("style", {
      suppressHydrationWarning: true,
      children: css
    }), !['after', 'none'].includes(labelDisplay) && labelElement, descriptionDisplay === 'before' && description && /*#__PURE__*/jsx("div", _extends({}, descriptionProps, {
      children: description
    })), children, (descriptionDisplay === 'after' || descriptionDisplay === 'invisible') && description && /*#__PURE__*/jsx("div", _extends({}, descriptionProps, {
      className: descriptionClasses,
      children: description
    })), labelDisplay === 'after' && labelElement, error && /*#__PURE__*/jsx("div", {
      className: "invalid-feedback",
      children: error
    })]
  })) : null;
};

const _excluded$2 = ["children", "label", "labelProps", "labelDisplay", "labelFor", "description", "descriptionDisplay", "descriptionProps", "isRequired", "error", "access"];
const WebformFieldsetWrapper = _ref => {
  let {
      children,
      label,
      labelProps = {},
      description,
      descriptionDisplay,
      descriptionProps = {},
      isRequired,
      error,
      access
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  const css = `
.required-field:after {
  content: ' *';
  color: red;
}
.invalid-feedback {
  color: red;
}
.visually-hidden {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  height: 1px;
  width: 1px;
  word-wrap: normal;
}
        `;
  const labelClasses = classNames(labelProps['className'], {
    'required-field': isRequired
  });
  const descriptionClasses = classNames(descriptionProps['className'], {
    'visually-hidden': descriptionDisplay === 'invisible'
  });
  const labelElement = /*#__PURE__*/jsx("legend", _extends({}, labelProps, {
    className: labelClasses,
    children: label
  }));
  return access ? /*#__PURE__*/jsxs("fieldset", _extends({}, props, {
    children: [/*#__PURE__*/jsx("style", {
      suppressHydrationWarning: true,
      children: css
    }), labelElement, descriptionDisplay === 'before' && description && /*#__PURE__*/jsx("div", _extends({}, descriptionProps, {
      className: descriptionClasses,
      children: description
    })), children, (descriptionDisplay === 'after' || descriptionDisplay === 'invisible') && description && /*#__PURE__*/jsx("div", _extends({}, descriptionProps, {
      className: descriptionClasses,
      children: description
    })), error && /*#__PURE__*/jsx("div", {
      className: "invalid-feedback",
      children: error
    })]
  })) : null;
};

const withWrapper = (EnhancedComponent, customConfig = {}) => {
  return function WebformElementWithWrapper(props) {
    const {
      element,
      error
    } = props;
    const config = _extends({
      defaultWrapperType: 'form_element',
      displayErrors: true,
      labelFor: element => element['#id'],
      labelProps: {},
      wrapperProps: {}
    }, typeof customConfig === 'function' ? customConfig(element) : customConfig);
    const {
      labelFor,
      defaultWrapperType,
      displayErrors
    } = config;
    // Apply wrapper type based on render array, otherwise use the default
    // value.
    const wrapperType = element['#wrapper_type'] ? element['#wrapper_type'] : defaultWrapperType;
    // Label is only configurable for `form_element` wrappers because:
    //   - `legend` is a required child of `fieldset`.
    //   - `container` type is specifically used for not rendering the label.
    const labelDisplay = wrapperType === 'form_element' && element['#title'] ? element['#title_display'] : 'none';
    // Only render errors that are tied to the current element by checking if
    // the curent error is a string or React element.
    const hasValidError = typeof error === 'string' || /*#__PURE__*/React.isValidElement(error);
    const WrapperComponent = wrapperType !== 'fieldset' ? WebformElementWrapper : WebformFieldsetWrapper;
    // Allow components to retrieve the `labelFor` property value from the element.
    const getLabel = () => {
      if (typeof labelFor === 'function') {
        return labelFor(element);
      }
      return;
    };
    // Allow overriding label and wrapper props.
    const labelProps = _extends({}, props.labelProps, config.labelProps);
    const wrapperProps = _extends({}, props.wrapperProps, config.wrapperProps);
    return /*#__PURE__*/jsx(WrapperComponent, _extends({
      label: element['#title'],
      isRequired: element['#required'],
      access: element['#access'],
      labelDisplay: labelDisplay,
      error: displayErrors && hasValidError ? error : undefined,
      labelProps: labelProps,
      description: element['#description'] ? /*#__PURE__*/jsx("div", {
        dangerouslySetInnerHTML: {
          __html: element['#description']['#markup']
        }
      }) : undefined,
      descriptionDisplay: element['#description_display']
    }, wrapperProps, {
      labelFor: labelDisplay !== 'none' ? getLabel() : undefined,
      children: /*#__PURE__*/jsx(EnhancedComponent, _extends({}, props))
    }));
  };
};

const WebformAutocomplete = ({
  element,
  setValue,
  value: _value = '',
  fieldProps
}) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState({});
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const webform = useContext(WebformContext);
  useEffect(() => {
    const resolveAsyncAutocompleteItems = async () => {
      const url = `${webform.apiUrl}?op=autocomplete_options&id=${webform.id}&options_id=${element['#autocomplete_items']}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error((await response.json()).message.message);
      }
      setAutocompleteOptions(await response.json());
    };
    if (Array.isArray(element['#autocomplete_items'])) {
      setAutocompleteOptions(element['#autocomplete_items'].reduce((currentValue, item) => {
        currentValue[item] = item;
        return currentValue;
      }, {}));
    } else if (typeof element['#autocomplete_items'] === 'string') {
      resolveAsyncAutocompleteItems();
    } else {
      console.warn(`Unsupported autocomplete type on element ${element['#name']}.`);
    }
  }, [element['#autocomplete_items']]);
  const onChangeHandler = async e => {
    if (autocompleteOptions[e.target.value]) {
      setValue(e.target.value);
    } else {
      setValue('');
    }
    setAutocompleteValue(e.target.value);
  };
  // Update component state when value changes in upstream state.
  useEffect(() => {
    setAutocompleteValue(_value);
  }, [_value]);
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("input", _extends({
      type: "text",
      name: element['#webform_key'],
      onChange: e => onChangeHandler(e),
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required'],
      readOnly: element['#readonly'],
      value: autocompleteValue != null ? autocompleteValue : _value
    }, fieldProps, {
      id: `${element['#id']}`,
      list: `${element['#webform_key']}-datalist`
    })), /*#__PURE__*/jsx("datalist", {
      id: `${element['#webform_key']}-datalist`,
      children: Object.keys(autocompleteOptions).map((item, i) => {
        return /*#__PURE__*/jsx("option", {
          value: item,
          children: autocompleteOptions[item]
        }, i);
      })
    })]
  });
};
var WebformAutocomplete$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformAutocomplete))));

const supportedTypes$1 = {
  number: 'number',
  hidden: 'hidden',
  email: 'email',
  search: 'search',
  tel: 'tel',
  url: 'url',
  textfield: 'text'
};
const WebformText = ({
  element,
  value: _value = '',
  setValue,
  fieldProps
}) => {
  var _supportedTypes$eleme;
  if (!(element['#type'] in supportedTypes$1)) {
    console.warn(`${element['#type']} which was used on ${element['#webform_key']} is not supported by WebformText.`);
  }
  const onChangeHandler = async e => {
    setValue(e.target.value);
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("input", _extends({
      type: (_supportedTypes$eleme = supportedTypes$1[element['#type']]) != null ? _supportedTypes$eleme : element['#type'],
      name: element['#name'],
      value: _value,
      onChange: e => onChangeHandler(e),
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required'],
      readOnly: element['#readonly'],
      placeholder: element['#placeholder']
    }, fieldProps, {
      id: element['#id']
    }))
  });
};
var WebformText$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformText))));

const WebformSelect = ({
  element,
  setValue,
  value: _value = '',
  fieldProps
}) => {
  const [showOther, setShowOther] = useState(false);
  // Used to get the options for select other elements that have the options nested one level deeper.
  function getOptions() {
    let options = {};
    for (const key of Object.keys(element)) {
      if (key == 'select') {
        options = element[key];
      }
    }
    return options;
  }
  const optionsForOther = element['#type'] === 'webform_select_other' ? getOptions() : null;
  const onChangeHandler = async e => {
    if (e.target.value == 'Other') {
      setShowOther(!showOther);
    } else if (showOther) {
      setShowOther(!showOther);
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
    }
  };
  const onInputHandler = async e => {
    setValue(e.target.value);
  };
  function sortOptions(options) {
    const arr = [];
    let title;
    for (const key of Object.keys(options)) {
      if (key.length) {
        arr.push(options[key]);
      } else {
        title = options[key];
      }
    }
    arr.unshift(title);
    return arr;
  }
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsxs("select", _extends({
      name: element['#name'],
      onChange: e => onChangeHandler(e),
      value: _value,
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required']
    }, fieldProps, {
      id: element['#id'],
      children: [element['#webform_plugin_id'] == 'select' || typeof element['#webform_plugin_id'] === 'undefined' && element['#type'] !== 'webform_select_other' ? sortOptions(element['#options']).map((option, index) => {
        return /*#__PURE__*/jsx("option", {
          value: option,
          children: option
        }, index);
      }) : null, element['#webform_plugin_id'] == 'webform_entity_select' ? Object.keys(element['#options']).map(entityId => {
        const entityName = element['#options'][entityId];
        return /*#__PURE__*/jsx("option", {
          value: entityId,
          children: entityName
        }, entityId);
      }) : null, element['#type'] === 'webform_select_other' && optionsForOther['#options'] ? /*#__PURE__*/jsxs(Fragment, {
        children: [Object.values(optionsForOther['#options']).map((option, index) => {
          if (option != 'Other…') {
            return /*#__PURE__*/jsx("option", {
              value: option.toString(),
              children: option
            }, index);
          }
        }), /*#__PURE__*/jsx("option", {
          value: "Other",
          children: "Other..."
        })]
      }) : null]
    })), showOther ? /*#__PURE__*/jsx("input", {
      type: "text",
      id: element['#webform_key'],
      name: element['#webform_key'],
      onInput: e => onInputHandler(e),
      value: _value
    }) : null]
  });
};
var WebformSelect$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformSelect))));

const WebformTextArea = ({
  element,
  value: _value = '',
  setValue,
  fieldProps
}) => {
  const onChangeHandler = async e => {
    setValue(e.target.value);
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("textarea", _extends({
      name: element['#webform_key'],
      value: _value,
      onChange: e => onChangeHandler(e),
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required'],
      readOnly: element['#readonly'],
      placeholder: element['#placeholder']
    }, fieldProps, {
      id: element['#id']
    }))
  });
};
var WebformTextArea$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformTextArea))));

class ComponentRegistry {
  constructor(registry = {}) {
    this._registry = void 0;
    // get a component by id, if not available we return null
    this.getComponent = key => {
      var _this$_registry$get;
      return (_this$_registry$get = this._registry.get(key)) != null ? _this$_registry$get : null;
    };
    this.setComponent = (key, component) => {
      this._registry.set(key, component);
    };
    this._registry = new Map();
    Object.keys(registry).forEach(key => {
      this._registry.set(key, registry[key]);
    });
  }
}

const WebformDebug = ({
  element,
  error
}) => {
  return /*#__PURE__*/jsxs("code", {
    children: [error, /*#__PURE__*/jsx("pre", {
      children: JSON.stringify(element, null, 2)
    })]
  });
};

const WebformElement = props => {
  const {
    registry
  } = useContext(WebformContext);
  const {
    element,
    error
  } = props;
  // Render using custom component if provided:
  if (registry.getComponent(element['#type'])) {
    const CustomComponent = registry.getComponent(element['#type']);
    return /*#__PURE__*/jsx(CustomComponent, _extends({}, props));
  } else {
    return /*#__PURE__*/jsx(WebformDebug, {
      element: element,
      error: error
    });
  }
};

const WebformMultifield = ({
  element,
  value,
  setValue,
  error,
  tableProps: _tableProps = {},
  trProps: _trProps = {},
  tdProps: _tdProps = {}
}) => {
  const normalizedValue = Array.isArray(value) ? value : [];
  const isCustomComposite = element['#type'] === 'webform_custom_composite';
  const remove = item => {
    if (!isIterable(value)) {
      throw new TypeError(`"${typeof value}" is not iterable`);
    }
    const newValue = [...value];
    newValue.splice(item, 1);
    setValue(newValue);
  };
  const renderChildElement = (item, childElement, childKey = null) => {
    const parents = [...element['#parents'], 'items', item, '_item_'];
    const currentElement = element.items[item] ? _extends({}, childElement, {
      '#access': element['#access'],
      '#states': element['#_webform_states'],
      '#parents': parents
    }) : _extends({}, childElement, {
      '#default_value': undefined,
      '#access': element['#access'],
      '#states': element['#_webform_states'],
      '#parents': parents
    });
    return /*#__PURE__*/jsx(WebformElement, {
      element: currentElement,
      setValue: newChildValue => {
        const newValue = Array.from(normalizedValue);
        if (childKey) {
          newValue[item][childKey] = newChildValue;
        } else {
          newValue[item] = newChildValue;
        }
        setValue(newValue);
      },
      value: childKey ? normalizedValue[item][childKey] : normalizedValue[item],
      error: error ? error[item] : null
    }, currentElement['#id']);
  };
  const renderChildren = item => {
    const compositeElements = getChildElements(element['#element']);
    const index = element.items[item] ? item : 0;
    if (Array.isArray(compositeElements) && compositeElements.length) {
      return compositeElements.map(childKey => {
        // If 'Display in table columns' is unchecked in Drupal then the elements are
        // under the '_items_' key.
        const resolvedElement = element.items[index]['_item_'] ? resolvePath(`items.${index}._item_.${childKey}`, element) : resolvePath(`items.${index}.${childKey}`, element);
        const currentElement = _extends({}, resolvedElement, {
          '#webform_key': childKey,
          '#id': `${resolvedElement['#id']}[${item}]`
        });
        const elementItem = JSON.parse(JSON.stringify(currentElement));
        updateNameAndIdWithIndex(item, elementItem);
        return renderChildElement(item, elementItem, childKey);
      });
    } else {
      const childElement = _extends({}, element.items[index]['_item_'], {
        '#webform_key': `${element.items[index]['_item_']['#webform_key']}[${item}]`,
        '#id': `${element.items[index]['_item_']['#webform_key']}[${item}]`
      });
      return renderChildElement(item, childElement);
    }
  };
  const maxItems = element['#cardinality'];
  const currentCount = normalizedValue.length;
  useEffect(() => {
    if (currentCount === 0) {
      // Multifield is responsible for setting the default value to the state
      // when the default value is an array. If the value is something else than
      // array, it is the responsibility of the child element to ensure that the
      // element data is initialized with the correct default value.
      if (element['#default_value'] && Array.isArray(element['#default_value'])) {
        setValue(element['#default_value']);
      } else {
        setValue(['']);
      }
    }
  }, []);
  const children = [];
  for (let i = 0; i < currentCount; i++) {
    const removeButton = _extends({}, element.items[0]['_operations_']['remove'], {
      '#type': 'button',
      '#value': 'Remove'
    });
    children.push( /*#__PURE__*/jsxs("tr", _extends({}, _trProps, {
      children: [/*#__PURE__*/jsx("td", _extends({}, _tdProps, {
        children: renderChildren(i)
      })), /*#__PURE__*/jsx("td", _extends({}, _tdProps, {
        children: /*#__PURE__*/jsx(WebformElement, {
          element: removeButton,
          fieldProps: {
            className: classNames(["btn remove-btn"]),
            onClick: e => {
              e.preventDefault();
              remove(i);
            },
            id: `${element['#webform_key']}-remove-btn-${i}`
          }
        })
      }))]
    }), i));
  }
  return /*#__PURE__*/jsxs(Fragment, {
    children: [/*#__PURE__*/jsx("table", _extends({
      style: {
        width: '100%'
      }
    }, _tableProps, {
      children: /*#__PURE__*/jsx("tbody", {
        children: children
      })
    })), (currentCount < maxItems || !maxItems) && /*#__PURE__*/jsx("div", {
      children: /*#__PURE__*/jsx(WebformElement, {
        element: _extends({}, element['add']['submit'], {
          '#type': 'button'
        }),
        fieldProps: {
          className: classNames(["btn add-btn"]),
          onClick: e => {
            e.preventDefault();
            normalizedValue.push(isCustomComposite ? {} : '');
            setValue(normalizedValue);
          },
          id: `${element['#webform_key']}-add-btn`
        }
      })
    })]
  });
};
var WebformMultifield$1 = withStates(withAttributes(withWrapper(WebformMultifield, {
  labelFor: false
})));

const WebformComposite = ({
  element,
  error,
  value,
  setValue
}) => {
  const compositeElements = getChildElements(element);
  return /*#__PURE__*/jsx(Fragment, {
    children: compositeElements.map(name => {
      return /*#__PURE__*/jsx(WebformElement, {
        element: _extends({
          // Ensure that all child elements have '#webform_key' and '#states' defined.
          '#webform_key': element['#webform_key'],
          '#states': element['#states']
        }, element[name], {
          '#id': element['#webform_multiple'] ? `${element[name]['#id']}${getIndexOfMultiValue(element['#webform_key'])}` : element[name]['#id']
        }),
        value: value && value[name] ? value[name] : '',
        setValue: newValue => {
          setValue(_extends({}, value, {
            [name]: newValue
          }));
        },
        error: error ? error[name] : null
      }, name);
    })
  });
};
var WebformComposite$1 = withDefaultValue(withWrapper(WebformComposite, {
  displayErrors: false,
  defaultWrapperType: 'fieldset'
}));

const WebformContainer = ({
  element,
  fieldProps
}) => {
  const {
    data,
    setData,
    errors
  } = useContext(WebformContext);
  const childElements = getChildElements(element).map(key => {
    const parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
    return /*#__PURE__*/jsx(WebformElement, {
      element: parentAndChildStates ? _extends({}, element[key], {
        '#states': parentAndChildStates
      }) : element[key],
      error: errors[element[key]['#webform_key']],
      value: data[element[key]['#webform_key']],
      setValue: value => {
        setData(previousData => {
          return _extends({}, previousData, {
            [element[key]['#webform_key']]: value
          });
        });
      }
    }, element[key]['#webform_key']);
  });
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("div", _extends({}, fieldProps, {
      children: childElements
    }))
  });
};
var WebformContainer$1 = withStates(withAttributes(withWrapper(WebformContainer, {
  defaultWrapperType: 'container'
})));

const WebformFlexboxLayout = ({
  element,
  itemProps: _itemProps = {}
}) => {
  const {
    data,
    setData,
    errors
  } = useContext(WebformContext);
  const itemPropsWithDefaults = _extends({
    style: {
      flexGrow: 1
    }
  }, _itemProps);
  const childElements = getChildElements(element).map(key => {
    const parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
    return /*#__PURE__*/createElement("div", _extends({}, itemPropsWithDefaults, {
      key: element[key]['#webform_key']
    }), /*#__PURE__*/jsx("div", {
      children: /*#__PURE__*/jsx(WebformElement, {
        element: parentAndChildStates ? _extends({}, element[key], {
          '#states': parentAndChildStates
        }) : element[key],
        error: errors[element[key]['#webform_key']],
        value: data[element[key]['#webform_key']],
        setValue: value => {
          setData(previousData => {
            return _extends({}, previousData, {
              [element[key]['#webform_key']]: value
            });
          });
        }
      })
    }, element[key]['#webform_key']));
  });
  return /*#__PURE__*/jsx(Fragment, {
    children: childElements
  });
};
var WebformFlexboxLayout$1 = withStates(withWrapper(WebformFlexboxLayout, element => {
  var _element$Attributes, _element$Align_items;
  return {
    wrapperProps: _extends({}, normalizeAttributes((_element$Attributes = element['#attributes']) != null ? _element$Attributes : {}), {
      style: {
        display: 'flex',
        boxSizing: 'border-box',
        gap: '1rem',
        justifyContent: (_element$Align_items = element['#align_items']) != null ? _element$Align_items : 'flex-start'
      }
    })
  };
}));

const WebformFieldset = ({
  element
}) => {
  const {
    data,
    setData,
    errors
  } = useContext(WebformContext);
  const childElements = getChildElements(element).map(key => {
    const parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
    return /*#__PURE__*/jsx(WebformElement, {
      element: parentAndChildStates ? _extends({}, element[key], {
        '#states': parentAndChildStates
      }) : element[key],
      error: errors[element[key]['#webform_key']],
      value: data[element[key]['#webform_key']],
      setValue: value => {
        setData(previousData => {
          return _extends({}, previousData, {
            [element[key]['#webform_key']]: value
          });
        });
      }
    }, element[key]['#webform_key']);
  });
  return /*#__PURE__*/jsx(Fragment, {
    children: childElements
  });
};
var WebformFieldset$1 = withStates(withWrapper(WebformFieldset, {
  defaultWrapperType: 'fieldset'
}));

const WebformSection = ({
  element,
  error,
  labelProps,
  fieldProps,
  wrapperProps: _wrapperProps = {}
}) => {
  const {
    data,
    setData,
    errors
  } = useContext(WebformContext);
  const childElements = getChildElements(element).map(key => {
    // Pass down the parent states down to the child elements. The parent state
    // will override the child state if there are any duplicate effects.
    const parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
    return /*#__PURE__*/jsx(WebformElement, {
      element: parentAndChildStates ? _extends({}, element[key], {
        '#states': parentAndChildStates
      }) : element[key],
      error: errors[element[key]['#webform_key']],
      value: data[element[key]['#webform_key']],
      setValue: value => {
        setData(previousData => {
          return _extends({}, previousData, {
            [element[key]['#webform_key']]: value
          });
        });
      }
    }, element[key]['#webform_key']);
  });
  return /*#__PURE__*/jsx(WebformElementWrapper, _extends({
    label: element['#title'],
    isRequired: element['#required'],
    labelDisplay: element['#title_display'],
    access: element['#access'],
    settings: null,
    error: error,
    labelProps: labelProps
  }, _wrapperProps, {
    children: /*#__PURE__*/jsx("section", _extends({}, fieldProps, {
      style: fieldProps['style'],
      children: childElements
    }))
  }));
};
var WebformSection$1 = withStates(withAttributes(WebformSection));

const _excluded$1 = ["data"];
const WebformTable = ({
  element,
  error,
  wrapperProps: _wrapperProps = {},
  fieldProps: _fieldProps = {},
  theadProps: _theadProps = {},
  tbodyProps: _tbodyProps = {},
  trProps: _trProps = {},
  tdProps: _tdProps = {},
  labelProps
}) => {
  const childElements = getChildElements(element).map(row => {
    if (element[row]['#type'] !== 'webform_table_row') {
      return /*#__PURE__*/jsx("tr", {
        children: /*#__PURE__*/jsx("td", {
          children: /*#__PURE__*/jsxs("div", {
            children: ["The form element ", /*#__PURE__*/jsx("em", {
              children: row
            }), " is not inside a table row. To render the form element, it must be placed inside a table row."]
          })
        })
      }, row);
    }
    return /*#__PURE__*/jsx(WebformElement, {
      element: _extends({}, element[row], {
        '#states': element['#states']
      }),
      fieldProps: _trProps,
      tdProps: _tdProps
    }, row);
  });
  const headers = element['#header'];
  return /*#__PURE__*/jsx(WebformElementWrapper, _extends({
    label: element['#title'],
    isRequired: element['#required'],
    labelDisplay: element['#title_display'],
    access: element['#access'],
    settings: null,
    error: error,
    labelProps: labelProps
  }, _wrapperProps, {
    children: /*#__PURE__*/jsxs("table", _extends({}, _fieldProps, {
      children: [/*#__PURE__*/jsx("thead", _extends({}, _theadProps, {
        children: /*#__PURE__*/jsx("tr", _extends({}, _trProps, {
          children: headers && headers.length ? headers.map((header, index) => {
            const {
                data
              } = header,
              attributes = _objectWithoutPropertiesLoose(header, _excluded$1);
            return /*#__PURE__*/createElement("th", _extends({}, normalizeAttributes(attributes), {
              key: index
            }), data['#markup']);
          }) : null
        }))
      })), /*#__PURE__*/jsx("tbody", _extends({}, _tbodyProps, {
        children: childElements
      }))]
    }))
  }));
};
var WebformTable$1 = withStates(withAttributes(WebformTable));

const WebformRange = ({
  element,
  value: _value = 0,
  setValue,
  fieldProps
}) => {
  const onChangeHandler = async e => {
    setValue(e.target.value);
  };
  const styles = {
    below: {
      transform: `translateX(${_value}px)`,
      display: 'block',
      position: 'absolute',
      padding: '2px 5px',
      textAlign: 'center',
      border: '1px solid #bbb',
      background: '#ededed'
    },
    above: {
      transform: `translateX(${_value}px)`,
      display: 'block',
      position: 'absolute',
      padding: '2px 5px',
      textAlign: 'center',
      border: '1px solid #bbb',
      background: '#ededed',
      bottom: '22px'
    },
    left: {
      marginRight: '5px'
    },
    right: {
      marginLeft: '5px'
    }
  };
  // Styling is different based on user defined output position.
  const outputElement = /*#__PURE__*/jsx("output", {
    htmlFor: element['#id'],
    style: styles[element['#output']],
    name: "result",
    children: _value
  });
  return /*#__PURE__*/jsxs("div", {
    className: "form-type-range",
    style: {
      display: 'block',
      position: 'relative'
    },
    children: [element['#output'] && element['#output'] === 'left' ? outputElement : null, /*#__PURE__*/jsx("input", _extends({
      type: element['#type'],
      name: element['#webform_key'],
      min: element['#min'] ? element['#min'] : null,
      max: element['#max'] ? element['#max'] : null,
      onChange: e => onChangeHandler(e),
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required'],
      readOnly: element['#readonly']
    }, fieldProps, {
      id: element['#id'],
      value: _value
    })), element['#output'] && element['#output'] !== 'left' ? outputElement : null]
  });
};
var WebformRange$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformRange))));

const WebformCheckbox = ({
  element,
  setValue,
  fieldProps,
  value
}) => {
  if (element['#type'] !== 'checkbox' && element['#type'] !== 'radio') {
    console.warn(`${element['#type']} which was used on ${element['#webform_key']} is not supported by WebformCheckbox.`);
  }
  const [checkedState, setCheckedState] = useState(value != null ? value : element['#checked'] ? element['#checked'] : false);
  // Update component state when value changes in upstream state.
  useEffect(() => {
    if (typeof value === 'boolean') {
      setCheckedState(value);
    }
  }, [value]);
  const onChangeHandler = async e => {
    setValue(e.target.checked);
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("div", {
      children: /*#__PURE__*/jsx("input", _extends({
        type: element['#type'],
        name: element['#name'],
        onChange: e => onChangeHandler(e),
        disabled: element['#disabled'],
        hidden: !(element['#access'] ? element['#access'] : true),
        required: element['#required'],
        readOnly: element['#readonly'],
        checked: checkedState,
        id: element['#id']
      }, fieldProps, {
        value: element['#return_value']
      }))
    })
  });
};
var WebformCheckbox$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformCheckbox, {
  wrapperProps: {
    style: {
      display: 'flex'
    }
  }
}))));

const WebformRating = ({
  element,
  value: _value = 0,
  setValue,
  fieldProps
}) => {
  const [hover, setHover] = useState(0);
  const max = element['#max'] ? element['#max'] : 5;
  const css = `
button {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
}
.on {
  color: rgb(14 165 233);
  }
.off {
color: #ccc;
}
.star-rating {
font-size: 2rem;
}
}`;
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs("div", {
      className: "star-rating",
      children: [/*#__PURE__*/jsx("input", _extends({
        defaultValue: _value,
        name: element['#webform_key'],
        hidden: true,
        type: "range"
      }, fieldProps, {
        id: element['#webform_key']
      })), /*#__PURE__*/jsx("style", {
        suppressHydrationWarning: true,
        children: css
      }), Array(max).fill(0).map((star, index) => {
        index += 1;
        return /*#__PURE__*/jsx("button", {
          type: "button",
          className: index <= (hover || _value) ? 'on' : 'off',
          onClick: () => setValue(index),
          onMouseEnter: () => setHover(index),
          onMouseLeave: () => setHover(_value),
          disabled: element['#disabled'],
          hidden: !element['#access'],
          children: /*#__PURE__*/jsx("span", {
            className: "star",
            children: "\u2605"
          })
        }, index);
      })]
    })
  });
};
var WebformRating$1 = withStates(withDefaultValue(withWrapper(WebformRating)));

const WebformEmailConfirm = ({
  element,
  error,
  setValue,
  labelProps,
  value,
  fieldProps,
  wrapperProps: _wrapperProps = {}
}) => {
  const {
    registerField
  } = useContext(WebformContext);
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: () => {
          if (email1 === email2) {
            return;
          }
          return 'The specified email addresses do not match.';
        }
      });
    }
  });
  useEffect(() => {
    // Do not reset value from state when value is empty because the value
    // changes into an empty value while typing into the field.
    if (value === '') {
      return;
    }
    setEmail1(value);
    setEmail2(value);
  }, [value]);
  useEffect(() => {
    if (!email1 || !email2) {
      setValue('');
      return;
    }
    if (email1 !== email2) {
      setValue('');
    } else {
      setValue(email1);
    }
  }, [email1, email2]);
  const children = getChildElements(element);
  const childElements = children.map(name => {
    return /*#__PURE__*/jsx(WebformElement, {
      element: _extends({}, element[name], {
        '#states': element['#states']
      }),
      error: error ? error[name] : null,
      value: name === 'mail_1' ? email1 : email2,
      setValue: value => {
        if (name === 'mail_1') {
          setEmail1(value);
        } else if (name === 'mail_2') {
          setEmail2(value);
        }
      },
      labelProps: labelProps,
      fieldProps: fieldProps
    }, name);
  });
  return /*#__PURE__*/jsx(WebformElementWrapper, _extends({
    isRequired: false,
    labelDisplay: "none",
    error: error,
    access: element['#access']
  }, _wrapperProps, {
    children: childElements
  }));
};
var WebformEmailConfirm$1 = withStates(withDefaultValue(withAttributes(WebformEmailConfirm)));

const WebformValue = ({
  element,
  error,
  fieldProps: _fieldProps = {},
  labelProps: _labelProps = {},
  wrapperProps: _wrapperProps = {}
}) => {
  return /*#__PURE__*/jsx(WebformElementWrapper, _extends({
    label: element['#title'],
    isRequired: element['#required'],
    labelDisplay: element['#title_display'],
    access: element['#access'],
    settings: null,
    error: error,
    labelProps: _labelProps
  }, _wrapperProps, {
    labelFor: element['#webform_key'],
    children: /*#__PURE__*/jsx("div", _extends({}, _fieldProps, {
      id: element['#webform_key'],
      children: element['#value']
    }))
  }));
};
var WebformValue$1 = withStates(WebformValue);

const Modal = props => {
  const css = `
.modal {
    width: 500px;
    background: white;
    border: 1px solid #ccc;
    transition: 1.1s ease-out;
    box-shadow: -2rem 2rem 2rem rgba(0, 0, 0, 0.2);
    filter: blur(0);
    transform: translate(-50%, -5%);
    visibility: visible;
    position: absolute;
    opacity: 1;
    left: 50%;
    z-index: 100;
}
.modal.off {
    opacity: 0;
    visibility: hidden;
    filter: blur(8px);
    transform: scale(0.33);
    box-shadow: 1rem 0 0 rgba(0, 0, 0, 0.2);
}
@supports (offset-rotation: 0deg) {
    offset-rotation: 0deg;
    offset-path: path("M 250,100 S -300,500 -700,-200");
    .modal.off {
        offset-distance: 100%;
    }
}
@media (prefers-reduced-motion) {
    .modal {
        offset-path: none;
    }
}
.modal h2 {
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin: 0;
}
.modal .content {
    padding: 1rem;
}
.modal .actions {
    border-top: 1px solid #ccc;
    background: #eee;
    padding: 0.5rem 1rem;
}
#centered-toggle-button {
    position: absolute;
}

`;
  const onClose = e => {
    props.onClose && props.onClose(e);
  };
  return props.show ? /*#__PURE__*/jsxs("div", {
    className: "modal",
    id: "modal",
    onClick: onClose,
    children: [/*#__PURE__*/jsx("style", {
      suppressHydrationWarning: true,
      children: css
    }), /*#__PURE__*/jsx("div", {
      className: "content",
      children: props.children
    }), /*#__PURE__*/jsx("div", {
      className: "actions",
      children: /*#__PURE__*/jsx("button", {
        className: "toggle-button",
        onClick: onClose,
        children: "Close"
      })
    })]
  }) : null;
};

const WebformTermsOfService = ({
  element,
  setValue,
  fieldProps,
  labelProps
}) => {
  const [show, setShow] = useState(false);
  const [checkedState, setCheckedState] = useState(element['#checked'] ? element['#checked'] : false);
  const [accessState, setAccessState] = useState(element['#access'] ? element['#access'] : true);
  const onChangeHandler = async e => {
    setCheckedState(!checkedState);
    if (e.target.value) {
      setValue('1');
    } else {
      setValue('0');
    }
  };
  // Generate label for the checkbox.
  const getLabel = () => {
    const regex = new RegExp(/(.*){(.*)}(.*)/);
    // Link cannot be added if the label doesn't match expected pattern.
    if (!regex.test(element['#title'])) {
      return /*#__PURE__*/jsx(Fragment, {
        children: element['#title']
      });
    }
    const parts = regex.exec(element['#title']);
    return /*#__PURE__*/jsxs(Fragment, {
      children: [parts[1], /*#__PURE__*/jsx("a", {
        href: "#terms",
        role: "button",
        target: "_blank",
        className: "terms-link",
        onClick: e => {
          e.preventDefault();
          setShow(!show);
        },
        children: parts[2]
      }), parts[3]]
    });
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsxs("div", {
      children: [/*#__PURE__*/jsx("input", _extends({
        type: "checkbox",
        id: element['#id'],
        name: element['#webform_key'],
        onChange: e => onChangeHandler(e),
        disabled: element['#disabled'],
        hidden: !accessState,
        required: element['#required'],
        readOnly: element['#readonly'],
        checked: checkedState
      }, fieldProps)), /*#__PURE__*/jsx(Modal, {
        onClose: () => setShow(false),
        show: show,
        children: /*#__PURE__*/jsx("div", {
          dangerouslySetInnerHTML: {
            __html: element['#terms_content']['#markup']
          }
        })
      }), /*#__PURE__*/jsx("label", _extends({
        htmlFor: element['#id']
      }, labelProps, {
        children: getLabel()
      }))]
    })
  });
};
var WebformTermsOfService$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformTermsOfService, {
  labelProps: {
    style: {
      display: 'none'
    }
  }
}))));

const WebformDateTime = ({
  element,
  setValue,
  value,
  error,
  fieldProps,
  labelProps,
  wrapperProps: _wrapperProps = {}
}) => {
  const {
    registerField
  } = useContext(WebformContext);
  const [date = '', time = ''] = (value != null ? value : '').split('T');
  const dateTime = {
    date,
    time
  };
  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: value => {
          if (!value) {
            return;
          }
          // Ex: 2010-05-10T09:15
          const re = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]');
          // Ex: 2010-05-10T09:15:10
          const reWithSeconds = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]');
          if (!(re.test(value) || reWithSeconds.test(value))) {
            return 'The value is invalid. Please fill out every field.';
          }
        }
      });
    }
  }, []);
  const children = getChildElements(element);
  return /*#__PURE__*/jsx(WebformElementWrapper, _extends({
    label: element['#title'],
    labelDisplay: element['#title_display'],
    access: element['#access'],
    isRequired: false,
    error: error
  }, _wrapperProps, {
    children: /*#__PURE__*/jsx("div", {
      id: element['#id'],
      children: children.map(name => {
        return /*#__PURE__*/jsx(WebformElement, {
          element: _extends({}, element[name], {
            '#webform_key': element['#webform_key'],
            '#access': element[name]['#access'] ? element[name]['#access'] : element['#access'],
            '#disabled': element['#disabled'],
            '#required': element['#required'],
            '#date_date_min': element['#date_date_min'],
            '#date_date_max': element['#date_date_max'],
            '#date_time_min': element['#date_time_min'],
            '#date_time_max': element['#date_time_max'],
            '#states': element['#states']
          }),
          error: error ? error[name] : null,
          setValue: newValue => {
            setValue(`${name === 'date' ? newValue : date}T${name === 'time' ? newValue : time}`);
          },
          labelProps: labelProps,
          fieldProps: fieldProps,
          value: dateTime[name] ? dateTime[name] : ''
        }, name);
      })
    })
  }));
};
var WebformDateTime$1 = withStates(withDefaultValue(withAttributes(WebformDateTime)));

const WebformTime = ({
  element,
  setValue,
  value: _value = '',
  fieldProps
}) => {
  var _element$Date_time_m, _element$Date_time_m2;
  const onChangeHandler = async e => {
    setValue(e.target.value);
  };
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("input", _extends({
      type: "time",
      name: element['#name'],
      onChange: e => onChangeHandler(e),
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required'],
      readOnly: element['#readonly'],
      value: _value
    }, fieldProps, {
      id: element['#id'],
      min: (_element$Date_time_m = element['#date_time_min']) != null ? _element$Date_time_m : null,
      max: (_element$Date_time_m2 = element['#date_time_max']) != null ? _element$Date_time_m2 : null
    }))
  });
};
var WebformTime$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformTime))));

const WebformDateList = ({
  element,
  error,
  setValue,
  fieldProps,
  labelProps,
  wrapperProps: _wrapperProps = {}
}) => {
  const [dateList, setDateList] = useState({});
  const children = getChildElements(element);
  const {
    registerField
  } = useContext(WebformContext);
  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: value => {
          if (!value) {
            return;
          }
          // Ex: 2010-05-10T09:15
          const re = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]');
          // Ex: 2010-05-10T09:15:10
          const reWithSeconds = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]');
          if (!(re.test(value) || reWithSeconds.test(value))) {
            return 'The value is invalid. Please fill out every field.';
          }
          return checkDateMinMax(value, element);
        }
      });
    }
  }, []);
  useEffect(() => {
    // When every value of the date list element is filled out then we can set the value.
    if (Object.keys(dateList)[0] && Object.values(dateList).every(i => i !== null)) {
      let twentyFourHour;
      const isPM = dateList['ampm'] && dateList['ampm'] === 'pm';
      // Use military time for the hour if am/pm is used.
      if (dateList['hour']) {
        if (isPM) {
          twentyFourHour = dateList['hour'] + 12;
        } else {
          twentyFourHour = dateList['hour'];
        }
      } else if (isPM) {
        // If the hour is not part of the form but the am/pm is then it should be 12.
        twentyFourHour = 12;
      } else {
        twentyFourHour = '00';
      }
      let monthAsNum;
      if (dateList['month']) {
        const monthOptions = element['month']['#options'];
        // Get the number value of the month. ex) May -> 5
        monthAsNum = Object.keys(monthOptions).find(key => monthOptions[key] === dateList['month']);
      } else {
        // Add fallback values if the unit is not part of the date list like in Webform.
        monthAsNum = '1';
      }
      // Add fallback values if the unit is not part of the date list like in Webform.
      const day = dateList['day'] ? dateList['day'] : '1';
      const year = dateList['year'] ? dateList['year'] : new Date().getFullYear();
      const hour = twentyFourHour;
      const minute = dateList['minute'] ? dateList['minute'] : '00';
      const second = dateList['second'] ? dateList['second'] : null;
      if (!second) {
        setValue(`${year}-${padZero(monthAsNum)}-${padZero(day)}T${padZero(hour)}:${minute}`);
      } else {
        setValue(`${year}-${padZero(monthAsNum)}-${padZero(day)}T${padZero(hour)}:${minute}:${second}`);
      }
    } else {
      if (Object.values(dateList).some(i => i !== null)) {
        setValue(dateList);
      }
    }
  }, [dateList]);
  useEffect(() => {
    children.map(name => {
      // Initialize dateList object keys with units.
      setDateList(prevState => {
        return _extends({}, prevState, {
          [name]: null
        });
      });
    });
  }, []);
  const padZero = num => {
    if (num <= 9) {
      num = '0' + num;
      return num;
    } else {
      return num;
    }
  };
  return /*#__PURE__*/jsx(WebformElementWrapper, _extends({
    label: element['#title'],
    labelDisplay: element['#title_display'],
    access: element['#access'],
    isRequired: false,
    error: error
  }, _wrapperProps, {
    children: /*#__PURE__*/jsx("div", {
      id: element['#id'],
      children: children.map((name, index) => {
        return /*#__PURE__*/jsx(WebformElement, {
          element: _extends({}, element[name], {
            '#webform_key': element['#webform_key'],
            '#disabled': element['#disabled'],
            '#access': element['#access'],
            '#required': element['#required'],
            '#states': element['#states']
          }),
          error: error ? error[name] : null,
          setValue: newValue => {
            setDateList(_extends({}, dateList, {
              [name]: newValue
            }));
          },
          labelProps: labelProps,
          fieldProps: fieldProps,
          value: dateList[name] ? dateList[name] : ''
        }, index);
      })
    })
  }));
};
var WebformDateList$1 = withStates(withDefaultValue(withAttributes(WebformDateList)));

const WebformDate = ({
  element,
  setValue,
  value: _value = '',
  fieldProps
}) => {
  const {
    registerField
  } = useContext(WebformContext);
  const onChangeHandler = async e => {
    setValue(e.target.value);
  };
  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: value => {
          if (!value) {
            return;
          }
          return checkDateMinMax(value, element);
        }
      });
    }
  }, []);
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("input", _extends({
      onChange: e => onChangeHandler(e),
      type: element['#type'],
      name: element['#name'],
      disabled: element['#disabled'],
      hidden: !element['#access'],
      required: element['#required'],
      readOnly: element['#readonly'],
      value: _value
    }, fieldProps, {
      id: element['#id'],
      min: element['#date_date_min'] ? convertDateToISO(element['#date_date_min']) : null,
      max: element['#date_date_max'] ? convertDateToISO(element['#date_date_max']) : null
    }))
  });
};
var WebformDate$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformDate))));

const WebformItem = ({
  element
}) => {
  return element['#access'] === false ? null : /*#__PURE__*/jsx("div", {
    children: /*#__PURE__*/jsx("label", {
      children: element['#title']
    })
  });
};
var WebformItem$1 = withStates(withDefaultValue(WebformItem));

const WebformActions = ({
  element,
  wrapperProps
}) => {
  const buttons = [];
  const {
    registry,
    setData
  } = useContext(WebformContext);
  const supportedButtons = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    submit: () => {},
    reset: e => {
      e.preventDefault();
      setData(() => {
        return {};
      });
    }
  };
  const WebformButton = registry.getComponent('button');
  Object.keys(supportedButtons).forEach(key => {
    if (element[key]) {
      buttons.push( /*#__PURE__*/jsx(WebformButton, {
        element: element[key],
        fieldProps: {
          type: 'submit',
          onClick: supportedButtons[key]
        }
      }, key));
    }
  });
  return /*#__PURE__*/jsx("div", _extends({}, wrapperProps, {
    children: buttons
  }));
};

const supportedTypes = {
  radios: 'radio',
  checkboxes: 'checkbox',
  webform_radios_other: 'radio',
  webform_checkboxes_other: 'checkbox',
  webform_entity_checkboxes: 'checkbox',
  webform_entity_radios: 'radio'
};
// Component for checkboxes or radio buttons that are an options list.
const WebformCheckboxRadioGroup = ({
  element,
  value: _value = [],
  setValue,
  error,
  fieldProps
}) => {
  if (!(element['#type'] in supportedTypes)) {
    throw new Error(`${element['#type']} which was used on ${element['#webform_key']} is not supported by WebformCheckboxRadioGroup.`);
  }
  const [valueOther, setValueOther] = useState(null);
  const [showInputForOther, setShowInputForOther] = useState(false);
  const type = supportedTypes[element['#type']];
  const withOther = element['#type'] === 'webform_checkboxes_other' || element['#type'] === 'webform_radios_other';
  const elementForOther = withOther ? element['other'] : null;
  function getOptions() {
    let options = {};
    const finalOptions = {};
    if (withOther) {
      for (const key of Object.keys(element)) {
        if (key === 'radios' || key === 'checkboxes') {
          options = element[key];
        }
      }
    } else {
      options = element;
    }
    for (const option of Object.keys(options['#options'])) {
      if (option !== '_other_') {
        finalOptions[option] = options['#options'][option];
      }
    }
    return finalOptions;
  }
  const options = getOptions();
  useEffect(() => {
    if (element['#default_value'] && !element['#default_value']['headers']) {
      setValue(element['#default_value']);
      const defaultValues = typeof element['#default_value'] === 'string' ? [element['#default_value']] : element['#default_value'];
      const normalizedDefaultValues = defaultValues.filter(option => {
        return Object.hasOwn(options, option);
      });
      if (type === 'checkbox') {
        setValue(normalizedDefaultValues);
      }
      if (withOther && Object.keys(defaultValues).length !== Object.keys(normalizedDefaultValues).length) {
        for (const defaultValue of defaultValues) {
          if (!Object.hasOwn(options, defaultValue)) {
            setValueOther(defaultValue);
          }
        }
      }
    }
  }, []);
  useEffect(() => {
    if (valueOther && type === 'checkbox') {
      setValue([...(Array.isArray(_value) ? _value : []), valueOther]);
    } else if (valueOther && type === 'radio') {
      setValue(valueOther);
    }
  }, [valueOther]);
  const childElements = getChildElements(element).map(name => {
    // Option lists without an 'Other' option.
    if (name !== 'other' && name !== 'radios' && name !== 'checkboxes') {
      return /*#__PURE__*/jsx(WebformElement, {
        element: _extends({}, element[name], {
          '#webform_key': element['#webform_key'],
          '#states': element['#states'],
          '#access': element['#access']
        }),
        fieldProps: fieldProps,
        setValue: newValue => {
          if (element['#type'] === 'checkboxes' || element['#type'] === 'webform_entity_checkboxes') {
            if (newValue === true) {
              setValue([...(Array.isArray(_value) ? _value : []), element[name]['#return_value']]);
            } else {
              if (Array.isArray(_value) && _value.length) {
                const filtered = _value.filter(i => i !== element[name]['#return_value']);
                setValue(filtered);
              }
            }
          } else {
            setValue(element[name]['#return_value']);
          }
        },
        value: Array.isArray(_value) && _value.includes(element[name]['#return_value']) || _value === element[name]['#return_value'],
        error: error
      }, name);
      // The element has an 'Other' option if the child element key is 'checkboxes' or 'radios' so we need to
      // go one level deeper to get the list of options.
    } else if (name == 'checkboxes' || name == 'radios') {
      return getChildElements(element[name]).map(option => {
        return /*#__PURE__*/jsx(WebformElement, {
          fieldProps: fieldProps,
          element: _extends({}, element[name][option], {
            '#webform_key': element['#webform_key'],
            '#states': element['#states'],
            '#access': element['#access']
          }),
          setValue: newValue => {
            if (element[name][option]['#type'] === 'checkbox') {
              if (element[name][option]['#return_value'] === '_other_') {
                if (newValue) {
                  setValueOther(valueOther != null ? valueOther : '');
                  setShowInputForOther(true);
                } else {
                  setShowInputForOther(false);
                  setValueOther(null);
                }
              } else {
                if (newValue === true) {
                  setValue([...(Array.isArray(_value) ? _value : []), element[name][option]['#return_value']]);
                } else {
                  if (Array.isArray(_value) && _value.length) {
                    const filtered = _value.filter(i => i !== element[name][option]['#return_value']);
                    setValue(filtered);
                  }
                }
              }
            } else {
              if (element[name][option]['#return_value'] === '_other_') {
                setValueOther(valueOther != null ? valueOther : '');
                setValue(valueOther != null ? valueOther : '');
                setShowInputForOther(true);
              } else {
                setShowInputForOther(false);
                setValueOther(null);
                setValue(element[name][option]['#return_value']);
              }
            }
          },
          value: Array.isArray(_value) && _value.includes(element[name][option]['#return_value']) || _value === element[name][option]['#return_value'] || element[name][option]['#return_value'] === '_other_' && showInputForOther,
          error: error
        }, option);
      });
    }
  });
  return /*#__PURE__*/jsxs(Fragment, {
    children: [childElements, withOther && showInputForOther ? /*#__PURE__*/jsx(WebformElement, {
      element: _extends({}, element, {
        '#type': elementForOther['#type'],
        '#webform_key': element['#webform_key'],
        '#title': elementForOther['#title'],
        '#description': elementForOther['#description'],
        '#id': `${element['#id']}-other-input`
      }),
      value: valueOther,
      setValue: newValue => {
        setValueOther(newValue);
      }
    }) : null]
  });
};
var WebformCheckboxRadioGroup$1 = withStates(withAttributes(withWrapper(WebformCheckboxRadioGroup, {
  defaultWrapperType: 'fieldset',
  labelFor: false
})));

const WebformMarkup = ({
  element,
  error
}) => {
  return /*#__PURE__*/jsx("div", {
    dangerouslySetInnerHTML: {
      __html: element['#markup']
    }
  });
};

const WebformMessage = ({
  element,
  error
}) => {
  return /*#__PURE__*/jsx("div", {
    dangerouslySetInnerHTML: {
      __html: element['#message_message']['#markup']
    }
  });
};

const WebformButton = ({
  element,
  fieldProps
}) => {
  return /*#__PURE__*/jsx("button", _extends({
    type: "button"
  }, fieldProps, {
    children: element['#value']
  }));
};
var WebformButton$1 = withAttributes(WebformButton);

const WebformTableRow = ({
  element,
  error,
  fieldProps: _fieldProps = {},
  tdProps: _tdProps = {}
}) => {
  const {
    data,
    setData
  } = useContext(WebformContext);
  return /*#__PURE__*/jsx("tr", _extends({}, _fieldProps, {
    children: getChildElements(element).map(key => {
      var _element$key$Wrapper;
      const rowAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
      const parentAndRowAndChildStates = element['#states'] ? Object.assign({}, rowAndChildStates, element['#states']) : rowAndChildStates;
      return /*#__PURE__*/createElement("td", _extends({}, _extends({}, _tdProps, normalizeAttributes((_element$key$Wrapper = element[key]['#wrapper_attributes']) != null ? _element$key$Wrapper : {})), {
        key: key
      }), /*#__PURE__*/jsx(WebformElement, {
        element: _extends({}, parentAndRowAndChildStates ? _extends({
          '#states': parentAndRowAndChildStates
        }, element[key]) : element[key], {
          // Make sure `#wrapper_attributes` is only applied once.
          '#wrapper_attributes': []
        }),
        error: error,
        value: data[element[key]['#webform_key']],
        setValue: value => {
          setData(previousData => {
            return _extends({}, previousData, {
              [element[key]['#webform_key']]: value
            });
          });
        }
      }, key));
    })
  }));
};
var WebformTableRow$1 = withAttributes(WebformTableRow);

const ConfirmationPage = ({
  webform,
  submission
}) => {
  const defaultMessage = /*#__PURE__*/jsxs(Fragment, {
    children: ["New submission added to ", /*#__PURE__*/jsx("em", {
      children: webform.title
    }), "."]
  });
  return /*#__PURE__*/jsx("div", {
    children: webform.confirmation.message && webform.confirmation.message.length > 0 ? webform.confirmation.message : defaultMessage
  });
};

const DebugConfirmation = ({
  submission
}) => {
  return /*#__PURE__*/jsx("pre", {
    children: /*#__PURE__*/jsx("code", {
      id: "submitted-data",
      children: JSON.stringify(submission)
    })
  });
};

const WizardPage = ({
  element,
  fieldProps
}) => {
  const {
    data,
    setData,
    errors
  } = useContext(WebformContext);
  const childElements = getChildElements(element).map(key => {
    const parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
    return /*#__PURE__*/jsx(WebformElement, {
      element: parentAndChildStates ? _extends({}, element[key], {
        '#states': parentAndChildStates,
        '#access': true
      }) : _extends({}, element[key], {
        '#access': true
      }),
      error: errors[element[key]['#webform_key']],
      value: data[element[key]['#webform_key']],
      setValue: value => {
        setData(previousData => {
          return _extends({}, previousData, {
            [element[key]['#webform_key']]: value
          });
        });
      }
    }, element[key]['#webform_key']);
  });
  return /*#__PURE__*/jsx(Fragment, {
    children: /*#__PURE__*/jsx("div", _extends({}, fieldProps, {
      children: childElements
    }))
  });
};
var WizardPage$1 = withStates(withAttributes(withWrapper(WizardPage, {
  defaultWrapperType: 'container'
})));

const MultiPageForm = ({
  elements
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const children = getChildElements(elements);
  const pageElement = elements[children[currentPage]];
  const showPrevBtn = currentPage > 0;
  const showSubmitBtn = currentPage === children.length - 1;
  const submitBtnElement = elements['actions'];
  const highlightCurrent = item => {
    if (pageElement['#title'] == elements[item]['#title']) {
      return {
        color: 'blue'
      };
    }
  };
  return /*#__PURE__*/jsxs("div", {
    children: [/*#__PURE__*/jsx("ul", {
      style: {
        display: 'flex'
      },
      children: children.map(item => {
        return /*#__PURE__*/jsxs("li", {
          style: highlightCurrent(item),
          children: [elements[item]['#title'], "----", '>']
        }, item);
      })
    }), /*#__PURE__*/jsx("br", {}), /*#__PURE__*/jsxs("h1", {
      children: ["Page Title: ", pageElement['#title']]
    }), /*#__PURE__*/jsxs("h1", {
      children: ["Current page: ", currentPage + 1]
    }), /*#__PURE__*/jsx(WizardPage$1, {
      element: _extends({}, pageElement)
    }), showPrevBtn && /*#__PURE__*/jsx("button", {
      style: {
        border: 'solid'
      },
      type: "button",
      className: `prev-btn`,
      onClick: () => setCurrentPage(prevState => prevState - 1),
      children: "Previous"
    }), /*#__PURE__*/jsx("button", {
      style: {
        border: 'solid'
      },
      type: "button",
      className: `next-btn`,
      onClick: () => setCurrentPage(prevState => prevState + 1),
      children: "Next"
    }), showSubmitBtn && /*#__PURE__*/jsx(WebformElement, {
      element: submitBtnElement
    })]
  });
};

const FormLayout = ({
  webform,
  status
}) => {
  const {
    registry,
    setData,
    data,
    errors
  } = useContext(WebformContext);
  const {
    elements,
    confirmation
  } = webform;
  const children = getChildElements(elements);
  const renderConfirmationPage = () => {
    const ConfirmationPage = registry.getComponent('confirmation_page');
    return /*#__PURE__*/jsx(ConfirmationPage, {
      webform: webform,
      submission: data
    });
  };
  const isMultiPageForm = children.some(i => {
    return elements[i]['#type'] === 'webform_wizard_page';
  });
  useEffect(() => {
    if (confirmation.type !== 'debug' || status === 'success') {
      return;
    }
    // Store Webform debug data in local storage so that it can be retrieved
    // after submission.
    window.localStorage.setItem('webformDebugData', JSON.stringify(data));
  }, [data, status, confirmation.type]);
  const renderChildren = () => {
    return /*#__PURE__*/jsx(Fragment, {
      children: children.map(key => /*#__PURE__*/jsx(WebformElement, {
        element: elements[key],
        setValue: value => {
          setData(previousData => {
            return _extends({}, previousData, {
              [elements[key]['#webform_key']]: value
            });
          });
        },
        value: data[elements[key]['#webform_key']],
        error: errors[elements[key]['#webform_key']]
      }, elements[key]['#webform_key']))
    });
  };
  if (status === 'success') {
    if (confirmation.type === 'debug') {
      const debugData = (() => {
        if (typeof window === 'undefined') {
          return data;
        }
        return JSON.parse(window.localStorage.getItem('webformDebugData'));
      })();
      return /*#__PURE__*/jsx(DebugConfirmation, {
        submission: debugData
      });
    } else if (confirmation.type === 'page' || confirmation.type === 'inline') {
      return renderConfirmationPage();
    } else if (confirmation.type === 'message') {
      const Message = registry.getComponent('message');
      const defaultMessage = /*#__PURE__*/jsxs(Fragment, {
        children: ["New submission added to ", /*#__PURE__*/jsx("em", {
          children: webform.title
        }), "."]
      });
      return /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx(Message, {
          type: "success",
          children: webform.confirmation.message && webform.confirmation.message.length > 0 ? webform.confirmation.message : defaultMessage
        }), renderChildren()]
      });
    } else if (confirmation.type === 'none') {
      return renderChildren();
    }
  }
  if (isMultiPageForm) {
    // Fix for element access on Wizard.
    for (const [key, value] of Object.entries(elements)) {
      if (typeof value === 'object' && value !== null) {
        const keys2 = Object.keys(value);
        const hasValue = keys2.includes('#access');
        if (hasValue) {
          elements[key]['#access'] = true;
          accessChildrenElements(elements[key]);
        }
      }
    }
    return /*#__PURE__*/jsx(MultiPageForm, {
      elements: elements
    });
  } else {
    return renderChildren();
  }
};
const accessChildrenElements = element => {
  Object.entries(element).forEach(item => {
    for (const [key, value] of Object.entries(item)) {
      if (typeof value === 'object' && value !== null) {
        const keys2 = Object.keys(value);
        const hasValue = keys2.includes('#access');
        if (hasValue) {
          item[key]['#access'] = true;
          accessChildrenElements(item[key]);
        }
      }
    }
  });
  return true;
};

const Message = ({
  children,
  type
}) => {
  return /*#__PURE__*/jsx("div", {
    children: children
  });
};

const WebformCustomComposite = ({
  element,
  error,
  value,
  setValue,
  labelProps
}) => {
  const compositeElements = getChildElements(element['#element']);
  const isMulti = !!element['add'];
  useEffect(() => {
    // The custom composite component handles setting default value.
    if (element['#default_value'] && Array.isArray(element['#default_value'])) {
      setValue(element['#default_value']);
    } else {
      setValue([{}]);
    }
  }, []);
  return /*#__PURE__*/jsx(Fragment, {
    children: isMulti ? /*#__PURE__*/jsx(Fragment, {
      children: /*#__PURE__*/jsx(WebformMultifield$1, {
        element: element,
        value: value,
        setValue: setValue,
        error: error
      })
    }) : /*#__PURE__*/jsx(WebformElementWrapper, {
      label: element['#title'],
      labelDisplay: element['#title_display'],
      access: element['#access'],
      isRequired: false,
      error: error,
      children: compositeElements.map((name, index) => {
        const elementItem = element.items['0'][name];
        return /*#__PURE__*/jsx(WebformElement, {
          element: _extends({}, elementItem, {
            // Ensure that all child elements have '#webform_key' and '#states' defined.
            '#webform_key': name,
            '#states': element['#_webform_states'],
            '#id': elementItem['#id'],
            '#default_value': undefined
          }),
          value: value && value[0][name] ? value[0][name] : '',
          setValue: newValue => {
            // A single value custom composite element needs to be an object
            // wrapped in an array [{}]. So check first if the object
            // exists yet and if so, create a new object with the existing object and the new value.
            // Otherwise, create an object with the new key and value inside an array.
            if (value && value[0]) {
              setValue([_extends({}, value[0], {
                [name]: newValue
              })]);
            } else {
              setValue([{
                [name]: newValue
              }]);
            }
          },
          error: error ? error[name] : null,
          labelProps: labelProps
        }, index);
      })
    })
  });
};

const defaultComponents = {
  // Text types.
  textfield: WebformText$1,
  number: WebformText$1,
  hidden: WebformText$1,
  email: WebformText$1,
  search: WebformText$1,
  tel: WebformText$1,
  url: WebformText$1,
  textarea: WebformTextArea$1,
  // Elements with fixed values.
  autocomplete: WebformAutocomplete$1,
  checkbox: WebformCheckbox$1,
  checkboxes: WebformCheckboxRadioGroup$1,
  entity_autocomplete: WebformAutocomplete$1,
  range: WebformRange$1,
  radio: WebformCheckbox$1,
  radios: WebformCheckboxRadioGroup$1,
  select: WebformSelect$1,
  webform_autocomplete: WebformAutocomplete$1,
  webform_checkboxes_other: WebformCheckboxRadioGroup$1,
  webform_entity_checkboxes: WebformCheckboxRadioGroup$1,
  webform_entity_radios: WebformCheckboxRadioGroup$1,
  webform_radios_other: WebformCheckboxRadioGroup$1,
  webform_rating: WebformRating$1,
  webform_select_other: WebformSelect$1,
  webform_terms_of_service: WebformTermsOfService$1,
  // Containers.
  container: WebformContainer$1,
  fieldset: WebformFieldset$1,
  webform_flexbox: WebformFlexboxLayout$1,
  webform_section: WebformSection$1,
  webform_table: WebformTable$1,
  webform_table_row: WebformTableRow$1,
  // Composite types.
  webform_address: WebformComposite$1,
  webform_contact: WebformComposite$1,
  webform_name: WebformComposite$1,
  webform_link: WebformComposite$1,
  webform_custom_composite: WebformCustomComposite,
  // Datetime types.
  date: WebformDate$1,
  datelist: WebformDateList$1,
  datetime: WebformDateTime$1,
  webform_time: WebformTime$1,
  button: WebformButton$1,
  submit: WebformActions,
  item: WebformItem$1,
  value: WebformValue$1,
  webform_actions: WebformActions,
  webform_email_confirm: WebformEmailConfirm$1,
  webform_multiple: WebformMultifield$1,
  // Non-form element components.
  confirmation_page: ConfirmationPage,
  form_layout: FormLayout,
  message: Message,
  webform_wizard_page: WizardPage$1,
  // Custom Messages, Markup (Work in progress)
  webform_message: WebformMessage,
  webform_markup: WebformMarkup
};
const defaultComponentRegistry = new ComponentRegistry(defaultComponents);

const _excluded = ["data", "id", "customComponents", "onSubmit", "apiUrl", "validate"];
class WebformError extends Error {
  constructor(response) {
    super();
    this.response = void 0;
    this.response = response;
  }
}
const Webform = _ref => {
  let {
      data: webformObject,
      id,
      customComponents = {},
      onSubmit: customOnSubmit,
      apiUrl = '/api/webform',
      validate
    } = _ref,
    formProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  const componentRegistry = defaultComponentRegistry;
  useConstructor(() => {
    // Register components on the initial load.
    Object.keys(customComponents).forEach(key => {
      componentRegistry.setComponent(key, customComponents[key]);
    });
  });
  // Update component library when `customComponents` changes. This ensures that
  // the component library is kept in a consistent state with hot module
  // replacement.
  useEffect(() => {
    Object.keys(customComponents).forEach(key => {
      componentRegistry.setComponent(key, customComponents[key]);
    });
  }, [customComponents]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState();
  const [data, setData] = useState({});
  const fieldRegistry = useRef({});
  const registerField = React.useCallback((name, {
    validate
  }) => {
    fieldRegistry.current[name] = {
      validate
    };
  }, []);
  const unregisterField = React.useCallback(name => {
    delete fieldRegistry.current[name];
  }, []);
  const onSubmit = customOnSubmit ? customOnSubmit : defaultOnSubmit;
  const WebformForm = componentRegistry.getComponent('form_layout');
  const Message = componentRegistry.getComponent('message');
  const runSingleFieldLevelValidation = (field, value) => {
    return new Promise(resolve => resolve(fieldRegistry.current[field].validate(value)));
  };
  const runFieldValidators = values => {
    const fieldKeysWithValidation = Object.keys(fieldRegistry.current).filter(key => isFunction(fieldRegistry.current[key].validate));
    const fieldValidations = fieldKeysWithValidation.map(key => runSingleFieldLevelValidation(key, values[key]));
    return Promise.all(fieldValidations).then(fieldErrorsList => {
      return fieldErrorsList.reduce((previousValue, currentValue, currentIndex) => {
        if (currentValue === undefined) {
          return previousValue;
        }
        setIn(previousValue, fieldKeysWithValidation[currentIndex], currentValue);
        return previousValue;
      }, {});
    });
  };
  const runValidators = values => {
    return Promise.all([runFieldValidators(values), validate ? validate(values) : {}]).then(([fieldErrors, validateErrors]) => {
      return deepmerge.all([fieldErrors, validateErrors], {
        arrayMerge
      });
    });
  };
  return /*#__PURE__*/jsxs("form", _extends({}, formProps, {
    onSubmit: event => {
      event.preventDefault();
      runValidators(data).then(combinedErrors => {
        if (Object.keys(combinedErrors).length !== 0) {
          setStatus('error');
          setErrors(combinedErrors);
        } else {
          onSubmit({
            id,
            event,
            data,
            setData,
            setStatus,
            setErrors,
            apiUrl
          });
        }
      });
    },
    children: [status === 'error' ? /*#__PURE__*/jsx(Message, {
      type: "error",
      children: "An error occurred. Please try again."
    }) : null, /*#__PURE__*/jsx(WebformContext.Provider, {
      value: {
        id,
        apiUrl,
        data,
        setData,
        setStatus,
        errors,
        registry: componentRegistry,
        registerField,
        unregisterField
      },
      children: /*#__PURE__*/jsx(WebformForm, {
        webform: webformObject,
        status: status
      })
    })]
  }));
};

const WebformHeight = ({
  element,
  error,
  value,
  setValue
}) => {
  const onChangeHandler = async e => {
    setValue(_extends({}, value, {
      [e.target.name]: e.target.value
    }));
  };
  return /*#__PURE__*/jsx(WebformElementWrapper, {
    labelFor: element['#key'],
    label: element['#title'],
    isRequired: element['#required'],
    access: element['#access'],
    settings: null,
    error: error,
    children: /*#__PURE__*/jsxs("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center'
      },
      children: [/*#__PURE__*/jsx("input", {
        type: "number",
        name: "feet",
        min: 0,
        max: 8,
        onChange: e => onChangeHandler(e)
      }), /*#__PURE__*/jsx("label", {
        style: {
          padding: '0.5em'
        },
        children: "feet"
      }), /*#__PURE__*/jsx("input", {
        type: "number",
        name: "inches",
        min: 0,
        max: 11,
        onChange: e => onChangeHandler(e)
      }), /*#__PURE__*/jsx("label", {
        style: {
          padding: '0.5em'
        },
        children: "inches"
      })]
    })
  });
};

async function WebformDefaultApiRoute(request, response, drupal) {
  if (request.method === 'GET') {
    switch (request.query.op.toString()) {
      case 'autocomplete_options':
        {
          const {
            id,
            options_id
          } = request.query;
          const url = drupal.buildUrl(`/webform_rest/${id.toString()}/autocomplete_options/${options_id}?_format=json`);
          const result = await drupal.fetch(url.toString(), {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!result.ok) {
            const message = await result.json();
            // Send error to client.
            return response.status(result.status).json({
              message
            });
          }
          response.end(JSON.stringify(await result.json()));
          response.status(200);
          return response;
        }
      default:
        {
          response.end('{}');
          response.status(404);
          return response;
        }
    }
  } else if (request.method === 'POST') {
    const url = drupal.buildUrl('/webform_rest/submit?_format=json');
    // Submit to Drupal.
    const result = await drupal.fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify(request.body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!result.ok) {
      const message = await result.json();
      // Send error to client.
      return response.status(result.status).json({
        message
      });
    }
    response.end(JSON.stringify(result));
    response.status(200);
    return response;
  }
}

export { Webform, WebformContext, WebformDefaultApiRoute, WebformError, WebformHeight, arrayMerge, checkDateMinMax, defaultComponents as components, convertDateToISO, cssStringToObject, defaultOnSubmit, getChildElements, getCurrentError, getIndexOfMultiValue, getNormalizedErrorMessages, isFunction, isInteger, isIterable, isObject, normalizeElements, reactPropertyMap, resolvePath, resolveWebformContent, setIn, toKey, toPath, updateNameAndIdWithIndex, useConstructor };
//# sourceMappingURL=index.modern.mjs.map
