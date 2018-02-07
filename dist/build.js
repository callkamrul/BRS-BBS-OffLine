/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _App = __webpack_require__(5);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var eventHub = new _vue2.default({
		el: '#mountwrap',
		components: { App: _App2.default }
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
	 * Vue.js v2.5.13
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	var emptyObject = Object.freeze({});

	// these helpers produces better vm code in JS engines due to their
	// explicitness and function inlining
	function isUndef (v) {
	  return v === undefined || v === null
	}

	function isDef (v) {
	  return v !== undefined && v !== null
	}

	function isTrue (v) {
	  return v === true
	}

	function isFalse (v) {
	  return v === false
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return (
	    typeof value === 'string' ||
	    typeof value === 'number' ||
	    // $flow-disable-line
	    typeof value === 'symbol' ||
	    typeof value === 'boolean'
	  )
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Get the raw type string of a value e.g. [object Object]
	 */
	var _toString = Object.prototype.toString;

	function toRawType (value) {
	  return _toString.call(value).slice(8, -1)
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	function isPlainObject (obj) {
	  return _toString.call(obj) === '[object Object]'
	}

	function isRegExp (v) {
	  return _toString.call(v) === '[object RegExp]'
	}

	/**
	 * Check if val is a valid array index.
	 */
	function isValidArrayIndex (val) {
	  var n = parseFloat(String(val));
	  return n >= 0 && Math.floor(n) === n && isFinite(val)
	}

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Check if a attribute is a reserved attribute.
	 */
	var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '-$1').toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 * Stubbing args to make Flow happy without leaving useless transpiled code
	 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
	 */
	function noop (a, b, c) {}

	/**
	 * Always return false.
	 */
	var no = function (a, b, c) { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  if (a === b) { return true }
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      var isArrayA = Array.isArray(a);
	      var isArrayB = Array.isArray(b);
	      if (isArrayA && isArrayB) {
	        return a.length === b.length && a.every(function (e, i) {
	          return looseEqual(e, b[i])
	        })
	      } else if (!isArrayA && !isArrayB) {
	        var keysA = Object.keys(a);
	        var keysB = Object.keys(b);
	        return keysA.length === keysB.length && keysA.every(function (key) {
	          return looseEqual(a[key], b[key])
	        })
	      } else {
	        /* istanbul ignore next */
	        return false
	      }
	    } catch (e) {
	      /* istanbul ignore next */
	      return false
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  }
	}

	var SSR_ATTR = 'data-server-rendered';

	var ASSET_TYPES = [
	  'component',
	  'directive',
	  'filter'
	];

	var LIFECYCLE_HOOKS = [
	  'beforeCreate',
	  'created',
	  'beforeMount',
	  'mounted',
	  'beforeUpdate',
	  'updated',
	  'beforeDestroy',
	  'destroyed',
	  'activated',
	  'deactivated',
	  'errorCaptured'
	];

	/*  */

	var config = ({
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  // $flow-disable-line
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: "development" !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Warn handler for watcher warns
	   */
	  warnHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  // $flow-disable-line
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if an attribute is reserved so that it cannot be used as a component
	   * prop. This is platform-dependent and may be overwritten.
	   */
	  isReservedAttr: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * Exposed for legacy reasons
	   */
	  _lifecycleHooks: LIFECYCLE_HOOKS
	});

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}

	/*  */


	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
	var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
	var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

	// Firefox has a "watch" function on Object.prototype...
	var nativeWatch = ({}).watch;

	var supportsPassive = false;
	if (inBrowser) {
	  try {
	    var opts = {};
	    Object.defineProperty(opts, 'passive', ({
	      get: function get () {
	        /* istanbul ignore next */
	        supportsPassive = true;
	      }
	    })); // https://github.com/facebook/flow/issues/285
	    window.addEventListener('test-passive', null, opts);
	  } catch (e) {}
	}

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}

	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	var _Set;
	/* istanbul ignore if */ // $flow-disable-line
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	/*  */

	var warn = noop;
	var tip = noop;
	var generateComponentTrace = (noop); // work around flow check
	var formatComponentName = (noop);

	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };

	  warn = function (msg, vm) {
	    var trace = vm ? generateComponentTrace(vm) : '';

	    if (config.warnHandler) {
	      config.warnHandler.call(null, msg, vm, trace);
	    } else if (hasConsole && (!config.silent)) {
	      console.error(("[Vue warn]: " + msg + trace));
	    }
	  };

	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var options = typeof vm === 'function' && vm.cid != null
	      ? vm.options
	      : vm._isVue
	        ? vm.$options || vm.constructor.options
	        : vm || {};
	    var name = options.name || options._componentTag;
	    var file = options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };

	  var repeat = function (str, n) {
	    var res = '';
	    while (n) {
	      if (n % 2 === 1) { res += str; }
	      if (n > 1) { str += str; }
	      n >>= 1;
	    }
	    return res
	  };

	  generateComponentTrace = function (vm) {
	    if (vm._isVue && vm.$parent) {
	      var tree = [];
	      var currentRecursiveSequence = 0;
	      while (vm) {
	        if (tree.length > 0) {
	          var last = tree[tree.length - 1];
	          if (last.constructor === vm.constructor) {
	            currentRecursiveSequence++;
	            vm = vm.$parent;
	            continue
	          } else if (currentRecursiveSequence > 0) {
	            tree[tree.length - 1] = [last, currentRecursiveSequence];
	            currentRecursiveSequence = 0;
	          }
	        }
	        tree.push(vm);
	        vm = vm.$parent;
	      }
	      return '\n\nfound in\n\n' + tree
	        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
	            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
	            : formatComponentName(vm))); })
	        .join('\n')
	    } else {
	      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
	    }
	  };
	}

	/*  */


	var uid = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions,
	  asyncFactory
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.fnContext = undefined;
	  this.fnOptions = undefined;
	  this.fnScopeId = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	  this.asyncFactory = asyncFactory;
	  this.asyncMeta = undefined;
	  this.isAsyncPlaceholder = false;
	};

	var prototypeAccessors = { child: { configurable: true } };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function (text) {
	  if ( text === void 0 ) text = '';

	  var node = new VNode();
	  node.text = text;
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode, deep) {
	  var componentOptions = vnode.componentOptions;
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    componentOptions,
	    vnode.asyncFactory
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isComment = vnode.isComment;
	  cloned.fnContext = vnode.fnContext;
	  cloned.fnOptions = vnode.fnOptions;
	  cloned.fnScopeId = vnode.fnScopeId;
	  cloned.isCloned = true;
	  if (deep) {
	    if (vnode.children) {
	      cloned.children = cloneVNodes(vnode.children, true);
	    }
	    if (componentOptions && componentOptions.children) {
	      componentOptions.children = cloneVNodes(componentOptions.children, true);
	    }
	  }
	  return cloned
	}

	function cloneVNodes (vnodes, deep) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i], deep);
	  }
	  return res
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var args = [], len = arguments.length;
	    while ( len-- ) args[ len ] = arguments[ len ];

	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src, keys) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value) || value instanceof VNode) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive (
	  obj,
	  key,
	  val,
	  customSetter,
	  shallow
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = !shallow && observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	          if (Array.isArray(value)) {
	            dependArray(value);
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = !shallow && observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (key in target && !(key in Object.prototype)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && isValidArrayIndex(key)) {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	function mergeDataOrFn (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
	        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
	      )
	    }
	  } else {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm, vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm, vm)
	        : parentVal;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}

	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    if (childVal && typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );

	      return parentVal
	    }
	    return mergeDataOrFn(parentVal, childVal)
	  }

	  return mergeDataOrFn(parentVal, childVal, vm)
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	LIFECYCLE_HOOKS.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (
	  parentVal,
	  childVal,
	  vm,
	  key
	) {
	  var res = Object.create(parentVal || null);
	  if (childVal) {
	    "development" !== 'production' && assertObjectType(key, childVal, vm);
	    return extend(res, childVal)
	  } else {
	    return res
	  }
	}

	ASSET_TYPES.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (
	  parentVal,
	  childVal,
	  vm,
	  key
	) {
	  // work around Firefox's Object.prototype.watch...
	  if (parentVal === nativeWatch) { parentVal = undefined; }
	  if (childVal === nativeWatch) { childVal = undefined; }
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  {
	    assertObjectType(key, childVal, vm);
	  }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key$1 in childVal) {
	    var parent = ret[key$1];
	    var child = childVal[key$1];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key$1] = parent
	      ? parent.concat(child)
	      : Array.isArray(child) ? child : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.inject =
	strats.computed = function (
	  parentVal,
	  childVal,
	  vm,
	  key
	) {
	  if (childVal && "development" !== 'production') {
	    assertObjectType(key, childVal, vm);
	  }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  if (childVal) { extend(ret, childVal); }
	  return ret
	};
	strats.provide = mergeDataOrFn;

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    validateComponentName(key);
	  }
	}

	function validateComponentName (name) {
	  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	    warn(
	      'Invalid component name: "' + name + '". Component names ' +
	      'can only contain alphanumeric characters and the hyphen, ' +
	      'and must start with a letter.'
	    );
	  }
	  if (isBuiltInTag(name) || config.isReservedTag(name)) {
	    warn(
	      'Do not use built-in or reserved HTML elements as component ' +
	      'id: ' + name
	    );
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options, vm) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  } else {
	    warn(
	      "Invalid value for option \"props\": expected an Array or an Object, " +
	      "but got " + (toRawType(props)) + ".",
	      vm
	    );
	  }
	  options.props = res;
	}

	/**
	 * Normalize all injections into Object-based format
	 */
	function normalizeInject (options, vm) {
	  var inject = options.inject;
	  if (!inject) { return }
	  var normalized = options.inject = {};
	  if (Array.isArray(inject)) {
	    for (var i = 0; i < inject.length; i++) {
	      normalized[inject[i]] = { from: inject[i] };
	    }
	  } else if (isPlainObject(inject)) {
	    for (var key in inject) {
	      var val = inject[key];
	      normalized[key] = isPlainObject(val)
	        ? extend({ from: key }, val)
	        : { from: val };
	    }
	  } else {
	    warn(
	      "Invalid value for option \"inject\": expected an Array or an Object, " +
	      "but got " + (toRawType(inject)) + ".",
	      vm
	    );
	  }
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	function assertObjectType (name, value, vm) {
	  if (!isPlainObject(value)) {
	    warn(
	      "Invalid value for option \"" + name + "\": expected an Object, " +
	      "but got " + (toRawType(value)) + ".",
	      vm
	    );
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }

	  if (typeof child === 'function') {
	    child = child.options;
	  }

	  normalizeProps(child, vm);
	  normalizeInject(child, vm);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if ("development" !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined
	  ) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      "Invalid prop: type check failed for prop \"" + name + "\"." +
	      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
	      ", got " + (toRawType(value)) + ".",
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (simpleCheckRE.test(expectedType)) {
	    var t = typeof value;
	    valid = t === expectedType.toLowerCase();
	    // for primitive wrapper objects
	    if (!valid && t === 'object') {
	      valid = value instanceof type;
	    }
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : ''
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}

	/*  */

	function handleError (err, vm, info) {
	  if (vm) {
	    var cur = vm;
	    while ((cur = cur.$parent)) {
	      var hooks = cur.$options.errorCaptured;
	      if (hooks) {
	        for (var i = 0; i < hooks.length; i++) {
	          try {
	            var capture = hooks[i].call(cur, err, vm, info) === false;
	            if (capture) { return }
	          } catch (e) {
	            globalHandleError(e, cur, 'errorCaptured hook');
	          }
	        }
	      }
	    }
	  }
	  globalHandleError(err, vm, info);
	}

	function globalHandleError (err, vm, info) {
	  if (config.errorHandler) {
	    try {
	      return config.errorHandler.call(null, err, vm, info)
	    } catch (e) {
	      logError(e, null, 'config.errorHandler');
	    }
	  }
	  logError(err, vm, info);
	}

	function logError (err, vm, info) {
	  {
	    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
	  }
	  /* istanbul ignore else */
	  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
	    console.error(err);
	  } else {
	    throw err
	  }
	}

	/*  */
	/* globals MessageChannel */

	var callbacks = [];
	var pending = false;

	function flushCallbacks () {
	  pending = false;
	  var copies = callbacks.slice(0);
	  callbacks.length = 0;
	  for (var i = 0; i < copies.length; i++) {
	    copies[i]();
	  }
	}

	// Here we have async deferring wrappers using both micro and macro tasks.
	// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
	// micro tasks have too high a priority and fires in between supposedly
	// sequential events (e.g. #4521, #6690) or even between bubbling of the same
	// event (#6566). However, using macro tasks everywhere also has subtle problems
	// when state is changed right before repaint (e.g. #6813, out-in transitions).
	// Here we use micro task by default, but expose a way to force macro task when
	// needed (e.g. in event handlers attached by v-on).
	var microTimerFunc;
	var macroTimerFunc;
	var useMacroTask = false;

	// Determine (macro) Task defer implementation.
	// Technically setImmediate should be the ideal choice, but it's only available
	// in IE. The only polyfill that consistently queues the callback after all DOM
	// events triggered in the same loop is by using MessageChannel.
	/* istanbul ignore if */
	if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
	  macroTimerFunc = function () {
	    setImmediate(flushCallbacks);
	  };
	} else if (typeof MessageChannel !== 'undefined' && (
	  isNative(MessageChannel) ||
	  // PhantomJS
	  MessageChannel.toString() === '[object MessageChannelConstructor]'
	)) {
	  var channel = new MessageChannel();
	  var port = channel.port2;
	  channel.port1.onmessage = flushCallbacks;
	  macroTimerFunc = function () {
	    port.postMessage(1);
	  };
	} else {
	  /* istanbul ignore next */
	  macroTimerFunc = function () {
	    setTimeout(flushCallbacks, 0);
	  };
	}

	// Determine MicroTask defer implementation.
	/* istanbul ignore next, $flow-disable-line */
	if (typeof Promise !== 'undefined' && isNative(Promise)) {
	  var p = Promise.resolve();
	  microTimerFunc = function () {
	    p.then(flushCallbacks);
	    // in problematic UIWebViews, Promise.then doesn't completely break, but
	    // it can get stuck in a weird state where callbacks are pushed into the
	    // microtask queue but the queue isn't being flushed, until the browser
	    // needs to do some other work, e.g. handle a timer. Therefore we can
	    // "force" the microtask queue to be flushed by adding an empty timer.
	    if (isIOS) { setTimeout(noop); }
	  };
	} else {
	  // fallback to macro
	  microTimerFunc = macroTimerFunc;
	}

	/**
	 * Wrap a function so that if any code inside triggers state change,
	 * the changes are queued using a Task instead of a MicroTask.
	 */
	function withMacroTask (fn) {
	  return fn._withTask || (fn._withTask = function () {
	    useMacroTask = true;
	    var res = fn.apply(null, arguments);
	    useMacroTask = false;
	    return res
	  })
	}

	function nextTick (cb, ctx) {
	  var _resolve;
	  callbacks.push(function () {
	    if (cb) {
	      try {
	        cb.call(ctx);
	      } catch (e) {
	        handleError(e, ctx, 'nextTick');
	      }
	    } else if (_resolve) {
	      _resolve(ctx);
	    }
	  });
	  if (!pending) {
	    pending = true;
	    if (useMacroTask) {
	      macroTimerFunc();
	    } else {
	      microTimerFunc();
	    }
	  }
	  // $flow-disable-line
	  if (!cb && typeof Promise !== 'undefined') {
	    return new Promise(function (resolve) {
	      _resolve = resolve;
	    })
	  }
	}

	/*  */

	var mark;
	var measure;

	{
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      'referenced during render. Make sure that this property is reactive, ' +
	      'either in the data option, or for class-based components, by ' +
	      'initializing the property. ' +
	      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */

	var seenObjects = new _Set();

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	function traverse (val) {
	  _traverse(val, seenObjects);
	  seenObjects.clear();
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var passive = name.charAt(0) === '&';
	  name = passive ? name.slice(1) : name;
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture,
	    passive: passive
	  }
	});

	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;

	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      var cloned = fns.slice();
	      for (var i = 0; i < cloned.length; i++) {
	        cloned[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, def, cur, old, event;
	  for (name in on) {
	    def = cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    /* istanbul ignore if */
	    if (isUndef(cur)) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (isUndef(old)) {
	      if (isUndef(cur.fns)) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture, event.passive, event.params);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (isUndef(on[name])) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
	  if (def instanceof VNode) {
	    def = def.data.hook || (def.data.hook = {});
	  }
	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }

	  if (isUndef(oldHook)) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}

	/*  */

	function extractPropsFromVNodeData (
	  data,
	  Ctor,
	  tag
	) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (isUndef(propOptions)) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  if (isDef(attrs) || isDef(props)) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && hasOwn(attrs, keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey, false);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (isDef(hash)) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function isTextNode (node) {
	  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, lastIndex, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (isUndef(c) || typeof c === 'boolean') { continue }
	    lastIndex = res.length - 1;
	    last = res[lastIndex];
	    //  nested
	    if (Array.isArray(c)) {
	      if (c.length > 0) {
	        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
	        // merge adjacent text nodes
	        if (isTextNode(c[0]) && isTextNode(last)) {
	          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
	          c.shift();
	        }
	        res.push.apply(res, c);
	      }
	    } else if (isPrimitive(c)) {
	      if (isTextNode(last)) {
	        // merge adjacent text nodes
	        // this is necessary for SSR hydration because text nodes are
	        // essentially merged when rendered to HTML strings
	        res[lastIndex] = createTextVNode(last.text + c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (isTextNode(c) && isTextNode(last)) {
	        // merge adjacent text nodes
	        res[lastIndex] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (isTrue(children._isVList) &&
	          isDef(c.tag) &&
	          isUndef(c.key) &&
	          isDef(nestedIndex)) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function ensureCtor (comp, base) {
	  if (
	    comp.__esModule ||
	    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
	  ) {
	    comp = comp.default;
	  }
	  return isObject(comp)
	    ? base.extend(comp)
	    : comp
	}

	function createAsyncPlaceholder (
	  factory,
	  data,
	  context,
	  children,
	  tag
	) {
	  var node = createEmptyVNode();
	  node.asyncFactory = factory;
	  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
	  return node
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  context
	) {
	  if (isTrue(factory.error) && isDef(factory.errorComp)) {
	    return factory.errorComp
	  }

	  if (isDef(factory.resolved)) {
	    return factory.resolved
	  }

	  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	    return factory.loadingComp
	  }

	  if (isDef(factory.contexts)) {
	    // already pending
	    factory.contexts.push(context);
	  } else {
	    var contexts = factory.contexts = [context];
	    var sync = true;

	    var forceRender = function () {
	      for (var i = 0, l = contexts.length; i < l; i++) {
	        contexts[i].$forceUpdate();
	      }
	    };

	    var resolve = once(function (res) {
	      // cache resolved
	      factory.resolved = ensureCtor(res, baseCtor);
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        forceRender();
	      }
	    });

	    var reject = once(function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	      if (isDef(factory.errorComp)) {
	        factory.error = true;
	        forceRender();
	      }
	    });

	    var res = factory(resolve, reject);

	    if (isObject(res)) {
	      if (typeof res.then === 'function') {
	        // () => Promise
	        if (isUndef(factory.resolved)) {
	          res.then(resolve, reject);
	        }
	      } else if (isDef(res.component) && typeof res.component.then === 'function') {
	        res.component.then(resolve, reject);

	        if (isDef(res.error)) {
	          factory.errorComp = ensureCtor(res.error, baseCtor);
	        }

	        if (isDef(res.loading)) {
	          factory.loadingComp = ensureCtor(res.loading, baseCtor);
	          if (res.delay === 0) {
	            factory.loading = true;
	          } else {
	            setTimeout(function () {
	              if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                factory.loading = true;
	                forceRender();
	              }
	            }, res.delay || 200);
	          }
	        }

	        if (isDef(res.timeout)) {
	          setTimeout(function () {
	            if (isUndef(factory.resolved)) {
	              reject(
	                "timeout (" + (res.timeout) + "ms)"
	              );
	            }
	          }, res.timeout);
	        }
	      }
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.loading
	      ? factory.loadingComp
	      : factory.resolved
	  }
	}

	/*  */

	function isAsyncPlaceholder (node) {
	  return node.isComment && node.asyncFactory
	}

	/*  */

	function getFirstComponentChild (children) {
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      var c = children[i];
	      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
	        return c
	      }
	    }
	  }
	}

	/*  */

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add (event, fn, once) {
	  if (once) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	  target = undefined;
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$off(event[i], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (!fn) {
	      vm._events[event] = null;
	      return vm
	    }
	    if (fn) {
	      // specific handler
	      var cb;
	      var i$1 = cbs.length;
	      while (i$1--) {
	        cb = cbs[i$1];
	        if (cb === fn || cb.fn === fn) {
	          cbs.splice(i$1, 1);
	          break
	        }
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        try {
	          cbs[i].apply(vm, args);
	        } catch (e) {
	          handleError(e, vm, ("event handler for \"" + event + "\""));
	        }
	      }
	    }
	    return vm
	  };
	}

	/*  */



	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    var data = child.data;
	    // remove slot attribute if the node is resolved as a Vue slot node
	    if (data && data.attrs && data.attrs.slot) {
	      delete data.attrs.slot;
	    }
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.fnContext === context) &&
	      data && data.slot != null
	    ) {
	      var name = data.slot;
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children || []);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      (slots.default || (slots.default = [])).push(child);
	    }
	  }
	  // ignore slots that contains only whitespace
	  for (var name$1 in slots) {
	    if (slots[name$1].every(isWhitespace)) {
	      delete slots[name$1];
	    }
	  }
	  return slots
	}

	function isWhitespace (node) {
	  return (node.isComment && !node.asyncFactory) || node.text === ' '
	}

	function resolveScopedSlots (
	  fns, // see flow/vnode
	  res
	) {
	  res = res || {};
	  for (var i = 0; i < fns.length; i++) {
	    if (Array.isArray(fns[i])) {
	      resolveScopedSlots(fns[i], res);
	    } else {
	      res[fns[i].key] = fns[i].fn;
	    }
	  }
	  return res
	}

	/*  */

	var activeInstance = null;
	var isUpdatingChildComponent = false;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	      // no need for the ref nodes after initial patch
	      // this prevents keeping a detached DOM tree in memory (#5851)
	      vm.$options._parentElm = vm.$options._refElm = null;
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // release circular reference (#6759)
	    if (vm.$vnode) {
	      vm.$vnode.parent = null;
	    }
	  };
	}

	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');

	  var updateComponent;
	  /* istanbul ignore if */
	  if ("development" !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;

	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure(("vue " + name + " render"), startTag, endTag);

	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure(("vue " + name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }

	  // we set this to vm._watcher inside the watcher's constructor
	  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
	  // component's mounted hook), which relies on vm._watcher being already defined
	  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
	  hydrating = false;

	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}

	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  {
	    isUpdatingChildComponent = true;
	  }

	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );

	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;

	  // update $attrs and $listeners hash
	  // these are also reactive so they may trigger child update if the child
	  // used them during render
	  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
	  vm.$listeners = listeners || emptyObject;

	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }

	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }

	  {
	    isUpdatingChildComponent = false;
	  }
	}

	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}

	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive === null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var MAX_UPDATE_COUNT = 100;

	var queue = [];
	var activatedChildren = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  index = queue.length = activatedChildren.length = 0;
	  has = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > MAX_UPDATE_COUNT) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // keep copies of post queues before resetting state
	  var activatedQueue = activatedChildren.slice();
	  var updatedQueue = queue.slice();

	  resetSchedulerState();

	  // call component updated and activated hooks
	  callActivatedHooks(activatedQueue);
	  callUpdatedHooks(updatedQueue);

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	function callUpdatedHooks (queue) {
	  var i = queue.length;
	  while (i--) {
	    var watcher = queue[i];
	    var vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	}

	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */
	function queueActivatedComponent (vm) {
	  // setting _inactive to false here so that a render function can
	  // rely on checking whether it's in an inactive tree (e.g. router-view)
	  vm._inactive = false;
	  activatedChildren.push(vm);
	}

	function callActivatedHooks (queue) {
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]._inactive = true;
	    activateChildComponent(queue[i], true /* true */);
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i > index && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(i + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options,
	  isRenderWatcher
	) {
	  this.vm = vm;
	  if (isRenderWatcher) {
	    vm._watcher = this;
	  }
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  try {
	    value = this.getter.call(vm, vm);
	  } catch (e) {
	    if (this.user) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    } else {
	      throw e
	    }
	  } finally {
	    // "touch" every property so they are all tracked as
	    // dependencies for deep watching
	    if (this.deep) {
	      traverse(value);
	    }
	    popTarget();
	    this.cleanupDeps();
	  }
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/*  */

	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch && opts.watch !== nativeWatch) {
	    initWatch(vm, opts.watch);
	  }
	}

	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    {
	      var hyphenatedKey = hyphenate(key);
	      if (isReservedAttribute(hyphenatedKey) ||
	          config.isReservedAttr(hyphenatedKey)) {
	        warn(
	          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive(props, key, value, function () {
	        if (vm.$parent && !isUpdatingChildComponent) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var methods = vm.$options.methods;
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    {
	      if (methods && hasOwn(methods, key)) {
	        warn(
	          ("Method \"" + key + "\" has already been defined as a data property."),
	          vm
	        );
	      }
	    }
	    if (props && hasOwn(props, key)) {
	      "development" !== 'production' && warn(
	        "The data property \"" + key + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(key)) {
	      proxy(vm, "_data", key);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
	  try {
	    return data.call(vm, vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
	  // $flow-disable-line
	  var watchers = vm._computedWatchers = Object.create(null);
	  // computed properties are just getters during SSR
	  var isSSR = isServerRendering();

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    if ("development" !== 'production' && getter == null) {
	      warn(
	        ("Getter is missing for computed property \"" + key + "\"."),
	        vm
	      );
	    }

	    if (!isSSR) {
	      // create internal watcher for the computed property.
	      watchers[key] = new Watcher(
	        vm,
	        getter || noop,
	        noop,
	        computedWatcherOptions
	      );
	    }

	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    } else {
	      if (key in vm.$data) {
	        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
	      } else if (vm.$options.props && key in vm.$options.props) {
	        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
	      }
	    }
	  }
	}

	function defineComputed (
	  target,
	  key,
	  userDef
	) {
	  var shouldCache = !isServerRendering();
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = shouldCache
	      ? createComputedGetter(key)
	      : userDef;
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? shouldCache && userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  if ("development" !== 'production' &&
	      sharedPropertyDefinition.set === noop) {
	    sharedPropertyDefinition.set = function () {
	      warn(
	        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
	        this
	      );
	    };
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}

	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    {
	      if (methods[key] == null) {
	        warn(
	          "Method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("Method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	      if ((key in vm) && isReserved(key)) {
	        warn(
	          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
	          "Avoid defining component methods that start with _ or $."
	        );
	      }
	    }
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (
	  vm,
	  keyOrFn,
	  handler,
	  options
	) {
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  return vm.$watch(keyOrFn, handler, options)
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    if (isPlainObject(cb)) {
	      return createWatcher(vm, expOrFn, cb, options)
	    }
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	/*  */

	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}

	function initInjections (vm) {
	  var result = resolveInject(vm.$options.inject, vm);
	  if (result) {
	    observerState.shouldConvert = false;
	    Object.keys(result).forEach(function (key) {
	      /* istanbul ignore else */
	      {
	        defineReactive(vm, key, result[key], function () {
	          warn(
	            "Avoid mutating an injected value directly since the changes will be " +
	            "overwritten whenever the provided component re-renders. " +
	            "injection being mutated: \"" + key + "\"",
	            vm
	          );
	        });
	      }
	    });
	    observerState.shouldConvert = true;
	  }
	}

	function resolveInject (inject, vm) {
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    var result = Object.create(null);
	    var keys = hasSymbol
	      ? Reflect.ownKeys(inject).filter(function (key) {
	        /* istanbul ignore next */
	        return Object.getOwnPropertyDescriptor(inject, key).enumerable
	      })
	      : Object.keys(inject);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var provideKey = inject[key].from;
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          result[key] = source._provided[provideKey];
	          break
	        }
	        source = source.$parent;
	      }
	      if (!source) {
	        if ('default' in inject[key]) {
	          var provideDefault = inject[key].default;
	          result[key] = typeof provideDefault === 'function'
	            ? provideDefault.call(vm)
	            : provideDefault;
	        } else {
	          warn(("Injection \"" + key + "\" not found"), vm);
	        }
	      }
	    }
	    return result
	  }
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  if (isDef(ret)) {
	    (ret)._isVList = true;
	  }
	  return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  var nodes;
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      if ("development" !== 'production' && !isObject(bindObject)) {
	        warn(
	          'slot v-bind without argument expects an Object',
	          this
	        );
	      }
	      props = extend(extend({}, bindObject), props);
	    }
	    nodes = scopedSlotFn(props) || fallback;
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes) {
	      if ("development" !== 'production' && slotNodes._rendered) {
	        warn(
	          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	          "- this will likely cause render errors.",
	          this
	        );
	      }
	      slotNodes._rendered = true;
	    }
	    nodes = slotNodes || fallback;
	  }

	  var target = props && props.slot;
	  if (target) {
	    return this.$createElement('template', { slot: target }, nodes)
	  } else {
	    return nodes
	  }
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	/**
	 * Runtime helper for checking keyCodes from config.
	 * exposed as Vue.prototype._k
	 * passing in eventKeyName as last argument separately for backwards compat
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias,
	  eventKeyName
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (keyCodes) {
	    if (Array.isArray(keyCodes)) {
	      return keyCodes.indexOf(eventKeyCode) === -1
	    } else {
	      return keyCodes !== eventKeyCode
	    }
	  } else if (eventKeyName) {
	    return hyphenate(eventKeyName) !== key
	  }
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp,
	  isSync
	) {
	  if (value) {
	    if (!isObject(value)) {
	      "development" !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      var loop = function ( key ) {
	        if (
	          key === 'class' ||
	          key === 'style' ||
	          isReservedAttribute(key)
	        ) {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];

	          if (isSync) {
	            var on = data.on || (data.on = {});
	            on[("update:" + key)] = function ($event) {
	              value[key] = $event;
	            };
	          }
	        }
	      };

	      for (var key in value) loop( key );
	    }
	  }
	  return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var cached = this._staticTrees || (this._staticTrees = []);
	  var tree = cached[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = cached[index] = this.$options.staticRenderFns[index].call(
	    this._renderProxy,
	    null,
	    this // for render fns generated for functional component templates
	  );
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}

	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}

	/*  */

	function bindObjectListeners (data, value) {
	  if (value) {
	    if (!isPlainObject(value)) {
	      "development" !== 'production' && warn(
	        'v-on without argument expects an Object value',
	        this
	      );
	    } else {
	      var on = data.on = data.on ? extend({}, data.on) : {};
	      for (var key in value) {
	        var existing = on[key];
	        var ours = value[key];
	        on[key] = existing ? [].concat(existing, ours) : ours;
	      }
	    }
	  }
	  return data
	}

	/*  */

	function installRenderHelpers (target) {
	  target._o = markOnce;
	  target._n = toNumber;
	  target._s = toString;
	  target._l = renderList;
	  target._t = renderSlot;
	  target._q = looseEqual;
	  target._i = looseIndexOf;
	  target._m = renderStatic;
	  target._f = resolveFilter;
	  target._k = checkKeyCodes;
	  target._b = bindObjectProps;
	  target._v = createTextVNode;
	  target._e = createEmptyVNode;
	  target._u = resolveScopedSlots;
	  target._g = bindObjectListeners;
	}

	/*  */

	function FunctionalRenderContext (
	  data,
	  props,
	  children,
	  parent,
	  Ctor
	) {
	  var options = Ctor.options;
	  this.data = data;
	  this.props = props;
	  this.children = children;
	  this.parent = parent;
	  this.listeners = data.on || emptyObject;
	  this.injections = resolveInject(options.inject, parent);
	  this.slots = function () { return resolveSlots(children, parent); };

	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var contextVm = Object.create(parent);
	  var isCompiled = isTrue(options._compiled);
	  var needNormalization = !isCompiled;

	  // support for compiled functional template
	  if (isCompiled) {
	    // exposing $options for renderStatic()
	    this.$options = options;
	    // pre-resolve slots for renderSlot()
	    this.$slots = this.slots();
	    this.$scopedSlots = data.scopedSlots || emptyObject;
	  }

	  if (options._scopeId) {
	    this._c = function (a, b, c, d) {
	      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
	      if (vnode) {
	        vnode.fnScopeId = options._scopeId;
	        vnode.fnContext = parent;
	      }
	      return vnode
	    };
	  } else {
	    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
	  }
	}

	installRenderHelpers(FunctionalRenderContext.prototype);

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  contextVm,
	  children
	) {
	  var options = Ctor.options;
	  var props = {};
	  var propOptions = options.props;
	  if (isDef(propOptions)) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData || emptyObject);
	    }
	  } else {
	    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
	    if (isDef(data.props)) { mergeProps(props, data.props); }
	  }

	  var renderContext = new FunctionalRenderContext(
	    data,
	    props,
	    children,
	    contextVm,
	    Ctor
	  );

	  var vnode = options.render.call(null, renderContext._c, renderContext);

	  if (vnode instanceof VNode) {
	    vnode.fnContext = contextVm;
	    vnode.fnOptions = options;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }

	  return vnode
	}

	function mergeProps (to, from) {
	  for (var key in from) {
	    to[camelize(key)] = from[key];
	  }
	}

	/*  */




	// Register the component hook to weex native render engine.
	// The hook will be triggered by native, not javascript.


	// Updates the state of the component to weex native render engine.

	/*  */

	// https://github.com/Hanks10100/weex-native-directive/tree/master/component

	// listening on native callback

	/*  */

	/*  */

	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },

	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },

	  insert: function insert (vnode) {
	    var context = vnode.context;
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isMounted) {
	      componentInstance._isMounted = true;
	      callHook(componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      if (context._isMounted) {
	        // vue-router#1212
	        // During updates, a kept-alive component's child components may
	        // change, so directly walking the tree here may call activated hooks
	        // on incorrect children. Instead we push them into a queue which will
	        // be processed after the whole patch process ended.
	        queueActivatedComponent(componentInstance);
	      } else {
	        activateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  },

	  destroy: function destroy (vnode) {
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  }
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (isUndef(Ctor)) {
	    return
	  }

	  var baseCtor = context.$options._base;

	  // plain options object: turn it into a constructor
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  // if at this stage it's not a constructor or an async component factory,
	  // reject.
	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  var asyncFactory;
	  if (isUndef(Ctor.cid)) {
	    asyncFactory = Ctor;
	    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
	    if (Ctor === undefined) {
	      // return a placeholder node for async component, which is rendered
	      // as a comment node but preserves all the raw information for the node.
	      // the information will be used for async server-rendering and hydration.
	      return createAsyncPlaceholder(
	        asyncFactory,
	        data,
	        context,
	        children,
	        tag
	      )
	    }
	  }

	  data = data || {};

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  // transform component v-model data into props & events
	  if (isDef(data.model)) {
	    transformModel(Ctor.options, data);
	  }

	  // extract props
	  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

	  // functional component
	  if (isTrue(Ctor.options.functional)) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  // so it gets processed during parent component patch.
	  data.on = data.nativeOn;

	  if (isTrue(Ctor.options.abstract)) {
	    // abstract components do not keep anything
	    // other than props & listeners & slot

	    // work around flow
	    var slot = data.slot;
	    data = {};
	    if (slot) {
	      data.slot = slot;
	    }
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
	    asyncFactory
	  );

	  // Weex specific: invoke recycle-list optimized @render function for
	  // extracting cell-slot template.
	  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
	  /* istanbul ignore if */
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    _parentVnode: vnode,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (isDef(inlineTemplate)) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnode.componentOptions.Ctor(options)
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (isDef(on[event])) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (isTrue(alwaysNormalize)) {
	    normalizationType = ALWAYS_NORMALIZE;
	  }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (isDef(data) && isDef((data).__ob__)) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  // object syntax in v-bind
	  if (isDef(data) && isDef(data.is)) {
	    tag = data.is;
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // warn against non-primitive key
	  if ("development" !== 'production' &&
	    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
	  ) {
	    {
	      warn(
	        'Avoid using non-primitive value as key, ' +
	        'use string/number value instead.',
	        context
	      );
	    }
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	    typeof children[0] === 'function'
	  ) {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (isDef(vnode)) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns, force) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    ns = undefined;
	    force = true;
	  }
	  if (isDef(vnode.children)) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
	        applyNS(child, ns, force);
	      }
	    }
	  }
	}

	/*  */

	function initRender (vm) {
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null; // v-once cached trees
	  var options = vm.$options;
	  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

	  // $attrs & $listeners are exposed for easier HOC creation.
	  // they need to be reactive so that HOCs using them are always updated
	  var parentData = parentVnode && parentVnode.data;

	  /* istanbul ignore else */
	  {
	    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
	    }, true);
	    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
	      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
	    }, true);
	  }
	}

	function renderMixin (Vue) {
	  // install runtime convenience helpers
	  installRenderHelpers(Vue.prototype);

	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // if the parent didn't update, the slot nodes will be the ones from
	      // last render. They need to be cloned to ensure "freshness" for this render.
	      for (var key in vm.$slots) {
	        var slot = vm.$slots[key];
	        // _rendered is a flag added by renderSlot, but may not be present
	        // if the slot is passed from manually written render functions
	        if (slot._rendered || (slot[0] && slot[0].elm)) {
	          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
	        }
	      }
	    }

	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      {
	        if (vm.$options.renderError) {
	          try {
	            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
	          } catch (e) {
	            handleError(e, vm, "renderError");
	            vnode = vm._vnode;
	          }
	        } else {
	          vnode = vm._vnode;
	        }
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };
	}

	/*  */

	var uid$1 = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid$1++;

	    var startTag, endTag;
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-start:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }

	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(("vue " + (vm._name) + " init"), startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  var parentVnode = options._parentVnode;
	  opts.parent = options.parent;
	  opts._parentVnode = parentVnode;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;

	  var vnodeComponentOptions = parentVnode.componentOptions;
	  opts.propsData = vnodeComponentOptions.propsData;
	  opts._parentListeners = vnodeComponentOptions.listeners;
	  opts._renderChildren = vnodeComponentOptions.children;
	  opts._componentTag = vnodeComponentOptions.tag;

	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var extended = Ctor.extendOptions;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
	    }
	  }
	  return modified
	}

	function dedupe (latest, extended, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    extended = Array.isArray(extended) ? extended : [extended];
	    for (var i = 0; i < latest.length; i++) {
	      // push original options and not sealed options to exclude duplicated options
	      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)
	  ) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
	    if (installedPlugins.indexOf(plugin) > -1) {
	      return this
	    }

	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    installedPlugins.push(plugin);
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	    return this
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }

	    var name = extendOptions.name || Super.options.name;
	    if ("development" !== 'production' && name) {
	      validateComponentName(name);
	    }

	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;

	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }

	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;

	    // create asset registers, so extended classes
	    // can have their private assets too.
	    ASSET_TYPES.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }

	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);

	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  ASSET_TYPES.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if ("development" !== 'production' && type === 'component') {
	          validateComponentName(id);
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (Array.isArray(pattern)) {
	    return pattern.indexOf(name) > -1
	  } else if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (isRegExp(pattern)) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}

	function pruneCache (keepAliveInstance, filter) {
	  var cache = keepAliveInstance.cache;
	  var keys = keepAliveInstance.keys;
	  var _vnode = keepAliveInstance._vnode;
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cache, key, keys, _vnode);
	      }
	    }
	  }
	}

	function pruneCacheEntry (
	  cache,
	  key,
	  keys,
	  current
	) {
	  var cached$$1 = cache[key];
	  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
	    cached$$1.componentInstance.$destroy();
	  }
	  cache[key] = null;
	  remove(keys, key);
	}

	var patternTypes = [String, RegExp, Array];

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes,
	    max: [String, Number]
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	    this.keys = [];
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache, key, this$1.keys);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var slot = this.$slots.default;
	    var vnode = getFirstComponentChild(slot);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      var ref = this;
	      var include = ref.include;
	      var exclude = ref.exclude;
	      if (
	        // not included
	        (include && (!name || !matches(include, name))) ||
	        // excluded
	        (exclude && name && matches(exclude, name))
	      ) {
	        return vnode
	      }

	      var ref$1 = this;
	      var cache = ref$1.cache;
	      var keys = ref$1.keys;
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (cache[key]) {
	        vnode.componentInstance = cache[key].componentInstance;
	        // make current key freshest
	        remove(keys, key);
	        keys.push(key);
	      } else {
	        cache[key] = vnode;
	        keys.push(key);
	        // prune oldest entry
	        if (this.max && keys.length > parseInt(this.max)) {
	          pruneCacheEntry(cache, keys[0], keys, this._vnode);
	        }
	      }

	      vnode.data.keepAlive = true;
	    }
	    return vnode || (slot && slot[0])
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);

	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive
	  };

	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  ASSET_TYPES.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Object.defineProperty(Vue$3.prototype, '$ssrContext', {
	  get: function get () {
	    /* istanbul ignore next */
	    return this.$vnode && this.$vnode.ssrContext
	  }
	});

	Vue$3.version = '2.5.13';

	/*  */

	// these are reserved for web because they are directly compiled away
	// during template compilation
	var isReservedAttr = makeMap('style,class');

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select,progress');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (isDef(childNode.componentInstance)) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode && childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while (isDef(parentNode = parentNode.parent)) {
	    if (parentNode && parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return renderClass(data.staticClass, data.class)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: isDef(child.class)
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function renderClass (
	  staticClass,
	  dynamicClass
	) {
	  if (isDef(staticClass) || isDef(dynamicClass)) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  if (Array.isArray(value)) {
	    return stringifyArray(value)
	  }
	  if (isObject(value)) {
	    return stringifyObject(value)
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function stringifyArray (value) {
	  var res = '';
	  var stringified;
	  for (var i = 0, l = value.length; i < l; i++) {
	    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	      if (res) { res += ' '; }
	      res += stringified;
	    }
	  }
	  return res
	}

	function stringifyObject (value) {
	  var res = '';
	  for (var key in value) {
	    if (value[key]) {
	      if (res) { res += ' '; }
	      res += key;
	    }
	  }
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template,blockquote,iframe,tfoot'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	var isTextInputType = makeMap('text,number,password,search,email,tel,url');

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (!Array.isArray(refs[key])) {
	        refs[key] = [ref];
	      } else if (refs[key].indexOf(ref) < 0) {
	        // $flow-disable-line
	        refs[key].push(ref);
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function sameVnode (a, b) {
	  return (
	    a.key === b.key && (
	      (
	        a.tag === b.tag &&
	        a.isComment === b.isComment &&
	        isDef(a.data) === isDef(b.data) &&
	        sameInputType(a, b)
	      ) || (
	        isTrue(a.isAsyncPlaceholder) &&
	        a.asyncFactory === b.asyncFactory &&
	        isUndef(b.asyncFactory.error)
	      )
	    )
	  )
	}

	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove () {
	      if (--remove.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove.listeners = listeners;
	    return remove
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  function isUnknownElement$$1 (vnode, inVPre) {
	    return (
	      !inVPre &&
	      !vnode.ns &&
	      !(
	        config.ignoredElements.length &&
	        config.ignoredElements.some(function (ignore) {
	          return isRegExp(ignore)
	            ? ignore.test(vnode.tag)
	            : ignore === vnode.tag
	        })
	      ) &&
	      config.isUnknownElement(vnode.tag)
	    )
	  }

	  var creatingElmInVPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          creatingElmInVPre++;
	        }
	        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if ("development" !== 'production' && data && data.pre) {
	        creatingElmInVPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	      vnode.data.pendingInsert = null;
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref$$1) {
	    if (isDef(parent)) {
	      if (isDef(ref$$1)) {
	        if (ref$$1.parentNode === parent) {
	          nodeOps.insertBefore(parent, elm, ref$$1);
	        }
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      {
	        checkDuplicateKeys(children);
	      }
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.fnScopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    } else {
	      var ancestor = vnode;
	      while (ancestor) {
	        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	          nodeOps.setAttribute(vnode.elm, i, '');
	        }
	        ancestor = ancestor.parent;
	      }
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	      i !== vnode.context &&
	      i !== vnode.fnContext &&
	      isDef(i = i.$options._scopeId)
	    ) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var i;
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    {
	      checkDuplicateKeys(newCh);
	    }

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key)
	          ? oldKeyToIdx[newStartVnode.key]
	          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	        } else {
	          vnodeToMove = oldCh[idxInOld];
	          if (sameVnode(vnodeToMove, newStartVnode)) {
	            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          }
	        }
	        newStartVnode = newCh[++newStartIdx];
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function checkDuplicateKeys (children) {
	    var seenKeys = {};
	    for (var i = 0; i < children.length; i++) {
	      var vnode = children[i];
	      var key = vnode.key;
	      if (isDef(key)) {
	        if (seenKeys[key]) {
	          warn(
	            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
	            vnode.context
	          );
	        } else {
	          seenKeys[key] = true;
	        }
	      }
	    }
	  }

	  function findIdxInOld (node, oldCh, start, end) {
	    for (var i = start; i < end; i++) {
	      var c = oldCh[i];
	      if (isDef(c) && sameVnode(node, c)) { return i }
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }

	    var elm = vnode.elm = oldVnode.elm;

	    if (isTrue(oldVnode.isAsyncPlaceholder)) {
	      if (isDef(vnode.asyncFactory.resolved)) {
	        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
	      } else {
	        vnode.isAsyncPlaceholder = true;
	      }
	      return
	    }

	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	      isTrue(oldVnode.isStatic) &&
	      vnode.key === oldVnode.key &&
	      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
	    ) {
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }

	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }

	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var hydrationBailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  // Note: style is excluded because it relies on initial clone for future
	  // deep updates (#7063).
	  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
	    var i;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    inVPre = inVPre || (data && data.pre);
	    vnode.elm = elm;

	    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
	      vnode.isAsyncPlaceholder = true;
	      return true
	    }
	    // assert node match
	    {
	      if (!assertNodeMatch(elm, vnode, inVPre)) {
	        return false
	      }
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          // v-html and domProps: innerHTML
	          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
	            if (i !== elm.innerHTML) {
	              /* istanbul ignore if */
	              if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !hydrationBailed
	              ) {
	                hydrationBailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('server innerHTML: ', i);
	                console.warn('client innerHTML: ', elm.innerHTML);
	              }
	              return false
	            }
	          } else {
	            // iterate and compare children lists
	            var childrenMatch = true;
	            var childNode = elm.firstChild;
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
	                childrenMatch = false;
	                break
	              }
	              childNode = childNode.nextSibling;
	            }
	            // if childNode is not null, it means the actual childNodes list is
	            // longer than the virtual children list.
	            if (!childrenMatch || childNode) {
	              /* istanbul ignore if */
	              if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !hydrationBailed
	              ) {
	                hydrationBailed = true;
	                console.warn('Parent: ', elm);
	                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	              }
	              return false
	            }
	          }
	        }
	      }
	      if (isDef(data)) {
	        var fullInvoke = false;
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            fullInvoke = true;
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	        if (!fullInvoke && data['class']) {
	          // ensure collecting deps for deep class bindings for future updates
	          traverse(data['class']);
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode, inVPre) {
	    if (isDef(vnode.tag)) {
	      return vnode.tag.indexOf('vue-component') === 0 || (
	        !isUnknownElement$$1(vnode, inVPre) &&
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	            oldVnode.removeAttribute(SSR_ATTR);
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }

	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);

	        // create new node
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        // update parent placeholder node element, recursively
	        if (isDef(vnode.parent)) {
	          var ancestor = vnode.parent;
	          var patchable = isPatchable(vnode);
	          while (ancestor) {
	            for (var i = 0; i < cbs.destroy.length; ++i) {
	              cbs.destroy[i](ancestor);
	            }
	            ancestor.elm = vnode.elm;
	            if (patchable) {
	              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	                cbs.create[i$1](emptyNode, ancestor);
	              }
	              // #6513
	              // invoke insert hooks that may have been merged by create hooks.
	              // e.g. for directives that uses the "inserted" hook.
	              var insert = ancestor.data.hook.insert;
	              if (insert.merged) {
	                // start at index 1 to avoid re-invoking component mounted hook
	                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
	                  insert.fns[i$2]();
	                }
	              }
	            } else {
	              registerRef(ancestor);
	            }
	            ancestor = ancestor.parent;
	          }
	        }

	        // destroy old node
	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode, 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode, 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    // $flow-disable-line
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      // $flow-disable-line
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  // $flow-disable-line
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    try {
	      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	    } catch (e) {
	      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
	    }
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  var opts = vnode.componentOptions;
	  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
	    return
	  }
	  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(attrs.__ob__)) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  // #6666: IE/Edge forces progress value down to 1 before setting a max
	  /* istanbul ignore if */
	  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (isUndef(attrs[key])) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      // technically allowfullscreen is a boolean attribute for <iframe>,
	      // but Flash expects a value of "true" when used on <embed> tag
	      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
	        ? 'true'
	        : key;
	      el.setAttribute(key, value);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      // #7138: IE10 & 11 fires input event when setting placeholder on
	      // <textarea>... block the first input event and remove the blocker
	      // immediately.
	      /* istanbul ignore if */
	      if (
	        isIE && !isIE9 &&
	        el.tagName === 'TEXTAREA' &&
	        key === 'placeholder' && !el.__ieph
	      ) {
	        var blocker = function (e) {
	          e.stopImmediatePropagation();
	          el.removeEventListener('input', blocker);
	        };
	        el.addEventListener('input', blocker);
	        // $flow-disable-line
	        el.__ieph = true; /* IE placeholder patched */
	      }
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (
	    isUndef(data.staticClass) &&
	    isUndef(data.class) && (
	      isUndef(oldData) || (
	        isUndef(oldData.staticClass) &&
	        isUndef(oldData.class)
	      )
	    )
	  ) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (isDef(transitionClass)) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var validDivisionCharRE = /[\w).+\-_$\]]/;

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !validDivisionCharRE.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue compiler]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	  el.plain = false;
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	  el.plain = false;
	}

	// add a raw attr (use this in preTransforms)
	function addRawAttr (el, name, value) {
	  el.attrsMap[name] = value;
	  el.attrsList.push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	  el.plain = false;
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important,
	  warn
	) {
	  modifiers = modifiers || emptyObject;
	  // warn prevent and passive modifier
	  /* istanbul ignore if */
	  if (
	    "development" !== 'production' && warn &&
	    modifiers.prevent && modifiers.passive
	  ) {
	    warn(
	      'passive and prevent can\'t be used together. ' +
	      'Passive handler can\'t prevent default event.'
	    );
	  }

	  // check capture modifier
	  if (modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  /* istanbul ignore if */
	  if (modifiers.passive) {
	    delete modifiers.passive;
	    name = '&' + name; // mark the event as passive
	  }

	  // normalize click.right and click.middle since they don't actually fire
	  // this is technically browser-specific, but at least for now browsers are
	  // the only target envs that have right/middle clicks.
	  if (name === 'click') {
	    if (modifiers.right) {
	      name = 'contextmenu';
	      delete modifiers.right;
	    } else if (modifiers.middle) {
	      name = 'mouseup';
	    }
	  }

	  var events;
	  if (modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }

	  var newHandler = { value: value };
	  if (modifiers !== emptyObject) {
	    newHandler.modifiers = modifiers;
	  }

	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }

	  el.plain = false;
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	// note: this only removes the attr from the Array (attrsList) so that it
	// doesn't get processed by processAttrs.
	// By default it does NOT remove it from the map (attrsMap) because the map is
	// needed during codegen.
	function getAndRemoveAttr (
	  el,
	  name,
	  removeFromMap
	) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  if (removeFromMap) {
	    delete el.attrsMap[name];
	  }
	  return val
	}

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */
	function genComponentModel (
	  el,
	  value,
	  modifiers
	) {
	  var ref = modifiers || {};
	  var number = ref.number;
	  var trim = ref.trim;

	  var baseValueExpression = '$$v';
	  var valueExpression = baseValueExpression;
	  if (trim) {
	    valueExpression =
	      "(typeof " + baseValueExpression + " === 'string'" +
	        "? " + baseValueExpression + ".trim()" +
	        ": " + baseValueExpression + ")";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	  var assignment = genAssignmentCode(value, valueExpression);

	  el.model = {
	    value: ("(" + value + ")"),
	    expression: ("\"" + value + "\""),
	    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
	  };
	}

	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	function genAssignmentCode (
	  value,
	  assignment
	) {
	  var res = parseModel(value);
	  if (res.key === null) {
	    return (value + "=" + assignment)
	  } else {
	    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
	  }
	}

	/**
	 * Parse a v-model expression into a base path and a final key segment.
	 * Handles both dot-path and possible square brackets.
	 *
	 * Possible cases:
	 *
	 * - test
	 * - test[key]
	 * - test[test1[key]]
	 * - test["a"][key]
	 * - xxx.test[a[a].test1[key]]
	 * - test.xxx.a["asa"][test1[key]]
	 *
	 */

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;



	function parseModel (val) {
	  len = val.length;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    index$1 = val.lastIndexOf('.');
	    if (index$1 > -1) {
	      return {
	        exp: val.slice(0, index$1),
	        key: '"' + val.slice(index$1 + 1) + '"'
	      }
	    } else {
	      return {
	        exp: val,
	        key: null
	      }
	    }
	  }

	  str = val;
	  index$1 = expressionPos = expressionEndPos = 0;

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.slice(0, expressionPos),
	    key: val.slice(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var warn$1;

	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	function model (
	  el,
	  dir,
	  _warn
	) {
	  warn$1 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;

	  {
	    // inputs with type="file" are read only and setting the input's
	    // value will throw an error.
	    if (tag === 'input' && type === 'file') {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	        "File inputs are read only. Use a v-on:change listener instead."
	      );
	    }
	  }

	  if (el.component) {
	    genComponentModel(el, value, modifiers);
	    // component v-model doesn't need extra runtime
	    return false
	  } else if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else if (tag === 'input' || tag === 'textarea') {
	    genDefaultModel(el, value, modifiers);
	  } else if (!config.isReservedTag(tag)) {
	    genComponentModel(el, value, modifiers);
	    // component v-model doesn't need extra runtime
	    return false
	  } else {
	    warn$1(
	      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	      "v-model is not supported on this element type. " +
	      'If you are working with contenteditable, it\'s recommended to ' +
	      'wrap a library dedicated for that purpose inside a custom component.'
	    );
	  }

	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	    "?_i(" + value + "," + valueBinding + ")>-1" + (
	      trueValueBinding === 'true'
	        ? (":(" + value + ")")
	        : (":_q(" + value + "," + trueValueBinding + ")")
	    )
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
	    null, true
	  );
	}

	function genRadioModel (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
	}

	function genSelect (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var selectedVal = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})";

	  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	  var code = "var $$selectedVal = " + selectedVal + ";";
	  code = code + " " + (genAssignmentCode(value, assignment));
	  addHandler(el, 'change', code, null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  var type = el.attrsMap.type;

	  // warn if v-bind:value conflicts with v-model
	  {
	    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
	    if (value$1) {
	      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
	      warn$1(
	        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
	        'because the latter already expands to a value binding internally'
	      );
	    }
	  }

	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var needCompositionGuard = !lazy && type !== 'range';
	  var event = lazy
	    ? 'change'
	    : type === 'range'
	      ? RANGE_TOKEN
	      : 'input';

	  var valueExpression = '$event.target.value';
	  if (trim) {
	    valueExpression = "$event.target.value.trim()";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }

	  var code = genAssignmentCode(value, valueExpression);
	  if (needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  addProp(el, 'value', ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number) {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	/*  */

	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  /* istanbul ignore if */
	  if (isDef(on[RANGE_TOKEN])) {
	    // IE input[type=range] only supports `change` event
	    var event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  // This was originally intended to fix #4521 but no longer necessary
	  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
	  /* istanbul ignore if */
	  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function createOnceHandler (handler, event, capture) {
	  var _target = target$1; // save current target element in closure
	  return function onceHandler () {
	    var res = handler.apply(null, arguments);
	    if (res !== null) {
	      remove$2(event, onceHandler, capture, _target);
	    }
	  }
	}

	function add$1 (
	  event,
	  handler,
	  once$$1,
	  capture,
	  passive
	) {
	  handler = withMacroTask(handler);
	  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
	  target$1.addEventListener(
	    event,
	    handler,
	    supportsPassive
	      ? { capture: capture, passive: passive }
	      : capture
	  );
	}

	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(
	    event,
	    handler._withTask || handler,
	    capture
	  );
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	  target$1 = undefined;
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(props.__ob__)) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (isUndef(props[key])) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	      // #6601 work around Chrome version <= 55 bug where single textNode
	      // replaced by innerHTML/textContent retains its parentNode property
	      if (elm.childNodes.length === 1) {
	        elm.removeChild(elm.childNodes[0]);
	      }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = isUndef(cur) ? '' : String(cur);
	      if (shouldUpdateValue(elm, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (elm, checkVal) {
	  return (!elm.composing && (
	    elm.tagName === 'OPTION' ||
	    isNotInFocusAndDirty(elm, checkVal) ||
	    isDirtyWithModifiers(elm, checkVal)
	  ))
	}

	function isNotInFocusAndDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is
	  // not equal to the updated value
	  var notInFocus = true;
	  // #6157
	  // work around IE bug when accessing document.activeElement in an iframe
	  try { notInFocus = document.activeElement !== elm; } catch (e) {}
	  return notInFocus && elm.value !== checkVal
	}

	function isDirtyWithModifiers (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if (isDef(modifiers)) {
	    if (modifiers.lazy) {
	      // inputs with lazy should only be updated when not in focus
	      return false
	    }
	    if (modifiers.number) {
	      return toNumber(value) !== toNumber(newVal)
	    }
	    if (modifiers.trim) {
	      return value.trim() !== newVal.trim()
	    }
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (
	        childNode && childNode.data &&
	        (styleData = normalizeStyleData(childNode.data))
	      ) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    var normalizedName = normalize(name);
	    if (Array.isArray(val)) {
	      // Support values array created by autoprefixer, e.g.
	      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	      // Set them one by one, and the browser will only set those it can recognize
	      for (var i = 0, len = val.length; i < len; i++) {
	        el.style[normalizedName] = val[i];
	      }
	    } else {
	      el.style[normalizedName] = val;
	    }
	  }
	};

	var vendorNames = ['Webkit', 'Moz', 'ms'];

	var emptyStyle;
	var normalize = cached(function (prop) {
	  emptyStyle = emptyStyle || document.createElement('div').style;
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in emptyStyle)) {
	    return prop
	  }
	  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < vendorNames.length; i++) {
	    var name = vendorNames[i] + capName;
	    if (name in emptyStyle) {
	      return name
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (isUndef(data.staticStyle) && isUndef(data.style) &&
	    isUndef(oldData.staticStyle) && isUndef(oldData.style)
	  ) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldData.staticStyle;
	  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  // store normalized style under a different key for next diff
	  // make sure to clone it if it's reactive, since the user likely wants
	  // to mutate it.
	  vnode.data.normalizedStyle = isDef(style.__ob__)
	    ? extend({}, style)
	    : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (isUndef(newStyle[name])) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	    if (!el.classList.length) {
	      el.removeAttribute('class');
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    cur = cur.trim();
	    if (cur) {
	      el.setAttribute('class', cur);
	    } else {
	      el.removeAttribute('class');
	    }
	  }
	}

	/*  */

	function resolveTransition (def) {
	  if (!def) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def === 'object') {
	    var res = {};
	    if (def.css !== false) {
	      extend(res, autoCssTransition(def.name || 'v'));
	    }
	    extend(res, def);
	    return res
	  } else if (typeof def === 'string') {
	    return autoCssTransition(def)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  ) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  ) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser
	  ? window.requestAnimationFrame
	    ? window.requestAnimationFrame.bind(window)
	    : setTimeout
	  : /* istanbul ignore next */ function (fn) { return fn(); };

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
	  if (transitionClasses.indexOf(cls) < 0) {
	    transitionClasses.push(cls);
	    addClass(el, cls);
	  }
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (isDef(el._leaveCb)) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return
	  }

	  /* istanbul ignore if */
	  if (isDef(el._enterCb) || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;

	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;

	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );

	  if ("development" !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode, 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	        pendingNode.tag === vnode.tag &&
	        pendingNode.elm._leaveCb
	      ) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (isDef(el._enterCb)) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data) || el.nodeType !== 1) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (isDef(el._leaveCb)) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);

	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );

	  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}

	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (isUndef(fn)) {
	    return false
	  }
	  var invokerFns = fn.fns;
	  if (isDef(invokerFns)) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}

	function _enter (_, vnode) {
	  if (vnode.data.show !== true) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (vnode.data.show !== true) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var directive = {
	  inserted: function inserted (el, binding, vnode, oldVnode) {
	    if (vnode.tag === 'select') {
	      // #6903
	      if (oldVnode.elm && !oldVnode.elm._vOptions) {
	        mergeVNodeHook(vnode, 'postpatch', function () {
	          directive.componentUpdated(el, binding, vnode);
	        });
	      } else {
	        setSelected(el, binding, vnode.context);
	      }
	      el._vOptions = [].map.call(el.options, getValue);
	    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        // Safari < 10.2 & UIWebView doesn't fire compositionend when
	        // switching focus before confirming composition choice
	        // this also fixes the issue where some browsers e.g. iOS Chrome
	        // fires "change" instead of "input" on autocomplete.
	        el.addEventListener('change', onCompositionEnd);
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },

	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var prevOptions = el._vOptions;
	      var curOptions = el._vOptions = [].map.call(el.options, getValue);
	      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
	        // trigger change event if
	        // no matching option found for at least one value
	        var needReset = el.multiple
	          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
	          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
	        if (needReset) {
	          trigger(el, 'change');
	        }
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  actuallySetSelected(el, binding, vm);
	  /* istanbul ignore if */
	  if (isIE || isEdge) {
	    setTimeout(function () {
	      actuallySetSelected(el, binding, vm);
	    }, 0);
	  }
	}

	function actuallySetSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  return options.every(function (o) { return !looseEqual(o, value); })
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  // prevent triggering an input event for no reason
	  if (!e.target.composing) { return }
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition$$1) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition$$1 = vnode.data && vnode.data.transition;
	    if (transition$$1) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: directive,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  if (/\d-keep-alive$/.test(rawChild.tag)) {
	    return h('keep-alive', {
	      props: rawChild.componentOptions.propsData
	    })
	  }
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if ("development" !== 'production' &&
	      mode && mode !== 'in-out' && mode !== 'out-in'
	    ) {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? child.isComment
	        ? id + 'comment'
	        : id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;

	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (
	      oldChild &&
	      oldChild.data &&
	      !isSameChild(child, oldChild) &&
	      !isAsyncPlaceholder(oldChild) &&
	      // #6687 component root is a comment node
	      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
	    ) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        if (isAsyncPlaceholder(child)) {
	          return oldRawChild
	        }
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    // assign to this to avoid being removed in tree-shaking
	    // $flow-disable-line
	    this._reflow = document.body.offsetHeight;

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      /* istanbul ignore if */
	      if (this._hasMove) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.isReservedAttr = isReservedAttr;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	Vue$3.nextTick(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if ("development" !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if ("development" !== 'production' &&
	    config.productionTip !== false &&
	    inBrowser && typeof console !== 'undefined'
	  ) {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});



	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var rawTokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, tokenValue;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      rawTokens.push(tokenValue = text.slice(lastIndex, index));
	      tokens.push(JSON.stringify(tokenValue));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    rawTokens.push({ '@binding': exp });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    rawTokens.push(tokenValue = text.slice(lastIndex));
	    tokens.push(JSON.stringify(tokenValue));
	  }
	  return {
	    expression: tokens.join('+'),
	    tokens: rawTokens
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var res = parseText(staticClass, options.delimiters);
	    if (res) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var res = parseText(staticStyle, options.delimiters);
	      if (res) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$1
	};

	/*  */

	var decoder;

	var he = {
	  decode: function decode (html) {
	    decoder = decoder || document.createElement('div');
	    decoder.innerHTML = html;
	    return decoder.textContent
	  }
	};

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr'
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track'
	);

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
	var startTagOpen = new RegExp(("^<" + qnameCapture));
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isPlainTextElement = makeMap('script,style,textarea', true);
	var reCache = {};

	var decodingMap = {
	  '&lt;': '<',
	  '&gt;': '>',
	  '&quot;': '"',
	  '&amp;': '&',
	  '&#10;': '\n',
	  '&#9;': '\t'
	};
	var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

	// #5992
	var isIgnoreNewlineTag = makeMap('pre,textarea', true);
	var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

	function decodeAttr (value, shouldDecodeNewlines) {
	  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	  return value.replace(re, function (match) { return decodingMap[match]; })
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a plaintext content element like script/style
	    if (!lastTag || !isPlainTextElement(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            if (options.shouldKeepComment) {
	              options.comment(html.substring(4, commentEnd));
	            }
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          if (shouldIgnoreFirstNewline(lastTag, html)) {
	            advance(1);
	          }
	          continue
	        }
	      }

	      var text = (void 0), rest = (void 0), next = (void 0);
	      if (textEnd >= 0) {
	        rest = html.slice(textEnd);
	        while (
	          !endTag.test(rest) &&
	          !startTagOpen.test(rest) &&
	          !comment.test(rest) &&
	          !conditionalComment.test(rest)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var endTagLength = 0;
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (shouldIgnoreFirstNewline(stackedTag, text)) {
	          text = text.slice(1);
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest$1.length;
	      html = rest$1;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }

	    if (html === last) {
	      options.chars && options.chars(html);
	      if ("development" !== 'production' && !stack.length && options.warn) {
	        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
	      }
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
	        ? options.shouldDecodeNewlinesForHref
	        : options.shouldDecodeNewlines;
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(value, shouldDecodeNewlines)
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if ("development" !== 'production' &&
	          (i > pos || !tagName) &&
	          options.warn
	        ) {
	          options.warn(
	            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
	          );
	        }
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	var onRE = /^@|^v-on:/;
	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
	var stripParensRE = /^\(|\)$/g;

	var argRE = /:(.*)$/;
	var bindRE = /^:|^v-bind:/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(he.decode);

	// configurable state
	var warn$2;
	var delimiters;
	var transforms;
	var preTransforms;
	var postTransforms;
	var platformIsPreTag;
	var platformMustUseProp;
	var platformGetTagNamespace;



	function createASTElement (
	  tag,
	  attrs,
	  parent
	) {
	  return {
	    type: 1,
	    tag: tag,
	    attrsList: attrs,
	    attrsMap: makeAttrsMap(attrs),
	    parent: parent,
	    children: []
	  }
	}

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$2 = options.warn || baseWarn;

	  platformIsPreTag = options.isPreTag || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformGetTagNamespace = options.getTagNamespace || no;

	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

	  delimiters = options.delimiters;

	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;

	  function warnOnce (msg) {
	    if (!warned) {
	      warned = true;
	      warn$2(msg);
	    }
	  }

	  function closeElement (element) {
	    // check pre state
	    if (element.pre) {
	      inVPre = false;
	    }
	    if (platformIsPreTag(element.tag)) {
	      inPre = false;
	    }
	    // apply post-transforms
	    for (var i = 0; i < postTransforms.length; i++) {
	      postTransforms[i](element, options);
	    }
	  }

	  parseHTML(template, {
	    warn: warn$2,
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    canBeLeftOpenTag: options.canBeLeftOpenTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
	    shouldKeepComment: options.comments,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = createASTElement(tag, attrs, currentParent);
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$2(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        element = preTransforms[i](element, options) || element;
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else if (!element.processed) {
	        // structural directives
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        // element-scope stuff
	        processElement(element, options);
	      }

	      function checkRootConstraints (el) {
	        {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warnOnce(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes.'
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warnOnce(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements.'
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else {
	          warnOnce(
	            "Component template should contain exactly one root element. " +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      } else {
	        closeElement(element);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      closeElement(element);
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        {
	          if (text === template) {
	            warnOnce(
	              'Component template requires a root element, rather than just text.'
	            );
	          } else if ((text = text.trim())) {
	            warnOnce(
	              ("text \"" + text + "\" outside root element will be ignored.")
	            );
	          }
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	        currentParent.tag === 'textarea' &&
	        currentParent.attrsMap.placeholder === text
	      ) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var res;
	        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: res.expression,
	            tokens: res.tokens,
	            text: text
	          });
	        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	          children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    },
	    comment: function comment (text) {
	      currentParent.children.push({
	        type: 3,
	        text: text,
	        isComment: true
	      });
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processElement (element, options) {
	  processKey(element);

	  // determine whether this is a plain element after
	  // removing structural attributes
	  element.plain = !element.key && !element.attrsList.length;

	  processRef(element);
	  processSlot(element);
	  processComponent(element);
	  for (var i = 0; i < transforms.length; i++) {
	    element = transforms[i](element, options) || element;
	  }
	  processAttrs(element);
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var res = parseFor(exp);
	    if (res) {
	      extend(el, res);
	    } else {
	      warn$2(
	        ("Invalid v-for expression: " + exp)
	      );
	    }
	  }
	}

	function parseFor (exp) {
	  var inMatch = exp.match(forAliasRE);
	  if (!inMatch) { return }
	  var res = {};
	  res.for = inMatch[2].trim();
	  var alias = inMatch[1].trim().replace(stripParensRE, '');
	  var iteratorMatch = alias.match(forIteratorRE);
	  if (iteratorMatch) {
	    res.alias = alias.replace(forIteratorRE, '');
	    res.iterator1 = iteratorMatch[1].trim();
	    if (iteratorMatch[2]) {
	      res.iterator2 = iteratorMatch[2].trim();
	    }
	  } else {
	    res.alias = alias;
	  }
	  return res
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$2(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if ("development" !== 'production' && children[i].text !== ' ') {
	        warn$2(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once$$1 = getAndRemoveAttr(el, 'v-once');
	  if (once$$1 != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$2(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotScope;
	    if (el.tag === 'template') {
	      slotScope = getAndRemoveAttr(el, 'scope');
	      /* istanbul ignore if */
	      if ("development" !== 'production' && slotScope) {
	        warn$2(
	          "the \"scope\" attribute for scoped slots have been deprecated and " +
	          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
	          "can also be used on plain elements in addition to <template> to " +
	          "denote scoped slots.",
	          true
	        );
	      }
	      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
	    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
	      /* istanbul ignore if */
	      if ("development" !== 'production' && el.attrsMap['v-for']) {
	        warn$2(
	          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
	          "(v-for takes higher priority). Use a wrapper <template> for the " +
	          "scoped slot to make it clearer.",
	          true
	        );
	      }
	      el.slotScope = slotScope;
	    }
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	      // preserve slot as an attribute for native shadow DOM compat
	      // only for non-scoped slots.
	      if (el.tag !== 'template' && !el.slotScope) {
	        addAttr(el, 'slot', slotTarget);
	      }
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	          if (modifiers.sync) {
	            addHandler(
	              el,
	              ("update:" + (camelize(name))),
	              genAssignmentCode(value, "$event")
	            );
	          }
	        }
	        if (isProp || (
	          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
	        )) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers, false, warn$2);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        var arg = argMatch && argMatch[1];
	        if (arg) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var res = parseText(value, delimiters);
	        if (res) {
	          warn$2(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	      // #6887 firefox doesn't update muted state if set via attribute
	      // even immediately after element creation
	      if (!el.component &&
	          name === 'muted' &&
	          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	        addProp(el, name, 'true');
	      }
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if (
	      "development" !== 'production' &&
	      map[attrs[i].name] && !isIE && !isEdge
	    ) {
	      warn$2('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	// for script (e.g. type="x/template") or style, do not decode content
	function isTextTag (el) {
	  return el.tag === 'script' || el.tag === 'style'
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$2(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	/**
	 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
	 * Turn this:
	 *   <input v-model="data[type]" :type="type">
	 * into this:
	 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
	 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
	 *   <input v-else :type="type" v-model="data[type]">
	 */

	function preTransformNode (el, options) {
	  if (el.tag === 'input') {
	    var map = el.attrsMap;
	    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
	      var typeBinding = getBindingAttr(el, 'type');
	      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
	      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
	      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
	      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
	      // 1. checkbox
	      var branch0 = cloneASTElement(el);
	      // process for on the main node
	      processFor(branch0);
	      addRawAttr(branch0, 'type', 'checkbox');
	      processElement(branch0, options);
	      branch0.processed = true; // prevent it from double-processed
	      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
	      addIfCondition(branch0, {
	        exp: branch0.if,
	        block: branch0
	      });
	      // 2. add radio else-if condition
	      var branch1 = cloneASTElement(el);
	      getAndRemoveAttr(branch1, 'v-for', true);
	      addRawAttr(branch1, 'type', 'radio');
	      processElement(branch1, options);
	      addIfCondition(branch0, {
	        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
	        block: branch1
	      });
	      // 3. other
	      var branch2 = cloneASTElement(el);
	      getAndRemoveAttr(branch2, 'v-for', true);
	      addRawAttr(branch2, ':type', typeBinding);
	      processElement(branch2, options);
	      addIfCondition(branch0, {
	        exp: ifCondition,
	        block: branch2
	      });

	      if (hasElse) {
	        branch0.else = true;
	      } else if (elseIfCondition) {
	        branch0.elseif = elseIfCondition;
	      }

	      return branch0
	    }
	  }
	}

	function cloneASTElement (el) {
	  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
	}

	var model$2 = {
	  preTransformNode: preTransformNode
	};

	var modules$1 = [
	  klass$1,
	  style$1,
	  model$2
	];

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model,
	  text: text,
	  html: html
	};

	/*  */

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  directives: directives$1,
	  isPreTag: isPreTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  canBeLeftOpenTag: canBeLeftOpenTag,
	  isReservedTag: isReservedTag,
	  getTagNamespace: getTagNamespace,
	  staticKeys: genStaticKeys(modules$1)
	};

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic$1(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic$1 (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic$1(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	    if (node.ifConditions) {
	      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
	        var block = node.ifConditions[i$1].block;
	        markStatic$1(block);
	        if (!block.static) {
	          node.static = false;
	        }
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
	        markStaticRoots(node.ifConditions[i$1].block, isInFor);
	      }
	    }
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	// #4868: modifiers that prevent the execution of the listener
	// need to explicitly return null so that we can determine whether to remove
	// the listener for .once
	var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: genGuard("$event.target !== $event.currentTarget"),
	  ctrl: genGuard("!$event.ctrlKey"),
	  shift: genGuard("!$event.shiftKey"),
	  alt: genGuard("!$event.altKey"),
	  meta: genGuard("!$event.metaKey"),
	  left: genGuard("'button' in $event && $event.button !== 0"),
	  middle: genGuard("'button' in $event && $event.button !== 1"),
	  right: genGuard("'button' in $event && $event.button !== 2")
	};

	function genHandlers (
	  events,
	  isNative,
	  warn
	) {
	  var res = isNative ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  }

	  if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  }

	  var isMethodPath = simplePathRE.test(handler.value);
	  var isFunctionExpression = fnExpRE.test(handler.value);

	  if (!handler.modifiers) {
	    if (isMethodPath || isFunctionExpression) {
	      return handler.value
	    }
	    /* istanbul ignore if */
	    return ("function($event){" + (handler.value) + "}") // inline statement
	  } else {
	    var code = '';
	    var genModifierCode = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        genModifierCode += modifierCode[key];
	        // left/right
	        if (keyCodes[key]) {
	          keys.push(key);
	        }
	      } else if (key === 'exact') {
	        var modifiers = (handler.modifiers);
	        genModifierCode += genGuard(
	          ['ctrl', 'shift', 'alt', 'meta']
	            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
	            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
	            .join('||')
	        );
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code += genKeyFilter(keys);
	    }
	    // Make sure modifiers like prevent and stop get executed after key filtering
	    if (genModifierCode) {
	      code += genModifierCode;
	    }
	    var handlerCode = isMethodPath
	      ? handler.value + '($event)'
	      : isFunctionExpression
	        ? ("(" + (handler.value) + ")($event)")
	        : handler.value;
	    /* istanbul ignore if */
	    return ("function($event){" + code + handlerCode + "}")
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var code = keyCodes[key];
	  return (
	    "_k($event.keyCode," +
	    (JSON.stringify(key)) + "," +
	    (JSON.stringify(code)) + "," +
	    "$event.key)"
	  )
	}

	/*  */

	function on (el, dir) {
	  if ("development" !== 'production' && dir.modifiers) {
	    warn("v-on without argument does not support modifiers.");
	  }
	  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
	}

	/*  */

	function bind$1 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
	  };
	}

	/*  */

	var baseDirectives = {
	  on: on,
	  bind: bind$1,
	  cloak: noop
	};

	/*  */

	var CodegenState = function CodegenState (options) {
	  this.options = options;
	  this.warn = options.warn || baseWarn;
	  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
	  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  this.directives = extend(extend({}, baseDirectives), options.directives);
	  var isReservedTag = options.isReservedTag || no;
	  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
	  this.onceId = 0;
	  this.staticRenderFns = [];
	};



	function generate (
	  ast,
	  options
	) {
	  var state = new CodegenState(options);
	  var code = ast ? genElement(ast, state) : '_c("div")';
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: state.staticRenderFns
	  }
	}

	function genElement (el, state) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el, state)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el, state)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el, state)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el, state)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el, state) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el, state)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el, state);
	    } else {
	      var data = el.plain ? undefined : genData$2(el, state);

	      var children = el.inlineTemplate ? null : genChildren(el, state, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < state.transforms.length; i++) {
	      code = state.transforms[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el, state) {
	  el.staticProcessed = true;
	  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
	  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el, state) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el, state)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && state.warn(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el, state)
	    }
	    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
	  } else {
	    return genStatic(el, state)
	  }
	}

	function genIf (
	  el,
	  state,
	  altGen,
	  altEmpty
	) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
	}

	function genIfConditions (
	  conditions,
	  state,
	  altGen,
	  altEmpty
	) {
	  if (!conditions.length) {
	    return altEmpty || '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return altGen
	      ? altGen(el, state)
	      : el.once
	        ? genOnce(el, state)
	        : genElement(el, state)
	  }
	}

	function genFor (
	  el,
	  state,
	  altGen,
	  altHelper
	) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

	  if ("development" !== 'production' &&
	    state.maybeComponent(el) &&
	    el.tag !== 'slot' &&
	    el.tag !== 'template' &&
	    !el.key
	  ) {
	    state.warn(
	      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
	      "v-for should have explicit keys. " +
	      "See https://vuejs.org/guide/list.html#key for more info.",
	      true /* tip */
	    );
	  }

	  el.forProcessed = true; // avoid recursion
	  return (altHelper || '_l') + "((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + ((altGen || genElement)(el, state)) +
	    '})'
	}

	function genData$2 (el, state) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el, state);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < state.dataGenFns.length; i++) {
	    data += state.dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events, false, state.warn)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
	  }
	  // slot target
	  // only for non-scoped slots
	  if (el.slotTarget && !el.slotScope) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots, state)) + ",";
	  }
	  // component v-model
	  if (el.model) {
	    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el, state);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  // v-on data wrap
	  if (el.wrapListeners) {
	    data = el.wrapListeners(data);
	  }
	  return data
	}

	function genDirectives (el, state) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = state.directives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, state.warn);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el, state) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length !== 1 || ast.type !== 1
	  )) {
	    state.warn('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, state.options);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (
	  slots,
	  state
	) {
	  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
	      return genScopedSlot(key, slots[key], state)
	    }).join(',')) + "])")
	}

	function genScopedSlot (
	  key,
	  el,
	  state
	) {
	  if (el.for && !el.forProcessed) {
	    return genForScopedSlot(key, el, state)
	  }
	  var fn = "function(" + (String(el.slotScope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? el.if
	        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
	        : genChildren(el, state) || 'undefined'
	      : genElement(el, state)) + "}";
	  return ("{key:" + key + ",fn:" + fn + "}")
	}

	function genForScopedSlot (
	  key,
	  el,
	  state
	) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genScopedSlot(key, el, state)) +
	    '})'
	}

	function genChildren (
	  el,
	  state,
	  checkSkip,
	  altGenElement,
	  altGenNode
	) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	      el$1.for &&
	      el$1.tag !== 'template' &&
	      el$1.tag !== 'slot'
	    ) {
	      return (altGenElement || genElement)(el$1, state)
	    }
	    var normalizationType = checkSkip
	      ? getNormalizationType(children, state.maybeComponent)
	      : 0;
	    var gen = altGenNode || genNode;
	    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
	  }
	}

	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (
	  children,
	  maybeComponent
	) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}

	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}

	function genNode (node, state) {
	  if (node.type === 1) {
	    return genElement(node, state)
	  } if (node.type === 3 && node.isComment) {
	    return genComment(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genComment (comment) {
	  return ("_e(" + (JSON.stringify(comment.text)) + ")")
	}

	function genSlot (el, state) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el, state);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (
	  componentName,
	  el,
	  state
	) {
	  var children = el.inlineTemplate ? null : genChildren(el, state, true);
	  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    /* istanbul ignore if */
	    {
	      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	    }
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	// these keywords should not appear inside expressions, but operators like
	// typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');

	// these unary operators should not be used as property/method names
	var unaryOperatorsRE = new RegExp('\\b' + (
	  'delete,typeof,void'
	).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else if (onRE.test(name)) {
	            checkEvent(value, (name + "=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkEvent (exp, text, errors) {
	  var stipped = exp.replace(stripStringRE, '');
	  var keywordMatch = stipped.match(unaryOperatorsRE);
	  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
	    errors.push(
	      "avoid using JavaScript unary operator as property name: " +
	      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	    );
	  }
	  checkExpression(exp, text, errors);
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (
	  ident,
	  type,
	  text,
	  errors
	) {
	  if (typeof ident === 'string') {
	    try {
	      new Function(("var " + ident + "=_"));
	    } catch (e) {
	      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
	    }
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
	      );
	    } else {
	      errors.push(
	        "invalid expression: " + (e.message) + " in\n\n" +
	        "    " + exp + "\n\n" +
	        "  Raw expression: " + (text.trim()) + "\n"
	      );
	    }
	  }
	}

	/*  */

	function createFunction (code, errors) {
	  try {
	    return new Function(code)
	  } catch (err) {
	    errors.push({ err: err, code: code });
	    return noop
	  }
	}

	function createCompileToFunctionFn (compile) {
	  var cache = Object.create(null);

	  return function compileToFunctions (
	    template,
	    options,
	    vm
	  ) {
	    options = extend({}, options);
	    var warn$$1 = options.warn || warn;
	    delete options.warn;

	    /* istanbul ignore if */
	    {
	      // detect possible CSP restriction
	      try {
	        new Function('return 1');
	      } catch (e) {
	        if (e.toString().match(/unsafe-eval|CSP/)) {
	          warn$$1(
	            'It seems you are using the standalone build of Vue.js in an ' +
	            'environment with Content Security Policy that prohibits unsafe-eval. ' +
	            'The template compiler cannot work in this environment. Consider ' +
	            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	            'templates into render functions.'
	          );
	        }
	      }
	    }

	    // check cache
	    var key = options.delimiters
	      ? String(options.delimiters) + template
	      : template;
	    if (cache[key]) {
	      return cache[key]
	    }

	    // compile
	    var compiled = compile(template, options);

	    // check compilation errors/tips
	    {
	      if (compiled.errors && compiled.errors.length) {
	        warn$$1(
	          "Error compiling template:\n\n" + template + "\n\n" +
	          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
	          vm
	        );
	      }
	      if (compiled.tips && compiled.tips.length) {
	        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
	      }
	    }

	    // turn code into functions
	    var res = {};
	    var fnGenErrors = [];
	    res.render = createFunction(compiled.render, fnGenErrors);
	    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
	      return createFunction(code, fnGenErrors)
	    });

	    // check function generation errors.
	    // this should only happen if there is a bug in the compiler itself.
	    // mostly for codegen development use
	    /* istanbul ignore if */
	    {
	      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	        warn$$1(
	          "Failed to generate render function:\n\n" +
	          fnGenErrors.map(function (ref) {
	            var err = ref.err;
	            var code = ref.code;

	            return ((err.toString()) + " in\n\n" + code + "\n");
	        }).join('\n'),
	          vm
	        );
	      }
	    }

	    return (cache[key] = res)
	  }
	}

	/*  */

	function createCompilerCreator (baseCompile) {
	  return function createCompiler (baseOptions) {
	    function compile (
	      template,
	      options
	    ) {
	      var finalOptions = Object.create(baseOptions);
	      var errors = [];
	      var tips = [];
	      finalOptions.warn = function (msg, tip) {
	        (tip ? tips : errors).push(msg);
	      };

	      if (options) {
	        // merge custom modules
	        if (options.modules) {
	          finalOptions.modules =
	            (baseOptions.modules || []).concat(options.modules);
	        }
	        // merge custom directives
	        if (options.directives) {
	          finalOptions.directives = extend(
	            Object.create(baseOptions.directives || null),
	            options.directives
	          );
	        }
	        // copy other options
	        for (var key in options) {
	          if (key !== 'modules' && key !== 'directives') {
	            finalOptions[key] = options[key];
	          }
	        }
	      }

	      var compiled = baseCompile(template, finalOptions);
	      {
	        errors.push.apply(errors, detectErrors(compiled.ast));
	      }
	      compiled.errors = errors;
	      compiled.tips = tips;
	      return compiled
	    }

	    return {
	      compile: compile,
	      compileToFunctions: createCompileToFunctionFn(compile)
	    }
	  }
	}

	/*  */

	// `createCompilerCreator` allows creating compilers that use alternative
	// parser/optimizer/codegen, e.g the SSR optimizing compiler.
	// Here we just export a default compiler using the default parts.
	var createCompiler = createCompilerCreator(function baseCompile (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  if (options.optimize !== false) {
	    optimize(ast, options);
	  }
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	});

	/*  */

	var ref$1 = createCompiler(baseOptions);
	var compileToFunctions = ref$1.compileToFunctions;

	/*  */

	// check whether current browser encodes a char inside attribute values
	var div;
	function getShouldDecode (href) {
	  div = div || document.createElement('div');
	  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
	  return div.innerHTML.indexOf('&#10;') > 0
	}

	// #3663: IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
	// #6828: chrome encodes content in a[href]
	var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile');
	      }

	      var ref = compileToFunctions(template, {
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
	        delimiters: options.delimiters,
	        comments: options.comments
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;

	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile end');
	        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
	      }
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(3);
	// On some exotic environments, it's not clear which object `setimmeidate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = self && self.setImmediate || global && global.setImmediate || this && this.setImmediate;
	exports.clearImmediate = self && self.clearImmediate || global && global.clearImmediate || this && this.clearImmediate;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(6)

	/* template */
	var __vue_template__ = __webpack_require__(13)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\source\\BRS-BBS-OffLine\\app\\App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-73fb6de0", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-73fb6de0", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] App.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(7);

	var _store2 = _interopRequireDefault(_store);

	var _Census = __webpack_require__(9);

	var _Census2 = _interopRequireDefault(_Census);

	var _EventHub = __webpack_require__(11);

	var _EventHub2 = _interopRequireDefault(_EventHub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: {
	    Census: _Census2.default
	  },

	  data: function data() {
	    return {
	      censuses: {},
	      selectedCensus: ""
	    };
	  },
	  beforeMount: function beforeMount() {
	    this.updateListings();
	  },
	  mounted: function mounted() {
	    _store2.default.on("data-updated", this.updateListings);
	    _EventHub2.default.$on("filter-by-title", this.filterByTitle);
	  },

	  methods: {
	    updateListings: function updateListings() {
	      var _this = this;

	      _store2.default.getCensuses(function (err, censuses) {
	        if (err) {} else {
	          _this.censuses = censuses;
	        }
	      });
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//

	// the Javascript for our component
	// We will export a Vue component options object here

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _events = __webpack_require__(8);

	var store = new _events.EventEmitter();

	store.getDivisionList = function (cb) {
		var list = [];
		db.each('SELECT ID, (GEO_CODE ||\' - \'|| NAME) AS NAME\n\tFrom DIVISIONS', function (err, row) {
			list.push(row);
		}, function (err, rowCount) {
			cb(null, list);
		});
	};

	store.getAllCommonConfigList = function (cb, $table_name) {
		var $lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

		var list = [];

		db.each('SELECT ID, (CODE ||\' - \'|| NAME_BN) AS NAME\nFrom ' + $table_name, function (err, row) {
			list.push(row);
		}, function (err, rowCount) {
			cb(null, list);
		});
	};

	store.getCensuses = function (cb) {
		var censuses = {};

		db.each('SELECT census.id AS id,\n\tcensus.census_year AS census_year,\n\tcensus.SERIAL_NO_UNIT AS serial_no,\n\tcensus.NAME_OF_UNIT AS NAME_OF_UNIT,\n\tcensus.unit_type_code,\n\tcensus.unit_identification_code AS unit_identification_code,\n\tcensus.is_registered AS is_registred,\n   \n\tcc_unit_type.name AS unit_type_name,\n\tcc_unit_type.name_bn AS unit_type_name_bn,\n\tcensus.operator_user_id AS operator_user_id,\n\tcensus.present_status_id AS present_status_id,\n\tcensus.thana_upz_id AS thana_upz_id,\n\tcensus.district_id AS district_id,\n\tcensus.division_id AS division_id\nFrom census LEFT JOIN cc_unit_type ON cc_unit_type.id = census.unit_type_code', function (err, row) {
			censuses[row.id] = row;
		}, function (err, rowCount) {
			cb(null, censuses);
		});
	};

	store.getCensus = function (catId, cb) {
		db.get("select * from census where id=?", { 1: catId }, function (err, row) {
			cb(null, row);
		});
	};

	store.addCensus = function (Census) {
		db.serialize(function () {
			var stmt = db.prepare('insert into census\n\t\t(\'DIVISION_ID\', \'DISTRICT_ID\', \'THANA_UPZ_ID\', \'WARD_UNION_ID\', \'MAHALLAH_ID\', \'RMO_CODE\', \'SERIAL_NO_UNIT\', \'NAME_OF_UNIT\', \'NAME_OF_MAHALLAH\',\'NAME_OF_HOUSE\', \'NO_NAME_OF_ROAD\', \'FLOOR_LEVEL\',\n\t    \'HOLIDING_NO\', \'PHONE\', \'FAX\', \'EMAIL\', \'WEBSITE\', LEGAL_OWNERSHIP_CODE, TYPE_OF_OWNERSHIP, HEAD_GENDER_CODE, HEAD_OF_UNIT_AGE, HEAD_EDUCATION_CODE) \n\t\tvalues(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )');

			stmt.run(Census.DIVISION_ID, Census.DISTRICT_ID, Census.THANA_UPZ_ID, Census.WARD_UNION_ID, Census.MAHALLAH_ID, Census.RMO_CODE, Census.SERIAL_NO_UNIT, Census.NAME_OF_UNIT, Census.NAME_OF_MAHALLAH, Census.NAME_OF_HOUSE, Census.NO_NAME_OF_ROAD, Census.FLOOR_LEVEL, Census.HOLIDING_NO, Census.PHONE, Census.FAX, Census.EMAIL, Census.WEBSITE, Census.LEGAL_OWNERSHIP_CODE, Census.TYPE_OF_OWNERSHIP, Census.HEAD_GENDER_CODE, Census.HEAD_OF_UNIT_AGE, Census.HEAD_EDUCATION_CODE);

			store.emit('data-updated');
		});
	};

	store.editCensus = function (catId, Census) {
		db.serialize(function () {
			var sql = 'update census set \n\t\tDIVISION_ID=' + Census.DIVISION_ID + ', \n\t\tDISTRICT_ID=' + Census.DISTRICT_ID + ', \n\t\tTHANA_UPZ_ID=' + Census.THANA_UPZ_ID + ', \n\t\tWARD_UNION_ID=' + Census.WARD_UNION_ID + ', \n\t\tMAHALLAH_ID=' + Census.MAHALLAH_ID + ', \n\t\tRMO_CODE=' + Census.RMO_CODE + ', \n\t\tSERIAL_NO_UNIT=\'' + Census.SERIAL_NO_UNIT + '\', \n\t\tNAME_OF_UNIT=\'' + Census.NAME_OF_UNIT + '\', \n\t\tNAME_OF_MAHALLAH=\'' + Census.NAME_OF_MAHALLAH + '\',\n\t\tNAME_OF_HOUSE=\'' + Census.NAME_OF_HOUSE + '\',\n\t\tNO_NAME_OF_ROAD=\'' + Census.NO_NAME_OF_ROAD + '\',\n\t\tFLOOR_LEVEL=\'' + Census.FLOOR_LEVEL + '\',\n\t\tHOLIDING_NO=\'' + Census.HOLIDING_NO + '\',\n\t\tPHONE=\'' + Census.PHONE + '\',\n\t\tFAX=\'' + Census.FAX + '\',\n\t\tEMAIL=\'' + Census.EMAIL + '\',\n\t\tWEBSITE=\'' + Census.WEBSITE + '\',\n\t\tLEGAL_OWNERSHIP_CODE=' + Census.LEGAL_OWNERSHIP_CODE + ',\n\t\tTYPE_OF_OWNERSHIP=' + Census.TYPE_OF_OWNERSHIP + ',\n\t\tHEAD_GENDER_CODE=' + Census.HEAD_GENDER_CODE + ',\n\t\tHEAD_OF_UNIT_AGE=' + Census.HEAD_OF_UNIT_AGE + ',\n\t\tHEAD_EDUCATION_CODE=' + Census.HEAD_EDUCATION_CODE + '\n\t\twhere ID=' + Census.ID;
			db.run(sql);
			store.emit('data-updated');
		});
	};

	store.deleteCensus = function (catId) {
		db.serialize(function () {
			var stmt = db.prepare("delete from census where ID=?");
			stmt.run(catId);
			store.emit('data-updated');
		});
	};

	exports.default = store;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(10)

	/* template */
	var __vue_template__ = __webpack_require__(12)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\source\\BRS-BBS-OffLine\\app\\components\\Census.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-a55ec00c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-a55ec00c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Census.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _store = __webpack_require__(7);

	var _store2 = _interopRequireDefault(_store);

	var _EventHub = __webpack_require__(11);

	var _EventHub2 = _interopRequireDefault(_EventHub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//

	exports.default = {
	  data: function data() {
	    return {
	      fakeVar: "",
	      isEdit: false,
	      selectedCensus: "",
	      census: {
	        id: 0,
	        DIVISION_ID: 0,
	        DISTRICT_ID: 0,
	        THANA_UPZ_ID: 0,
	        WARD_UNION_ID: 0,
	        MAHALLAH_ID: 0,
	        RMO_CODE: 0,
	        SERIAL_NO_UNIT: 0,
	        NAME_OF_UNIT: "",
	        NAME_OF_MAHALLAH: "",
	        NAME_OF_HOUSE: "",
	        NO_NAME_OF_ROAD: "",
	        FLOOR_LEVEL: "",
	        HOLIDING_NO: "",
	        PHONE: "",
	        FAX: "",
	        EMAIL: "",
	        WEBSITE: "",
	        LEGAL_OWNERSHIP_CODE: 0,
	        TYPE_OF_OWNERSHIP: 0,
	        HEAD_GENDER_CODE: 0,
	        HEAD_OF_UNIT_AGE: 0,
	        HEAD_EDUCATION_CODE: 0

	      },
	      rmos: [],
	      divisions: [],
	      districts: [{
	        id: 1,
	        division_id: 1,
	        name: "Faridfur"
	      }, {
	        id: 2,
	        division_id: 1,
	        name: "Gazipur"
	      }, {
	        id: 3,
	        division_id: 2,
	        name: "Naogaon"
	      }, {
	        id: 4,
	        division_id: 2,
	        name: "Chapai Nawabganj"
	      }, {
	        id: 5,
	        division_id: 3,
	        name: "Comilla"
	      }, {
	        id: 6,
	        division_id: 3,
	        name: "Cox's Bazar"
	      }, {
	        id: 7,
	        division_id: 3,
	        name: "Bandarban"
	      }]
	    };
	  },

	  props: ["censuses"],
	  filters: {
	    //filterDistrictsByDivision: function (division_id) {
	    //	var division_id = division_id || this.census.division_id;
	    //	return this.districts.filter(district => district.division_id == division_id);
	    //}
	  },
	  mounted: function mounted() {
	    var _this = this;

	    _store2.default.getDivisionList(function (err, list) {
	      _this.divisions = list;
	    });
	    _store2.default.getAllCommonConfigList(function (err, list) {
	      _this.rmos = list;
	    }, 'cc_rmo');
	    _store2.default.getAllCommonConfigList(function (err, list) {
	      _this.legal_ownerships = list;
	    }, 'CC_LEGAL_OWNERSHIPS');
	    _store2.default.getAllCommonConfigList(function (err, list) {
	      _this.type_of_ownerships = list;
	    }, 'CC_OWNERSHIP_TYPES');
	    _store2.default.getAllCommonConfigList(function (err, list) {
	      _this.genders = list;
	    }, 'CC_GENDER');
	    _store2.default.getAllCommonConfigList(function (err, list) {
	      _this.educations = list;
	    }, 'CC_EDUCATION');
	    _store2.default.getAllCommonConfigList(function (err, list) {
	      _this.unit_types = list;
	    }, 'CC_UNIT_TYPE');
	  },

	  computed: {
	    districtsByDivision: function districtsByDivision() {
	      var division_id = this.census.division_id;
	      return this.districts.filter(function (district) {
	        return district.division_id == division_id;
	      });
	    }
	  },
	  methods: {
	    backToList: function backToList() {
	      this.isEdit = false;
	    },
	    addCensus: function addCensus() {
	      this.census = {
	        ID: 0,
	        division_id: 0,
	        district_id: 0,
	        RMO_CODE: 0,
	        serial_no_unit: "",
	        NAME_OF_UNIT: "",
	        name_of_mahallah: "",

	        HEAD_OFFICE_DIVISION: 0,
	        head_office_district: 0,
	        CENSUS_YEAR: "2018"
	      };
	      this.isEdit = true;
	    },
	    editCensus: function editCensus(CensusId) {
	      var _this2 = this;

	      _store2.default.getCensus(CensusId, function (err, Census) {
	        if (err) {} else {
	          _this2.census = Census;
	          _this2.isEdit = true;
	        }
	      });
	    },
	    saveCensus: function saveCensus() {
	      if (this.census.ID > 0) {
	        _store2.default.editCensus(this.census.ID, this.census);
	      } else {
	        _store2.default.addCensus(this.census);
	      }
	      this.isEdit = false;
	    },
	    deleteCensus: function deleteCensus(CensusId) {
	      if (confirm("Are you sure to delete this Census?")) {
	        _store2.default.deleteCensus(CensusId);
	      }
	    },
	    syncDownSetup: function syncDownSetup() {

	      //var vm = this
	      axios.get('http://192.168.50.14/api/divisions').then(function (response) {
	        db.run("DELETE FROM DIVISIONS");
	        var items = response.data;
	        for (var prop in items) {
	          //console.log(items[prop]);
	          var item = items[prop];
	          var sql_insert;
	          sql_insert = "INSERT INTO DIVISIONS (ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
	          sql_insert += " (" + item.id + ", '" + item.geo_code + "', '" + item.name + "', '" + item.name_bn + "', " + item.created_by + ", " + item.updated_by + ");";
	          db.run(sql_insert);
	          sql_insert = "";
	        }
	      });

	      axios.get('http://192.168.50.14/api/districts').then(function (response) {
	        db.run("DELETE FROM DISTRICTS");
	        var items = response.data;
	        for (var prop in items) {
	          //console.log(items[prop]);
	          var item = items[prop];
	          var sql_insert;
	          sql_insert = "INSERT INTO DISTRICTS (ID, DIVISION_ID, GEO_CODE, NAME, NAME_BN, CREATED_BY, UPDATED_BY) VALUES ";
	          sql_insert += " (" + item.id + ", " + item.division_id + ", '" + item.geo_code + "', '" + item.name + "', '" + item.name_bn + "', " + item.created_by + ", " + item.updated_by + ");";
	          db.run(sql_insert);
	          sql_insert = "";
	        }
	      });

	      alert('Setup Sync Done');

	      //console.log(vm.divisions);
	    },
	    syncUpCensus: function syncUpCensus(CensusID) {
	      if (confirm("Are you sure to Sync this Census?")) {
	        alert('ok');
	      }
	    }
	  }
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _vue2.default(); // Understanding Components Communication in Vue 2.0 http://taha-sh.com/blog/understanding-components-communication-in-vue-20

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('h2', [_vm._v(" স্ট্যাটিস্টিক্যাল বিজনেস রেজিস্টার\r\n\t\t"), _c('span', {
	    staticClass: "clickable right-float"
	  }, [_c('i', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isEdit == false),
	      expression: "isEdit==false"
	    }],
	    staticClass: "glyphicon glyphicon-plus",
	    on: {
	      "click": _vm.addCensus
	    }
	  }), _vm._v(" "), _c('i', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isEdit == true),
	      expression: "isEdit==true"
	    }],
	    staticClass: "glyphicon glyphicon-arrow-left",
	    on: {
	      "click": _vm.backToList
	    }
	  }), _vm._v(" "), _c('button', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isEdit == true),
	      expression: "isEdit==true"
	    }],
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button",
	      "value": "submit"
	    },
	    on: {
	      "click": _vm.saveCensus
	    }
	  }, [_c('i', {
	    staticClass: "icon-paperplane"
	  }), _vm._v(" সাবমিট")]), _vm._v(" "), _c('button', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isEdit == false),
	      expression: "isEdit==false"
	    }],
	    staticClass: "btn",
	    attrs: {
	      "type": "button",
	      "value": "submit"
	    },
	    on: {
	      "click": _vm.syncDownSetup
	    }
	  }, [_c('i', {
	    staticClass: "fa fa-arrow-circle-down"
	  }), _vm._v(" Sync Setup")])])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isEdit == false),
	      expression: "isEdit == false"
	    }],
	    attrs: {
	      "id": "censuses"
	    }
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('div', [_c('table', {
	    staticClass: "table table-bordered "
	  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.censuses), function(Census, id) {
	    return _c('tr', [_c('td', [_vm._v(_vm._s(Census.unit_identification_code))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Census.NAME_OF_UNIT))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Census.unit_type_name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Census.census_year))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(Census.is_registred))]), _vm._v(" "), _c('td', [_c('button', {
	      staticClass: "btn btn-success",
	      on: {
	        "click": function($event) {
	          _vm.editCensus(id)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "edit fa fa-edit"
	    }), _vm._v(" Edit")]), _vm._v(" "), _c('button', {
	      staticClass: "btn btn-danger",
	      on: {
	        "click": function($event) {
	          _vm.deleteCensus(id)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "remove fa fa-trash"
	    }), _vm._v(" Delete")]), _vm._v(" "), _c('button', {
	      staticClass: "btn btn-success",
	      on: {
	        "click": function($event) {
	          _vm.syncUpCensus(id)
	        }
	      }
	    }, [_c('i', {
	      staticClass: "fa fa-arrow-circle-up"
	    }), _vm._v(" Sync Up")])])])
	  }))])])])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.isEdit == true),
	      expression: "isEdit == true"
	    }],
	    attrs: {
	      "id": "census-modal"
	    }
	  }, [_c('div', {
	    staticClass: "modal-body"
	  }, [_c('form', {
	    staticClass: "ui form"
	  }, [_c('div', {
	    attrs: {
	      "id": "census-form-container"
	    }
	  }, [_vm._m(1), _vm._v(" "), _c('table', {
	    staticClass: "main-form-structure table-full-width table-item-bordered has-table-separator",
	    staticStyle: {
	      "width": "2125px"
	    }
	  }, [_c('thead', {
	    staticClass: "static-table-head"
	  }, [_c('tr', [_c('th', {
	    staticClass: "text-center"
	  }, [_c('div', {
	    staticClass: "unit-number-block-right"
	  }, [_c('label', {
	    attrs: {
	      "for": "unit-id-number"
	    }
	  }, [_vm._v("প্রতিষ্ঠানের আইডেন্টিফিকেশন নম্বর")]), _vm._v(" "), _c('div', [_vm._v(_vm._s(_vm.census.UNIT_IDENTIFICATION_CODE))])]), _vm._v(" "), _c('h6', {
	    staticClass: "no-margin"
	  }, [_vm._v("গণপ্রজাতন্ত্রী বাংলাদেশ সরকার")]), _vm._v(" "), _c('h5', {
	    staticClass: "no-margin"
	  }, [_vm._v("অর্থনৈতিক শুমারি ২০১৩ প্রকল্প")]), _vm._v(" "), _c('h4', {
	    staticClass: "no-margin"
	  }, [_vm._v("স্ট্যাটিস্টিক্যাল বিজনেস রেজিস্টার")])])])]), _vm._v(" "), _c('tbody', [_vm._m(2), _vm._v(" "), _c('tr', [_c('td', [_c('table', {
	    staticClass: "inner-form-structure table-full-width table-item-bordered"
	  }, [_vm._m(3), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', {
	    staticClass: "padding-10",
	    attrs: {
	      "rowspan": "4"
	    }
	  }, [_c('table', {
	    attrs: {
	      "width": "350",
	      "border": "0"
	    }
	  }, [_c('tbody', [_c('tr', [_vm._m(4), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.DIVISION_ID),
	      expression: "census.DIVISION_ID"
	    }],
	    staticClass: "select form-control",
	    attrs: {
	      "id": "division-id",
	      "required": "required",
	      "tabindex": "-1",
	      "name": "division_id",
	      "aria-required": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "DIVISION_ID", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(5), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.DISTRICT_ID),
	      expression: "census.DISTRICT_ID"
	    }],
	    staticClass: "select form-control",
	    attrs: {
	      "id": "district-id",
	      "required": "required",
	      "tabindex": "-1",
	      "name": "district_id",
	      "aria-required": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "DISTRICT_ID", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(6), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.THANA_UPZ_ID),
	      expression: "census.THANA_UPZ_ID"
	    }],
	    staticClass: "select form-control",
	    attrs: {
	      "id": "thana-upz-id",
	      "required": "required",
	      "tabindex": "-1",
	      "name": "thana_upz_id",
	      "aria-required": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "THANA_UPZ_ID", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(7), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.WARD_UNION_ID),
	      expression: "census.WARD_UNION_ID"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "ward-union-id",
	      "name": "ward_union_id",
	      "tabindex": "-1",
	      "aria-hidden": "true",
	      "aria-required": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "WARD_UNION_ID", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(8), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.MAHALLAH_ID),
	      expression: "census.MAHALLAH_ID"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "mahallah-id",
	      "required": "required",
	      "name": "mahallah_id",
	      "tabindex": "-1",
	      "aria-hidden": "true",
	      "aria-required": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "MAHALLAH_ID", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(9), _vm._v(" "), _c('td', {
	    staticClass: "form-group "
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.RMO_CODE),
	      expression: "census.RMO_CODE"
	    }],
	    staticClass: "select form-control",
	    attrs: {
	      "id": "rmo-code",
	      "required": "required",
	      "name": "rmo_code",
	      "tabindex": "-1",
	      "aria-hidden": "true",
	      "aria-required": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "RMO_CODE", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.rmos), function(rmo) {
	    return _c('option', {
	      domProps: {
	        "value": rmo.ID
	      }
	    }, [_vm._v(_vm._s(rmo.NAME))])
	  })], 2)])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10",
	    attrs: {
	      "rowspan": "4"
	    }
	  }, [_c('table', {
	    attrs: {
	      "width": "700",
	      "border": "0"
	    }
	  }, [_c('tbody', [_c('tr', [_vm._m(10), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.SERIAL_NO_UNIT),
	      expression: "census.SERIAL_NO_UNIT"
	    }],
	    staticClass: "form-control",
	    staticStyle: {
	      "width": "75px"
	    },
	    attrs: {
	      "id": "serial-no-unit",
	      "placeholder": "",
	      "required": "required",
	      "pattern": "[0-9]",
	      "maxlength": "3",
	      "name": "serial_no_unit",
	      "type": "text",
	      "aria-required": "true"
	    },
	    domProps: {
	      "value": (_vm.census.SERIAL_NO_UNIT)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "SERIAL_NO_UNIT", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(11), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.NAME_OF_UNIT),
	      expression: "census.NAME_OF_UNIT"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "unit-name",
	      "placeholder": "",
	      "required": "required",
	      "name": "name_of_unit",
	      "type": "text",
	      "aria-required": "true"
	    },
	    domProps: {
	      "value": (_vm.census.NAME_OF_UNIT)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "NAME_OF_UNIT", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(12), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.NAME_OF_MAHALLAH),
	      expression: "census.NAME_OF_MAHALLAH"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "mahallah-name",
	      "placeholder": "",
	      "required": "required",
	      "name": "name_of_mahallah",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.NAME_OF_MAHALLAH)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "NAME_OF_MAHALLAH", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(13), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.NAME_OF_HOUSE),
	      expression: "census.NAME_OF_HOUSE"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "house-name",
	      "name": "name_of_house",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.NAME_OF_HOUSE)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "NAME_OF_HOUSE", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(14), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.NO_NAME_OF_ROAD),
	      expression: "census.NO_NAME_OF_ROAD"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "road",
	      "name": "no_name_of_road",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.NO_NAME_OF_ROAD)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "NO_NAME_OF_ROAD", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(15), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.FLOOR_LEVEL),
	      expression: "census.FLOOR_LEVEL"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "floor-level",
	      "name": "floor_level",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.FLOOR_LEVEL)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "FLOOR_LEVEL", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(16), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.HOLIDING_NO),
	      expression: "census.HOLIDING_NO"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "holding-number",
	      "name": "holiding_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.HOLIDING_NO)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "HOLIDING_NO", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(17), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.PHONE),
	      expression: "census.PHONE"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "phone",
	      "name": "phone",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.PHONE)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "PHONE", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(18), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.FAX),
	      expression: "census.FAX"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "fax",
	      "placeholder": "",
	      "name": "fax",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.FAX)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "FAX", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(19), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.EMAIL),
	      expression: "census.EMAIL"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "email",
	      "placeholder": "someone@example.com",
	      "name": "email",
	      "type": "email"
	    },
	    domProps: {
	      "value": (_vm.census.EMAIL)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "EMAIL", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(20), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.WEBSITE),
	      expression: "census.WEBSITE"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "website",
	      "placeholder": "http://www.example.com",
	      "name": "website",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.WEBSITE)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "WEBSITE", $event.target.value)
	      }
	    }
	  })])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle",
	    attrs: {
	      "rowspan": "2"
	    }
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.LEGAL_OWNERSHIP_CODE),
	      expression: "census.LEGAL_OWNERSHIP_CODE"
	    }],
	    staticClass: "select form-control ",
	    staticStyle: {
	      "width": "500px"
	    },
	    attrs: {
	      "id": "legal-ownership-code",
	      "name": "legal_ownership_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "LEGAL_OWNERSHIP_CODE", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.legal_ownerships), function(item) {
	    return _c('option', {
	      domProps: {
	        "value": item.ID
	      }
	    }, [_vm._v(_vm._s(item.NAME))])
	  })], 2)]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle",
	    attrs: {
	      "rowspan": "2"
	    }
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.TYPE_OF_OWNERSHIP),
	      expression: "census.TYPE_OF_OWNERSHIP"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "type-of-ownership",
	      "name": "type_of_ownership",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "TYPE_OF_OWNERSHIP", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.type_of_ownerships), function(item) {
	    return _c('option', {
	      domProps: {
	        "value": item.ID
	      }
	    }, [_vm._v(_vm._s(item.NAME))])
	  })], 2)]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_vm._m(21), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.HEAD_GENDER_CODE),
	      expression: "census.HEAD_GENDER_CODE"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "head-gender-code",
	      "name": "head_gender_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "HEAD_GENDER_CODE", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.genders), function(item) {
	    return _c('option', {
	      domProps: {
	        "value": item.ID
	      }
	    }, [_vm._v(_vm._s(item.NAME))])
	  })], 2)]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.HEAD_OF_UNIT_AGE),
	      expression: "census.HEAD_OF_UNIT_AGE"
	    }],
	    staticClass: "form-control input-small",
	    attrs: {
	      "id": "head-unit-age",
	      "min": "0",
	      "placeholder": "(পূর্ণ বছরে লিখুন)",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "head_of_unit_age",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.HEAD_OF_UNIT_AGE)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "HEAD_OF_UNIT_AGE", $event.target.value)
	      }
	    }
	  })]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.HEAD_EDUCATION_CODE),
	      expression: "census.HEAD_EDUCATION_CODE"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "head-education-code",
	      "name": "head_education_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "HEAD_EDUCATION_CODE", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.educations), function(item) {
	    return _c('option', {
	      domProps: {
	        "value": item.ID
	      }
	    }, [_vm._v(_vm._s(item.NAME))])
	  })], 2)])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_vm._m(22), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 "
	  }, [_c('select', {
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "unit-type-code",
	      "required": "required",
	      "name": "unit_type_code",
	      "tabindex": "-1",
	      "aria-hidden": "true",
	      "aria-required": "true"
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.unit_types), function(item) {
	    return _c('option', {
	      attrs: {
	        "value": "item.ID"
	      }
	    }, [_vm._v(_vm._s(item.NAME))])
	  })], 2)])])])])])]), _vm._v(" "), _vm._m(23), _vm._v(" "), _vm._m(24), _vm._v(" "), _c('tr', [_c('td', {
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_c('table', {
	    staticClass: "table-full-width",
	    attrs: {
	      "width": "100%"
	    }
	  }, [_c('tbody', [_vm._m(25), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "text-center"
	  }, [_c('div', {
	    staticClass: "form-group select2-width--auto "
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.is_under_enterprise),
	      expression: "census.is_under_enterprise"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "disabled": "",
	      "id": "is-under-ent",
	      "name": "is_under_enterprise",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "is_under_enterprise", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])]), _vm._v(" "), _c('div', {
	    staticClass: "text-center"
	  }, [_c('label', {
	    attrs: {
	      "for": "enterprise"
	    }
	  }, [_vm._v("এন্টারপ্রাইজ")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group "
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.enterprise_id),
	      expression: "census.enterprise_id"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "disabled": "",
	      "id": "enterprise",
	      "name": "enterprise_id",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "enterprise_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "262"
	    }
	  }, [_vm._v("ASHA ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "261"
	    }
	  }, [_vm._v("POLYCON LIMITED")])])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width",
	    attrs: {
	      "width": "100%"
	    }
	  }, [_c('tbody', [_vm._m(26), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._m(27), _vm._v(" "), _c('div', {
	    staticClass: "text-center"
	  }, [_c('label', {
	    attrs: {
	      "for": "enterprise-group-id-2"
	    }
	  }, [_vm._v("এন্টারপ্রাইজ গ্রুপ")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group "
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.enterprise_group_id_2),
	      expression: "census.enterprise_group_id_2"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "disabled": "",
	      "id": "enterprise-group-id-2",
	      "name": "enterprise_group_id_2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "enterprise_group_id_2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "262"
	    }
	  }, [_vm._v("ASHA ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "261"
	    }
	  }, [_vm._v("POLYCON LIMITED")])])])])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.unit_mode_code),
	      expression: "census.unit_mode_code"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "unit-mode-code",
	      "name": "unit_mode_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "unit_mode_code", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - প্রধান কার্যালয়")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - বিভাগীয় কার্যালয়")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - আঞ্চলিক কার্যালয়")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("4 - জেলা কার্যালয়")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("5 - শাখা কার্যালয়")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "6"
	    }
	  }, [_vm._v("6 - একক/স্বতন্ত্র প্রতিষ্ঠান")])])])])])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    attrs: {
	      "rowspan": "2"
	    }
	  }, [_c('table', {
	    staticClass: "table-full-width table-item-bordered",
	    attrs: {
	      "width": "900"
	    }
	  }, [_c('tbody', [_vm._m(28), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10",
	    attrs: {
	      "width": "60%"
	    }
	  }, [_c('table', {
	    attrs: {
	      "border": "0"
	    }
	  }, [_c('tbody', [_c('tr', [_vm._m(29), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_name),
	      expression: "census.head_office_name"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "head-office-name",
	      "name": "head_office_name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_name", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(30), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_mahallah),
	      expression: "census.head_office_mahallah"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "head-office-mahallah",
	      "name": "head_office_mahallah",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_mahallah)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_mahallah", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(31), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_house),
	      expression: "census.head_office_house"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "head-office-house",
	      "name": "head_office_house",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_house)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_house", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(32), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_road),
	      expression: "census.head_office_road"
	    }],
	    staticClass: "form-control input-uppercase",
	    attrs: {
	      "id": "head-office-road",
	      "name": "head_office_road",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_road)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_road", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(33), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_floor_level),
	      expression: "census.head_office_floor_level"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "head-office-floor-level",
	      "name": "head_office_floor_level",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_floor_level)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_floor_level", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(34), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_holiding_no),
	      expression: "census.head_office_holiding_no"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "head-office-holding-number",
	      "name": "head_office_holiding_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_holiding_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_holiding_no", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(35), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_phone),
	      expression: "census.head_office_phone"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "head-office-phone",
	      "name": "head_office_phone",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_phone)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_phone", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(36), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_fax),
	      expression: "census.head_office_fax"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "head-office-fax",
	      "name": "head_office_fax",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_fax)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_fax", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_vm._m(37), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_email),
	      expression: "census.head_office_email"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "head-office-email",
	      "placeholder": "someone@example.com",
	      "name": "head_office_email",
	      "type": "email"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_email", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(38), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_website),
	      expression: "census.head_office_website"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "head-office-website",
	      "placeholder": "http://www.example.com",
	      "name": "head_office_website",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.head_office_website)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "head_office_website", $event.target.value)
	      }
	    }
	  })])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    attrs: {
	      "border": "0"
	    }
	  }, [_c('tbody', [_c('tr', [_vm._m(39), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.HEAD_OFFICE_DIVISION),
	      expression: "census.HEAD_OFFICE_DIVISION"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "head-office-division",
	      "name": "head_office_division",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "HEAD_OFFICE_DIVISION", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _vm._l((_vm.divisions), function(item) {
	    return _c('option', {
	      attrs: {
	        "value": "item.ID"
	      }
	    }, [_vm._v(_vm._s(item.NAME))])
	  })], 2)])])]), _vm._v(" "), _c('tr', [_vm._m(40), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_district),
	      expression: "census.head_office_district"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "head-office-district",
	      "name": "head_office_district",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "head_office_district", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(41), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_thana_upz),
	      expression: "census.head_office_thana_upz"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "head-office-thana-upz",
	      "name": "head_office_thana_upz",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "head_office_thana_upz", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(42), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_ward_union),
	      expression: "census.head_office_ward_union"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "head-office-ward-union",
	      "name": "head_office_ward_union",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "head_office_ward_union", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(43), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_mauza),
	      expression: "census.head_office_mauza"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "head-office-mauza",
	      "name": "head_office_mauza",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "head_office_mauza", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  })])])])]), _vm._v(" "), _c('tr', [_vm._m(44), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.head_office_rmo_code),
	      expression: "census.head_office_rmo_code"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "head-office-rmo-code",
	      "name": "head_office_rmo_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "head_office_rmo_code", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - Rural")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - Municipality")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - Upazila Head Quarter")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("5 - Cantonment")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("7 - Growth Center")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "6"
	    }
	  }, [_vm._v("9 - City Corporation")])])])])])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(45), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group "
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.is_reporting_unit),
	      expression: "census.is_reporting_unit"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "is-reporting-unit",
	      "name": "is_reporting_unit",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "is_reporting_unit", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(46), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.has_trade_license),
	      expression: "census.has_trade_license"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "has-trade-license",
	      "name": "has_trade_license",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "has_trade_license", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - প্রয়োজ্য নয়")])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(47), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.trade_license_authority),
	      expression: "census.trade_license_authority"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "trade-license-authority",
	      "name": "trade_license_authority",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "trade_license_authority", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - সিটি কর্পোরেশন")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - পৌরসভা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - ইউনিয়ন পরিষদ")])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(48), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.trade_license_number),
	      expression: "census.trade_license_number"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "trade-license-number",
	      "maxlength": "10",
	      "name": "trade_license_number",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.trade_license_number)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "trade_license_number", $event.target.value)
	      }
	    }
	  })])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(49), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.is_registered),
	      expression: "census.is_registered"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "is-registered",
	      "name": "is_registered",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "is_registered", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    attrs: {
	      "colspan": "5"
	    }
	  }, [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_vm._m(50), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.reg_org_code1),
	      expression: "census.reg_org_code1"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "reg_org_code1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "reg_org_code1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - জয়েন্ট স্টক কোম্পানী")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.reg_org_code2),
	      expression: "census.reg_org_code2"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "reg_org_code2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "reg_org_code2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - জয়েন্ট স্টক কোম্পানী")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.reg_org_code3),
	      expression: "census.reg_org_code3"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "reg_org_code3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "reg_org_code3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - জয়েন্ট স্টক কোম্পানী")])])])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.registration_no1),
	      expression: "census.registration_no1"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "maxlength": "10",
	      "name": "registration_no1",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.registration_no1)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "registration_no1", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.registration_no2),
	      expression: "census.registration_no2"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "maxlength": "10",
	      "name": "registration_no2",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.registration_no2)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "registration_no2", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.registration_no3),
	      expression: "census.registration_no3"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "maxlength": "10",
	      "name": "registration_no3",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.registration_no3)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "registration_no3", $event.target.value)
	      }
	    }
	  })])])])])])])])])])])])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_vm._m(51), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 valign-middle text-center",
	    staticStyle: {
	      "width": "250px"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.is_under_permission_auth),
	      expression: "census.is_under_permission_auth"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "is-under-permission-auth",
	      "name": "is_under_permission_auth",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "is_under_permission_auth", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])]), _vm._v(" "), _vm._m(52)])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.permission_auth_id1),
	      expression: "census.permission_auth_id1"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "permission_auth_id1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "permission_auth_id1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ পরিবেশ অধিদপ্তর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - জেলা প্রশাসক")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - বাংলাদেশ অভ্যন্তরীন নৌ-পরিবহন কর্তৃপক্ষ")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.permission_auth_id2),
	      expression: "census.permission_auth_id2"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "permission_auth_id2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "permission_auth_id2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ পরিবেশ অধিদপ্তর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - জেলা প্রশাসক")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - বাংলাদেশ অভ্যন্তরীন নৌ-পরিবহন কর্তৃপক্ষ")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.permission_auth_id3),
	      expression: "census.permission_auth_id3"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "permission_auth_id3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "permission_auth_id3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ পরিবেশ অধিদপ্তর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - জেলা প্রশাসক")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - বাংলাদেশ অভ্যন্তরীন নৌ-পরিবহন কর্তৃপক্ষ")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.permission_auth_id4),
	      expression: "census.permission_auth_id4"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "permission_auth_id4",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "permission_auth_id4", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ পরিবেশ অধিদপ্তর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - জেলা প্রশাসক")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - বাংলাদেশ অভ্যন্তরীন নৌ-পরিবহন কর্তৃপক্ষ")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.permission_auth_id5),
	      expression: "census.permission_auth_id5"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "permission_auth_id5",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "permission_auth_id5", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ পরিবেশ অধিদপ্তর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - জেলা প্রশাসক")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - বাংলাদেশ অভ্যন্তরীন নৌ-পরিবহন কর্তৃপক্ষ")])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.permission_auth_id6),
	      expression: "census.permission_auth_id6"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "data-placeholder": "",
	      "name": "permission_auth_id6",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "permission_auth_id6", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - কলকারখানা ও প্রতিষ্ঠান পরিদর্শন অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ পরিবেশ অধিদপ্তর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - জেলা প্রশাসক")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ফায়ার সার্ভিস ও সিভিল ডিফেন্স অধিদপ্তর ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - বাংলাদেশ অভ্যন্তরীন নৌ-পরিবহন কর্তৃপক্ষ")])])])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.approval_registration_no1),
	      expression: "census.approval_registration_no1"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "maxlength": "10",
	      "name": "approval_registration_no1",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.approval_registration_no1)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "approval_registration_no1", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.approval_registration_no2),
	      expression: "census.approval_registration_no2"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "maxlength": "10",
	      "name": "approval_registration_no2",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.approval_registration_no2)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "approval_registration_no2", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.approval_registration_no3),
	      expression: "census.approval_registration_no3"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "maxlength": "10",
	      "name": "approval_registration_no3",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.approval_registration_no3)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "approval_registration_no3", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.approval_registration_no4),
	      expression: "census.approval_registration_no4"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "maxlength": "10",
	      "name": "approval_registration_no4",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.approval_registration_no4)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "approval_registration_no4", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.approval_registration_no5),
	      expression: "census.approval_registration_no5"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "maxlength": "10",
	      "name": "approval_registration_no5",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.approval_registration_no5)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "approval_registration_no5", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.approval_registration_no6),
	      expression: "census.approval_registration_no6"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "maxlength": "10",
	      "name": "approval_registration_no6",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.approval_registration_no6)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "approval_registration_no6", $event.target.value)
	      }
	    }
	  })])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.has_environmental_control),
	      expression: "census.has_environmental_control"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "has-environmental-control",
	      "name": "has_environmental_control",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "has_environmental_control", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.pollution_control_measure_id),
	      expression: "census.pollution_control_measure_id"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "membership-authority",
	      "name": "pollution_control_measure_id",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "pollution_control_measure_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - তরল বর্জ্য ব্যবস্থাপনা প্ল্যান্ট (ETP)")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - বায়ু দূষণ নিয়ন্ত্রণ ব্যবস্থা (ATP)")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - কঠিন বর্জ্য ব্যবস্থাপনা ")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.has_specialized_zone),
	      expression: "census.has_specialized_zone"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "has-specialized-zone",
	      "name": "has_specialized_zone",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "has_specialized_zone", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.specialty_code_id),
	      expression: "census.specialty_code_id"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "membership-authority",
	      "name": "specialty_code_id",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "specialty_code_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - বাংলাদেশ বিনিয়োগ উন্নয়ন কর্তৃপক্ষ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - বাংলাদেশ রপ্তানি প্রক্রিয়াকরণ অঞ্চল কর্তৃপক্ষ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - বাংলাদেশ অর্থনৈতিক অঞ্চল কর্তৃপক্ষ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - বাংলাদেশ ক্ষুদ্র ও কুটির শিল্প কর্পোরেশন")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.has_membership),
	      expression: "census.has_membership"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "has-membership",
	      "name": "has_membership",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "has_membership", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])]), _vm._v(" "), _c('div', [_c('label', {
	    attrs: {
	      "for": "membership-authority"
	    }
	  }, [_vm._v("১৫.১ অ্যাসোসিয়েশনের নাম")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.membership_authority),
	      expression: "census.membership_authority"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "membership-authority",
	      "name": "membership_authority",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.membership_authority)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "membership_authority", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', [_c('label', {
	    attrs: {
	      "for": "membership-number"
	    }
	  }, [_vm._v("১৫.২ সদস্য নম্বর")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.membership_number),
	      expression: "census.membership_number"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "membership-number",
	      "name": "membership_number",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.membership_number)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "membership_number", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.has_chamber_membership),
	      expression: "census.has_chamber_membership"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "has-chamber-membership",
	      "name": "has_chamber_membership",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "has_chamber_membership", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])]), _vm._v(" "), _c('div', [_c('label', {
	    attrs: {
	      "for": "chamber-name"
	    }
	  }, [_vm._v("১৬.১ চেম্বারের নাম")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.chamber_name),
	      expression: "census.chamber_name"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "chamber-name",
	      "name": "chamber_name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.chamber_name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "chamber_name", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('div', [_c('label', {
	    attrs: {
	      "for": "chamber-membership-number"
	    }
	  }, [_vm._v("১৬.২ সদস্য নম্বর")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.chamber_membership_number),
	      expression: "census.chamber_membership_number"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "chamber-membership-number",
	      "name": "chamber_membership_number",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.chamber_membership_number)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "chamber_membership_number", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.year_of_establishment),
	      expression: "census.year_of_establishment"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "establishment-year",
	      "placeholder": "eg. 1970",
	      "min": "0",
	      "name": "year_of_establishment",
	      "type": "number"
	    },
	    domProps: {
	      "value": (_vm.census.year_of_establishment)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "year_of_establishment", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('div', [_vm._v("\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(ইংরেজি সাল লিখুন)\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])]), _vm._v(" "), _c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(53), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t১৮. প্রতিষ্ঠানটির বাণিজ্যিক কার্যক্রম শুরুর সাল\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.year_of_inception),
	      expression: "census.year_of_inception"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "inception-year",
	      "placeholder": "eg. 1970",
	      "min": "0",
	      "name": "year_of_inception",
	      "type": "number"
	    },
	    domProps: {
	      "value": (_vm.census.year_of_inception)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "year_of_inception", $event.target.value)
	      }
	    }
	  }), _vm._v(" "), _c('div', [_vm._v("\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t(ইংরেজি সাল লিখুন)\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t")])])])])])])])])])])])]), _vm._v(" "), _c('tr', [_c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_vm._m(54), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.current_status_of_unit),
	      expression: "census.current_status_of_unit"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "unit-current-status",
	      "name": "current_status_of_unit",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "current_status_of_unit", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - চলমান")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - সাময়িকভাবে বন্ধ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - স্থায়ীভাবে বন্ধ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "21"
	    }
	  }, [_vm._v("4 - লে-অফ")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', [_c('label', {
	    attrs: {
	      "for": "reopen-month"
	    }
	  }, [_vm._v("মাস")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.tmp_closed_reopen_month),
	      expression: "census.tmp_closed_reopen_month"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "reopen-month",
	      "name": "tmp_closed_reopen_month",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "tmp_closed_reopen_month", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("01 - জানুয়ারী")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("02 - ফেব্রুয়ারী")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("03 - মার্চ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("04 - এপ্রিল")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("05 - মে")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "6"
	    }
	  }, [_vm._v("06 - জুন")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "7"
	    }
	  }, [_vm._v("07 - জুলাই")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "8"
	    }
	  }, [_vm._v("08 - আগস্ট")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "9"
	    }
	  }, [_vm._v("09 - সেপ্টেম্বর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "10"
	    }
	  }, [_vm._v("10 - অক্টোবর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "11"
	    }
	  }, [_vm._v("11 - নভেম্বর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "12"
	    }
	  }, [_vm._v("12 - ডিসেম্বর")])])])]), _vm._v(" "), _vm._m(55)]), _vm._v(" "), _vm._m(56), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.reason_of_close_code),
	      expression: "census.reason_of_close_code"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "closing-reason",
	      "name": "reason_of_close_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "reason_of_close_code", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - মূলধনের অভাব")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - জনবলের অভাব")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - জলবায়ুগত সমস্যা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "4"
	    }
	  }, [_vm._v("4 - মেশিনারি সমস্যা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "5"
	    }
	  }, [_vm._v("5 - ইউটিলিটি সমস্যা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "6"
	    }
	  }, [_vm._v("6 - কাঁচামালের সমস্যা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "7"
	    }
	  }, [_vm._v("7 - মৌসুমী উৎপাদন")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "8"
	    }
	  }, [_vm._v("8 - আইনগত জটিলতা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "9"
	    }
	  }, [_vm._v("9 - ব্যবসার ধরন পরিবর্তন")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "10"
	    }
	  }, [_vm._v("10 - প্রাকৃতিক দুর্যোগ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "11"
	    }
	  }, [_vm._v("11 - অগ্নিকান্ড")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "12"
	    }
	  }, [_vm._v("12 - অন্যান্য দুর্ঘটনা")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "13"
	    }
	  }, [_vm._v("13 - অন্যান্য")])])])]), _vm._v(" "), _vm._m(57)]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._m(58), _vm._v(" "), _c('div', [_c('label', {
	    staticClass: "text-center",
	    staticStyle: {
	      "display": "block"
	    },
	    attrs: {
	      "for": "main-industrial-code"
	    }
	  }, [_vm._v("কোড")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.main_industrial_code),
	      expression: "census.main_industrial_code"
	    }],
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "id": "main-industrial-code",
	      "name": "main_industrial_code",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "main_industrial_code", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1301"
	    }
	  }, [_vm._v("0111")])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(59), _vm._v(" "), _c('tr', [_vm._m(60), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-top"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.minor_industrial_code1),
	      expression: "census.minor_industrial_code1"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "minor_industrial_code1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "minor_industrial_code1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1301"
	    }
	  }, [_vm._v("0111")])])])])]), _vm._v(" "), _c('tr', [_vm._m(61), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-top"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.minor_industrial_code2),
	      expression: "census.minor_industrial_code2"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "minor_industrial_code2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "minor_industrial_code2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1301"
	    }
	  }, [_vm._v("0111")])])])])]), _vm._v(" "), _c('tr', [_vm._m(62), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-top"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.minor_industrial_code3),
	      expression: "census.minor_industrial_code3"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "minor_industrial_code3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "minor_industrial_code3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1301"
	    }
	  }, [_vm._v("0111")])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_vm._m(63), _vm._v(" "), _c('tr', [_vm._m(64), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-top"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.supporting_industrial_code1),
	      expression: "census.supporting_industrial_code1"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "supporting_industrial_code1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "supporting_industrial_code1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1301"
	    }
	  }, [_vm._v("0111")])])])])]), _vm._v(" "), _c('tr', [_vm._m(65), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-top"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.supporting_industrial_code2),
	      expression: "census.supporting_industrial_code2"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "supporting_industrial_code2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "supporting_industrial_code2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1301"
	    }
	  }, [_vm._v("0111")])])])])])])])])])])])])])])]), _vm._v(" "), _c('table', {
	    staticClass: "main-form-structure table-full-width table-item-bordered has-table-separator",
	    staticStyle: {
	      "width": "2125px"
	    }
	  }, [_vm._m(66), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width",
	    attrs: {
	      "width": "400"
	    }
	  }, [_c('tbody', [_vm._m(67), _vm._v(" "), _c('tr', [_vm._m(68), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.product_bsic_code1),
	      expression: "census.product_bsic_code1"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "product_bsic_code1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "product_bsic_code1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_vm._m(69), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.product_bsic_code2),
	      expression: "census.product_bsic_code2"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "product_bsic_code2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "product_bsic_code2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_vm._m(70), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.product_bsic_code3),
	      expression: "census.product_bsic_code3"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "product_bsic_code3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "product_bsic_code3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_vm._m(71), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.product_bsic_code4),
	      expression: "census.product_bsic_code4"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "product_bsic_code4",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "product_bsic_code4", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_vm._m(72), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.product_bsic_code5),
	      expression: "census.product_bsic_code5"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "product_bsic_code5",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "product_bsic_code5", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_vm._m(73), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.product_bsic_code6),
	      expression: "census.product_bsic_code6"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "product_bsic_code6",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "product_bsic_code6", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width",
	    attrs: {
	      "width": "400"
	    }
	  }, [_c('tbody', [_vm._m(74), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-3"
	  }, [_vm._v("১.")]), _vm._v(" "), _vm._m(75), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.service_bsic_code1),
	      expression: "census.service_bsic_code1"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "service_bsic_code1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "service_bsic_code1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-3"
	  }, [_vm._v("২.")]), _vm._v(" "), _vm._m(76), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.service_bsic_code2),
	      expression: "census.service_bsic_code2"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "service_bsic_code2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "service_bsic_code2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-3"
	  }, [_vm._v("৩.")]), _vm._v(" "), _vm._m(77), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.service_bsic_code3),
	      expression: "census.service_bsic_code3"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "service_bsic_code3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "service_bsic_code3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-3"
	  }, [_vm._v("৪.")]), _vm._v(" "), _vm._m(78), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.service_bsic_code4),
	      expression: "census.service_bsic_code4"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "service_bsic_code4",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "service_bsic_code4", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-3"
	  }, [_vm._v("৫.")]), _vm._v(" "), _vm._m(79), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.service_bsic_code5),
	      expression: "census.service_bsic_code5"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "service_bsic_code5",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "service_bsic_code5", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-3"
	  }, [_vm._v("৬.")]), _vm._v(" "), _vm._m(80), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.service_bsic_code6),
	      expression: "census.service_bsic_code6"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "service_bsic_code6",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "service_bsic_code6", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])])])])]), _vm._v(" "), _c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered",
	    attrs: {
	      "width": "1160"
	    }
	  }, [_c('tbody', [_vm._m(81), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.is_export),
	      expression: "census.is_export"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "is-export",
	      "name": "is_export",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "is_export", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.export_erc_code),
	      expression: "census.export_erc_code"
	    }],
	    staticClass: "form-control input-medium",
	    attrs: {
	      "id": "export-erc-code",
	      "name": "export_erc_code",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.export_erc_code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "export_erc_code", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(82), _vm._v(" "), _vm._m(83), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.export_product_services1),
	      expression: "census.export_product_services1"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "export_product_services1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "export_product_services1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.export_product_services2),
	      expression: "census.export_product_services2"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "export_product_services2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "export_product_services2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.export_product_services3),
	      expression: "census.export_product_services3"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "export_product_services3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "export_product_services3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])]), _vm._v(" "), _vm._m(84), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.is_import),
	      expression: "census.is_import"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "is-import",
	      "name": "is_import",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "is_import", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.import_irc_code),
	      expression: "census.import_irc_code"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "import-irc-code",
	      "name": "import_irc_code",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.import_irc_code)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "import_irc_code", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _vm._m(85), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 "
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.import_product_services1),
	      expression: "census.import_product_services1"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "import_product_services1",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "import_product_services1", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.import_product_services2),
	      expression: "census.import_product_services2"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "import_product_services2",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "import_product_services2", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.import_product_services3),
	      expression: "census.import_product_services3"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "data-placeholder": "",
	      "name": "import_product_services3",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "import_product_services3", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2980"
	    }
	  }, [_vm._v("00000")])])])])])])])])])])]), _vm._v(" "), _c('table', {
	    staticClass: "main-form-structure table-full-width table-item-bordered",
	    staticStyle: {
	      "width": "2125px"
	    }
	  }, [_c('tbody', [_vm._m(86), _vm._v(" "), _vm._m(87), _vm._v(" "), _vm._m(88), _vm._v(" "), _c('tr', [_vm._m(89), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_vm._m(90), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group",
	    staticStyle: {
	      "width": "100%"
	    }
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.last_year_prod_raw_materials),
	      expression: "census.last_year_prod_raw_materials"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "last-year-production-raw-materials",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "last_year_prod_raw_materials",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.last_year_prod_raw_materials)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "last_year_prod_raw_materials", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _vm._m(91), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group",
	    staticStyle: {
	      "width": "100%"
	    }
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.last_year_other_expenses_sum),
	      expression: "census.last_year_other_expenses_sum"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "id": "last-year-other-expenses-amount",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "last_year_other_expenses_sum",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.last_year_other_expenses_sum)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "last_year_other_expenses_sum", $event.target.value)
	      }
	    }
	  })])])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.have_any_loan),
	      expression: "census.have_any_loan"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "have-any-loan",
	      "name": "have_any_loan",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "have_any_loan", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])])])]), _vm._v(" "), _c('table', {
	    staticClass: "main-form-structure table-full-width table-item-bordered",
	    staticStyle: {
	      "width": "2125px"
	    }
	  }, [_c('tbody', [_vm._m(92), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.loan_fin_org_type),
	      expression: "census.loan_fin_org_type"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "loan-org-type",
	      "name": "loan_fin_org_type",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "loan_fin_org_type", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - ব্যাংক")])])])]), _vm._v(" "), _vm._m(93), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.have_accounting_account),
	      expression: "census.have_accounting_account"
	    }],
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "have-accounting-account",
	      "name": "have_accounting_account",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "have_accounting_account", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.accounting_account_type_id),
	      expression: "census.accounting_account_type_id"
	    }],
	    staticClass: "select form-control select2-control select2-md select2-hidden-accessible",
	    attrs: {
	      "id": "loan-org-type",
	      "name": "accounting_account_type_id",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.$set(_vm.census, "accounting_account_type_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0])
	      }
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - অর্থবছর")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - খ্রিস্টাব্দ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "3"
	    }
	  }, [_vm._v("3 - বঙ্গাব্দ")])])])]), _vm._v(" "), _vm._m(94)])])]), _vm._v(" "), _c('table', {
	    staticClass: "main-form-structure table-full-width table-item-bordered",
	    staticStyle: {
	      "width": "2125px"
	    }
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৫. প্রতিষ্ঠানে নিয়োজিত সকল বিদেশি কর্মী")]), _vm._v(" "), _c('td', {
	    staticClass: "valign-middle",
	    attrs: {
	      "rowspan": "2"
	    }
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', {
	    staticClass: "bottom-bordered"
	  }, [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t৩৬. প্রতিষ্ঠানটির ই-টিআইএন (e-TIN) নং (যদি থাকে)\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.tin_no),
	      expression: "census.tin_no"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "maxlength": "12",
	      "id": "tin-number",
	      "name": "tin_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.tin_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "tin_no", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t৩৭. প্রতিষ্ঠানটির ভ্যাট (VAT) নং (যদি থাকে)\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.vat_no),
	      expression: "census.vat_no"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "maxlength": "12",
	      "id": "vat-number",
	      "name": "vat_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.vat_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "vat_no", $event.target.value)
	      }
	    }
	  })])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৮. তথ্যপ্রদানকারী")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৯. তথ্যসংগ্রহকারী")])]), _vm._v(" "), _c('tr', [_vm._m(95), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    attrs: {
	      "width": "100"
	    }
	  }, [_vm._v("নাম")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.provider_name),
	      expression: "census.provider_name"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "provider-name",
	      "placeholder": "",
	      "name": "provider_name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.provider_name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "provider_name", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("পদবি")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.provider_designation),
	      expression: "census.provider_designation"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "provider-designation",
	      "placeholder": "",
	      "name": "provider_designation",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.provider_designation)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "provider_designation", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("NID নম্বর")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.provider_nid),
	      expression: "census.provider_nid"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "provider-nid",
	      "placeholder": "",
	      "name": "provider_nid",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.provider_nid)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "provider_nid", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("প্রাতিষ্ঠানিক আইডি নম্বর")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.provider_org_id_no),
	      expression: "census.provider_org_id_no"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "provider-org_id_no",
	      "placeholder": "",
	      "name": "provider_org_id_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.provider_org_id_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "provider_org_id_no", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("মোবাইল নম্বর")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.provider_mobile_no),
	      expression: "census.provider_mobile_no"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "provider-mobile_no",
	      "maxlength": "11",
	      "placeholder": "",
	      "name": "provider_mobile_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.provider_mobile_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "provider_mobile_no", $event.target.value)
	      }
	    }
	  })])])])])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("তথ্যসংগ্রহকারীর নাম")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.collector_name),
	      expression: "census.collector_name"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "collector-name",
	      "placeholder": "",
	      "name": "collector_name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.collector_name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "collector_name", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("NID নম্বর")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.collector_nid),
	      expression: "census.collector_nid"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "collector-nid",
	      "placeholder": "",
	      "name": "collector_nid",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.collector_nid)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "collector_nid", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("মোবাইল নম্বর")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.collector_mobile_no),
	      expression: "census.collector_mobile_no"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "collector-mobile_no",
	      "maxlength": "11",
	      "placeholder": "",
	      "name": "collector_mobile_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.collector_mobile_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "collector_mobile_no", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("সুপারভাইজারের নাম")]), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.supervisor_name),
	      expression: "census.supervisor_name"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "supervisor-name",
	      "placeholder": "",
	      "name": "supervisor_name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.supervisor_name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "supervisor_name", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("মোবাইল নম্বর")]), _vm._v(" "), _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.supervisor_mobile_no),
	      expression: "census.supervisor_mobile_no"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "supervisor-mobile_no",
	      "maxlength": "11",
	      "placeholder": "",
	      "name": "supervisor_mobile_no",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.supervisor_mobile_no)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "supervisor_mobile_no", $event.target.value)
	      }
	    }
	  })])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("সুপারভাইজিং কর্মকর্তার নাম")]), _vm._v(" "), _c('td', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.census.supervising_officer_name),
	      expression: "census.supervising_officer_name"
	    }],
	    staticClass: "form-control ",
	    attrs: {
	      "id": "supervising_officer-name",
	      "placeholder": "",
	      "name": "supervising_officer_name",
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.census.supervising_officer_name)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.$set(_vm.census, "supervising_officer_name", $event.target.value)
	      }
	    }
	  })])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-5"
	  }, [_vm._v("মোবাইল নম্বর")]), _vm._v(" "), _vm._m(96)])])])])])])]), _vm._v(" "), _c('nav', {
	    staticStyle: {
	      "width": "2125px"
	    },
	    attrs: {
	      "id": "form-nav"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col-sm-8 mt-5 text-muted"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "col-sm-4 text-right"
	  }, [_c('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "type": "button",
	      "value": "Close"
	    },
	    on: {
	      "click": _vm.backToList
	    }
	  }, [_c('i', {
	    staticClass: "icon-floppy-disk"
	  }), _vm._v(" Close")]), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-primary",
	    attrs: {
	      "type": "button",
	      "value": "submit"
	    },
	    on: {
	      "click": _vm.saveCensus
	    }
	  }, [_c('i', {
	    staticClass: "icon-paperplane"
	  }), _vm._v(" সাবমিট")])])])])])])])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', [_vm._v("প্রতিষ্ঠানের আইডেন্টিফিকেশন নম্বর")]), _vm._v(" "), _c('th', [_vm._v("প্রতিষ্ঠানের নাম")]), _vm._v(" "), _c('th', [_vm._v("ইউনিট/কোম্পানীর ধরণ")]), _vm._v(" "), _c('th', [_vm._v("শুমারির বছর")]), _vm._v(" "), _c('th', [_vm._v("নিবন্ধিত কি?")]), _vm._v(" "), _c('th')])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('table', {
	    staticClass: "main-form-structure table-full-width",
	    staticStyle: {
	      "width": "2125px",
	      "background-color": "#f5f5f5"
	    }
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    staticStyle: {
	      "text-align": "left",
	      "font-size": "large"
	    }
	  }, [_vm._v("\r\n\t\t\t\t\t\t\t\t\tবাংলাদেশ পরিসংখ্যান ব্যুরো\r\n\t\t\t\t\t\t\t\t")]), _vm._v(" "), _c('td', {
	    staticStyle: {
	      "text-align": "right",
	      "font-size": "large"
	    }
	  }, [_vm._v("\r\n\t\t\t\t\t\t\t\t\tগোপনীয়\r\n\t\t\t\t\t\t\t\t")])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "text-center"
	  }, [_c('div', {
	    staticStyle: {
	      "width": "174px",
	      "float": "right"
	    },
	    attrs: {
	      "title": "pseudo-div"
	    }
	  }, [_vm._v(" ")]), _vm._v(" "), _c('h4', [_vm._v("শুধুমাত্র স্থায়ী প্রতিষ্ঠানের জন্য পূরণ করুন")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("১. প্রতিষ্ঠানের জিও কোড ও নাম")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("২. প্রতিষ্ঠান পরিচিতি\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('span', {
	    staticClass: "text-muted"
	  }, [_vm._v("(ইংরেজি বড় অক্ষরে লিখুন)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩. প্রতিষ্ঠানের আইনগত মালিকানা")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("৪. প্রতিষ্ঠানের মালিকানার ধরন")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("৫. প্রতিষ্ঠান প্রধান")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("৬. প্রতিষ্ঠানটির প্রকার")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "division-id"
	    }
	  }, [_vm._v("১.১ বিভাগ")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "district-id"
	    }
	  }, [_vm._v("১.২ জেলা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "thana-upz-id"
	    }
	  }, [_vm._v("১.৩ থানা/উপজেলা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "ward-union-id"
	    }
	  }, [_vm._v("১.৪ ওয়ার্ড/ইউনিয়ন")]), _vm._v(" "), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "mahallah-id"
	    }
	  }, [_vm._v("১.৫ মৌজা")]), _vm._v(" "), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "rmo-code"
	    }
	  }, [_vm._v("১.৬ RMO")]), _vm._v(" "), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "  ",
	    staticStyle: {
	      "width": "200px"
	    }
	  }, [_c('label', {
	    attrs: {
	      "for": "serial-no-unit"
	    }
	  }, [_vm._v("২.১ ইউনিটের ক্রমিক নম্বর")]), _vm._v(" "), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "unit-name"
	    }
	  }, [_vm._v("২.২ নাম")]), _vm._v(" "), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "mahallah-name"
	    }
	  }, [_vm._v("২.৩ গ্রাম/মহল্লা")]), _vm._v(" "), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "house-name"
	    }
	  }, [_vm._v("২.৪ বাড়ি / মার্কেটের নাম")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "road"
	    }
	  }, [_vm._v("২.৫ রোড নং/নাম")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "floor-level"
	    }
	  }, [_vm._v("২.৬ ফ্লোর/লেভেল/তলা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "holding-number"
	    }
	  }, [_vm._v("২.৭ হোল্ডিং নং")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "phone"
	    }
	  }, [_vm._v("২.৮ টেলিফোন নং")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "fax"
	    }
	  }, [_vm._v("২.৯ ফ্যাক্স নং")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "email"
	    }
	  }, [_vm._v("২.১০ ইমেইল ঠিকানা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticStyle: {
	      "width": "140px"
	    }
	  }, [_c('label', {
	    attrs: {
	      "for": "website"
	    }
	  }, [_vm._v("২.১১ ওয়েব ঠিকানা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("লিঙ্গ")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("বয়স")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("শিক্ষা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("৬.১\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', {
	    staticClass: "text-danger"
	  }, [_vm._v("*")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_c('table', {
	    staticClass: "table-full-width",
	    attrs: {
	      "width": "100%"
	    }
	  }, [_c('tbody', [_c('tr', [_c('th', {
	    staticClass: "text-center",
	    staticStyle: {
	      "border-bottom": "1px solid #ccc"
	    },
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("প্রশ্ন ৬.১ এর উত্তর কোড 2 (এন্টারপ্রাইজ) হলে ")])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 text-right"
	  }, [_c('label', {
	    attrs: {
	      "for": "is-under-ent-group"
	    }
	  }, [_vm._v("৬.২ এটি কোন এন্টারপ্রাইজ গ্রুপের অন্তর্ভুক্ত কি?")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10",
	    staticStyle: {
	      "width": "300px"
	    }
	  }, [_c('div', {
	    staticClass: "form-group select2-width--auto"
	  }, [_c('select', {
	    staticClass: "select form-control ",
	    attrs: {
	      "disabled": "",
	      "id": "is-under-ent-group",
	      "name": "is_under_ent_group",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10 text-right"
	  }, [_c('label', {
	    attrs: {
	      "for": "enterprise-group-id"
	    }
	  }, [_vm._v("উত্তর হ্যাঁ হলে নাম ইংরেজি বড় অক্ষরে লিখুন ")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    staticClass: "select form-control select2-control select2-hidden-accessible",
	    attrs: {
	      "disabled": "",
	      "id": "enterprise-group-id",
	      "data-placeholder": "এন্টারপ্রাইজ গ্রুপ",
	      "name": "enterprise_group_id",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "262"
	    }
	  }, [_vm._v("ASHA ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "261"
	    }
	  }, [_vm._v("POLYCON LIMITED")])])])])])])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 text-center",
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_vm._v("প্রশ্ন ৬.১ এর উত্তর কোড 3 (এস্টাবলিশমেন্ট) হলে ")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("৭. প্রতিষ্ঠানের ধরন ")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered"
	  }, [_vm._v(" ৬.৩ এটি কোন এন্টারপ্রাইজের অন্তর্ভুক্ত কি? ")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered"
	  }, [_vm._v("৬.৪ এটি কোন এন্টারপ্রাইজ গ্রুপের অন্তর্ভুক্ত কি? ")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "text-center"
	  }, [_c('div', {
	    staticClass: "form-group select2-width--auto"
	  }, [_c('select', {
	    staticClass: "select form-control ",
	    attrs: {
	      "disabled": "",
	      "id": "is-under-ent-group-2",
	      "name": "is_under_ent_group",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("৮. প্রতিষ্ঠানের প্রধান কার্যালয়ের পূর্ণ ঠিকানা (ইংরেজি বড় অক্ষরে লিখুন)")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-name"
	    }
	  }, [_vm._v("নাম")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-mahallah"
	    }
	  }, [_vm._v("গ্রাম/মহল্লা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-house"
	    }
	  }, [_vm._v("বাড়ি/মার্কেটের নাম")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-road"
	    }
	  }, [_vm._v("রোড নং/নাম")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-floor-level"
	    }
	  }, [_vm._v("ফ্লোর/লেভেল/তলা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-holding-number"
	    }
	  }, [_vm._v("হোল্ডিং নং")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-phone"
	    }
	  }, [_vm._v("টেলিফোন নং")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-fax"
	    }
	  }, [_vm._v("ফ্যাক্স নং")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-email"
	    }
	  }, [_vm._v("ইমেইল ঠিকানা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-website"
	    }
	  }, [_vm._v("ওয়েব ঠিকানা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-division"
	    }
	  }, [_vm._v("বিভাগ")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-district"
	    }
	  }, [_vm._v("জেলা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-thana-upz"
	    }
	  }, [_vm._v("থানা/উপজেলা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-ward-union"
	    }
	  }, [_vm._v("ওয়ার্ড/ইউনিয়ন")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-mauza"
	    }
	  }, [_vm._v("মৌজা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('label', {
	    attrs: {
	      "for": "head-office-rmo-code"
	    }
	  }, [_vm._v("RMO")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("৯. প্রতিষ্ঠানটি কি রিপোর্টিং ইউনিট?")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("১০. প্রতিষ্ঠানটির ট্রেড লাইসেন্স আছে কি?")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("১০.১ ট্রেড লাইসেন্স প্রদানকারী কর্তৃপক্ষের কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("১০.২ প্রতিষ্ঠানের ট্রেড লাইসেন্স নম্বর")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10 bottom-bordered",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("১১. প্রতিষ্ঠানটি কোন কর্তৃপক্ষের আওতায় নিবন্ধিত কিনা?")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10",
	    staticStyle: {
	      "width": "431px"
	    }
	  }, [_vm._v("১১.১ নিবন্ধন প্রদানকারী কর্তৃপক্ষের কোড\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১১.২ প্রতিষ্ঠানের নিবন্ধন নম্বর\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১২. প্রতিষ্ঠানটি কোন অনুমোদনকারী কর্তৃপক্ষের আওতাধীন কিনা?")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১২.১ অনুমোদনকারী কর্তৃপক্ষের কোড\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১২.২ অনুমোদন/নিবন্ধন নম্বর\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৩. প্রতিষ্ঠানটির পরিবেশ দূষণ নিয়ন্ত্রণের ব্যবস্থা আছে কি?")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৩.১ দূষণ নিয়ন্ত্রণের ব্যবস্থা")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৪. প্রতিষ্ঠানটি কোন বিশেষায়িত অঞ্চলের আওতাধীন কিনা?")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৪.১ বিশেষায়িত অঞ্চলের কোড")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৫. প্রতিষ্ঠানটি কোন বিজনেস অ্যাসোসিয়েশনের সদস্য কিনা?")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৬. প্রতিষ্ঠানটি কোন চেম্বারের সদস্য কিনা?")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10",
	    staticStyle: {
	      "width": "175px"
	    }
	  }, [_vm._v("১৭. প্রতিষ্ঠানটি স্থাপনের সাল")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "select2 select2-container select2-container--default",
	    staticStyle: {
	      "width": "100%"
	    },
	    attrs: {
	      "dir": "ltr"
	    }
	  }, [_c('span', {
	    staticClass: "selection"
	  }, [_c('span', {
	    staticClass: "select2-selection select2-selection--single select2-sm",
	    attrs: {
	      "role": "combobox",
	      "aria-haspopup": "true",
	      "aria-expanded": "false",
	      "tabindex": "0",
	      "aria-labelledby": "select2-is-under-permission-auth-container"
	    }
	  }, [_c('span', {
	    staticClass: "select2-selection__rendered",
	    attrs: {
	      "id": "select2-is-under-permission-auth-container",
	      "title": ""
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "select2-selection__arrow",
	    attrs: {
	      "role": "presentation"
	    }
	  }, [_c('b', {
	    attrs: {
	      "role": "presentation"
	    }
	  })])])]), _vm._v(" "), _c('span', {
	    staticClass: "dropdown-wrapper",
	    attrs: {
	      "aria-hidden": "true"
	    }
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', {
	    staticClass: "bottom-bordered"
	  }, [_c('td', [_vm._v(" ")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৯. বর্তমানে প্রতিষ্ঠানটির অবস্থা")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৯.১ সাময়িকভাবে বন্ধ হলে কখন পুনরায় চালু হবে")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৯.২ স্থায়ীভাবে বন্ধ হলে কোন সালে বন্ধ হয়েছে")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("১৯.৩ বন্ধ হওয়ার প্রধান কারণ")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("২০. প্রতিষ্ঠানের মূল অর্থনৈতিক কর্মকান্ডের বিবরণ ও শিল্প কোড")]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("২১. প্রতিষ্ঠানের অপ্রধান অর্থনৈতিক কর্মকান্ডের বিবরণ ও শিল্প কোড (যদি থাকে)\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("২২. প্রতিষ্ঠানের সহায়ক অর্থনৈতিক কর্মকান্ডের বিবরণ ও শিল্প কোড (যদি থাকে)\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('label', {
	    attrs: {
	      "for": "reopen-year"
	    }
	  }, [_vm._v("সাল")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "reopen-year",
	      "placeholder": "eg. 1970",
	      "pattern": "[0-9]",
	      "maxlength": "4",
	      "name": "tmp_closed_reopen_year",
	      "type": "text"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "perma-close-year",
	      "placeholder": "eg. 1970",
	      "pattern": "[0-9]",
	      "maxlength": "4",
	      "name": "tmp_permanently_close_year",
	      "type": "text"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "disabled": "disabled",
	      "placeholder": "অন্যান্য হলে নাম লিখুন ",
	      "id": "closing-reason-other",
	      "name": "reason_of_close_other",
	      "type": "text"
	    }
	  })])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('label', {
	    staticClass: "text-center",
	    staticStyle: {
	      "display": "block"
	    },
	    attrs: {
	      "for": "main-economic-desc"
	    }
	  }, [_vm._v("বিবরণ")]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "id": "main-economic-desc",
	      "rows": "2",
	      "name": "main_economic_act_desc",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: " text-center"
	  }, [_vm._v("বিবরণ ")]), _vm._v(" "), _c('td', {
	    staticClass: " text-center"
	  }, [_vm._v("কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "minor_economic_act_desc1",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "minor_economic_act_desc2",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "minor_economic_act_desc3",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: " text-center"
	  }, [_vm._v("বিবরণ ")]), _vm._v(" "), _c('td', {
	    staticClass: "text-center"
	  }, [_vm._v("কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "supporting_economic_act_desc1",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "supporting_economic_act_desc2",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('thead', [_c('tr', [_c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৩. উৎপাদনকারী প্রতিষ্ঠানের প্রধান প্রধান উৎপাদিত দ্রব্যাদির বিবরণ\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৪. মেরামত/বিক্রয়/সেবা প্রদানকারী প্রতিষ্ঠানটির কাজের বিবরণ\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('th', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("২৫. প্রতিষ্ঠানটির পণ্য/সেবা আমদানি/রপ্তানি")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("বিবরণ ")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "product_description1",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "product_description2",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "product_description3",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "product_description4",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "product_description5",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "product_description6",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', [_vm._v(" ")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("বিবরণ ")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "service_description1",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "service_description2",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "service_description3",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "service_description4",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "service_description5",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group padding-3"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "service_description6",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৫.১ প্রতিষ্ঠানটি সরাসরি পণ্য/সেবা রপ্তানি করে কি?")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৫.২ প্রতিষ্ঠানটির ইআরসি (ERC) নম্বর লিখুন")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৫.৩ প্রতিষ্ঠানটির উৎপাদিত পণ্য/সেবা রপ্তানি হয় কি?")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৫.৪ রপ্তানিকৃত পণ্য/সেবার নাম লিখুন\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "is-export-product-services",
	      "name": "is_export_product_services",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "export_product_services_desc1",
	      "cols": "50"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "export_product_services_desc2",
	      "cols": "50"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "export_product_services_desc3",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৫.৫ প্রতিষ্ঠানটি সরাসরি পণ্য/সেবা আমদানি করে কি? ")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৫.৬ প্রতিষ্ঠানটির আইআরসি (IRC) নম্বর লিখুন")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10  text-center",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_vm._v("২৫.৭ আমদানীকৃত পণ্য/সেবার নাম লিখুন\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(একাধিক উত্তর প্রযোজ্য)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("কোড")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10",
	    attrs: {
	      "colspan": "2"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla ",
	    attrs: {
	      "rows": "1",
	      "name": "import_product_services_desc1",
	      "cols": "50"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla ",
	    attrs: {
	      "rows": "1",
	      "name": "import_product_services_desc2",
	      "cols": "50"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('textarea', {
	    staticClass: "form-control enable-bangla",
	    attrs: {
	      "rows": "1",
	      "name": "import_product_services_desc3",
	      "cols": "50"
	    }
	  })])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৬. স্থায়ী মূলধন\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৭. বর্তমানে মোট সম্পদের পরিমাণ\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৮. গত অর্থবছরে (২০১৬-১৭) টার্নওভার")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("২৯. গত অর্থবছরে (২০১৬-১৭) বিনিয়োগকৃত মূলধন\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩০. ইউনিটে প্রবাসী বাংলাদেশিদের বিনিয়োগ আছে কি?")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "current-capital-amount",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "current_capital_amount",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "total-assets-amount",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "total_assets_amount",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "yearly-turnover",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "yearly_turnover",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "last-year-invested-capital",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "last_year_invested_capital",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('select', {
	    staticClass: "select form-control ",
	    attrs: {
	      "id": "has-foreign-res-investment",
	      "name": "has_foreign_res_investement",
	      "tabindex": "-1",
	      "aria-hidden": "true"
	    }
	  }, [_c('option', {
	    attrs: {
	      "selected": "selected",
	      "value": ""
	    }
	  }), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "1"
	    }
	  }, [_vm._v("1 - হ্যাঁ")]), _vm._v(" "), _c('option', {
	    attrs: {
	      "value": "2"
	    }
	  }, [_vm._v("2 - না")])])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩০.১ বিনিয়োগের পরিমাণ\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 text-center",
	    attrs: {
	      "colspan": "3"
	    }
	  }, [_vm._v("৩১.গত অর্থবছরে (২০১৬-১৭) মোট ব্যয়ের পরিমাণ")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩২. প্রতিষ্ঠানটি কোন উৎস হতে ঋণ গ্রহণ করেছে কি?")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group",
	    staticStyle: {
	      "width": "100%"
	    }
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "foreign-res-investment",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "foreign_res_investment",
	      "type": "text"
	    }
	  })])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩১.১ উৎপাদনে ব্যবহৃত কাঁচামাল বাবদ ব্যয়\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩১.২ জনবলের বেতন ভাতা বাবদ ব্যয়\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩১.৩ মোট অন্যান্য ব্যয়ের পরিমাণ\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group",
	    staticStyle: {
	      "width": "100%"
	    }
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "last-year-salary-amount",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "last_year_salary_amount",
	      "type": "text"
	    }
	  })])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩২.১ ঋণের উৎসের ধরন")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩২.২ মোট ঋণ গ্রহণের পরিমাণ\r\n\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৩. হিসাব রাখার ব্যবস্থা আছে কি?")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৩.১ হিসাব বছরের ধরন")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10 text-center"
	  }, [_vm._v("৩৪. প্রতিষ্ঠানে নিয়োজিত (দেশি-বিদেশিসহ) জনবলের ধরন ও সংখ্যা")])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10 valign-middle"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "loan-last-year",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "loan_last_year",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('table', {
	    staticClass: "table-full-width"
	  }, [_c('tbody', [_c('tr', {
	    staticClass: "bottom-bordered"
	  }, [_c('td', [_vm._v(" ")])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t৩২.৩ শুধুমাত্র গত অর্থবছরে (২০১৬-১৭) গৃহীত ঋণ পরিমাণ\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t"), _c('small', [_vm._v("(লক্ষ টাকায়)")]), _vm._v(" "), _c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_vm._v("৳")]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "loan-last-year",
	      "placeholder": "অংকে লিখুন",
	      "pattern": "[0-9]",
	      "maxlength": "11",
	      "name": "loan_received_2016_2017",
	      "type": "text"
	    }
	  })])])])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('table', {
	    staticClass: "table-full-width table-item-bordered"
	  }, [_c('tbody', [_c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৪.১ মালিক/অংশীদার কর্মরত")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৪.২ অবৈতনিক পারিবারিক কর্মী")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৪.৩ স্থায়ী কর্মী")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৪.৪ অস্থায়ী কর্মী")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৪.৫ সাময়িক/খন্ডকালীন কর্মী")]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_vm._v("৩৪.৬ মৌসুমী কর্মী")])]), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control input-small",
	    attrs: {
	      "id": "male-owner",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "male_owner",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control input-small",
	    attrs: {
	      "id": "female-owner",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "female_owner",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control input-small",
	    attrs: {
	      "id": "male-unpaid-worker",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "male_unpaid_worker",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control input-small",
	    attrs: {
	      "id": "female-unpaid-worker",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "female_unpaid_worker",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "male-fulltime-worker",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "4",
	      "name": "male_fulltime_worker",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "female-fulltime-worker",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "4",
	      "name": "female_fulltime_worker",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "male-parttime-worker",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "3",
	      "name": "male_pertime_worker",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: " form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "female-parttime-worker",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "3",
	      "name": "female_pertime_worker",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "male-casual-worker",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "male_casual_worker",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "female-casual-worker",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "female_casual_worker",
	      "type": "text"
	    }
	  })])])]), _vm._v(" "), _c('td', {
	    staticClass: "padding-10"
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "male-casual-worker",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "male_seasonal_worker",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "female-casual-worker",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "female_seasonal_worker",
	      "type": "text"
	    }
	  })])])])])])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', {
	    staticClass: "padding-10 valign-middle",
	    staticStyle: {
	      "width": "200px"
	    }
	  }, [_c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-man"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "male-foreign-worker",
	      "placeholder": "পুরুষ",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "male_foreign_worker",
	      "type": "text"
	    }
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "form-group"
	  }, [_c('div', {
	    staticClass: "input-group"
	  }, [_c('div', {
	    staticClass: "input-group-addon"
	  }, [_c('i', {
	    staticClass: "icon-woman"
	  })]), _vm._v(" "), _c('input', {
	    staticClass: "form-control",
	    attrs: {
	      "id": "female-foreign-worker",
	      "placeholder": "মহিলা",
	      "pattern": "[0-9]",
	      "maxlength": "2",
	      "name": "female_foreign_worker",
	      "type": "text"
	    }
	  })])])])
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('td', [_c('div', {
	    staticClass: "form-group"
	  }, [_c('input', {
	    staticClass: "form-control ",
	    attrs: {
	      "id": "supervising_officer-mobile_no",
	      "maxlength": "11",
	      "placeholder": "",
	      "name": "supervising_officer_mobile_no",
	      "type": "text"
	    }
	  })])])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-a55ec00c", module.exports)
	  }
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "app"
	    }
	  }, [_c('Census', {
	    attrs: {
	      "censuses": _vm.censuses
	    }
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-73fb6de0", module.exports)
	  }
	}

/***/ })
/******/ ]);