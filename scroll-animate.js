/*!
 _______ _______  ______  _____                _______ __   _ _____ _______ _______ _______ _______
 |______ |       |_____/ |     | |      |      |_____| | \  |   |   |  |  | |_____|    |    |______
 ______| |_____  |    \_ |_____| |_____ |_____ |     | |  \_| __|__ |  |  | |     |    |    |______
                                                                                                   
 scroll-animate 0.4.0 <https://github.com/isuttell/scroll-animate>
 Contributor(s): undefined
 Last Build: 2014-12-08
 Do not edit this file. It is created from the src/ folder.
*/
(function(root, factory) {
  'use strict';
  /* istanbul ignore next */
  if (typeof define === 'function' && typeof define.amd === 'object') {
    define(['jquery'], function($) {
      return factory(root, $);
    });
  } else {
    root.ScrollAnimate = factory(root, root.jQuery || root.$);
  }
})(this, function(root, $) {
  'use strict';

/************************************************
 * @file  Polyfills for older browsers
 ************************************************/

/**
 * Bind polyfill
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
 */
/* istanbul ignore next */
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var fNOP = function() {};
    var fBound = function() {
      return fToBind.apply(this instanceof fNOP &&
        oThis ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP(); // jshint ignore:line

    return fBound;
  };
}

/**
 * Request Animation Polyfill
 * https://gist.github.com/paulirish/1579671
 *
 * @type {Array}
 */
/* istanbul ignore next */
var vendors = ['ms', 'moz', 'webkit', 'o'];
/* istanbul ignore next */
for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
    window[vendors[x] + 'CancelRequestAnimationFrame'];
}

/* istanbul ignore next */
if (!window.requestAnimationFrame) {
  var lastFrameTime = 0;
  window.requestAnimationFrame = function(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
    var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      },
      timeToCall);
    lastFrameTime = currTime + timeToCall;
    return id;
  };
}

/* istanbul ignore next */
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}

/************************************************
 * @file  General utility functions
 * @author  Isaac Suttell
 ************************************************/

/**
 * Utilities wrapper
 *
 * @type    {Object}
 */
var Utilities = {};

/**
 * Checks to see if a var is a speficied type
 *
 * @param  {Mixed}  obj  var to check
 *
 * @return {Boolean}
 */
var isType = Utilities.isType = function(obj, type) {
  var result = {}.toString.call(obj).toLowerCase();
  return result === '[object ' + type.toLowerCase() + ']';
};

/**
 * Checks to see if a var is a function
 *
 * @alias  isType
 * @param  {Mixed}  fn  var to check
 *
 * @return {Boolean}
 */
var isFunction = Utilities.isFunction = function(fn) {
  return isType(fn, 'function');
};

/**
 * Checks to see if a var is a string
 *
 * @alias  isType
 * @param  {Mixed}  str  var to check
 *
 * @return {Boolean}
 */
var isString = Utilities.isString = function(str) {
  return isType(str, 'string');
};

/**
 * Checks to see if a var is a number
 *
 * @alias  isType
 * @param  {Mixed}  num  var to check
 *
 * @return {Boolean}
 */
var isNumber = Utilities.isNumber = function(num) {
  return isType(num, 'number');
};

/**
 * Checks to see if a var is a object
 *
 * @alias  isType
 * @param  {Mixed}  obj  var to check
 *
 * @return {Boolean}
 */
var isObject = Utilities.isObject = function(obj) {
  return isType(obj, 'object');
};

/**
 * Checks to see if a var is a object
 *
 * @alias  isType
 * @param  {Mixed}  obj  var to check
 *
 * @return {Boolean}
 */
var isBoolean = Utilities.isBoolean = function(obj) {
  return isType(obj, 'boolean');
};

/**
 * Create a clone of an object
 *
 * @param  {Object} src Object to clone
 *
 * @return {Object}
 */
var shallowClone = Utilities.shallowClone = function(src) {
  var dest = {};
  for (var i in src) {
    if (src.hasOwnProperty(i)) {
      dest[i] = src[i];
    }
  }
  return dest;
};

/**
 * Basic Recursive Extend Function
 *
 * @param     {Object}    src     input
 * @param     {Object}    dest    defaults
 *
 * @return    {Object}
 */
