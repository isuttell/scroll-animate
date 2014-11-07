/*!
|--------------------------------------------------------------------------
| Animate Scroll
|--------------------------------------------------------------------------
| Animates Elements based on scroll position
*/

(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && typeof define.amd === 'object') {
    define(['jquery', 'exports'], function($, exports) {
      return factory(root, exports, $);
    });
  } else {
    root.ScrollAnimate = factory(root, {}, root.jQuery);
  }
})(this, function(root, ScrollAnimate, $) {
  'use strict';

  /*--------------------------------------------------------------------------
   | window.requestAnimationFrame polyfill
   */

  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

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

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  /*--------------------------------------------------------------------------
   | Smooth Scroll
   */

  /**
   * Default Options
   *
   * @type    {Object}
   */
  var options = {
    smoothScroll: {
      enabled: false,
      speed: 15
    }
  };
  /**
   * Default Options for each item
   *
   * @type    {Object}
   */
  var itemDefaults = {
    _currentValue: 0,
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
   * Plugin Version
   *
   * @type    {String}
   */
  ScrollAnimate.VERSION = '0.3.0';

  /**
   * Update options or return current settings
   *
   * @param     {Object}    settings    optional
   *
   * @return    {Object}
   */
  ScrollAnimate.options = function(settings) {
    if (typeof settings === 'object') {
      options = extend(settings, options);
      return this;
    } else {
      return options;
    }
  };
  /**
   * Setups events
   */
  ScrollAnimate.run = function(settings) {
    this.options(settings || {});

    paused = false;
    // Start the wheel
    if (false === loopStarted) {
      loop();
    }

    // If events are not connected then connect them
    if (eventsInitialized === false) {
      this.addEventListeners();
    }

    return this;
  };

  /**
   * Manually trigger an update
   */
  ScrollAnimate.update = function() {
    update();
  };
  /**
   * Interal check to see if events are connected;
   *
   * @type    {Boolean}
   */
  var eventsInitialized = false;

  /**
   * Add event listeners
   */
  ScrollAnimate.addEventListeners = function() {
    if (!options.smoothScroll.enabled) {
      scrollEvent();
      $(window).scroll(scrollEvent);
    }

    if (options.smoothScroll.enabled) {
      // deal with the mouse wheel
      $(window).bind('mousewheel DOMMouseScroll', mouseScroll);
    }

    eventsInitialized = true;
    return this;
  };

  /**
   * Stop all event listeners
   */
  ScrollAnimate.removeEventListeners = function() {
    if (!options.smoothScroll.enabled) {
      $(window).unbind('scroll', scrollEvent);
    }

    if (options.smoothScroll.enabled) {
      $(window).unbind('mousewheel DOMMouseScroll', mouseScroll);
    }

    eventsInitialized = false;
    return this;
  };

  /**
   * Array of elements to animate
   *
   * @type    {Array}
   */
  var items = [];

  /**
   * Function to return a copy of every item
   *
   * @return    {Array}
   */
  ScrollAnimate._getItems = function() {
    return items;
  };

  /**
   * Scroller starts paused until either 'run' or 'play' is called
   *
   * @type    {Boolean}
   */
  var paused = true;

  /**
   * Causes the loop to pause and not update any values
   */
  ScrollAnimate.pause = function() {
    paused = true;

    return this;
  };

  /**
   * Causes the loop to start and begin updating again
   */
  ScrollAnimate.play = function() {
    paused = false;

    return this;
  };

  /**
   * Toggle running state
   */
  ScrollAnimate.toggle = function() {
    paused = !paused;

    return this;
  };

  /**
   * Either sets the running state or gets it
   *
   * @param     {Boolean}    state
   *
   * @return    {Boolean}
   */
  ScrollAnimate.running = function(state) {
    if (typeof state === 'boolean') {
      paused = !state;
    } else {
      return !paused;
    }
  };

  /**
   * Keep track of the last time scroll event was trigger
   *
   * @type    {Number}
   */
  var scrollThrottle = (new Date()).getTime();

  /**
   * Called when we scroll. Thottled 60fps
   */
  var scrollEvent = function() {
    if ((new Date()).getTime() - scrollThrottle > 16) {
      scrollThrottle = (new Date()).getTime();
      window.requestAnimationFrame(loop);
    }
  };

  /**
   * Is the mouse wheel moving?
   *
   * @type    {Boolean}
   */
  var mouseWheelActive = false;

  /**
   * Wait to stop scroll animation
   *
   * @type    {Number}
   */
  var scrollCount = 0;

  /**
   * Direction to go
   *
   * @type    {Number}
   */
  var mouseDelta = 0;

  /**
   * Track Scroll wheel for smoother scrolling
   *
   * @param     {Object}    event    MouseEvent
   */
  function mouseScroll(event) {
    mouseWheelActive = true;

    // cancel the default scroll behavior
    if (event.preventDefault) {
      event.preventDefault();
    }

    // deal with different browsers calculating the delta differently
    if (event.originalEvent.wheelDelta) {
      mouseDelta = event.originalEvent.wheelDelta / 120;
    } else if (event.originalEvent.detail) {
      mouseDelta = -event.originalEvent.detail / 3;
    }
  }

  /**
   * Clears the list of items to animate
   */
  ScrollAnimate.clear = function() {
    items = [];

    return this;
  };
  /**
   * Keep a running count for unique ids
   *
   * @type    {Number}
   */
  var idCount = 0;

  /**
   * Adds a property to animate
   *
   * @param    {[type]}    options    [description]
   */
  ScrollAnimate.add = function(options) {
    options = extend(options, itemDefaults);
    if (options.$el) {
      options.id = 'el' + idCount++;
      for (var i = 0; i < items.length; i++) {
        if (options.$el.is(items[i].$el)) {
          options.id = items[i].id;
        }
      }

      if (typeof options.tween === 'function') {
        options.tween = options.tween(options.$el).pause();
      }

      if (typeof options.ease !== 'string' || typeof Ease[options.ease] !== 'function') {
        options.ease = 'Linear';
      }

      items.push(options);
    }
    // Chaining
    return this;
  };

  /**
   * Don't rerender if don't have to
   *
   * @type    {Number}
   */
  var lastScrollTop = null;

  /**
   * Utility PI Var
   *
   * @type    {Number}
   */
  var PI2 = Math.PI * 2;

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
  var getScrollTop = ScrollAnimate.getScrollTop = function() {
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  };

  /**
   * Track if the loop has already been started
   *
   * @type    {Boolean}
   */
  var loopStarted = false;

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
  function loop() {
    loopStarted = true;
    /*--------------------------------------------------------------------------
        | Update item Properties
        */
    var scrollTop = getScrollTop();

    // Only update styles when the scroll top has changed
    if (false === paused && scrollTop !== lastScrollTop) {
      update();
    }
    lastScrollTop = scrollTop;

    /*--------------------------------------------------------------------------
        | Manually Scroll for smoother scrolling - Scroll Jack
        */
    if (true === options.smoothScroll.enabled && true === mouseWheelActive) {
      window.scrollBy(0, -mouseDelta * options.smoothScroll.speed);
      scrollCount++;

      // stop the scrolling after a few moments
      if (scrollCount > 10) {
        scrollCount = 0;
        mouseWheelActive = false;
        mouseDelta = 0;
      }
    }

    window.requestAnimationFrame(loop);
  }

  /**
   * Update each element according to scroll top
   */
  function update() {
    var targets = [];
    var i;
    var scrollTop = getScrollTop();

    for (i = 0; i < items.length; i++) {
      // start and stop
      var start = items[i].scroll.start;
      var stop = items[i].scroll.stop;
      if (typeof start === 'function') {
        start = start(items[i].$el);
      }
      if (typeof stop === 'function') {
        stop = stop(items[i].$el);
      }

      // values
      var startVal = items[i].values.start;
      var stopVal = items[i].values.stop;
      if (typeof startVal === 'function') {
        startVal = startVal(items[i].$el);
      }
      if (typeof stopVal === 'function') {
        stopVal = stopVal(items[i].$el);
      }

      // Calculate what the value should be based on current scroll position
      var percent = tweenPosition(scrollTop, start, stop);
      var adjustedMax = stopVal - startVal;

      items[i]._currentValue = Ease[items[i].ease](percent, startVal, adjustedMax, 1);

      // Assign Value
      if (typeof items[i].tween === 'object' && typeof items[i].tween.progress === 'function') {
        // Greensock TweenMax Support
        items[i].tween.progress(percent);
      } else if (items[i].property === 'transform') {
        // Concat multiple transforms together
        targets[items[i].id] = targets[items[i].id] || {
          $el: items[i].$el,
          css: {
            transform: ''
          }
        };
        targets[items[i].id].css.transform += ' ' + items[i].transform.replace('%s', items[i]._currentValue);
      } else if (items[i].property === 'filter') {
        // Concat multiple transforms together
        targets[items[i].id] = targets[items[i].id] || {
          $el: items[i].$el,
          css: {}
        };
        targets[items[i].id].css['-webkit-filter'] = items[i].filter.replace('%s', items[i]._currentValue);
      } else if (items[i].property === 'scrollTop') {
        items[i].$el.scrollTop(items[i]._currentValue);
      } else {
        // Save it to an object so we can apply multiply properties once
        targets[items[i].id] = targets[items[i].id] || {
          $el: items[i].$el,
          css: {}
        };
        targets[items[i].id].css[items[i].property] = items[i]._currentValue;
      }
    }

    // Apply css one time per loop per item
    for (i in targets) {
      if (targets.hasOwnProperty(i)) {
        targets[i].$el.css(targets[i].css);
      }
    }
  }

  /*--------------------------------------------------------------------------
   | Easing Functions
   */

  /**
   * Make it public so anyone can add their own
   *
   * @type    {Object}
   */
  var Ease = ScrollAnimate.Ease = {};

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
    return (percent == 1) ? initial + change : change * (-Math.pow(2, -10 * percent / 1) + 1) + initial;
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
    if (percent == 1) {
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
    if ((percent /= 1 / 2) == 2) {
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

  /**
   * Calculates where in the scroll we should be
   *
   * @param     {Number}    scrollTop    the position of the scroll
   * @param     {Object}    start        start value
   * @param     {Number}    stop         stop value
   *
   * @return    {Number}                 should be between 0 and 1
   */
  function tweenPosition(scrollTop, start, stop) {

    var value = scrollTop - start;
    var adjustedMax = stop - start;
    if (value < 0) {
      return 0;
    } else if (value > adjustedMax) {
      return 1;
    } else {
      return value / adjustedMax;
    }
  }

  /**
   * Basic Recursive Extend Function
   *
   * @param     {Object}    src     input
   * @param     {Object}    dest    defaults
   *
   * @return    {Object}
   */
  function extend(src, dest) {
    for (var i in dest) {
      if (typeof dest[i] === 'object') {
        src[i] = extend(src[i] || {}, dest[i]);
      } else if (typeof src[i] === 'undefined') {
        src[i] = dest[i];
      }
    }
    return src;
  }

  return ScrollAnimate;
});
