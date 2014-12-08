/* @flow */
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