var assign = Utilities.assign = function(src, dest) {
  for (var i in dest) {
    if (isObject(dest[i])) {
      src[i] = assign(src[i] || {}, dest[i]);
    } else if (typeof src[i] === 'undefined') {
      src[i] = dest[i];
    }
  }
  return src;
};

/**
 * Gets a variable or calls a function depending on what it finds
 *
 * @param  {Object} object  Object to look in
 * @param  {String} name    Object key to get
 * @param  {Mixed}  context `this` context to Apply
 * @param  {Mixed}  args    Additional arguments to pass to function context
 *
 * @return {Mixed}
 */
var results = Utilities.results = function(object, name, context) {
  if (isFunction(object[name])) {
    var args = Array.prototype.slice.call(arguments).slice(3);
    return object[name].apply(context || this, args);
  }
  return object[name];
};

/**
 * Get return a unique ID or get the id of an exisitng element
 *
 * @param  {Object} $el    Object to search for
 * @para   {Array}  items  Search for an existing item
 *
 * @return {String}
 */
var uniqueId = Utilities.uniqueId = function($el, items) {
  for (var i = 0; i < items.length; i++) {
    if ($el.is(items[i].$el)) {
      return items[i].id;
    }
  }

  return 'el' + items.length;
};

/**
 * Calculates where in the scroll we should be
 *
 * @param     {Number}    scrollTop    the position of the scroll
 * @param     {Object}    start        start value
 * @param     {Number}    stop         stop value
 *
 * @return    {Number}                 should be between 0 and 1
 */
var tweenPosition = Utilities.tweenPosition = function(scrollTop, start, stop) {
  var value = scrollTop - start;
  var adjustedMax = stop - start;
  if (value < 0) {
    return 0;
  } else if (value > adjustedMax) {
    return 1;
  } else {
    return value / adjustedMax;
  }
};

/************************************************
 * @file  Easing Functions
 * @author Isaac Suttell
 ************************************************/

/**
 * Utility PI Var
 *
 * @const
 * @type    {Number}
 */
var PI2 = Math.PI * 2;

/**
 * Make it public so anyone can add their own
 *
 * @type    {Object}
 */
var Ease = {};

