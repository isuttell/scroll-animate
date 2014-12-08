/* @flow */
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
