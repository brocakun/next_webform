(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('deepmerge'), require('strtotime'), require('react/jsx-runtime'), require('classnames')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'deepmerge', 'strtotime', 'react/jsx-runtime', 'classnames'], factory) :
  (global = global || self, factory(global.nextjsDrupalWebform = {}, global.react, global.deepmerge, global.strtotime, global.jsx, global.classnames));
})(this, (function (exports, React, deepmerge, strtotime, jsxRuntime, classNames) {
  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return n;
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);
  var deepmerge__default = /*#__PURE__*/_interopDefaultLegacy(deepmerge);
  var strtotime__default = /*#__PURE__*/_interopDefaultLegacy(strtotime);
  var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);

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
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
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
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function getChildElements(containerElement) {
    var count = Object.keys(containerElement).length;
    var i = 0;
    var childWeights = [];
    for (var _i = 0, _Object$keys = Object.keys(containerElement); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      if (key.charAt(0) === '#') {
        continue;
      }
      // Skip `type` key since it's reserved for this application.
      // @todo should we get rid of this?
      // @see WebformElementType
      if (key === 'type') {
        continue;
      }
      var element = containerElement[key];
      var weight = void 0;
      if (typeof element['#weight'] !== 'undefined') {
        weight = element['#weight'];
      } else {
        weight = 0;
      }
      // Supports weight with up to three digit precision and conserve
      // the insertion order.
      childWeights.push({
        weight: Math.floor(weight * 1000) + i / count,
        key: key
      });
      i++;
    }
    childWeights.sort(function (a, b) {
      return a.weight - b.weight;
    });
    return childWeights.map(function (childWeight) {
      return childWeight.key;
    });
  }
  var WebformContext = /*#__PURE__*/React__namespace.createContext(null);
  var drupalRenderedMarkup = function drupalRenderedMarkup(message) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      dangerouslySetInnerHTML: {
        __html: message
      }
    });
  };
  var getNormalizedErrorMessages = function getNormalizedErrorMessages(errors) {
    if (!errors) {
      return null;
    }
    return Object.keys(errors).reduce(function (currentValue, key) {
      var parts = key.split('][');
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
            var _getNormalizedErrorMe;
            var newKey = [].concat(parts.slice(2)).join('][');
            currentValue[parts[0]] = _extends({}, currentValue[parts[0]], getNormalizedErrorMessages((_getNormalizedErrorMe = {}, _getNormalizedErrorMe[newKey] = errors[key], _getNormalizedErrorMe)));
          } else {
            var _extends2;
            var _newKey = [].concat(parts.slice(1)).join('][');
            currentValue[parts[0]] = _extends({}, currentValue[parts[0]], getNormalizedErrorMessages(_extends({}, currentValue[parts[0]], (_extends2 = {}, _extends2[_newKey] = errors[key], _extends2))));
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
    return path.filter(function (item) {
      return item !== 'items' && item !== '_item_';
    }).join('][');
  }
  function setIn(obj, path, value) {
    var pathArray = toPath(path);
    var current = obj;
    for (var i = 0; i < pathArray.length; i++) {
      var currentPath = pathArray[i];
      if (pathArray.length - 1 === i) {
        current[currentPath] = value;
      } else {
        if (!current[currentPath]) {
          var nextPath = pathArray[i + 1];
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
  var isInteger = function isInteger(obj) {
    return Number.isInteger(obj) || String(Math.floor(Number(obj))) === obj;
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  var isFunction = function isFunction(object) {
    return typeof object === 'function';
  };
  function isIterable(item) {
    if (item === null || item === undefined) {
      return false;
    }
    return typeof item[Symbol.iterator] === 'function';
  }
  var useConstructor = function useConstructor(callback) {
    var _useState = React.useState(false),
      hasBeenCalled = _useState[0],
      setHasBeenCalled = _useState[1];
    if (hasBeenCalled) return;
    callback();
    setHasBeenCalled(true);
  };
  // Converts a CSS style from string to an object supported by React.
  // E.g. `border: 3px solid green; border-radius: 4px;` is converted into
  // `{ border: '3px solid green', borderRadius: '4px'}`.
  var cssStringToObject = function cssStringToObject(string) {
    var regExp = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g;
    var result = {};
    if (typeof string === 'string') {
      string.replace(regExp, function (declaration, property, value) {
        // The property name must be converted from kebab-case to camelCase.
        // @see https://reactjs.org/docs/dom-elements.html#style
        var camelizedProperty = property.replace(/-./g, function (part) {
          return part[1].toUpperCase();
        });
        return result[camelizedProperty] = value;
      });
    }
    return result;
  };
  // @see https://github.com/facebook/react/blob/v18.2.0/packages/react-dom/src/shared/possibleStandardNames.js#L11
  var reactPropertyMap = {
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
    "class": 'className',
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
    "default": 'default',
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
    "for": 'htmlFor',
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
  var getIndexOfMultiValue = function getIndexOfMultiValue(string) {
    var matchArr = string.match(/\[(\d.*?)\]/g);
    // In case the webform key contains other indexes, we only want the last one.
    return matchArr.pop();
  };
  var getCurrentError = function getCurrentError(clientSideError, serverSideError) {
    if (clientSideError) {
      return clientSideError;
    }
    if (typeof serverSideError === 'string' || /*#__PURE__*/React__namespace.isValidElement(serverSideError)) {
      return serverSideError;
    }
    return;
  };
  /**
   * deepmerge array merging algorithm
   * https://github.com/TehShrike/deepmerge#arraymerge-example-combine-arrays
   */
  var arrayMerge = function arrayMerge(target, source, options) {
    var destination = target.slice();
    source.forEach(function (item, index) {
      if (typeof destination[index] === 'undefined') {
        destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
      } else if (options.isMergeableObject(item)) {
        destination[index] = deepmerge__default["default"](target[index], item, options);
      } else if (target.indexOf(item) === -1) {
        destination.push(item);
      }
    });
    return destination;
  };
  // Updates the name and ID of every child element recursively.
  function updateNameAndIdWithIndex(index, element) {
    var childElements = getChildElements(element);
    if (childElements.length) {
      // Make a deep copy of the element item that we can change the id and name of.
      for (var _iterator = _createForOfIteratorHelperLoose(childElements), _step; !(_step = _iterator()).done;) {
        var nestedElement = _step.value;
        var id = element[nestedElement]['#id'];
        var idLength = id.length;
        var name = element[nestedElement]['#name'];
        if (id.charAt(idLength - 1) === ']') {
          var updatedId = id.replace(/\[(.+?)\]/g, '[' + index + ']');
          var updatedName = name.replace(/\[(.+?)\]/g, '[' + index + ']');
          element[nestedElement]['#id'] = updatedId;
          element[nestedElement]['#name'] = updatedName;
        } else {
          element[nestedElement]['#id'] = element[nestedElement]['#id'] + "[" + index + "]";
          element[nestedElement]['#name'] = element[nestedElement]['#name'] + "[" + index + "]";
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
  var checkDateMinMax = function checkDateMinMax(value, element) {
    if (element['#date_date_min']) {
      var min = element['#date_date_min'];
      var minAsISO = convertDateToISO(min);
      if (strtotime__default["default"](value) < strtotime__default["default"](minAsISO)) {
        return "Date must be on or after " + minAsISO + ".";
      }
    }
    if (element['#date_date_max']) {
      var max = element['#date_date_max'];
      var maxAsISO = convertDateToISO(max);
      if (strtotime__default["default"](value) > strtotime__default["default"](maxAsISO)) {
        return "Date must be on or before " + maxAsISO + ".";
      }
    }
    return;
  };
  var convertDateToISO = function convertDateToISO(date) {
    if (date === 'today') {
      return new Date().toISOString().substring(0, 10);
    } else if (typeof strtotime__default["default"](date) === 'number') {
      return new Date(date).toISOString().split('T')[0];
    } else {
      return strtotime__default["default"](date).toISOString().substring(0, 10);
    }
  };

  var defaultOnSubmit = function defaultOnSubmit(_ref2) {
    var id = _ref2.id,
      data = _ref2.data,
      setData = _ref2.setData,
      setStatus = _ref2.setStatus,
      setErrors = _ref2.setErrors,
      apiUrl = _ref2.apiUrl;
    try {
      var body = _extends({}, data, {
        webform_id: id
      });
      return Promise.resolve(fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })).then(function (response) {
        var _temp5 = function () {
          if (!response.ok) {
            setStatus('error');
            return Promise.resolve(response.json()).then(function (message) {
              setErrors(getNormalizedErrorMessages(message.message.error));
            });
          } else {
            setStatus('success');
            setData({});
            // Clear webform element errors.
            setErrors({});
          }
        }();
        if (_temp5 && _temp5.then) return _temp5.then(function () {});
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var resolveWebformContent = function resolveWebformContent(id, drupal, fetchOptions) {
    try {
      var url = drupal.buildUrl("/webform/" + id + "?_format=json");
      var elementsUrl = drupal.buildUrl("/webform_rest/" + id + "/elements?_format=json");
      return Promise.resolve(Promise.all([drupal.fetch(url.toString(), _extends({}, fetchOptions, {
        headers: {
          'Content-Type': 'application/json'
        }
      })), drupal.fetch(elementsUrl.toString(), _extends({}, fetchOptions, {
        headers: {
          'Content-Type': 'application/json'
        }
      }))])).then(function (_ref) {
        var _exit;
        var result = _ref[0],
          elementsResult = _ref[1];
        function _temp4(_result) {
          var _exit2;
          if (_exit) ;
          function _temp2(_result2) {
            return _exit2 ? _result2 : Promise.resolve(elementsResult.json()).then(function (_elementsResult$json) {
              var normalizedElements = normalizeElements(_elementsResult$json);
              return Promise.resolve(result.json()).then(function (webform) {
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
              });
            });
          }
          var _temp = function () {
            if (!elementsResult.ok) {
              return Promise.resolve(elementsResult.json()).then(function (message) {
                throw new Error(message);
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp); // Clean up some commonly provided, unused properties to reduce the overall
          // size of props.
        }
        var _temp3 = function () {
          if (!result.ok) {
            return Promise.resolve(result.json()).then(function (message) {
              throw new Error(message);
            });
          }
        }();
        return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var deleteKeys = ['#process', '#groups', '#after_build', '#pre_render', '#value_callback', '#theme_wrappers', '#allowed_tags', '#attached', '#element_validate', '#cache', '#prefix', '#suffix', '#webform_children', '#webform_parents', '#array_parents', '#autocomplete_route_parameters', '#autocomplete_route_name', '#ajax', '#ajax_processed', '#ajax_prefix', '#ajax_suffix', '#child_keys', '#ajax_attributes', '#tabledrag', '#sorted', '#processed', '#after_build_done', '#tree'];
  var normalizeElements = function normalizeElements(result) {
    deleteKeys.forEach(function (key) {
      delete result[key];
    });
    getChildElements(result).forEach(function (key) {
      result[key] = normalizeElements(result[key]);
    });
    return result;
  };

  var withDefaultValue = function withDefaultValue(EnhancedComponent) {
    return function WebformElementWithDefaultValue(props) {
      React.useEffect(function () {
        if (!props.value && props.element['#default_value'] && !props.element['#default_value']['headers']) {
          props.setValue(props.element['#default_value']);
        }
      }, []);
      return /*#__PURE__*/jsxRuntime.jsx(EnhancedComponent, _extends({}, props));
    };
  };

  var normalizeAttributes = function normalizeAttributes(attributes) {
    var ignoreList = ['id', 'data-drupal-selector', 'webform-remove-for-attribute'];
    var filteredAttributes = Object.keys(attributes).filter(function (attribute) {
      return !ignoreList.includes(attribute);
    });
    return filteredAttributes.reduce(function (currentValue, attribute) {
      if (attribute === 'class') {
        currentValue['className'] = classNames__default["default"](attributes[attribute]);
      } else if (reactPropertyMap[attribute]) {
        currentValue[reactPropertyMap[attribute]] = attributes[attribute];
      } else {
        currentValue[attribute] = attributes[attribute];
      }
      return currentValue;
    }, {});
  };
  var withAttributes = function withAttributes(EnhancedComponent) {
    return function WebformElementWithAttributes(props) {
      var _props$element$Attri, _props$fieldProps, _props$element$Label, _props$labelProps, _props$element$Wrapp, _props$wrapperProps;
      var normalizedFieldAttributes = normalizeAttributes((_props$element$Attri = props.element['#attributes']) != null ? _props$element$Attri : {});
      var field = _extends({}, normalizedFieldAttributes, (_props$fieldProps = props.fieldProps) != null ? _props$fieldProps : {});
      if (field['style']) {
        field['style'] = cssStringToObject(field['style']);
      }
      var normalizedLabelAttributes = normalizeAttributes((_props$element$Label = props.element['#label_attributes']) != null ? _props$element$Label : {});
      var label = _extends({}, normalizedLabelAttributes, (_props$labelProps = props.labelProps) != null ? _props$labelProps : {});
      if (label['style']) {
        label['style'] = cssStringToObject(label['style']);
      }
      var normalizedWrapperAttributes = normalizeAttributes((_props$element$Wrapp = props.element['#wrapper_attributes']) != null ? _props$element$Wrapp : {});
      var wrapper = _extends({}, normalizedWrapperAttributes, (_props$wrapperProps = props.wrapperProps) != null ? _props$wrapperProps : {});
      if (wrapper['style']) {
        wrapper['style'] = cssStringToObject(wrapper['style']);
      }
      return /*#__PURE__*/jsxRuntime.jsx(EnhancedComponent, _extends({}, props, {
        fieldProps: field,
        labelProps: label,
        wrapperProps: wrapper
      }));
    };
  };

  var getDependencies = function getDependencies(states) {
    if (!states || Object.keys(states).includes('headers')) {
      return [];
    }
    var dependencies = [];
    for (var _i = 0, _Object$keys = Object.keys(states); _i < _Object$keys.length; _i++) {
      var effect = _Object$keys[_i];
      // Loop through indexes or selectors.
      for (var _i2 = 0, _Object$keys2 = Object.keys(states[effect]); _i2 < _Object$keys2.length; _i2++) {
        var indexOrSelector = _Object$keys2[_i2];
        // If indexOrSelector is not an index, then ALL conditions must be true
        // for the attribute to take effect.
        if (isNaN(Number(indexOrSelector))) {
          var elementName = getElementName(indexOrSelector);
          dependencies.push(elementName);
        } else if (states[effect][indexOrSelector] !== 'or' && states[effect][indexOrSelector] !== 'xor') {
          var selectorString = Object.keys(states[effect][indexOrSelector])[0];
          var _elementName = getElementName(selectorString);
          dependencies.push(_elementName);
        }
      }
    }
    return dependencies;
  };
  // Returns substring with the element selector.
  function getElementName(string) {
    var match = string.match(/\[name=["|']([A-z][A-z\d-_.:]*)["|']\]$/);
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
            var re = new RegExp(trigger['value']['pattern']);
            return re.test(value);
          }
        case '!pattern':
          {
            if (typeof value !== 'string') {
              return false;
            }
            var _re = new RegExp(trigger['value']['pattern']);
            return !_re.test(value);
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
            var betweenValues = trigger['value']['between'];
            var min = betweenValues.substring(0, betweenValues.indexOf(':'));
            var max = betweenValues.substring(betweenValues.indexOf(':'), betweenValues.length - 1);
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
  var getStateConditions = function getStateConditions(states, data) {
    var allConditionsForTrue = {};
    var anyConditionForTrue = {};
    var oneConditionForTrue = {};
    var webformStates;
    if (states && !Object.keys(states).includes('headers')) {
      webformStates = states;
      for (var _i3 = 0, _Object$keys3 = Object.keys(webformStates); _i3 < _Object$keys3.length; _i3++) {
        var effect = _Object$keys3[_i3];
        allConditionsForTrue[effect] = {};
        anyConditionForTrue[effect] = {};
        oneConditionForTrue[effect] = {};
        // Loop through indexes or selectors.
        for (var _i4 = 0, _Object$keys4 = Object.keys(webformStates[effect]); _i4 < _Object$keys4.length; _i4++) {
          var indexOrSelector = _Object$keys4[_i4];
          // If indexOrSelector is not an index, then ALL conditions must be true
          // for the attribute to take effect.
          if (isNaN(Number(indexOrSelector))) {
            var _data$elementName;
            var elementName = getElementName(indexOrSelector);
            if (Object.prototype.hasOwnProperty.call(data, elementName) && typeof data[elementName] !== 'string' && typeof data[elementName] !== 'boolean') {
              console.warn("Unexpected type \"" + typeof data[elementName] + "\" for element \"" + elementName + "\"");
              continue;
            }
            allConditionsForTrue[effect][elementName] = getConditionState(webformStates[effect][indexOrSelector], (_data$elementName = data[elementName]) != null ? _data$elementName : undefined);
          } else if (webformStates[effect][indexOrSelector] !== 'or' && webformStates[effect][indexOrSelector] !== 'xor') {
            var selectorString = Object.keys(webformStates[effect][indexOrSelector])[0];
            var _elementName2 = getElementName(selectorString);
            var trigger = Object.values(webformStates[effect][indexOrSelector])[0];
            if (Object.prototype.hasOwnProperty.call(data, _elementName2) && typeof data[_elementName2] !== 'string' && typeof data[_elementName2] !== 'boolean') {
              console.warn("Unexpected type \"" + typeof data[_elementName2] + "\" for element \"" + _elementName2 + "\"");
              continue;
            }
            if (Object.values(webformStates[effect]).includes('or')) {
              var _data$_elementName;
              anyConditionForTrue[effect][_elementName2] = getConditionState(trigger, (_data$_elementName = data[_elementName2]) != null ? _data$_elementName : undefined);
            } else if (Object.values(webformStates[effect]).includes('xor')) {
              var _data$_elementName2;
              oneConditionForTrue[effect][_elementName2] = getConditionState(trigger, (_data$_elementName2 = data[_elementName2]) != null ? _data$_elementName2 : undefined);
            }
          }
        }
      }
    }
    return {
      allConditionsForTrue: allConditionsForTrue,
      anyConditionForTrue: anyConditionForTrue,
      oneConditionForTrue: oneConditionForTrue,
      webformStates: webformStates
    };
  };
  var getEffect = function getEffect(effect) {
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
  var getStatesForData = function getStatesForData(states, data) {
    // Initialize the list of conditions and set whether they are true or not.
    var _getStateConditions = getStateConditions(states, data),
      allConditionsForTrue = _getStateConditions.allConditionsForTrue,
      anyConditionForTrue = _getStateConditions.anyConditionForTrue,
      oneConditionForTrue = _getStateConditions.oneConditionForTrue,
      webformStates = _getStateConditions.webformStates;
    if (!webformStates || Object.keys(webformStates).length === 0 || !Object.keys(webformStates)[0].length) {
      return;
    }
    var effects = {};
    // Set the state accordingly based on our list of conditions.
    for (var _i5 = 0, _Object$keys5 = Object.keys(webformStates); _i5 < _Object$keys5.length; _i5++) {
      var effect = _Object$keys5[_i5];
      // Check if EVERY condition is true.
      if (Object.keys(allConditionsForTrue[effect]).length && Object.values(allConditionsForTrue[effect]).every(function (value) {
        return value === true;
      })) {
        Object.assign(effects, getEffect(effect));
        // Check if ANY condition is true (OR).
      } else if (Object.keys(anyConditionForTrue[effect]).length && Object.values(anyConditionForTrue[effect]).includes(true)) {
        Object.assign(effects, getEffect(effect));
        // Check if ONE condition is true (XOR).
      } else if (Object.keys(oneConditionForTrue[effect]).length) {
        var filterByTrue = Object.values(oneConditionForTrue[effect]).filter(function (item) {
          return item == true;
        });
        if (filterByTrue.length == 1) {
          Object.assign(effects, getEffect(effect));
        } else {
          var falseEffect = '!' + effect;
          Object.assign(effects, getEffect(falseEffect));
        }
      } else {
        var _falseEffect = '!' + effect;
        Object.assign(effects, getEffect(_falseEffect));
      }
    }
    return effects;
  };
  // Higher order component to handle the conditional logic for Webform elements.
  var withStates = function withStates(WrappedComponent) {
    return function WebformElementWithStates(props) {
      var _useState = React.useState({}),
        state = _useState[0],
        setState = _useState[1];
      var _useContext = React.useContext(WebformContext),
        data = _useContext.data;
      var element = props.element;
      // Multi-value elements don't have #states in its render array so we need to use #_webform_states.
      var elementStates = element['add'] ? element['#_webform_states'] : element['#states'];
      var dependencyElements = getDependencies(elementStates);
      React.useEffect(function () {
        setState(getStatesForData(elementStates, data));
      }, []);
      React.useEffect(function () {
        setState(getStatesForData(elementStates, data));
      }, dependencyElements.map(function (key) {
        return data[key];
      }));
      // Override element object with the dynamic states.
      return /*#__PURE__*/jsxRuntime.jsx(WrappedComponent, _extends({}, props, {
        element: _extends({}, element, state)
      }));
    };
  };

  var _excluded$3 = ["children", "label", "labelProps", "labelFor", "isRequired", "description", "descriptionDisplay", "descriptionProps", "labelDisplay", "error", "access"];
  var WebformElementWrapper = function WebformElementWrapper(_ref) {
    var children = _ref.children,
      label = _ref.label,
      _ref$labelProps = _ref.labelProps,
      labelProps = _ref$labelProps === void 0 ? {} : _ref$labelProps,
      labelFor = _ref.labelFor,
      isRequired = _ref.isRequired,
      description = _ref.description,
      descriptionDisplay = _ref.descriptionDisplay,
      _ref$descriptionProps = _ref.descriptionProps,
      descriptionProps = _ref$descriptionProps === void 0 ? {} : _ref$descriptionProps,
      _ref$labelDisplay = _ref.labelDisplay,
      labelDisplay = _ref$labelDisplay === void 0 ? 'before' : _ref$labelDisplay,
      error = _ref.error,
      access = _ref.access,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$3);
    var css = "\n.required-field:after {\n  content: ' *';\n  color: red;\n}\n.invalid-feedback {\n  color: red;\n}\n.visually-hidden {\n  position: absolute !important;\n  clip: rect(1px, 1px, 1px, 1px);\n  overflow: hidden;\n  height: 1px;\n  width: 1px;\n  word-wrap: normal;\n}\n        ";
    var labelClasses = classNames__default["default"](labelProps['className'], {
      'required-field': isRequired,
      'visually-hidden': labelDisplay === 'invisible'
    });
    var descriptionClasses = classNames__default["default"](descriptionProps['className'], {
      'visually-hidden': descriptionDisplay === 'invisible'
    });
    var labelElement = /*#__PURE__*/jsxRuntime.jsx("label", _extends({}, labelProps, {
      className: labelClasses,
      htmlFor: labelFor,
      children: label
    }));
    return access ? /*#__PURE__*/jsxRuntime.jsxs("div", _extends({}, props, {
      children: [/*#__PURE__*/jsxRuntime.jsx("style", {
        suppressHydrationWarning: true,
        children: css
      }), !['after', 'none'].includes(labelDisplay) && labelElement, descriptionDisplay === 'before' && description && /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, descriptionProps, {
        children: description
      })), children, (descriptionDisplay === 'after' || descriptionDisplay === 'invisible') && description && /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, descriptionProps, {
        className: descriptionClasses,
        children: description
      })), labelDisplay === 'after' && labelElement, error && /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "invalid-feedback",
        children: error
      })]
    })) : null;
  };

  var _excluded$2 = ["children", "label", "labelProps", "labelDisplay", "labelFor", "description", "descriptionDisplay", "descriptionProps", "isRequired", "error", "access"];
  var WebformFieldsetWrapper = function WebformFieldsetWrapper(_ref) {
    var children = _ref.children,
      label = _ref.label,
      _ref$labelProps = _ref.labelProps,
      labelProps = _ref$labelProps === void 0 ? {} : _ref$labelProps,
      description = _ref.description,
      descriptionDisplay = _ref.descriptionDisplay,
      _ref$descriptionProps = _ref.descriptionProps,
      descriptionProps = _ref$descriptionProps === void 0 ? {} : _ref$descriptionProps,
      isRequired = _ref.isRequired,
      error = _ref.error,
      access = _ref.access,
      props = _objectWithoutPropertiesLoose(_ref, _excluded$2);
    var css = "\n.required-field:after {\n  content: ' *';\n  color: red;\n}\n.invalid-feedback {\n  color: red;\n}\n.visually-hidden {\n  position: absolute !important;\n  clip: rect(1px, 1px, 1px, 1px);\n  overflow: hidden;\n  height: 1px;\n  width: 1px;\n  word-wrap: normal;\n}\n        ";
    var labelClasses = classNames__default["default"](labelProps['className'], {
      'required-field': isRequired
    });
    var descriptionClasses = classNames__default["default"](descriptionProps['className'], {
      'visually-hidden': descriptionDisplay === 'invisible'
    });
    var labelElement = /*#__PURE__*/jsxRuntime.jsx("legend", _extends({}, labelProps, {
      className: labelClasses,
      children: label
    }));
    return access ? /*#__PURE__*/jsxRuntime.jsxs("fieldset", _extends({}, props, {
      children: [/*#__PURE__*/jsxRuntime.jsx("style", {
        suppressHydrationWarning: true,
        children: css
      }), labelElement, descriptionDisplay === 'before' && description && /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, descriptionProps, {
        className: descriptionClasses,
        children: description
      })), children, (descriptionDisplay === 'after' || descriptionDisplay === 'invisible') && description && /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, descriptionProps, {
        className: descriptionClasses,
        children: description
      })), error && /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "invalid-feedback",
        children: error
      })]
    })) : null;
  };

  var withWrapper = function withWrapper(EnhancedComponent, customConfig) {
    if (customConfig === void 0) {
      customConfig = {};
    }
    return function WebformElementWithWrapper(props) {
      var element = props.element,
        error = props.error;
      var config = _extends({
        defaultWrapperType: 'form_element',
        displayErrors: true,
        labelFor: function labelFor(element) {
          return element['#id'];
        },
        labelProps: {},
        wrapperProps: {}
      }, typeof customConfig === 'function' ? customConfig(element) : customConfig);
      var labelFor = config.labelFor,
        defaultWrapperType = config.defaultWrapperType,
        displayErrors = config.displayErrors;
      // Apply wrapper type based on render array, otherwise use the default
      // value.
      var wrapperType = element['#wrapper_type'] ? element['#wrapper_type'] : defaultWrapperType;
      // Label is only configurable for `form_element` wrappers because:
      //   - `legend` is a required child of `fieldset`.
      //   - `container` type is specifically used for not rendering the label.
      var labelDisplay = wrapperType === 'form_element' && element['#title'] ? element['#title_display'] : 'none';
      // Only render errors that are tied to the current element by checking if
      // the curent error is a string or React element.
      var hasValidError = typeof error === 'string' || /*#__PURE__*/React__namespace.isValidElement(error);
      var WrapperComponent = wrapperType !== 'fieldset' ? WebformElementWrapper : WebformFieldsetWrapper;
      // Allow components to retrieve the `labelFor` property value from the element.
      var getLabel = function getLabel() {
        if (typeof labelFor === 'function') {
          return labelFor(element);
        }
        return;
      };
      // Allow overriding label and wrapper props.
      var labelProps = _extends({}, props.labelProps, config.labelProps);
      var wrapperProps = _extends({}, props.wrapperProps, config.wrapperProps);
      return /*#__PURE__*/jsxRuntime.jsx(WrapperComponent, _extends({
        label: element['#title'],
        isRequired: element['#required'],
        access: element['#access'],
        labelDisplay: labelDisplay,
        error: displayErrors && hasValidError ? error : undefined,
        labelProps: labelProps,
        description: element['#description'] ? /*#__PURE__*/jsxRuntime.jsx("div", {
          dangerouslySetInnerHTML: {
            __html: element['#description']['#markup']
          }
        }) : undefined,
        descriptionDisplay: element['#description_display']
      }, wrapperProps, {
        labelFor: labelDisplay !== 'none' ? getLabel() : undefined,
        children: /*#__PURE__*/jsxRuntime.jsx(EnhancedComponent, _extends({}, props))
      }));
    };
  };

  var WebformAutocomplete = function WebformAutocomplete(_ref) {
    var element = _ref.element,
      setValue = _ref.setValue,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      fieldProps = _ref.fieldProps;
    var _useState = React.useState({}),
      autocompleteOptions = _useState[0],
      setAutocompleteOptions = _useState[1];
    var _useState2 = React.useState(null),
      autocompleteValue = _useState2[0],
      setAutocompleteValue = _useState2[1];
    var webform = React.useContext(WebformContext);
    React.useEffect(function () {
      var resolveAsyncAutocompleteItems = function resolveAsyncAutocompleteItems() {
        try {
          var url = webform.apiUrl + "?op=autocomplete_options&id=" + webform.id + "&options_id=" + element['#autocomplete_items'];
          return Promise.resolve(fetch(url)).then(function (response) {
            var _exit;
            function _temp2(_result) {
              return _exit ? _result : Promise.resolve(response.json()).then(function (_response$json2) {
                setAutocompleteOptions(_response$json2);
              });
            }
            var _temp = function () {
              if (!response.ok) {
                return Promise.resolve(response.json()).then(function (_response$json) {
                  throw Error(_response$json.message.message);
                });
              }
            }();
            return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      };
      if (Array.isArray(element['#autocomplete_items'])) {
        setAutocompleteOptions(element['#autocomplete_items'].reduce(function (currentValue, item) {
          currentValue[item] = item;
          return currentValue;
        }, {}));
      } else if (typeof element['#autocomplete_items'] === 'string') {
        resolveAsyncAutocompleteItems();
      } else {
        console.warn("Unsupported autocomplete type on element " + element['#name'] + ".");
      }
    }, [element['#autocomplete_items']]);
    var onChangeHandler = function onChangeHandler(e) {
      try {
        if (autocompleteOptions[e.target.value]) {
          setValue(e.target.value);
        } else {
          setValue('');
        }
        setAutocompleteValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    // Update component state when value changes in upstream state.
    React.useEffect(function () {
      setAutocompleteValue(value);
    }, [value]);
    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("input", _extends({
        type: "text",
        name: element['#webform_key'],
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
        disabled: element['#disabled'],
        hidden: !element['#access'],
        required: element['#required'],
        readOnly: element['#readonly'],
        value: autocompleteValue != null ? autocompleteValue : value
      }, fieldProps, {
        id: "" + element['#id'],
        list: element['#webform_key'] + "-datalist"
      })), /*#__PURE__*/jsxRuntime.jsx("datalist", {
        id: element['#webform_key'] + "-datalist",
        children: Object.keys(autocompleteOptions).map(function (item, i) {
          return /*#__PURE__*/jsxRuntime.jsx("option", {
            value: item,
            children: autocompleteOptions[item]
          }, i);
        })
      })]
    });
  };
  var WebformAutocomplete$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformAutocomplete))));

  var supportedTypes$1 = {
    number: 'number',
    hidden: 'hidden',
    email: 'email',
    search: 'search',
    tel: 'tel',
    url: 'url',
    textfield: 'text'
  };
  var WebformText = function WebformText(_ref) {
    var _supportedTypes$eleme;
    var element = _ref.element,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps;
    if (!(element['#type'] in supportedTypes$1)) {
      console.warn(element['#type'] + " which was used on " + element['#webform_key'] + " is not supported by WebformText.");
    }
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("input", _extends({
        type: (_supportedTypes$eleme = supportedTypes$1[element['#type']]) != null ? _supportedTypes$eleme : element['#type'],
        name: element['#name'],
        value: value,
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
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

  var WebformSelect = function WebformSelect(_ref) {
    var element = _ref.element,
      setValue = _ref.setValue,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      fieldProps = _ref.fieldProps;
    var _useState = React.useState(false),
      showOther = _useState[0],
      setShowOther = _useState[1];
    // Used to get the options for select other elements that have the options nested one level deeper.
    function getOptions() {
      var options = {};
      for (var _i = 0, _Object$keys = Object.keys(element); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        if (key == 'select') {
          options = element[key];
        }
      }
      return options;
    }
    var optionsForOther = element['#type'] === 'webform_select_other' ? getOptions() : null;
    var onChangeHandler = function onChangeHandler(e) {
      try {
        if (e.target.value == 'Other') {
          setShowOther(!showOther);
        } else if (showOther) {
          setShowOther(!showOther);
          setValue(e.target.value);
        } else {
          setValue(e.target.value);
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    var onInputHandler = function onInputHandler(e) {
      try {
        setValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    function sortOptions(options) {
      var arr = [];
      var title;
      for (var _i2 = 0, _Object$keys2 = Object.keys(options); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];
        if (key.length) {
          arr.push(options[key]);
        } else {
          title = options[key];
        }
      }
      arr.unshift(title);
      return arr;
    }
    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsxs("select", _extends({
        name: element['#name'],
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
        value: value,
        disabled: element['#disabled'],
        hidden: !element['#access'],
        required: element['#required']
      }, fieldProps, {
        id: element['#id'],
        children: [element['#webform_plugin_id'] == 'select' || typeof element['#webform_plugin_id'] === 'undefined' && element['#type'] !== 'webform_select_other' ? sortOptions(element['#options']).map(function (option, index) {
          return /*#__PURE__*/jsxRuntime.jsx("option", {
            value: option,
            children: option
          }, index);
        }) : null, element['#webform_plugin_id'] == 'webform_entity_select' ? Object.keys(element['#options']).map(function (entityId) {
          var entityName = element['#options'][entityId];
          return /*#__PURE__*/jsxRuntime.jsx("option", {
            value: entityId,
            children: entityName
          }, entityId);
        }) : null, element['#type'] === 'webform_select_other' && optionsForOther['#options'] ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [Object.values(optionsForOther['#options']).map(function (option, index) {
            if (option != 'Other…') {
              return /*#__PURE__*/jsxRuntime.jsx("option", {
                value: option.toString(),
                children: option
              }, index);
            }
          }), /*#__PURE__*/jsxRuntime.jsx("option", {
            value: "Other",
            children: "Other..."
          })]
        }) : null]
      })), showOther ? /*#__PURE__*/jsxRuntime.jsx("input", {
        type: "text",
        id: element['#webform_key'],
        name: element['#webform_key'],
        onInput: function onInput(e) {
          return onInputHandler(e);
        },
        value: value
      }) : null]
    });
  };
  var WebformSelect$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformSelect))));

  var WebformTextArea = function WebformTextArea(_ref) {
    var element = _ref.element,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps;
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("textarea", _extends({
        name: element['#webform_key'],
        value: value,
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
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

  var ComponentRegistry = function ComponentRegistry(registry) {
    var _this = this;
    if (registry === void 0) {
      registry = {};
    }
    this._registry = void 0;
    // get a component by id, if not available we return null
    this.getComponent = function (key) {
      var _this$_registry$get;
      return (_this$_registry$get = _this._registry.get(key)) != null ? _this$_registry$get : null;
    };
    this.setComponent = function (key, component) {
      _this._registry.set(key, component);
    };
    this._registry = new Map();
    Object.keys(registry).forEach(function (key) {
      _this._registry.set(key, registry[key]);
    });
  };

  var WebformDebug = function WebformDebug(_ref) {
    var element = _ref.element,
      error = _ref.error;
    return /*#__PURE__*/jsxRuntime.jsxs("code", {
      children: [error, /*#__PURE__*/jsxRuntime.jsx("pre", {
        children: JSON.stringify(element, null, 2)
      })]
    });
  };

  var WebformElement = function WebformElement(props) {
    var _useContext = React.useContext(WebformContext),
      registry = _useContext.registry;
    var element = props.element,
      error = props.error;
    // Render using custom component if provided:
    if (registry.getComponent(element['#type'])) {
      var CustomComponent = registry.getComponent(element['#type']);
      return /*#__PURE__*/jsxRuntime.jsx(CustomComponent, _extends({}, props));
    } else {
      return /*#__PURE__*/jsxRuntime.jsx(WebformDebug, {
        element: element,
        error: error
      });
    }
  };

  var WebformMultifield = function WebformMultifield(_ref) {
    var element = _ref.element,
      value = _ref.value,
      _setValue = _ref.setValue,
      error = _ref.error,
      _ref$tableProps = _ref.tableProps,
      tableProps = _ref$tableProps === void 0 ? {} : _ref$tableProps,
      _ref$trProps = _ref.trProps,
      trProps = _ref$trProps === void 0 ? {} : _ref$trProps,
      _ref$tdProps = _ref.tdProps,
      tdProps = _ref$tdProps === void 0 ? {} : _ref$tdProps;
    var normalizedValue = Array.isArray(value) ? value : [];
    var isCustomComposite = element['#type'] === 'webform_custom_composite';
    var remove = function remove(item) {
      if (!isIterable(value)) {
        throw new TypeError("\"" + typeof value + "\" is not iterable");
      }
      var newValue = [].concat(value);
      newValue.splice(item, 1);
      _setValue(newValue);
    };
    var renderChildElement = function renderChildElement(item, childElement, childKey) {
      if (childKey === void 0) {
        childKey = null;
      }
      var parents = [].concat(element['#parents'], ['items', item, '_item_']);
      var currentElement = element.items[item] ? _extends({}, childElement, {
        '#access': element['#access'],
        '#states': element['#_webform_states'],
        '#parents': parents
      }) : _extends({}, childElement, {
        '#default_value': undefined,
        '#access': element['#access'],
        '#states': element['#_webform_states'],
        '#parents': parents
      });
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: currentElement,
        setValue: function setValue(newChildValue) {
          var newValue = Array.from(normalizedValue);
          if (childKey) {
            newValue[item][childKey] = newChildValue;
          } else {
            newValue[item] = newChildValue;
          }
          _setValue(newValue);
        },
        value: childKey ? normalizedValue[item][childKey] : normalizedValue[item],
        error: error ? error[item] : null
      }, currentElement['#id']);
    };
    var renderChildren = function renderChildren(item) {
      var compositeElements = getChildElements(element['#element']);
      var index = element.items[item] ? item : 0;
      if (Array.isArray(compositeElements) && compositeElements.length) {
        return compositeElements.map(function (childKey) {
          // If 'Display in table columns' is unchecked in Drupal then the elements are
          // under the '_items_' key.
          var resolvedElement = element.items[index]['_item_'] ? resolvePath("items." + index + "._item_." + childKey, element) : resolvePath("items." + index + "." + childKey, element);
          var currentElement = _extends({}, resolvedElement, {
            '#webform_key': childKey,
            '#id': resolvedElement['#id'] + "[" + item + "]"
          });
          var elementItem = JSON.parse(JSON.stringify(currentElement));
          updateNameAndIdWithIndex(item, elementItem);
          return renderChildElement(item, elementItem, childKey);
        });
      } else {
        var childElement = _extends({}, element.items[index]['_item_'], {
          '#webform_key': element.items[index]['_item_']['#webform_key'] + "[" + item + "]",
          '#id': element.items[index]['_item_']['#webform_key'] + "[" + item + "]"
        });
        return renderChildElement(item, childElement);
      }
    };
    var maxItems = element['#cardinality'];
    var currentCount = normalizedValue.length;
    React.useEffect(function () {
      if (currentCount === 0) {
        // Multifield is responsible for setting the default value to the state
        // when the default value is an array. If the value is something else than
        // array, it is the responsibility of the child element to ensure that the
        // element data is initialized with the correct default value.
        if (element['#default_value'] && Array.isArray(element['#default_value'])) {
          _setValue(element['#default_value']);
        } else {
          _setValue(['']);
        }
      }
    }, []);
    var children = [];
    var _loop = function _loop(i) {
      var removeButton = _extends({}, element.items[0]['_operations_']['remove'], {
        '#type': 'button',
        '#value': 'Remove',
        "#attributes": {
          "class": ["webform-button--remove"]
        }
      });
      children.push( /*#__PURE__*/jsxRuntime.jsxs("tr", _extends({}, trProps, {
        children: [/*#__PURE__*/jsxRuntime.jsx("td", _extends({}, tdProps, {
          children: renderChildren(i)
        })), /*#__PURE__*/jsxRuntime.jsx("td", _extends({}, tdProps, {
          children: /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
            element: removeButton,
            fieldProps: {
              onClick: function onClick(e) {
                e.preventDefault();
                remove(i);
              },
              id: element['#webform_key'] + "-remove-btn-" + i
            }
          })
        }))]
      }), i));
    };
    for (var i = 0; i < currentCount; i++) {
      _loop(i);
    }
    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("table", _extends({
        style: {
          width: '100%'
        }
      }, tableProps, {
        children: /*#__PURE__*/jsxRuntime.jsx("tbody", {
          children: children
        })
      })), (currentCount < maxItems || !maxItems) && /*#__PURE__*/jsxRuntime.jsx("div", {
        children: /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
          element: _extends({}, element['add']['submit'], {
            '#type': 'button',
            "#attributes": {
              "class": ["webform-button--add"]
            }
          }),
          fieldProps: {
            onClick: function onClick(e) {
              e.preventDefault();
              normalizedValue.push(isCustomComposite ? {} : '');
              _setValue(normalizedValue);
            },
            id: element['#webform_key'] + "-add-btn"
          }
        })
      })]
    });
  };
  var WebformMultifield$1 = withStates(withAttributes(withWrapper(WebformMultifield, {
    labelFor: false
  })));

  var WebformComposite = function WebformComposite(_ref) {
    var element = _ref.element,
      error = _ref.error,
      value = _ref.value,
      _setValue = _ref.setValue;
    var compositeElements = getChildElements(element);
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: compositeElements.map(function (name) {
        return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
          element: _extends({
            // Ensure that all child elements have '#webform_key' and '#states' defined.
            '#webform_key': element['#webform_key'],
            '#states': element['#states']
          }, element[name], {
            '#id': element['#webform_multiple'] ? "" + element[name]['#id'] + getIndexOfMultiValue(element['#webform_key']) : element[name]['#id']
          }),
          value: value && value[name] ? value[name] : '',
          setValue: function setValue(newValue) {
            var _extends2;
            _setValue(_extends({}, value, (_extends2 = {}, _extends2[name] = newValue, _extends2)));
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

  var WebformContainer = function WebformContainer(_ref) {
    var element = _ref.element,
      fieldProps = _ref.fieldProps;
    var _useContext = React.useContext(WebformContext),
      data = _useContext.data,
      setData = _useContext.setData,
      errors = _useContext.errors;
    var childElements = getChildElements(element).map(function (key) {
      var parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: parentAndChildStates ? _extends({}, element[key], {
          '#states': parentAndChildStates
        }) : element[key],
        error: errors[element[key]['#webform_key']],
        value: data[element[key]['#webform_key']],
        setValue: function setValue(value) {
          setData(function (previousData) {
            var _extends2;
            return _extends({}, previousData, (_extends2 = {}, _extends2[element[key]['#webform_key']] = value, _extends2));
          });
        }
      }, element[key]['#webform_key']);
    });
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, fieldProps, {
        children: childElements
      }))
    });
  };
  var WebformContainer$1 = withStates(withAttributes(withWrapper(WebformContainer, {
    defaultWrapperType: 'container'
  })));

  var WebformFlexboxLayout = function WebformFlexboxLayout(_ref) {
    var element = _ref.element,
      _ref$itemProps = _ref.itemProps,
      itemProps = _ref$itemProps === void 0 ? {} : _ref$itemProps;
    var _useContext = React.useContext(WebformContext),
      data = _useContext.data,
      setData = _useContext.setData,
      errors = _useContext.errors;
    var itemPropsWithDefaults = _extends({
      style: {
        flexGrow: 1
      }
    }, itemProps);
    var childElements = getChildElements(element).map(function (key) {
      var parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
      return /*#__PURE__*/React.createElement("div", _extends({}, itemPropsWithDefaults, {
        key: element[key]['#webform_key']
      }), /*#__PURE__*/jsxRuntime.jsx("div", {
        children: /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
          element: parentAndChildStates ? _extends({}, element[key], {
            '#states': parentAndChildStates
          }) : element[key],
          error: errors[element[key]['#webform_key']],
          value: data[element[key]['#webform_key']],
          setValue: function setValue(value) {
            setData(function (previousData) {
              var _extends2;
              return _extends({}, previousData, (_extends2 = {}, _extends2[element[key]['#webform_key']] = value, _extends2));
            });
          }
        })
      }, element[key]['#webform_key']));
    });
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: childElements
    });
  };
  var WebformFlexboxLayout$1 = withStates(withWrapper(WebformFlexboxLayout, function (element) {
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

  var WebformFieldset = function WebformFieldset(_ref) {
    var element = _ref.element;
    var _useContext = React.useContext(WebformContext),
      data = _useContext.data,
      setData = _useContext.setData,
      errors = _useContext.errors;
    var childElements = getChildElements(element).map(function (key) {
      var parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: parentAndChildStates ? _extends({}, element[key], {
          '#states': parentAndChildStates
        }) : element[key],
        error: errors[element[key]['#webform_key']],
        value: data[element[key]['#webform_key']],
        setValue: function setValue(value) {
          setData(function (previousData) {
            var _extends2;
            return _extends({}, previousData, (_extends2 = {}, _extends2[element[key]['#webform_key']] = value, _extends2));
          });
        }
      }, element[key]['#webform_key']);
    });
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: childElements
    });
  };
  var WebformFieldset$1 = withStates(withWrapper(WebformFieldset, {
    defaultWrapperType: 'fieldset'
  }));

  var WebformSection = function WebformSection(_ref) {
    var element = _ref.element,
      error = _ref.error,
      labelProps = _ref.labelProps,
      fieldProps = _ref.fieldProps,
      _ref$wrapperProps = _ref.wrapperProps,
      wrapperProps = _ref$wrapperProps === void 0 ? {} : _ref$wrapperProps;
    var _useContext = React.useContext(WebformContext),
      data = _useContext.data,
      setData = _useContext.setData,
      errors = _useContext.errors;
    var childElements = getChildElements(element).map(function (key) {
      // Pass down the parent states down to the child elements. The parent state
      // will override the child state if there are any duplicate effects.
      var parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: parentAndChildStates ? _extends({}, element[key], {
          '#states': parentAndChildStates
        }) : element[key],
        error: errors[element[key]['#webform_key']],
        value: data[element[key]['#webform_key']],
        setValue: function setValue(value) {
          setData(function (previousData) {
            var _extends2;
            return _extends({}, previousData, (_extends2 = {}, _extends2[element[key]['#webform_key']] = value, _extends2));
          });
        }
      }, element[key]['#webform_key']);
    });
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, _extends({
      label: element['#title'],
      isRequired: element['#required'],
      labelDisplay: element['#title_display'],
      access: element['#access'],
      settings: null,
      error: error,
      labelProps: labelProps
    }, wrapperProps, {
      children: /*#__PURE__*/jsxRuntime.jsx("section", _extends({}, fieldProps, {
        style: fieldProps['style'],
        children: childElements
      }))
    }));
  };
  var WebformSection$1 = withStates(withAttributes(WebformSection));

  var _excluded$1 = ["data"];
  var WebformTable = function WebformTable(_ref) {
    var element = _ref.element,
      error = _ref.error,
      _ref$wrapperProps = _ref.wrapperProps,
      wrapperProps = _ref$wrapperProps === void 0 ? {} : _ref$wrapperProps,
      _ref$fieldProps = _ref.fieldProps,
      fieldProps = _ref$fieldProps === void 0 ? {} : _ref$fieldProps,
      _ref$theadProps = _ref.theadProps,
      theadProps = _ref$theadProps === void 0 ? {} : _ref$theadProps,
      _ref$tbodyProps = _ref.tbodyProps,
      tbodyProps = _ref$tbodyProps === void 0 ? {} : _ref$tbodyProps,
      _ref$trProps = _ref.trProps,
      trProps = _ref$trProps === void 0 ? {} : _ref$trProps,
      _ref$tdProps = _ref.tdProps,
      tdProps = _ref$tdProps === void 0 ? {} : _ref$tdProps,
      labelProps = _ref.labelProps;
    var childElements = getChildElements(element).map(function (row) {
      if (element[row]['#type'] !== 'webform_table_row') {
        return /*#__PURE__*/jsxRuntime.jsx("tr", {
          children: /*#__PURE__*/jsxRuntime.jsx("td", {
            children: /*#__PURE__*/jsxRuntime.jsxs("div", {
              children: ["The form element ", /*#__PURE__*/jsxRuntime.jsx("em", {
                children: row
              }), " is not inside a table row. To render the form element, it must be placed inside a table row."]
            })
          })
        }, row);
      }
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: _extends({}, element[row], {
          '#states': element['#states']
        }),
        fieldProps: trProps,
        tdProps: tdProps
      }, row);
    });
    var headers = element['#header'];
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, _extends({
      label: element['#title'],
      isRequired: element['#required'],
      labelDisplay: element['#title_display'],
      access: element['#access'],
      settings: null,
      error: error,
      labelProps: labelProps
    }, wrapperProps, {
      children: /*#__PURE__*/jsxRuntime.jsxs("table", _extends({}, fieldProps, {
        children: [/*#__PURE__*/jsxRuntime.jsx("thead", _extends({}, theadProps, {
          children: /*#__PURE__*/jsxRuntime.jsx("tr", _extends({}, trProps, {
            children: headers && headers.length ? headers.map(function (header, index) {
              var data = header.data,
                attributes = _objectWithoutPropertiesLoose(header, _excluded$1);
              return /*#__PURE__*/React.createElement("th", _extends({}, normalizeAttributes(attributes), {
                key: index
              }), data['#markup']);
            }) : null
          }))
        })), /*#__PURE__*/jsxRuntime.jsx("tbody", _extends({}, tbodyProps, {
          children: childElements
        }))]
      }))
    }));
  };
  var WebformTable$1 = withStates(withAttributes(WebformTable));

  var WebformRange = function WebformRange(_ref) {
    var element = _ref.element,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps;
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    var styles = {
      below: {
        transform: "translateX(" + value + "px)",
        display: 'block',
        position: 'absolute',
        padding: '2px 5px',
        textAlign: 'center',
        border: '1px solid #bbb',
        background: '#ededed'
      },
      above: {
        transform: "translateX(" + value + "px)",
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
    var outputElement = /*#__PURE__*/jsxRuntime.jsx("output", {
      htmlFor: element['#id'],
      style: styles[element['#output']],
      name: "result",
      children: value
    });
    return /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "form-type-range",
      style: {
        display: 'block',
        position: 'relative'
      },
      children: [element['#output'] && element['#output'] === 'left' ? outputElement : null, /*#__PURE__*/jsxRuntime.jsx("input", _extends({
        type: element['#type'],
        name: element['#webform_key'],
        min: element['#min'] ? element['#min'] : null,
        max: element['#max'] ? element['#max'] : null,
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
        disabled: element['#disabled'],
        hidden: !element['#access'],
        required: element['#required'],
        readOnly: element['#readonly']
      }, fieldProps, {
        id: element['#id'],
        value: value
      })), element['#output'] && element['#output'] !== 'left' ? outputElement : null]
    });
  };
  var WebformRange$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformRange))));

  var WebformCheckbox = function WebformCheckbox(_ref) {
    var element = _ref.element,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps,
      value = _ref.value;
    if (element['#type'] !== 'checkbox' && element['#type'] !== 'radio') {
      console.warn(element['#type'] + " which was used on " + element['#webform_key'] + " is not supported by WebformCheckbox.");
    }
    var _useState = React.useState(value != null ? value : element['#checked'] ? element['#checked'] : false),
      checkedState = _useState[0],
      setCheckedState = _useState[1];
    // Update component state when value changes in upstream state.
    React.useEffect(function () {
      if (typeof value === 'boolean') {
        setCheckedState(value);
      }
    }, [value]);
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setValue(e.target.checked);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("div", {
        children: /*#__PURE__*/jsxRuntime.jsx("input", _extends({
          type: element['#type'],
          name: element['#name'],
          onChange: function onChange(e) {
            return onChangeHandler(e);
          },
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

  var WebformRating = function WebformRating(_ref) {
    var element = _ref.element,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? 0 : _ref$value,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps;
    var _useState = React.useState(0),
      hover = _useState[0],
      setHover = _useState[1];
    var max = element['#max'] ? element['#max'] : 5;
    var css = "\nbutton {\n  backgroundColor: 'transparent',\n  border: 'none',\n  outline: 'none',\n  cursor: 'pointer',\n}\n.on {\n  color: rgb(14 165 233);\n  }\n.off {\ncolor: #ccc;\n}\n.star-rating {\nfont-size: 2rem;\n}\n}";
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        className: "star-rating",
        children: [/*#__PURE__*/jsxRuntime.jsx("input", _extends({
          defaultValue: value,
          name: element['#webform_key'],
          hidden: true,
          type: "range"
        }, fieldProps, {
          id: element['#webform_key']
        })), /*#__PURE__*/jsxRuntime.jsx("style", {
          suppressHydrationWarning: true,
          children: css
        }), Array(max).fill(0).map(function (star, index) {
          index += 1;
          return /*#__PURE__*/jsxRuntime.jsx("button", {
            type: "button",
            className: index <= (hover || value) ? 'on' : 'off',
            onClick: function onClick() {
              return setValue(index);
            },
            onMouseEnter: function onMouseEnter() {
              return setHover(index);
            },
            onMouseLeave: function onMouseLeave() {
              return setHover(value);
            },
            disabled: element['#disabled'],
            hidden: !element['#access'],
            children: /*#__PURE__*/jsxRuntime.jsx("span", {
              className: "star",
              children: "\u2605"
            })
          }, index);
        })]
      })
    });
  };
  var WebformRating$1 = withStates(withDefaultValue(withWrapper(WebformRating)));

  var WebformEmailConfirm = function WebformEmailConfirm(_ref) {
    var element = _ref.element,
      error = _ref.error,
      setValue = _ref.setValue,
      labelProps = _ref.labelProps,
      value = _ref.value,
      fieldProps = _ref.fieldProps,
      _ref$wrapperProps = _ref.wrapperProps,
      wrapperProps = _ref$wrapperProps === void 0 ? {} : _ref$wrapperProps;
    var _useContext = React.useContext(WebformContext),
      registerField = _useContext.registerField;
    var _useState = React.useState(''),
      email1 = _useState[0],
      setEmail1 = _useState[1];
    var _useState2 = React.useState(''),
      email2 = _useState2[0],
      setEmail2 = _useState2[1];
    React__namespace.useEffect(function () {
      if (element['#parents']) {
        registerField(toKey(element['#parents']), {
          validate: function validate() {
            if (email1 === email2) {
              return;
            }
            return 'The specified email addresses do not match.';
          }
        });
      }
    });
    React.useEffect(function () {
      // Do not reset value from state when value is empty because the value
      // changes into an empty value while typing into the field.
      if (value === '') {
        return;
      }
      setEmail1(value);
      setEmail2(value);
    }, [value]);
    React.useEffect(function () {
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
    var children = getChildElements(element);
    var childElements = children.map(function (name) {
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: _extends({}, element[name], {
          '#states': element['#states']
        }),
        error: error ? error[name] : null,
        value: name === 'mail_1' ? email1 : email2,
        setValue: function setValue(value) {
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
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, _extends({
      isRequired: false,
      labelDisplay: "none",
      error: error,
      access: element['#access']
    }, wrapperProps, {
      children: childElements
    }));
  };
  var WebformEmailConfirm$1 = withStates(withDefaultValue(withAttributes(WebformEmailConfirm)));

  var WebformValue = function WebformValue(_ref) {
    var element = _ref.element,
      error = _ref.error,
      _ref$fieldProps = _ref.fieldProps,
      fieldProps = _ref$fieldProps === void 0 ? {} : _ref$fieldProps,
      _ref$labelProps = _ref.labelProps,
      labelProps = _ref$labelProps === void 0 ? {} : _ref$labelProps,
      _ref$wrapperProps = _ref.wrapperProps,
      wrapperProps = _ref$wrapperProps === void 0 ? {} : _ref$wrapperProps;
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, _extends({
      label: element['#title'],
      isRequired: element['#required'],
      labelDisplay: element['#title_display'],
      access: element['#access'],
      settings: null,
      error: error,
      labelProps: labelProps
    }, wrapperProps, {
      labelFor: element['#webform_key'],
      children: /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, fieldProps, {
        id: element['#webform_key'],
        children: element['#value']
      }))
    }));
  };
  var WebformValue$1 = withStates(WebformValue);

  var Modal = function Modal(props) {
    var css = "\n.modal {\n    width: 500px;\n    background: white;\n    border: 1px solid #ccc;\n    transition: 1.1s ease-out;\n    box-shadow: -2rem 2rem 2rem rgba(0, 0, 0, 0.2);\n    filter: blur(0);\n    transform: translate(-50%, -5%);\n    visibility: visible;\n    position: absolute;\n    opacity: 1;\n    left: 50%;\n    z-index: 100;\n}\n.modal.off {\n    opacity: 0;\n    visibility: hidden;\n    filter: blur(8px);\n    transform: scale(0.33);\n    box-shadow: 1rem 0 0 rgba(0, 0, 0, 0.2);\n}\n@supports (offset-rotation: 0deg) {\n    offset-rotation: 0deg;\n    offset-path: path(\"M 250,100 S -300,500 -700,-200\");\n    .modal.off {\n        offset-distance: 100%;\n    }\n}\n@media (prefers-reduced-motion) {\n    .modal {\n        offset-path: none;\n    }\n}\n.modal h2 {\n    border-bottom: 1px solid #ccc;\n    padding: 1rem;\n    margin: 0;\n}\n.modal .content {\n    padding: 1rem;\n}\n.modal .actions {\n    border-top: 1px solid #ccc;\n    background: #eee;\n    padding: 0.5rem 1rem;\n}\n#centered-toggle-button {\n    position: absolute;\n}\n\n";
    var onClose = function onClose(e) {
      props.onClose && props.onClose(e);
    };
    return props.show ? /*#__PURE__*/jsxRuntime.jsxs("div", {
      className: "modal",
      id: "modal",
      onClick: onClose,
      children: [/*#__PURE__*/jsxRuntime.jsx("style", {
        suppressHydrationWarning: true,
        children: css
      }), /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "content",
        children: props.children
      }), /*#__PURE__*/jsxRuntime.jsx("div", {
        className: "actions",
        children: /*#__PURE__*/jsxRuntime.jsx("button", {
          className: "toggle-button",
          onClick: onClose,
          children: "Close"
        })
      })]
    }) : null;
  };

  var WebformTermsOfService = function WebformTermsOfService(_ref) {
    var element = _ref.element,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps,
      labelProps = _ref.labelProps;
    var _useState = React.useState(false),
      show = _useState[0],
      setShow = _useState[1];
    var _useState2 = React.useState(element['#checked'] ? element['#checked'] : false),
      checkedState = _useState2[0],
      setCheckedState = _useState2[1];
    var _useState3 = React.useState(element['#access'] ? element['#access'] : true),
      accessState = _useState3[0];
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setCheckedState(!checkedState);
        if (e.target.value) {
          setValue('1');
        } else {
          setValue('0');
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    // Generate label for the checkbox.
    var getLabel = function getLabel() {
      var regex = new RegExp(/(.*){(.*)}(.*)/);
      // Link cannot be added if the label doesn't match expected pattern.
      if (!regex.test(element['#title'])) {
        return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
          children: element['#title']
        });
      }
      var parts = regex.exec(element['#title']);
      return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [parts[1], /*#__PURE__*/jsxRuntime.jsx("a", {
          href: "#terms",
          role: "button",
          target: "_blank",
          className: "terms-link",
          onClick: function onClick(e) {
            e.preventDefault();
            setShow(!show);
          },
          children: parts[2]
        }), parts[3]]
      });
    };
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        children: [/*#__PURE__*/jsxRuntime.jsx("input", _extends({
          type: "checkbox",
          id: element['#id'],
          name: element['#webform_key'],
          onChange: function onChange(e) {
            return onChangeHandler(e);
          },
          disabled: element['#disabled'],
          hidden: !accessState,
          required: element['#required'],
          readOnly: element['#readonly'],
          checked: checkedState
        }, fieldProps)), /*#__PURE__*/jsxRuntime.jsx(Modal, {
          onClose: function onClose() {
            return setShow(false);
          },
          show: show,
          children: /*#__PURE__*/jsxRuntime.jsx("div", {
            dangerouslySetInnerHTML: {
              __html: element['#terms_content']['#markup']
            }
          })
        }), /*#__PURE__*/jsxRuntime.jsx("label", _extends({
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

  var WebformDateTime = function WebformDateTime(_ref) {
    var element = _ref.element,
      _setValue = _ref.setValue,
      value = _ref.value,
      error = _ref.error,
      fieldProps = _ref.fieldProps,
      labelProps = _ref.labelProps,
      _ref$wrapperProps = _ref.wrapperProps,
      wrapperProps = _ref$wrapperProps === void 0 ? {} : _ref$wrapperProps;
    var _useContext = React.useContext(WebformContext),
      registerField = _useContext.registerField;
    var _split = (value != null ? value : '').split('T'),
      _split$ = _split[0],
      date = _split$ === void 0 ? '' : _split$,
      _split$2 = _split[1],
      time = _split$2 === void 0 ? '' : _split$2;
    var dateTime = {
      date: date,
      time: time
    };
    React__namespace.useEffect(function () {
      if (element['#parents']) {
        registerField(toKey(element['#parents']), {
          validate: function validate(value) {
            if (!value) {
              return;
            }
            // Ex: 2010-05-10T09:15
            var re = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]');
            // Ex: 2010-05-10T09:15:10
            var reWithSeconds = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]');
            if (!(re.test(value) || reWithSeconds.test(value))) {
              return 'The value is invalid. Please fill out every field.';
            }
          }
        });
      }
    }, []);
    var children = getChildElements(element);
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, _extends({
      label: element['#title'],
      labelDisplay: element['#title_display'],
      access: element['#access'],
      isRequired: false,
      error: error
    }, wrapperProps, {
      children: /*#__PURE__*/jsxRuntime.jsx("div", {
        id: element['#id'],
        children: children.map(function (name) {
          return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
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
            setValue: function setValue(newValue) {
              _setValue((name === 'date' ? newValue : date) + "T" + (name === 'time' ? newValue : time));
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

  var WebformTime = function WebformTime(_ref) {
    var _element$Date_time_m, _element$Date_time_m2;
    var element = _ref.element,
      setValue = _ref.setValue,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      fieldProps = _ref.fieldProps;
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("input", _extends({
        type: "time",
        name: element['#name'],
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
        disabled: element['#disabled'],
        hidden: !element['#access'],
        required: element['#required'],
        readOnly: element['#readonly'],
        value: value
      }, fieldProps, {
        id: element['#id'],
        min: (_element$Date_time_m = element['#date_time_min']) != null ? _element$Date_time_m : null,
        max: (_element$Date_time_m2 = element['#date_time_max']) != null ? _element$Date_time_m2 : null
      }))
    });
  };
  var WebformTime$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformTime))));

  var WebformDateList = function WebformDateList(_ref) {
    var element = _ref.element,
      error = _ref.error,
      setValue = _ref.setValue,
      fieldProps = _ref.fieldProps,
      labelProps = _ref.labelProps,
      _ref$wrapperProps = _ref.wrapperProps,
      wrapperProps = _ref$wrapperProps === void 0 ? {} : _ref$wrapperProps;
    var _useState = React.useState({}),
      dateList = _useState[0],
      setDateList = _useState[1];
    var children = getChildElements(element);
    var _useContext = React.useContext(WebformContext),
      registerField = _useContext.registerField;
    React__namespace.useEffect(function () {
      if (element['#parents']) {
        registerField(toKey(element['#parents']), {
          validate: function validate(value) {
            if (!value) {
              return;
            }
            // Ex: 2010-05-10T09:15
            var re = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]');
            // Ex: 2010-05-10T09:15:10
            var reWithSeconds = new RegExp('^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]');
            if (!(re.test(value) || reWithSeconds.test(value))) {
              return 'The value is invalid. Please fill out every field.';
            }
            return checkDateMinMax(value, element);
          }
        });
      }
    }, []);
    React.useEffect(function () {
      // When every value of the date list element is filled out then we can set the value.
      if (Object.keys(dateList)[0] && Object.values(dateList).every(function (i) {
        return i !== null;
      })) {
        var twentyFourHour;
        var isPM = dateList['ampm'] && dateList['ampm'] === 'pm';
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
        var monthAsNum;
        if (dateList['month']) {
          var monthOptions = element['month']['#options'];
          // Get the number value of the month. ex) May -> 5
          monthAsNum = Object.keys(monthOptions).find(function (key) {
            return monthOptions[key] === dateList['month'];
          });
        } else {
          // Add fallback values if the unit is not part of the date list like in Webform.
          monthAsNum = '1';
        }
        // Add fallback values if the unit is not part of the date list like in Webform.
        var day = dateList['day'] ? dateList['day'] : '1';
        var year = dateList['year'] ? dateList['year'] : new Date().getFullYear();
        var hour = twentyFourHour;
        var minute = dateList['minute'] ? dateList['minute'] : '00';
        var second = dateList['second'] ? dateList['second'] : null;
        if (!second) {
          setValue(year + "-" + padZero(monthAsNum) + "-" + padZero(day) + "T" + padZero(hour) + ":" + minute);
        } else {
          setValue(year + "-" + padZero(monthAsNum) + "-" + padZero(day) + "T" + padZero(hour) + ":" + minute + ":" + second);
        }
      } else {
        if (Object.values(dateList).some(function (i) {
          return i !== null;
        })) {
          setValue(dateList);
        }
      }
    }, [dateList]);
    React.useEffect(function () {
      children.map(function (name) {
        // Initialize dateList object keys with units.
        setDateList(function (prevState) {
          var _extends2;
          return _extends({}, prevState, (_extends2 = {}, _extends2[name] = null, _extends2));
        });
      });
    }, []);
    var padZero = function padZero(num) {
      if (num <= 9) {
        num = '0' + num;
        return num;
      } else {
        return num;
      }
    };
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, _extends({
      label: element['#title'],
      labelDisplay: element['#title_display'],
      access: element['#access'],
      isRequired: false,
      error: error
    }, wrapperProps, {
      children: /*#__PURE__*/jsxRuntime.jsx("div", {
        id: element['#id'],
        children: children.map(function (name, index) {
          return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
            element: _extends({}, element[name], {
              '#webform_key': element['#webform_key'],
              '#disabled': element['#disabled'],
              '#access': element['#access'],
              '#required': element['#required'],
              '#states': element['#states']
            }),
            error: error ? error[name] : null,
            setValue: function setValue(newValue) {
              var _extends3;
              setDateList(_extends({}, dateList, (_extends3 = {}, _extends3[name] = newValue, _extends3)));
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

  var WebformDate = function WebformDate(_ref) {
    var element = _ref.element,
      setValue = _ref.setValue,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      fieldProps = _ref.fieldProps;
    var _useContext = React.useContext(WebformContext),
      registerField = _useContext.registerField;
    var onChangeHandler = function onChangeHandler(e) {
      try {
        setValue(e.target.value);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    React__namespace.useEffect(function () {
      if (element['#parents']) {
        registerField(toKey(element['#parents']), {
          validate: function validate(value) {
            if (!value) {
              return;
            }
            return checkDateMinMax(value, element);
          }
        });
      }
    }, []);
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("input", _extends({
        onChange: function onChange(e) {
          return onChangeHandler(e);
        },
        type: element['#type'],
        name: element['#name'],
        disabled: element['#disabled'],
        hidden: !element['#access'],
        required: element['#required'],
        readOnly: element['#readonly'],
        value: value
      }, fieldProps, {
        id: element['#id'],
        min: element['#date_date_min'] ? convertDateToISO(element['#date_date_min']) : null,
        max: element['#date_date_max'] ? convertDateToISO(element['#date_date_max']) : null
      }))
    });
  };
  var WebformDate$1 = withStates(withDefaultValue(withAttributes(withWrapper(WebformDate))));

  var WebformItem = function WebformItem(_ref) {
    var element = _ref.element;
    return element['#access'] === false ? null : /*#__PURE__*/jsxRuntime.jsx("div", {
      children: /*#__PURE__*/jsxRuntime.jsx("label", {
        children: element['#title']
      })
    });
  };
  var WebformItem$1 = withStates(withDefaultValue(WebformItem));

  var WebformActions = function WebformActions(_ref) {
    var element = _ref.element,
      wrapperProps = _ref.wrapperProps;
    var buttons = [];
    var _useContext = React.useContext(WebformContext),
      registry = _useContext.registry,
      setData = _useContext.setData;
    var supportedButtons = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      submit: function submit() {},
      reset: function reset(e) {
        e.preventDefault();
        setData(function () {
          return {};
        });
      }
    };
    var WebformButton = registry.getComponent('button');
    Object.keys(supportedButtons).forEach(function (key) {
      if (element[key]) {
        buttons.push( /*#__PURE__*/jsxRuntime.jsx(WebformButton, {
          element: element[key],
          fieldProps: {
            type: 'submit',
            onClick: supportedButtons[key]
          }
        }, key));
      }
    });
    return /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, wrapperProps, {
      children: buttons
    }));
  };

  var supportedTypes = {
    radios: 'radio',
    checkboxes: 'checkbox',
    webform_radios_other: 'radio',
    webform_checkboxes_other: 'checkbox',
    webform_entity_checkboxes: 'checkbox',
    webform_entity_radios: 'radio'
  };
  // Component for checkboxes or radio buttons that are an options list.
  var WebformCheckboxRadioGroup = function WebformCheckboxRadioGroup(_ref) {
    var element = _ref.element,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? [] : _ref$value,
      _setValue = _ref.setValue,
      error = _ref.error,
      fieldProps = _ref.fieldProps;
    if (!(element['#type'] in supportedTypes)) {
      throw new Error(element['#type'] + " which was used on " + element['#webform_key'] + " is not supported by WebformCheckboxRadioGroup.");
    }
    var _useState = React.useState(null),
      valueOther = _useState[0],
      setValueOther = _useState[1];
    var _useState2 = React.useState(false),
      showInputForOther = _useState2[0],
      setShowInputForOther = _useState2[1];
    var type = supportedTypes[element['#type']];
    var withOther = element['#type'] === 'webform_checkboxes_other' || element['#type'] === 'webform_radios_other';
    var elementForOther = withOther ? element['other'] : null;
    function getOptions() {
      var options = {};
      var finalOptions = {};
      if (withOther) {
        for (var _i = 0, _Object$keys = Object.keys(element); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          if (key === 'radios' || key === 'checkboxes') {
            options = element[key];
          }
        }
      } else {
        options = element;
      }
      for (var _i2 = 0, _Object$keys2 = Object.keys(options['#options']); _i2 < _Object$keys2.length; _i2++) {
        var option = _Object$keys2[_i2];
        if (option !== '_other_') {
          finalOptions[option] = options['#options'][option];
        }
      }
      return finalOptions;
    }
    var options = getOptions();
    React.useEffect(function () {
      if (element['#default_value'] && !element['#default_value']['headers']) {
        _setValue(element['#default_value']);
        var defaultValues = typeof element['#default_value'] === 'string' ? [element['#default_value']] : element['#default_value'];
        var normalizedDefaultValues = defaultValues.filter(function (option) {
          return Object.hasOwn(options, option);
        });
        if (type === 'checkbox') {
          _setValue(normalizedDefaultValues);
        }
        if (withOther && Object.keys(defaultValues).length !== Object.keys(normalizedDefaultValues).length) {
          for (var _iterator = _createForOfIteratorHelperLoose(defaultValues), _step; !(_step = _iterator()).done;) {
            var defaultValue = _step.value;
            if (!Object.hasOwn(options, defaultValue)) {
              setValueOther(defaultValue);
            }
          }
        }
      }
    }, []);
    React.useEffect(function () {
      if (valueOther && type === 'checkbox') {
        _setValue([].concat(Array.isArray(value) ? value : [], [valueOther]));
      } else if (valueOther && type === 'radio') {
        _setValue(valueOther);
      }
    }, [valueOther]);
    var childElements = getChildElements(element).map(function (name) {
      // Option lists without an 'Other' option.
      if (name !== 'other' && name !== 'radios' && name !== 'checkboxes') {
        return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
          element: _extends({}, element[name], {
            '#webform_key': element['#webform_key'],
            '#states': element['#states'],
            '#access': element['#access']
          }),
          fieldProps: fieldProps,
          setValue: function setValue(newValue) {
            if (element['#type'] === 'checkboxes' || element['#type'] === 'webform_entity_checkboxes') {
              if (newValue === true) {
                _setValue([].concat(Array.isArray(value) ? value : [], [element[name]['#return_value']]));
              } else {
                if (Array.isArray(value) && value.length) {
                  var filtered = value.filter(function (i) {
                    return i !== element[name]['#return_value'];
                  });
                  _setValue(filtered);
                }
              }
            } else {
              _setValue(element[name]['#return_value']);
            }
          },
          value: Array.isArray(value) && value.includes(element[name]['#return_value']) || value === element[name]['#return_value'],
          error: error
        }, name);
        // The element has an 'Other' option if the child element key is 'checkboxes' or 'radios' so we need to
        // go one level deeper to get the list of options.
      } else if (name == 'checkboxes' || name == 'radios') {
        return getChildElements(element[name]).map(function (option) {
          return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
            fieldProps: fieldProps,
            element: _extends({}, element[name][option], {
              '#webform_key': element['#webform_key'],
              '#states': element['#states'],
              '#access': element['#access']
            }),
            setValue: function setValue(newValue) {
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
                    _setValue([].concat(Array.isArray(value) ? value : [], [element[name][option]['#return_value']]));
                  } else {
                    if (Array.isArray(value) && value.length) {
                      var filtered = value.filter(function (i) {
                        return i !== element[name][option]['#return_value'];
                      });
                      _setValue(filtered);
                    }
                  }
                }
              } else {
                if (element[name][option]['#return_value'] === '_other_') {
                  setValueOther(valueOther != null ? valueOther : '');
                  _setValue(valueOther != null ? valueOther : '');
                  setShowInputForOther(true);
                } else {
                  setShowInputForOther(false);
                  setValueOther(null);
                  _setValue(element[name][option]['#return_value']);
                }
              }
            },
            value: Array.isArray(value) && value.includes(element[name][option]['#return_value']) || value === element[name][option]['#return_value'] || element[name][option]['#return_value'] === '_other_' && showInputForOther,
            error: error
          }, option);
        });
      }
    });
    return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [childElements, withOther && showInputForOther ? /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: _extends({}, element, {
          '#type': elementForOther['#type'],
          '#webform_key': element['#webform_key'],
          '#title': elementForOther['#title'],
          '#description': elementForOther['#description'],
          '#id': element['#id'] + "-other-input"
        }),
        value: valueOther,
        setValue: function setValue(newValue) {
          setValueOther(newValue);
        }
      }) : null]
    });
  };
  var WebformCheckboxRadioGroup$1 = withStates(withAttributes(withWrapper(WebformCheckboxRadioGroup, {
    defaultWrapperType: 'fieldset',
    labelFor: false
  })));

  var WebformMarkup = function WebformMarkup(_ref) {
    var element = _ref.element;
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      dangerouslySetInnerHTML: {
        __html: element['#markup']
      }
    });
  };

  var WebformMessage = function WebformMessage(_ref) {
    var element = _ref.element;
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      dangerouslySetInnerHTML: {
        __html: element['#message_message']['#markup']
      }
    });
  };

  var WebformButton = function WebformButton(_ref) {
    var element = _ref.element,
      fieldProps = _ref.fieldProps;
    return /*#__PURE__*/jsxRuntime.jsx("button", _extends({
      type: "button"
    }, fieldProps, {
      children: element['#value']
    }));
  };
  var WebformButton$1 = withAttributes(WebformButton);

  var WebformTableRow = function WebformTableRow(_ref) {
    var element = _ref.element,
      error = _ref.error,
      _ref$fieldProps = _ref.fieldProps,
      fieldProps = _ref$fieldProps === void 0 ? {} : _ref$fieldProps,
      _ref$tdProps = _ref.tdProps,
      tdProps = _ref$tdProps === void 0 ? {} : _ref$tdProps;
    var _useContext = React.useContext(WebformContext),
      data = _useContext.data,
      setData = _useContext.setData;
    return /*#__PURE__*/jsxRuntime.jsx("tr", _extends({}, fieldProps, {
      children: getChildElements(element).map(function (key) {
        var _element$key$Wrapper;
        var rowAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
        var parentAndRowAndChildStates = element['#states'] ? Object.assign({}, rowAndChildStates, element['#states']) : rowAndChildStates;
        return /*#__PURE__*/React.createElement("td", _extends({}, _extends({}, tdProps, normalizeAttributes((_element$key$Wrapper = element[key]['#wrapper_attributes']) != null ? _element$key$Wrapper : {})), {
          key: key
        }), /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
          element: _extends({}, parentAndRowAndChildStates ? _extends({
            '#states': parentAndRowAndChildStates
          }, element[key]) : element[key], {
            // Make sure `#wrapper_attributes` is only applied once.
            '#wrapper_attributes': []
          }),
          error: error,
          value: data[element[key]['#webform_key']],
          setValue: function setValue(value) {
            setData(function (previousData) {
              var _extends2;
              return _extends({}, previousData, (_extends2 = {}, _extends2[element[key]['#webform_key']] = value, _extends2));
            });
          }
        }, key));
      })
    }));
  };
  var WebformTableRow$1 = withAttributes(WebformTableRow);

  var ConfirmationPage = function ConfirmationPage(_ref) {
    var webform = _ref.webform;
    var defaultMessage = /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: ["New submission added to ", /*#__PURE__*/jsxRuntime.jsx("em", {
        children: webform.title
      }), "."]
    });
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      children: webform.confirmation.message && webform.confirmation.message.length > 0 ? webform.confirmation.message : defaultMessage
    });
  };

  var DebugConfirmation = function DebugConfirmation(_ref) {
    var submission = _ref.submission;
    return /*#__PURE__*/jsxRuntime.jsx("pre", {
      children: /*#__PURE__*/jsxRuntime.jsx("code", {
        id: "submitted-data",
        children: JSON.stringify(submission)
      })
    });
  };

  var WizardPage = function WizardPage(_ref) {
    var element = _ref.element,
      fieldProps = _ref.fieldProps;
    var _useContext = React.useContext(WebformContext),
      data = _useContext.data,
      setData = _useContext.setData,
      errors = _useContext.errors;
    var childElements = getChildElements(element).map(function (key) {
      var parentAndChildStates = element['#states'] ? _extends({}, element[key]['#states'], element['#states']) : null;
      return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: parentAndChildStates ? _extends({}, element[key], {
          '#states': parentAndChildStates,
          '#access': true
        }) : _extends({}, element[key], {
          '#access': true
        }),
        error: errors[element[key]['#webform_key']],
        value: data[element[key]['#webform_key']],
        setValue: function setValue(value) {
          setData(function (previousData) {
            var _extends2;
            return _extends({}, previousData, (_extends2 = {}, _extends2[element[key]['#webform_key']] = value, _extends2));
          });
        }
      }, element[key]['#webform_key']);
    });
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: /*#__PURE__*/jsxRuntime.jsx("div", _extends({}, fieldProps, {
        children: childElements
      }))
    });
  };
  var WizardPage$1 = withStates(withAttributes(withWrapper(WizardPage, {
    defaultWrapperType: 'container'
  })));

  var MultiPageForm = function MultiPageForm(_ref) {
    var elements = _ref.elements;
    var _useState = React.useState(0),
      currentPage = _useState[0],
      setCurrentPage = _useState[1];
    var children = getChildElements(elements);
    var pageElement = elements[children[currentPage]];
    var showPrevBtn = currentPage > 0;
    var showSubmitBtn = currentPage === children.length - 1;
    var submitBtnElement = elements['actions'];
    var highlightCurrent = function highlightCurrent(item) {
      if (pageElement['#title'] == elements[item]['#title']) {
        return {
          color: 'blue'
        };
      }
    };
    return /*#__PURE__*/jsxRuntime.jsxs("div", {
      children: [/*#__PURE__*/jsxRuntime.jsx("ul", {
        style: {
          display: 'flex'
        },
        children: children.map(function (item) {
          return /*#__PURE__*/jsxRuntime.jsxs("li", {
            style: highlightCurrent(item),
            children: [elements[item]['#title'], "----", '>']
          }, item);
        })
      }), /*#__PURE__*/jsxRuntime.jsx("br", {}), /*#__PURE__*/jsxRuntime.jsxs("h1", {
        children: ["Page Title: ", pageElement['#title']]
      }), /*#__PURE__*/jsxRuntime.jsxs("h1", {
        children: ["Current page: ", currentPage + 1]
      }), /*#__PURE__*/jsxRuntime.jsx(WizardPage$1, {
        element: _extends({}, pageElement)
      }), showPrevBtn && /*#__PURE__*/jsxRuntime.jsx("button", {
        style: {
          border: 'solid'
        },
        type: "button",
        className: "prev-btn",
        onClick: function onClick() {
          return setCurrentPage(function (prevState) {
            return prevState - 1;
          });
        },
        children: "Previous"
      }), /*#__PURE__*/jsxRuntime.jsx("button", {
        style: {
          border: 'solid'
        },
        type: "button",
        className: "next-btn",
        onClick: function onClick() {
          return setCurrentPage(function (prevState) {
            return prevState + 1;
          });
        },
        children: "Next"
      }), showSubmitBtn && /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
        element: submitBtnElement
      })]
    });
  };

  var FormLayout = function FormLayout(_ref) {
    var webform = _ref.webform,
      status = _ref.status;
    var _useContext = React.useContext(WebformContext),
      registry = _useContext.registry,
      setData = _useContext.setData,
      data = _useContext.data,
      errors = _useContext.errors;
    var elements = webform.elements,
      confirmation = webform.confirmation;
    var children = getChildElements(elements);
    var renderConfirmationPage = function renderConfirmationPage() {
      var ConfirmationPage = registry.getComponent('confirmation_page');
      return /*#__PURE__*/jsxRuntime.jsx(ConfirmationPage, {
        webform: webform,
        submission: data
      });
    };
    var isMultiPageForm = children.some(function (i) {
      return elements[i]['#type'] === 'webform_wizard_page';
    });
    React.useEffect(function () {
      if (confirmation.type !== 'debug' || status === 'success') {
        return;
      }
      // Store Webform debug data in local storage so that it can be retrieved
      // after submission.
      window.localStorage.setItem('webformDebugData', JSON.stringify(data));
    }, [data, status, confirmation.type]);
    var renderChildren = function renderChildren() {
      return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: children.map(function (key) {
          return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
            element: elements[key],
            setValue: function setValue(value) {
              setData(function (previousData) {
                var _extends2;
                return _extends({}, previousData, (_extends2 = {}, _extends2[elements[key]['#webform_key']] = value, _extends2));
              });
            },
            value: data[elements[key]['#webform_key']],
            error: errors[elements[key]['#webform_key']]
          }, elements[key]['#webform_key']);
        })
      });
    };
    if (status === 'success') {
      if (confirmation.type === 'debug') {
        var debugData = function () {
          if (typeof window === 'undefined') {
            return data;
          }
          return JSON.parse(window.localStorage.getItem('webformDebugData'));
        }();
        return /*#__PURE__*/jsxRuntime.jsx(DebugConfirmation, {
          submission: debugData
        });
      } else if (confirmation.type === 'page' || confirmation.type === 'inline') {
        return renderConfirmationPage();
      } else if (confirmation.type === 'message') {
        var Message = registry.getComponent('message');
        var defaultMessage = /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: ["New submission added to ", /*#__PURE__*/jsxRuntime.jsx("em", {
            children: webform.title
          }), "."]
        });
        return /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [/*#__PURE__*/jsxRuntime.jsx(Message, {
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
      for (var _i = 0, _Object$entries = Object.entries(elements); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
        if (typeof value === 'object' && value !== null) {
          var keys2 = Object.keys(value);
          var hasValue = keys2.includes('#access');
          if (hasValue) {
            elements[key]['#access'] = true;
            accessChildrenElements(elements[key]);
          }
        }
      }
      return /*#__PURE__*/jsxRuntime.jsx(MultiPageForm, {
        elements: elements
      });
    } else {
      return renderChildren();
    }
  };
  var accessChildrenElements = function accessChildrenElements(element) {
    Object.entries(element).forEach(function (item) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(item); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _Object$entries2[_i2],
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];
        if (typeof value === 'object' && value !== null) {
          var keys2 = Object.keys(value);
          var hasValue = keys2.includes('#access');
          if (hasValue) {
            item[key]['#access'] = true;
            accessChildrenElements(item[key]);
          }
        }
      }
    });
    return true;
  };

  var Message = function Message(_ref) {
    var children = _ref.children;
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      children: children
    });
  };

  var WebformCustomComposite = function WebformCustomComposite(_ref) {
    var element = _ref.element,
      error = _ref.error,
      value = _ref.value,
      _setValue = _ref.setValue,
      labelProps = _ref.labelProps;
    var compositeElements = getChildElements(element['#element']);
    var isMulti = !!element['add'];
    React.useEffect(function () {
      // The custom composite component handles setting default value.
      if (element['#default_value'] && Array.isArray(element['#default_value'])) {
        _setValue(element['#default_value']);
      } else {
        _setValue([{}]);
      }
    }, []);
    return /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: isMulti ? /*#__PURE__*/jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: /*#__PURE__*/jsxRuntime.jsx(WebformMultifield$1, {
          element: element,
          value: value,
          setValue: _setValue,
          error: error
        })
      }) : /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, {
        label: element['#title'],
        labelDisplay: element['#title_display'],
        access: element['#access'],
        isRequired: false,
        error: error,
        children: compositeElements.map(function (name, index) {
          var elementItem = element.items['0'][name];
          return /*#__PURE__*/jsxRuntime.jsx(WebformElement, {
            element: _extends({}, elementItem, {
              // Ensure that all child elements have '#webform_key' and '#states' defined.
              '#webform_key': name,
              '#states': element['#_webform_states'],
              '#id': elementItem['#id'],
              '#default_value': undefined
            }),
            value: value && value[0][name] ? value[0][name] : '',
            setValue: function setValue(newValue) {
              // A single value custom composite element needs to be an object
              // wrapped in an array [{}]. So check first if the object
              // exists yet and if so, create a new object with the existing object and the new value.
              // Otherwise, create an object with the new key and value inside an array.
              if (value && value[0]) {
                var _extends2;
                _setValue([_extends({}, value[0], (_extends2 = {}, _extends2[name] = newValue, _extends2))]);
              } else {
                var _ref2;
                _setValue([(_ref2 = {}, _ref2[name] = newValue, _ref2)]);
              }
            },
            error: error ? error[name] : null,
            labelProps: labelProps
          }, index);
        })
      })
    });
  };

  var defaultComponents = {
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
  var defaultComponentRegistry = new ComponentRegistry(defaultComponents);

  var _excluded = ["data", "id", "customComponents", "onSubmit", "apiUrl", "validate"];
  var WebformError = /*#__PURE__*/function (_Error) {
    _inheritsLoose(WebformError, _Error);
    function WebformError(response) {
      var _this;
      _this = _Error.call(this) || this;
      _this.response = void 0;
      _this.response = response;
      return _this;
    }
    return WebformError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));
  var Webform = function Webform(_ref) {
    var webformObject = _ref.data,
      id = _ref.id,
      _ref$customComponents = _ref.customComponents,
      customComponents = _ref$customComponents === void 0 ? {} : _ref$customComponents,
      customOnSubmit = _ref.onSubmit,
      _ref$apiUrl = _ref.apiUrl,
      apiUrl = _ref$apiUrl === void 0 ? '/api/webform' : _ref$apiUrl,
      validate = _ref.validate,
      formProps = _objectWithoutPropertiesLoose(_ref, _excluded);
    var componentRegistry = defaultComponentRegistry;
    useConstructor(function () {
      // Register components on the initial load.
      Object.keys(customComponents).forEach(function (key) {
        componentRegistry.setComponent(key, customComponents[key]);
      });
    });
    // Update component library when `customComponents` changes. This ensures that
    // the component library is kept in a consistent state with hot module
    // replacement.
    React.useEffect(function () {
      Object.keys(customComponents).forEach(function (key) {
        componentRegistry.setComponent(key, customComponents[key]);
      });
    }, [customComponents]);
    var _useState = React.useState({}),
      errors = _useState[0],
      setErrors = _useState[1];
    var _useState2 = React.useState(),
      status = _useState2[0],
      setStatus = _useState2[1];
    var _useState3 = React.useState({}),
      data = _useState3[0],
      setData = _useState3[1];
    var fieldRegistry = React.useRef({});
    var registerField = React__namespace.useCallback(function (name, _ref2) {
      var validate = _ref2.validate;
      fieldRegistry.current[name] = {
        validate: validate
      };
    }, []);
    var unregisterField = React__namespace.useCallback(function (name) {
      delete fieldRegistry.current[name];
    }, []);
    var _onSubmit = customOnSubmit ? customOnSubmit : defaultOnSubmit;
    var WebformForm = componentRegistry.getComponent('form_layout');
    var Message = componentRegistry.getComponent('message');
    var runSingleFieldLevelValidation = function runSingleFieldLevelValidation(field, value) {
      return new Promise(function (resolve) {
        return resolve(fieldRegistry.current[field].validate(value));
      });
    };
    var runFieldValidators = function runFieldValidators(values) {
      var fieldKeysWithValidation = Object.keys(fieldRegistry.current).filter(function (key) {
        return isFunction(fieldRegistry.current[key].validate);
      });
      var fieldValidations = fieldKeysWithValidation.map(function (key) {
        return runSingleFieldLevelValidation(key, values[key]);
      });
      return Promise.all(fieldValidations).then(function (fieldErrorsList) {
        return fieldErrorsList.reduce(function (previousValue, currentValue, currentIndex) {
          if (currentValue === undefined) {
            return previousValue;
          }
          setIn(previousValue, fieldKeysWithValidation[currentIndex], currentValue);
          return previousValue;
        }, {});
      });
    };
    var runValidators = function runValidators(values) {
      return Promise.all([runFieldValidators(values), validate ? validate(values) : {}]).then(function (_ref3) {
        var fieldErrors = _ref3[0],
          validateErrors = _ref3[1];
        return deepmerge__default["default"].all([fieldErrors, validateErrors], {
          arrayMerge: arrayMerge
        });
      });
    };
    return /*#__PURE__*/jsxRuntime.jsxs("form", _extends({}, formProps, {
      onSubmit: function onSubmit(event) {
        event.preventDefault();
        runValidators(data).then(function (combinedErrors) {
          if (Object.keys(combinedErrors).length !== 0) {
            setStatus('error');
            setErrors(combinedErrors);
          } else {
            _onSubmit({
              id: id,
              event: event,
              data: data,
              setData: setData,
              setStatus: setStatus,
              setErrors: setErrors,
              apiUrl: apiUrl
            });
          }
        });
      },
      children: [status === 'error' ? /*#__PURE__*/jsxRuntime.jsx(Message, {
        type: "error",
        children: "An error occurred. Please try again."
      }) : null, /*#__PURE__*/jsxRuntime.jsx(WebformContext.Provider, {
        value: {
          id: id,
          apiUrl: apiUrl,
          data: data,
          setData: setData,
          setStatus: setStatus,
          errors: errors,
          registry: componentRegistry,
          registerField: registerField,
          unregisterField: unregisterField
        },
        children: /*#__PURE__*/jsxRuntime.jsx(WebformForm, {
          webform: webformObject,
          status: status
        })
      })]
    }));
  };

  var WebformHeight = function WebformHeight(_ref) {
    var element = _ref.element,
      error = _ref.error,
      value = _ref.value,
      setValue = _ref.setValue;
    var onChangeHandler = function onChangeHandler(e) {
      try {
        var _extends2;
        setValue(_extends({}, value, (_extends2 = {}, _extends2[e.target.name] = e.target.value, _extends2)));
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    };
    return /*#__PURE__*/jsxRuntime.jsx(WebformElementWrapper, {
      labelFor: element['#key'],
      label: element['#title'],
      isRequired: element['#required'],
      access: element['#access'],
      settings: null,
      error: error,
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        style: {
          display: 'inline-flex',
          alignItems: 'center'
        },
        children: [/*#__PURE__*/jsxRuntime.jsx("input", {
          type: "number",
          name: "feet",
          min: 0,
          max: 8,
          onChange: function onChange(e) {
            return onChangeHandler(e);
          }
        }), /*#__PURE__*/jsxRuntime.jsx("label", {
          style: {
            padding: '0.5em'
          },
          children: "feet"
        }), /*#__PURE__*/jsxRuntime.jsx("input", {
          type: "number",
          name: "inches",
          min: 0,
          max: 11,
          onChange: function onChange(e) {
            return onChangeHandler(e);
          }
        }), /*#__PURE__*/jsxRuntime.jsx("label", {
          style: {
            padding: '0.5em'
          },
          children: "inches"
        })]
      })
    });
  };

  var WebformDefaultApiRoute = function WebformDefaultApiRoute(request, response, drupal) {
    try {
      return Promise.resolve(function () {
        if (request.method === 'GET') {
          switch (request.query.op.toString()) {
            case 'autocomplete_options':
              {
                var _request$query = request.query,
                  id = _request$query.id,
                  options_id = _request$query.options_id;
                var url = drupal.buildUrl("/webform_rest/" + id.toString() + "/autocomplete_options/" + options_id + "?_format=json");
                return Promise.resolve(drupal.fetch(url.toString(), {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })).then(function (result) {
                  var _exit;
                  function _temp2(_result2) {
                    if (_exit) return _result2;
                    var _end = response.end;
                    return Promise.resolve(result.json()).then(function (_result$json) {
                      _end.call(response, JSON.stringify(_result$json));
                      response.status(200);
                      return response;
                    });
                  }
                  var _temp = function () {
                    if (!result.ok) {
                      return Promise.resolve(result.json()).then(function (message) {
                        // Send error to client.
                        var _response$status$json = response.status(result.status).json({
                          message: message
                        });
                        _exit = 1;
                        return _response$status$json;
                      });
                    }
                  }();
                  return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
                });
              }
            default:
              {
                response.end('{}');
                response.status(404);
                return response;
              }
          }
        } else return function () {
          if (request.method === 'POST') {
            var _url = drupal.buildUrl('/webform_rest/submit?_format=json');
            // Submit to Drupal.
            return Promise.resolve(drupal.fetch(_url.toString(), {
              method: 'POST',
              body: JSON.stringify(request.body),
              headers: {
                'Content-Type': 'application/json'
              }
            })).then(function (result) {
              var _exit2;
              function _temp4(_result4) {
                if (_exit2) return _result4;
                response.end(JSON.stringify(result));
                response.status(200);
                return response;
              }
              var _temp3 = function () {
                if (!result.ok) {
                  return Promise.resolve(result.json()).then(function (message) {
                    // Send error to client.
                    var _response$status$json2 = response.status(result.status).json({
                      message: message
                    });
                    _exit2 = 1;
                    return _response$status$json2;
                  });
                }
              }();
              return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3);
            });
          }
        }();
      }());
    } catch (e) {
      return Promise.reject(e);
    }
  };

  exports.Webform = Webform;
  exports.WebformContext = WebformContext;
  exports.WebformDefaultApiRoute = WebformDefaultApiRoute;
  exports.WebformError = WebformError;
  exports.WebformHeight = WebformHeight;
  exports.arrayMerge = arrayMerge;
  exports.checkDateMinMax = checkDateMinMax;
  exports.components = defaultComponents;
  exports.convertDateToISO = convertDateToISO;
  exports.cssStringToObject = cssStringToObject;
  exports.defaultOnSubmit = defaultOnSubmit;
  exports.getChildElements = getChildElements;
  exports.getCurrentError = getCurrentError;
  exports.getIndexOfMultiValue = getIndexOfMultiValue;
  exports.getNormalizedErrorMessages = getNormalizedErrorMessages;
  exports.isFunction = isFunction;
  exports.isInteger = isInteger;
  exports.isIterable = isIterable;
  exports.isObject = isObject;
  exports.normalizeElements = normalizeElements;
  exports.reactPropertyMap = reactPropertyMap;
  exports.resolvePath = resolvePath;
  exports.resolveWebformContent = resolveWebformContent;
  exports.setIn = setIn;
  exports.toKey = toKey;
  exports.toPath = toPath;
  exports.updateNameAndIdWithIndex = updateNameAndIdWithIndex;
  exports.useConstructor = useConstructor;

}));
//# sourceMappingURL=index.umd.js.map