/**
 * Linear Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.Linear = function(percent, initial, change) {
  return percent * change + initial;
};

/**
 * QuadIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuadIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent + initial;
};

/**
 * QuadOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuadOut = function(percent, initial, change) {
  return -change * (percent /= 1) * (percent - 2) + initial;
};

/**
 * QuadInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuadInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent + initial;
  }
  return -change / 2 * ((--percent) * (percent - 2) - 1) + initial;
};

/**
 * CubicIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CubicIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent * percent + initial;
};

/**
 * CubicOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CubicOut = function(percent, initial, change) {
  return change * ((percent = percent / 1 - 1) * percent * percent + 1) + initial;
};

/**
 * CubicInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CubicInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent * percent + initial;
  }
  return change / 2 * ((percent -= 2) * percent * percent + 2) + initial;
};

/**
 * QuartIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuartIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent * percent * percent + initial;
};

/**
 * QuartOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuartOut = function(percent, initial, change) {
  return -change * ((percent = percent / 1 - 1) * percent * percent * percent - 1) + initial;
};

/**
 * QuartInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuartInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent * percent * percent + initial;
  }
  return -change / 2 * ((percent -= 2) * percent * percent * percent - 2) + initial;
};

/**
 * QuintIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuintIn = function(percent, initial, change) {
  return change * (percent /= 1) * percent * percent * percent * percent + initial;
};

/**
 * QuintOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuintOut = function(percent, initial, change) {
  return change * ((percent = percent / 1 - 1) * percent * percent * percent * percent + 1) + initial;
};

/**
 * QuintInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.QuintInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * percent * percent * percent * percent * percent + initial;
  }
  return change / 2 * ((percent -= 2) * percent * percent * percent * percent + 2) + initial;
};

/**
 * SineIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.SineIn = function(percent, initial, change) {
  return -change * Math.cos(percent / 1 * (Math.PI / 2)) + change + initial;
};

/**
 * SineOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.SineOut = function(percent, initial, change) {
  return change * Math.sin(percent / 1 * (Math.PI / 2)) + initial;
};

/**
 * SineInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.SineInOut = function(percent, initial, change) {
  return -change / 2 * (Math.cos(Math.PI * percent / 1) - 1) + initial;
};

/**
 * ExpoIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ExpoIn = function(percent, initial, change) {
  return (percent === 0) ? initial : change * Math.pow(2, 10 * (percent / 1 - 1)) + initial;
};

/**
 * ExpoOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ExpoOut = function(percent, initial, change) {
  return (percent === 1) ? initial + change : change * (-Math.pow(2, -10 * percent / 1) + 1) + initial;
};

/**
 * ExpoInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ExpoInOut = function(percent, initial, change) {
  if (percent === 0) {
    return initial;
  }
  if (percent === 1) {
    return initial + change;
  }
  if ((percent /= 1 / 2) < 1) {
    return change / 2 * Math.pow(2, 10 * (percent - 1)) + initial;
  }
  return change / 2 * (-Math.pow(2, -10 * --percent) + 2) + initial;
};

/**
 * CircIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CircIn = function(percent, initial, change) {
  return -change * (Math.sqrt(1 - (percent /= 1) * percent) - 1) + initial;
};

/**
 * CircOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CircOut = function(percent, initial, change) {
  return change * Math.sqrt(1 - (percent = percent / 1 - 1) * percent) + initial;
};

/**
 * CircInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.CircInOut = function(percent, initial, change) {
  if ((percent /= 1 / 2) < 1) {
    return -change / 2 * (Math.sqrt(1 - percent * percent) - 1) + initial;
  }
  return change / 2 * (Math.sqrt(1 - (percent -= 2) * percent) + 1) + initial;
};

/**
 * ElasticIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ElasticIn = function(percent, initial, change) {
  var s = 1.70158;
  var p = 0;
  var a = change;
  if (percent === 0) {
    return initial;
  }
  if (percent === 1) {
    return initial + change;
  }
  if (!p) {
    p = 1 * 0.3;
  }
  if (a < Math.abs(change)) {
    a = change;
    s = p / 4;
  } else {
    s = p / PI2 * Math.asin(change / a);
  }
  return -(a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent * 1 - s) * PI2 / p)) + initial;
};

/**
 * ElasticOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ElasticOut = function(percent, initial, change) {
  var s = 1.70158;
  var p = 0;
  var a = change;
  if (percent === 0) {
    return initial;
  }
  if (percent === 1) {
    return initial + change;
  }
  if (!p) {
    p = 1 * 0.3;
  }
  if (a < Math.abs(change)) {
    a = change;
    s = p / 4;
  } else {
    s = p / PI2 * Math.asin(change / a);
  }
  return a * Math.pow(2, -10 * percent) * Math.sin((percent * 1 - s) * PI2 / p) + change + initial;
};

/**
 * ElasticInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.ElasticInOut = function(percent, initial, change) {
  var s = 1.70158;
  var p = 0;
  var a = change;
  if (percent === 0) {
    return initial;
  }
  if ((percent /= 1 / 2) === 2) {
    return initial + change;
  }
  if (!p) {
    p = 1 * (0.3 * 1.5);
  }
  if (a < Math.abs(change)) {
    a = change;
    s = p / 4;
  } else {
    s = p / PI2 * Math.asin(change / a);
  }
  if (percent < 1) {
    return -0.5 * (a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent * 1 - s) * PI2 / p)) + initial;
  }
  return a * Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent * 1 - s) * PI2 / p) * 0.5 + change + initial;
};

/**
 * BounceIn Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.BounceIn = function(percent, initial, change) {
  return change - Ease.BounceOut(1 - percent, 0, change) + initial;
};

/**
 * BounceOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.BounceOut = function(percent, initial, change) {
  if ((percent /= 1) < (1 / 2.75)) {
    return change * (7.5625 * percent * percent) + initial;
  } else if (percent < (2 / 2.75)) {
    return change * (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75) + initial;
  } else if (percent < (2.5 / 2.75)) {
    return change * (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375) + initial;
  } else {
    return change * (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375) + initial;
  }
};

/**
 * BounceInOut Ease
 *
 * @param     {Number}    percent     0-1
 * @param     {Number}    initial     Starting Value
 * @param     {Number}    change      Difference in values from start to stop
 *
 * @return    {Number}
 */
