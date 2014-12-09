/* @flow */
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
    if (Utilities.isObject(item.tween)) {
      // Greensock TweenMax Support
      item.tween.progress(item.percent);
    } else if (item.options.property === 'scrollTop') {
      // Apply scroll top
      item.$el.scrollTop(item.val);
    } else {
      // CSS
      // We store an object array of css to apply so we only apply it once
      // event if there are multiple tweens per $el
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
