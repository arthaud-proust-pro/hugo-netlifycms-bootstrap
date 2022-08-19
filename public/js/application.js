(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/bootstrap/js/src/util/index.js
  var MILLISECONDS_MULTIPLIER, TRANSITION_END, toType, getSelector, getElementFromSelector, getTransitionDurationFromElement, triggerTransitionEnd, isElement, getElement, isVisible, isDisabled, reflow, getjQuery, DOMContentLoadedCallbacks, onDOMContentLoaded, defineJQueryPlugin, execute, executeAfterTransition;
  var init_util = __esm({
    "node_modules/bootstrap/js/src/util/index.js"() {
      MILLISECONDS_MULTIPLIER = 1e3;
      TRANSITION_END = "transitionend";
      toType = (object) => {
        if (object === null || object === void 0) {
          return `${object}`;
        }
        return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
      };
      getSelector = (element) => {
        let selector = element.getAttribute("data-bs-target");
        if (!selector || selector === "#") {
          let hrefAttribute = element.getAttribute("href");
          if (!hrefAttribute || !hrefAttribute.includes("#") && !hrefAttribute.startsWith(".")) {
            return null;
          }
          if (hrefAttribute.includes("#") && !hrefAttribute.startsWith("#")) {
            hrefAttribute = `#${hrefAttribute.split("#")[1]}`;
          }
          selector = hrefAttribute && hrefAttribute !== "#" ? hrefAttribute.trim() : null;
        }
        return selector;
      };
      getElementFromSelector = (element) => {
        const selector = getSelector(element);
        return selector ? document.querySelector(selector) : null;
      };
      getTransitionDurationFromElement = (element) => {
        if (!element) {
          return 0;
        }
        let { transitionDuration, transitionDelay } = window.getComputedStyle(element);
        const floatTransitionDuration = Number.parseFloat(transitionDuration);
        const floatTransitionDelay = Number.parseFloat(transitionDelay);
        if (!floatTransitionDuration && !floatTransitionDelay) {
          return 0;
        }
        transitionDuration = transitionDuration.split(",")[0];
        transitionDelay = transitionDelay.split(",")[0];
        return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
      };
      triggerTransitionEnd = (element) => {
        element.dispatchEvent(new Event(TRANSITION_END));
      };
      isElement = (object) => {
        if (!object || typeof object !== "object") {
          return false;
        }
        if (typeof object.jquery !== "undefined") {
          object = object[0];
        }
        return typeof object.nodeType !== "undefined";
      };
      getElement = (object) => {
        if (isElement(object)) {
          return object.jquery ? object[0] : object;
        }
        if (typeof object === "string" && object.length > 0) {
          return document.querySelector(object);
        }
        return null;
      };
      isVisible = (element) => {
        if (!isElement(element) || element.getClientRects().length === 0) {
          return false;
        }
        const elementIsVisible = getComputedStyle(element).getPropertyValue("visibility") === "visible";
        const closedDetails = element.closest("details:not([open])");
        if (!closedDetails) {
          return elementIsVisible;
        }
        if (closedDetails !== element) {
          const summary = element.closest("summary");
          if (summary && summary.parentNode !== closedDetails) {
            return false;
          }
          if (summary === null) {
            return false;
          }
        }
        return elementIsVisible;
      };
      isDisabled = (element) => {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }
        if (element.classList.contains("disabled")) {
          return true;
        }
        if (typeof element.disabled !== "undefined") {
          return element.disabled;
        }
        return element.hasAttribute("disabled") && element.getAttribute("disabled") !== "false";
      };
      reflow = (element) => {
        element.offsetHeight;
      };
      getjQuery = () => {
        if (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")) {
          return window.jQuery;
        }
        return null;
      };
      DOMContentLoadedCallbacks = [];
      onDOMContentLoaded = (callback) => {
        if (document.readyState === "loading") {
          if (!DOMContentLoadedCallbacks.length) {
            document.addEventListener("DOMContentLoaded", () => {
              for (const callback2 of DOMContentLoadedCallbacks) {
                callback2();
              }
            });
          }
          DOMContentLoadedCallbacks.push(callback);
        } else {
          callback();
        }
      };
      defineJQueryPlugin = (plugin) => {
        onDOMContentLoaded(() => {
          const $ = getjQuery();
          if ($) {
            const name = plugin.NAME;
            const JQUERY_NO_CONFLICT = $.fn[name];
            $.fn[name] = plugin.jQueryInterface;
            $.fn[name].Constructor = plugin;
            $.fn[name].noConflict = () => {
              $.fn[name] = JQUERY_NO_CONFLICT;
              return plugin.jQueryInterface;
            };
          }
        });
      };
      execute = (callback) => {
        if (typeof callback === "function") {
          callback();
        }
      };
      executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback);
          return;
        }
        const durationPadding = 5;
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
        let called = false;
        const handler = ({ target }) => {
          if (target !== transitionElement) {
            return;
          }
          called = true;
          transitionElement.removeEventListener(TRANSITION_END, handler);
          execute(callback);
        };
        transitionElement.addEventListener(TRANSITION_END, handler);
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement);
          }
        }, emulatedDuration);
      };
    }
  });

  // node_modules/bootstrap/js/src/dom/selector-engine.js
  var SelectorEngine, selector_engine_default;
  var init_selector_engine = __esm({
    "node_modules/bootstrap/js/src/dom/selector-engine.js"() {
      init_util();
      SelectorEngine = {
        find(selector, element = document.documentElement) {
          return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
        },
        findOne(selector, element = document.documentElement) {
          return Element.prototype.querySelector.call(element, selector);
        },
        children(element, selector) {
          return [].concat(...element.children).filter((child) => child.matches(selector));
        },
        parents(element, selector) {
          const parents = [];
          let ancestor = element.parentNode.closest(selector);
          while (ancestor) {
            parents.push(ancestor);
            ancestor = ancestor.parentNode.closest(selector);
          }
          return parents;
        },
        prev(element, selector) {
          let previous = element.previousElementSibling;
          while (previous) {
            if (previous.matches(selector)) {
              return [previous];
            }
            previous = previous.previousElementSibling;
          }
          return [];
        },
        next(element, selector) {
          let next = element.nextElementSibling;
          while (next) {
            if (next.matches(selector)) {
              return [next];
            }
            next = next.nextElementSibling;
          }
          return [];
        },
        focusableChildren(element) {
          const focusables = [
            "a",
            "button",
            "input",
            "textarea",
            "select",
            "details",
            "[tabindex]",
            '[contenteditable="true"]'
          ].map((selector) => `${selector}:not([tabindex^="-"])`).join(",");
          return this.find(focusables, element).filter((el) => !isDisabled(el) && isVisible(el));
        }
      };
      selector_engine_default = SelectorEngine;
    }
  });

  // node_modules/bootstrap/js/src/dom/manipulator.js
  function normalizeData(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (value === Number(value).toString()) {
      return Number(value);
    }
    if (value === "" || value === "null") {
      return null;
    }
    if (typeof value !== "string") {
      return value;
    }
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch {
      return value;
    }
  }
  function normalizeDataKey(key) {
    return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
  }
  var Manipulator, manipulator_default;
  var init_manipulator = __esm({
    "node_modules/bootstrap/js/src/dom/manipulator.js"() {
      Manipulator = {
        setDataAttribute(element, key, value) {
          element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
        },
        removeDataAttribute(element, key) {
          element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
        },
        getDataAttributes(element) {
          if (!element) {
            return {};
          }
          const attributes = {};
          const bsKeys = Object.keys(element.dataset).filter((key) => key.startsWith("bs") && !key.startsWith("bsConfig"));
          for (const key of bsKeys) {
            let pureKey = key.replace(/^bs/, "");
            pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
            attributes[pureKey] = normalizeData(element.dataset[key]);
          }
          return attributes;
        },
        getDataAttribute(element, key) {
          return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
        }
      };
      manipulator_default = Manipulator;
    }
  });

  // node_modules/bootstrap/js/src/util/scrollbar.js
  var SELECTOR_FIXED_CONTENT, SELECTOR_STICKY_CONTENT, PROPERTY_PADDING, PROPERTY_MARGIN, ScrollBarHelper, scrollbar_default;
  var init_scrollbar = __esm({
    "node_modules/bootstrap/js/src/util/scrollbar.js"() {
      init_selector_engine();
      init_manipulator();
      init_util();
      SELECTOR_FIXED_CONTENT = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top";
      SELECTOR_STICKY_CONTENT = ".sticky-top";
      PROPERTY_PADDING = "padding-right";
      PROPERTY_MARGIN = "margin-right";
      ScrollBarHelper = class {
        constructor() {
          this._element = document.body;
        }
        getWidth() {
          const documentWidth = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - documentWidth);
        }
        hide() {
          const width = this.getWidth();
          this._disableOverFlow();
          this._setElementAttributes(this._element, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, (calculatedValue) => calculatedValue + width);
          this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, (calculatedValue) => calculatedValue - width);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow");
          this._resetElementAttributes(this._element, PROPERTY_PADDING);
          this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
          this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow");
          this._element.style.overflow = "hidden";
        }
        _setElementAttributes(selector, styleProperty, callback) {
          const scrollbarWidth = this.getWidth();
          const manipulationCallBack = (element) => {
            if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
              return;
            }
            this._saveInitialAttribute(element, styleProperty);
            const calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
            element.style.setProperty(styleProperty, `${callback(Number.parseFloat(calculatedValue))}px`);
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _saveInitialAttribute(element, styleProperty) {
          const actualValue = element.style.getPropertyValue(styleProperty);
          if (actualValue) {
            manipulator_default.setDataAttribute(element, styleProperty, actualValue);
          }
        }
        _resetElementAttributes(selector, styleProperty) {
          const manipulationCallBack = (element) => {
            const value = manipulator_default.getDataAttribute(element, styleProperty);
            if (value === null) {
              element.style.removeProperty(styleProperty);
              return;
            }
            manipulator_default.removeDataAttribute(element, styleProperty);
            element.style.setProperty(styleProperty, value);
          };
          this._applyManipulationCallback(selector, manipulationCallBack);
        }
        _applyManipulationCallback(selector, callBack) {
          if (isElement(selector)) {
            callBack(selector);
            return;
          }
          for (const sel of selector_engine_default.find(selector, this._element)) {
            callBack(sel);
          }
        }
      };
      scrollbar_default = ScrollBarHelper;
    }
  });

  // node_modules/bootstrap/js/src/dom/event-handler.js
  function makeEventUid(element, uid) {
    return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
  }
  function getElementEvents(element) {
    const uid = makeEventUid(element);
    element.uidEvent = uid;
    eventRegistry[uid] = eventRegistry[uid] || {};
    return eventRegistry[uid];
  }
  function bootstrapHandler(element, fn) {
    return function handler(event) {
      hydrateObj(event, { delegateTarget: element });
      if (handler.oneOff) {
        EventHandler.off(element, event.type, fn);
      }
      return fn.apply(element, [event]);
    };
  }
  function bootstrapDelegationHandler(element, selector, fn) {
    return function handler(event) {
      const domElements = element.querySelectorAll(selector);
      for (let { target } = event; target && target !== this; target = target.parentNode) {
        for (const domElement of domElements) {
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, { delegateTarget: target });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      }
    };
  }
  function findHandler(events, callable, delegationSelector = null) {
    return Object.values(events).find((event) => event.callable === callable && event.delegationSelector === delegationSelector);
  }
  function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
    const isDelegated = typeof handler === "string";
    const callable = isDelegated ? delegationFunction : handler || delegationFunction;
    let typeEvent = getTypeEvent(originalTypeEvent);
    if (!nativeEvents.has(typeEvent)) {
      typeEvent = originalTypeEvent;
    }
    return [isDelegated, callable, typeEvent];
  }
  function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
    if (typeof originalTypeEvent !== "string" || !element) {
      return;
    }
    let [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
    if (originalTypeEvent in customEvents) {
      const wrapFunction = (fn2) => {
        return function(event) {
          if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
            return fn2.call(this, event);
          }
        };
      };
      callable = wrapFunction(callable);
    }
    const events = getElementEvents(element);
    const handlers = events[typeEvent] || (events[typeEvent] = {});
    const previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
    if (previousFunction) {
      previousFunction.oneOff = previousFunction.oneOff && oneOff;
      return;
    }
    const uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ""));
    const fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
    fn.delegationSelector = isDelegated ? handler : null;
    fn.callable = callable;
    fn.oneOff = oneOff;
    fn.uidEvent = uid;
    handlers[uid] = fn;
    element.addEventListener(typeEvent, fn, isDelegated);
  }
  function removeHandler(element, events, typeEvent, handler, delegationSelector) {
    const fn = findHandler(events[typeEvent], handler, delegationSelector);
    if (!fn) {
      return;
    }
    element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
    delete events[typeEvent][fn.uidEvent];
  }
  function removeNamespacedHandlers(element, events, typeEvent, namespace) {
    const storeElementEvent = events[typeEvent] || {};
    for (const handlerKey of Object.keys(storeElementEvent)) {
      if (handlerKey.includes(namespace)) {
        const event = storeElementEvent[handlerKey];
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  }
  function getTypeEvent(event) {
    event = event.replace(stripNameRegex, "");
    return customEvents[event] || event;
  }
  function hydrateObj(obj, meta) {
    for (const [key, value] of Object.entries(meta || {})) {
      try {
        obj[key] = value;
      } catch {
        Object.defineProperty(obj, key, {
          configurable: true,
          get() {
            return value;
          }
        });
      }
    }
    return obj;
  }
  var namespaceRegex, stripNameRegex, stripUidRegex, eventRegistry, uidEvent, customEvents, nativeEvents, EventHandler, event_handler_default;
  var init_event_handler = __esm({
    "node_modules/bootstrap/js/src/dom/event-handler.js"() {
      init_util();
      namespaceRegex = /[^.]*(?=\..*)\.|.*/;
      stripNameRegex = /\..*/;
      stripUidRegex = /::\d+$/;
      eventRegistry = {};
      uidEvent = 1;
      customEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
      };
      nativeEvents = /* @__PURE__ */ new Set([
        "click",
        "dblclick",
        "mouseup",
        "mousedown",
        "contextmenu",
        "mousewheel",
        "DOMMouseScroll",
        "mouseover",
        "mouseout",
        "mousemove",
        "selectstart",
        "selectend",
        "keydown",
        "keypress",
        "keyup",
        "orientationchange",
        "touchstart",
        "touchmove",
        "touchend",
        "touchcancel",
        "pointerdown",
        "pointermove",
        "pointerup",
        "pointerleave",
        "pointercancel",
        "gesturestart",
        "gesturechange",
        "gestureend",
        "focus",
        "blur",
        "change",
        "reset",
        "select",
        "submit",
        "focusin",
        "focusout",
        "load",
        "unload",
        "beforeunload",
        "resize",
        "move",
        "DOMContentLoaded",
        "readystatechange",
        "error",
        "abort",
        "scroll"
      ]);
      EventHandler = {
        on(element, event, handler, delegationFunction) {
          addHandler(element, event, handler, delegationFunction, false);
        },
        one(element, event, handler, delegationFunction) {
          addHandler(element, event, handler, delegationFunction, true);
        },
        off(element, originalTypeEvent, handler, delegationFunction) {
          if (typeof originalTypeEvent !== "string" || !element) {
            return;
          }
          const [isDelegated, callable, typeEvent] = normalizeParameters(originalTypeEvent, handler, delegationFunction);
          const inNamespace = typeEvent !== originalTypeEvent;
          const events = getElementEvents(element);
          const storeElementEvent = events[typeEvent] || {};
          const isNamespace = originalTypeEvent.startsWith(".");
          if (typeof callable !== "undefined") {
            if (!Object.keys(storeElementEvent).length) {
              return;
            }
            removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
            return;
          }
          if (isNamespace) {
            for (const elementEvent of Object.keys(events)) {
              removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
            }
          }
          for (const keyHandlers of Object.keys(storeElementEvent)) {
            const handlerKey = keyHandlers.replace(stripUidRegex, "");
            if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
              const event = storeElementEvent[keyHandlers];
              removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
            }
          }
        },
        trigger(element, event, args) {
          if (typeof event !== "string" || !element) {
            return null;
          }
          const $ = getjQuery();
          const typeEvent = getTypeEvent(event);
          const inNamespace = event !== typeEvent;
          let jQueryEvent = null;
          let bubbles = true;
          let nativeDispatch = true;
          let defaultPrevented = false;
          if (inNamespace && $) {
            jQueryEvent = $.Event(event, args);
            $(element).trigger(jQueryEvent);
            bubbles = !jQueryEvent.isPropagationStopped();
            nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
            defaultPrevented = jQueryEvent.isDefaultPrevented();
          }
          let evt = new Event(event, { bubbles, cancelable: true });
          evt = hydrateObj(evt, args);
          if (defaultPrevented) {
            evt.preventDefault();
          }
          if (nativeDispatch) {
            element.dispatchEvent(evt);
          }
          if (evt.defaultPrevented && jQueryEvent) {
            jQueryEvent.preventDefault();
          }
          return evt;
        }
      };
      event_handler_default = EventHandler;
    }
  });

  // node_modules/bootstrap/js/src/dom/data.js
  var elementMap, data_default;
  var init_data = __esm({
    "node_modules/bootstrap/js/src/dom/data.js"() {
      elementMap = /* @__PURE__ */ new Map();
      data_default = {
        set(element, key, instance) {
          if (!elementMap.has(element)) {
            elementMap.set(element, /* @__PURE__ */ new Map());
          }
          const instanceMap = elementMap.get(element);
          if (!instanceMap.has(key) && instanceMap.size !== 0) {
            console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
            return;
          }
          instanceMap.set(key, instance);
        },
        get(element, key) {
          if (elementMap.has(element)) {
            return elementMap.get(element).get(key) || null;
          }
          return null;
        },
        remove(element, key) {
          if (!elementMap.has(element)) {
            return;
          }
          const instanceMap = elementMap.get(element);
          instanceMap.delete(key);
          if (instanceMap.size === 0) {
            elementMap.delete(element);
          }
        }
      };
    }
  });

  // node_modules/bootstrap/js/src/util/config.js
  var Config, config_default;
  var init_config = __esm({
    "node_modules/bootstrap/js/src/util/config.js"() {
      init_util();
      init_manipulator();
      Config = class {
        static get Default() {
          return {};
        }
        static get DefaultType() {
          return {};
        }
        static get NAME() {
          throw new Error('You have to implement the static method "NAME", for each component!');
        }
        _getConfig(config) {
          config = this._mergeConfigObj(config);
          config = this._configAfterMerge(config);
          this._typeCheckConfig(config);
          return config;
        }
        _configAfterMerge(config) {
          return config;
        }
        _mergeConfigObj(config, element) {
          const jsonConfig = isElement(element) ? manipulator_default.getDataAttribute(element, "config") : {};
          return {
            ...this.constructor.Default,
            ...typeof jsonConfig === "object" ? jsonConfig : {},
            ...isElement(element) ? manipulator_default.getDataAttributes(element) : {},
            ...typeof config === "object" ? config : {}
          };
        }
        _typeCheckConfig(config, configTypes = this.constructor.DefaultType) {
          for (const property of Object.keys(configTypes)) {
            const expectedTypes = configTypes[property];
            const value = config[property];
            const valueType = isElement(value) ? "element" : toType(value);
            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
            }
          }
        }
      };
      config_default = Config;
    }
  });

  // node_modules/bootstrap/js/src/base-component.js
  var VERSION, BaseComponent, base_component_default;
  var init_base_component = __esm({
    "node_modules/bootstrap/js/src/base-component.js"() {
      init_data();
      init_util();
      init_event_handler();
      init_config();
      VERSION = "5.2.0";
      BaseComponent = class extends config_default {
        constructor(element, config) {
          super();
          element = getElement(element);
          if (!element) {
            return;
          }
          this._element = element;
          this._config = this._getConfig(config);
          data_default.set(this._element, this.constructor.DATA_KEY, this);
        }
        dispose() {
          data_default.remove(this._element, this.constructor.DATA_KEY);
          event_handler_default.off(this._element, this.constructor.EVENT_KEY);
          for (const propertyName of Object.getOwnPropertyNames(this)) {
            this[propertyName] = null;
          }
        }
        _queueCallback(callback, element, isAnimated = true) {
          executeAfterTransition(callback, element, isAnimated);
        }
        _getConfig(config) {
          config = this._mergeConfigObj(config, this._element);
          config = this._configAfterMerge(config);
          this._typeCheckConfig(config);
          return config;
        }
        static getInstance(element) {
          return data_default.get(getElement(element), this.DATA_KEY);
        }
        static getOrCreateInstance(element, config = {}) {
          return this.getInstance(element) || new this(element, typeof config === "object" ? config : null);
        }
        static get VERSION() {
          return VERSION;
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
        static eventName(name) {
          return `${name}${this.EVENT_KEY}`;
        }
      };
      base_component_default = BaseComponent;
    }
  });

  // node_modules/bootstrap/js/src/util/backdrop.js
  var NAME, CLASS_NAME_FADE, CLASS_NAME_SHOW, EVENT_MOUSEDOWN, Default, DefaultType, Backdrop, backdrop_default;
  var init_backdrop = __esm({
    "node_modules/bootstrap/js/src/util/backdrop.js"() {
      init_event_handler();
      init_util();
      init_config();
      NAME = "backdrop";
      CLASS_NAME_FADE = "fade";
      CLASS_NAME_SHOW = "show";
      EVENT_MOUSEDOWN = `mousedown.bs.${NAME}`;
      Default = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: false,
        isVisible: true,
        rootElement: "body"
      };
      DefaultType = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
      };
      Backdrop = class extends config_default {
        constructor(config) {
          super();
          this._config = this._getConfig(config);
          this._isAppended = false;
          this._element = null;
        }
        static get Default() {
          return Default;
        }
        static get DefaultType() {
          return DefaultType;
        }
        static get NAME() {
          return NAME;
        }
        show(callback) {
          if (!this._config.isVisible) {
            execute(callback);
            return;
          }
          this._append();
          const element = this._getElement();
          if (this._config.isAnimated) {
            reflow(element);
          }
          element.classList.add(CLASS_NAME_SHOW);
          this._emulateAnimation(() => {
            execute(callback);
          });
        }
        hide(callback) {
          if (!this._config.isVisible) {
            execute(callback);
            return;
          }
          this._getElement().classList.remove(CLASS_NAME_SHOW);
          this._emulateAnimation(() => {
            this.dispose();
            execute(callback);
          });
        }
        dispose() {
          if (!this._isAppended) {
            return;
          }
          event_handler_default.off(this._element, EVENT_MOUSEDOWN);
          this._element.remove();
          this._isAppended = false;
        }
        _getElement() {
          if (!this._element) {
            const backdrop = document.createElement("div");
            backdrop.className = this._config.className;
            if (this._config.isAnimated) {
              backdrop.classList.add(CLASS_NAME_FADE);
            }
            this._element = backdrop;
          }
          return this._element;
        }
        _configAfterMerge(config) {
          config.rootElement = getElement(config.rootElement);
          return config;
        }
        _append() {
          if (this._isAppended) {
            return;
          }
          const element = this._getElement();
          this._config.rootElement.append(element);
          event_handler_default.on(element, EVENT_MOUSEDOWN, () => {
            execute(this._config.clickCallback);
          });
          this._isAppended = true;
        }
        _emulateAnimation(callback) {
          executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
        }
      };
      backdrop_default = Backdrop;
    }
  });

  // node_modules/bootstrap/js/src/util/focustrap.js
  var NAME2, DATA_KEY, EVENT_KEY, EVENT_FOCUSIN, EVENT_KEYDOWN_TAB, TAB_KEY, TAB_NAV_FORWARD, TAB_NAV_BACKWARD, Default2, DefaultType2, FocusTrap, focustrap_default;
  var init_focustrap = __esm({
    "node_modules/bootstrap/js/src/util/focustrap.js"() {
      init_event_handler();
      init_selector_engine();
      init_config();
      NAME2 = "focustrap";
      DATA_KEY = "bs.focustrap";
      EVENT_KEY = `.${DATA_KEY}`;
      EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
      EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY}`;
      TAB_KEY = "Tab";
      TAB_NAV_FORWARD = "forward";
      TAB_NAV_BACKWARD = "backward";
      Default2 = {
        autofocus: true,
        trapElement: null
      };
      DefaultType2 = {
        autofocus: "boolean",
        trapElement: "element"
      };
      FocusTrap = class extends config_default {
        constructor(config) {
          super();
          this._config = this._getConfig(config);
          this._isActive = false;
          this._lastTabNavDirection = null;
        }
        static get Default() {
          return Default2;
        }
        static get DefaultType() {
          return DefaultType2;
        }
        static get NAME() {
          return NAME2;
        }
        activate() {
          if (this._isActive) {
            return;
          }
          if (this._config.autofocus) {
            this._config.trapElement.focus();
          }
          event_handler_default.off(document, EVENT_KEY);
          event_handler_default.on(document, EVENT_FOCUSIN, (event) => this._handleFocusin(event));
          event_handler_default.on(document, EVENT_KEYDOWN_TAB, (event) => this._handleKeydown(event));
          this._isActive = true;
        }
        deactivate() {
          if (!this._isActive) {
            return;
          }
          this._isActive = false;
          event_handler_default.off(document, EVENT_KEY);
        }
        _handleFocusin(event) {
          const { trapElement } = this._config;
          if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
            return;
          }
          const elements = selector_engine_default.focusableChildren(trapElement);
          if (elements.length === 0) {
            trapElement.focus();
          } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
            elements[elements.length - 1].focus();
          } else {
            elements[0].focus();
          }
        }
        _handleKeydown(event) {
          if (event.key !== TAB_KEY) {
            return;
          }
          this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
        }
      };
      focustrap_default = FocusTrap;
    }
  });

  // node_modules/bootstrap/js/src/util/component-functions.js
  var enableDismissTrigger;
  var init_component_functions = __esm({
    "node_modules/bootstrap/js/src/util/component-functions.js"() {
      init_event_handler();
      init_util();
      enableDismissTrigger = (component, method = "hide") => {
        const clickEvent = `click.dismiss${component.EVENT_KEY}`;
        const name = component.NAME;
        event_handler_default.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function(event) {
          if (["A", "AREA"].includes(this.tagName)) {
            event.preventDefault();
          }
          if (isDisabled(this)) {
            return;
          }
          const target = getElementFromSelector(this) || this.closest(`.${name}`);
          const instance = component.getOrCreateInstance(target);
          instance[method]();
        });
      };
    }
  });

  // node_modules/bootstrap/js/src/offcanvas.js
  var NAME3, DATA_KEY2, EVENT_KEY2, DATA_API_KEY, EVENT_LOAD_DATA_API, ESCAPE_KEY, CLASS_NAME_SHOW2, CLASS_NAME_SHOWING, CLASS_NAME_HIDING, CLASS_NAME_BACKDROP, OPEN_SELECTOR, EVENT_SHOW, EVENT_SHOWN, EVENT_HIDE, EVENT_HIDE_PREVENTED, EVENT_HIDDEN, EVENT_RESIZE, EVENT_CLICK_DATA_API, EVENT_KEYDOWN_DISMISS, SELECTOR_DATA_TOGGLE, Default3, DefaultType3, Offcanvas, offcanvas_default;
  var init_offcanvas = __esm({
    "node_modules/bootstrap/js/src/offcanvas.js"() {
      init_util();
      init_scrollbar();
      init_event_handler();
      init_base_component();
      init_selector_engine();
      init_backdrop();
      init_focustrap();
      init_component_functions();
      NAME3 = "offcanvas";
      DATA_KEY2 = "bs.offcanvas";
      EVENT_KEY2 = `.${DATA_KEY2}`;
      DATA_API_KEY = ".data-api";
      EVENT_LOAD_DATA_API = `load${EVENT_KEY2}${DATA_API_KEY}`;
      ESCAPE_KEY = "Escape";
      CLASS_NAME_SHOW2 = "show";
      CLASS_NAME_SHOWING = "showing";
      CLASS_NAME_HIDING = "hiding";
      CLASS_NAME_BACKDROP = "offcanvas-backdrop";
      OPEN_SELECTOR = ".offcanvas.show";
      EVENT_SHOW = `show${EVENT_KEY2}`;
      EVENT_SHOWN = `shown${EVENT_KEY2}`;
      EVENT_HIDE = `hide${EVENT_KEY2}`;
      EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY2}`;
      EVENT_HIDDEN = `hidden${EVENT_KEY2}`;
      EVENT_RESIZE = `resize${EVENT_KEY2}`;
      EVENT_CLICK_DATA_API = `click${EVENT_KEY2}${DATA_API_KEY}`;
      EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY2}`;
      SELECTOR_DATA_TOGGLE = '[data-bs-toggle="offcanvas"]';
      Default3 = {
        backdrop: true,
        keyboard: true,
        scroll: false
      };
      DefaultType3 = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
      };
      Offcanvas = class extends base_component_default {
        constructor(element, config) {
          super(element, config);
          this._isShown = false;
          this._backdrop = this._initializeBackDrop();
          this._focustrap = this._initializeFocusTrap();
          this._addEventListeners();
        }
        static get Default() {
          return Default3;
        }
        static get DefaultType() {
          return DefaultType3;
        }
        static get NAME() {
          return NAME3;
        }
        toggle(relatedTarget) {
          return this._isShown ? this.hide() : this.show(relatedTarget);
        }
        show(relatedTarget) {
          if (this._isShown) {
            return;
          }
          const showEvent = event_handler_default.trigger(this._element, EVENT_SHOW, { relatedTarget });
          if (showEvent.defaultPrevented) {
            return;
          }
          this._isShown = true;
          this._backdrop.show();
          if (!this._config.scroll) {
            new scrollbar_default().hide();
          }
          this._element.setAttribute("aria-modal", true);
          this._element.setAttribute("role", "dialog");
          this._element.classList.add(CLASS_NAME_SHOWING);
          const completeCallBack = () => {
            if (!this._config.scroll || this._config.backdrop) {
              this._focustrap.activate();
            }
            this._element.classList.add(CLASS_NAME_SHOW2);
            this._element.classList.remove(CLASS_NAME_SHOWING);
            event_handler_default.trigger(this._element, EVENT_SHOWN, { relatedTarget });
          };
          this._queueCallback(completeCallBack, this._element, true);
        }
        hide() {
          if (!this._isShown) {
            return;
          }
          const hideEvent = event_handler_default.trigger(this._element, EVENT_HIDE);
          if (hideEvent.defaultPrevented) {
            return;
          }
          this._focustrap.deactivate();
          this._element.blur();
          this._isShown = false;
          this._element.classList.add(CLASS_NAME_HIDING);
          this._backdrop.hide();
          const completeCallback = () => {
            this._element.classList.remove(CLASS_NAME_SHOW2, CLASS_NAME_HIDING);
            this._element.removeAttribute("aria-modal");
            this._element.removeAttribute("role");
            if (!this._config.scroll) {
              new scrollbar_default().reset();
            }
            event_handler_default.trigger(this._element, EVENT_HIDDEN);
          };
          this._queueCallback(completeCallback, this._element, true);
        }
        dispose() {
          this._backdrop.dispose();
          this._focustrap.deactivate();
          super.dispose();
        }
        _initializeBackDrop() {
          const clickCallback = () => {
            if (this._config.backdrop === "static") {
              event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED);
              return;
            }
            this.hide();
          };
          const isVisible2 = Boolean(this._config.backdrop);
          return new backdrop_default({
            className: CLASS_NAME_BACKDROP,
            isVisible: isVisible2,
            isAnimated: true,
            rootElement: this._element.parentNode,
            clickCallback: isVisible2 ? clickCallback : null
          });
        }
        _initializeFocusTrap() {
          return new focustrap_default({
            trapElement: this._element
          });
        }
        _addEventListeners() {
          event_handler_default.on(this._element, EVENT_KEYDOWN_DISMISS, (event) => {
            if (event.key !== ESCAPE_KEY) {
              return;
            }
            if (!this._config.keyboard) {
              event_handler_default.trigger(this._element, EVENT_HIDE_PREVENTED);
              return;
            }
            this.hide();
          });
        }
        static jQueryInterface(config) {
          return this.each(function() {
            const data = Offcanvas.getOrCreateInstance(this, config);
            if (typeof config !== "string") {
              return;
            }
            if (data[config] === void 0 || config.startsWith("_") || config === "constructor") {
              throw new TypeError(`No method named "${config}"`);
            }
            data[config](this);
          });
        }
      };
      event_handler_default.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(event) {
        const target = getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName)) {
          event.preventDefault();
        }
        if (isDisabled(this)) {
          return;
        }
        event_handler_default.one(target, EVENT_HIDDEN, () => {
          if (isVisible(this)) {
            this.focus();
          }
        });
        const alreadyOpen = selector_engine_default.findOne(OPEN_SELECTOR);
        if (alreadyOpen && alreadyOpen !== target) {
          Offcanvas.getInstance(alreadyOpen).hide();
        }
        const data = Offcanvas.getOrCreateInstance(target);
        data.toggle(this);
      });
      event_handler_default.on(window, EVENT_LOAD_DATA_API, () => {
        for (const selector of selector_engine_default.find(OPEN_SELECTOR)) {
          Offcanvas.getOrCreateInstance(selector).show();
        }
      });
      event_handler_default.on(window, EVENT_RESIZE, () => {
        for (const element of selector_engine_default.find("[aria-modal][class*=show][class*=offcanvas-]")) {
          if (getComputedStyle(element).position !== "fixed") {
            Offcanvas.getOrCreateInstance(element).hide();
          }
        }
      });
      enableDismissTrigger(Offcanvas);
      defineJQueryPlugin(Offcanvas);
      offcanvas_default = Offcanvas;
    }
  });

  // ns-hugo:D:\Dev\PRO\fr.rachelbourgeois-psychologue\assets\js\bootstrap.js
  var require_bootstrap = __commonJS({
    "ns-hugo:D:\\Dev\\PRO\\fr.rachelbourgeois-psychologue\\assets\\js\\bootstrap.js"(exports, module) {
      init_offcanvas();
      module.exports = {
        Offcanvas: offcanvas_default
      };
    }
  });

  // <stdin>
  var bootstrap = __toESM(require_bootstrap());
})();