Ease.BounceInOut = function(percent, initial, change) {
  if (percent < 1 / 2) {
    return Ease.BounceIn(percent * 2, 0, change) * 0.5 + initial;
  }
  return Ease.BounceOut(percent * 2 - 1, 0, change) * 0.5 + change * 0.5 + initial;
};

/************************************************
 * @file  Tween Constructor
 * @author Isaac Suttell
 ************************************************/

/**
 * Construct
 *
 * @constructor
 * @param {String} id      ID unique to an EL
 * @param {Object} options
 */
function ScrollTween(id, options, parent) {
  options = Utilities.shallowClone(options || {});
  this.options = Utilities.assign(options, this.options);

  this.parent = parent;

  this.$el = this.options.$el;
  delete this.options.$el;

  if (Utilities.isFunction(this.options.tween)) {
    this.tween = this.options.tween(this.options.$el).pause();
  }

  if (!Utilities.isString(this.options.ease) || !Utilities.isFunction(Ease[this.options.ease])) {
    this.ease = Ease.Linear;
  } else {
    this.ease = Ease[this.options.ease];
  }

  // Set Starting
  this.update(0);

  this.id = id;
}

/**
 * Default Options for each item
 *
 * @type    {Object}
 */
ScrollTween.prototype.options = {
  val: 0,
  $el: false,
  scroll: {
    min: 0,
    max: 1000
  },
  values: {
    start: 0,
    stop: 1
  },
  property: 'opacity'
};

/**
 * Update a tweens values
 */
ScrollTween.prototype.update = function(position) {
  // start and stop
  this.start = Utilities.results(this.options.scroll, 'start', this, this.$el);
  this.stop = Utilities.results(this.options.scroll, 'stop', this, this.$el);

  // values
  this.startVal = Utilities.results(this.options.values, 'start', this, this.$el);
  this.stopVal = Utilities.results(this.options.values, 'stop', this, this.$el);

  // Calculate what the value should be based on current scroll position
  this.percent = Utilities.tweenPosition(position, this.start, this.stop);

  // How much did we change?
  var change = this.stopVal - this.startVal;

  // Apply any easing and get value
  this.val = this.ease.call(this, this.percent, this.startVal, change);
};

/**
 * Creates or updates a object to apply CSS to an element.
 * If an elementh as multiple properties to apply, they are only
 * applied once to prevent excessive paint/composite changes
 *
 * @param  {Object} target Contains the el and the css to apply
 *
 * @return {Object}
 */
ScrollTween.prototype.pushCSS = function(target) {
  // Define empty target or use existing
  target = target || {
    $el: this.$el,
    css: {}
  };

  if (this.options.property === 'transform') {
    // Concat multiple transforms together
    target.css.transform = target.css.transform || '';
    target.css.transform += ' ' + this.options.transform.replace('%s', this.val);
  } else if (this.options.property === 'filter') {
    // Apply Webkit filter
    target.css['-webkit-filter'] = this.options.filter.replace('%s', this.val);
  } else {
    // Save it to an object so we can apply multiply properties once
    target.css[this.options.property] = this.val;
  }
  return target;
};

/************************************************
 * @file  Constructor
 * @author  Isaac Suttell
 ************************************************/

/**
 * Scroll Animate Container
 *
 * @type {Object}
 */
var ScrollAnimate = function(options) {
  options = Utilities.shallowClone(options || {});
  this.options = Utilities.assign(options, this.options);

  setInterval(this.updateScrollPosition.bind(this), 15);

  // Start the loop
  this.loop();
};

/**
 * Updates the interal scroll position. This helps smooth out rough scrolls
 */
ScrollAnimate.prototype.updateScrollPosition = function() {
  // Calculate
  var moveScroll = (this.scrollPosition - this.getScrollTop()) * this.options.speed;

  if (Math.abs(moveScroll) > 0.003) {
    this.scrollPosition -= moveScroll;
  } else {
    this.scrollPosition = this.getScrollTop();
  }
};

/**
 * Default Options
 *
 * @type    {Object}
 */
ScrollAnimate.prototype.options = {
  speed: 0.3
};

/**
 * Array of elements to animate
 *
 * @type    {Array}
 */
ScrollAnimate.prototype.items = [];

/**
 * Scroller starts paused until either 'run' or 'play' is called
 *
 * @type    {Boolean}
 */
ScrollAnimate.prototype.paused = false;

/**
 * Causes the loop to pause and not update any values
 */
ScrollAnimate.prototype.pause = function() {
  this.paused = true;

  return this;
};

/**
 * Causes the loop to start and begin updating again
 */
ScrollAnimate.prototype.play = function() {
  this.paused = false;

  return this;
};

/**
 * Toggle running state
 */
ScrollAnimate.prototype.toggle = function() {
  this.paused = !this.paused;

  return this;
};

/**
 * Either sets the running state or gets it
 *
 * @param     {Boolean}    state
 *
 * @return    {Boolean}
 */
ScrollAnimate.prototype.running = function(state) {
  if (Utilities.isBoolean(state)) {
    this.paused = !state;
  } else {
    return !this.paused;
  }
};

/**
 * Clears the list of items to animate
 */
ScrollAnimate.prototype.clear = function() {
  this.items = [];

  return this;
};

/**
 * Adds a property to animate
 *
 * @param    {Object}    options    config
 */
ScrollAnimate.prototype.add = function(options) {
  var id = Utilities.uniqueId(options.$el, this.items);

  var element = new ScrollTween(id, options, this);

  this.items.push(element);

  // Chaining
  return this;
};

/**
 * Document Elemenet
 *
 * @type    {Object}
 */
var doc = document.documentElement;

/**
 * Get the scroll position of the window
 *
 * @return    {Number}
 */
ScrollAnimate.prototype.getScrollTop = function() {
  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
};

/**
 * Interal scroll position that we control so we can smooth out scrolling animations
 *
 * @type {Number}
 */
ScrollAnimate.prototype.scrollPosition = 0;

/**
 * Don't rerender if don't have to
 *
 * @type    {Number}
 */
ScrollAnimate.prototype.lastScrollPosition = null;

/**
 * Upates the each item's property
 *
 * Each item will have a property value. This can either be a string or an object.
 * If it's an object the it must follow:
 * property {
 *     name: (String)              css property name e.g. 'transform'
 *     string: (String)            css value will be inserted at '%s' e.g. 'translateX(%spx)''
 * }
 */
ScrollAnimate.prototype.loop = function() {
  // Only update styles when the scroll top has changed
  if (false === this.paused && this.scrollPosition !== this.lastScrollPosition) {
    this.update();
  }
  this.lastScrollPosition = this.scrollPosition;

  // Loop
  window.requestAnimationFrame(this.loop.bind(this));
};

/**
 * Applys the CSS found in Targets
 *
 * @param    {Object}   targets    An Object array of objects
 *                                {
 *                                  $el: {jQuery}
 *                                  css: {jQuery CSS Object}
 *                                }
 */
ScrollAnimate.prototype.applyCSS = function(targets) {
  targets = targets || this.targets;
  var i;
  for (i in targets) {
    if (targets.hasOwnProperty(i)) {
      targets[i].$el.css(targets[i].css);
    }
  }
};

/**
 * Update each element according to scroll top
 */
ScrollAnimate.prototype.update = function() {
  var targets = {};

  var index = -1;
  var length = this.items.length;

  var position = this.scrollPosition;

  var item;

  while (++index < length) {
    item = this.items[index];

    // The Magic. Get the current value we need to apply to the el
    item.update(position);

    // Assign the Values
    if (Utilities.isObject(item.options.tween) && Utilities.isFunction(item.options.tween.progress)) {
      // Greensock TweenMax Support
      item.options.tween.progress(item.percent);
    } else if (item.options.property === 'scrollTop') {
      // Apply scroll top
      item.$el.scrollTop(item.val);
    } else {
      // CSS
      targets[item.id] = item.pushCSS(targets[item.id]);
    }

    // Clean up
    item = void 0;
  }

  /**
   * Apply CSS to targets
   */
  this.applyCSS(targets);
};

/**
 * Make the Ease functions available
 *
 * @type    {Object}
 */
ScrollAnimate.prototype.Ease = Ease;

/**
 * Make the Ease functions available
 *
 * @type    {Object}
 */
ScrollAnimate.prototype.Utilities = Utilities;
  return ScrollAnimate;
});