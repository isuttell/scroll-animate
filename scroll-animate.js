/*!
|--------------------------------------------------------------------------
| Animate Scroll
|--------------------------------------------------------------------------
| Animates Elements based on scroll position
*/

(function(root, factory){
    "use strict";
    if(typeof define === 'function' && typeof define.amd === 'object') {
        define(['jquery', 'exports'], function($, exports){
            root.ScrollAnimate = factory(root, exports, $);
        });
    } else {
        root.ScrollAnimate = factory(root, {}, root.jQuery);
    }
})(this, function(root, ScrollAnimate, $) {
    "use strict";

    /*--------------------------------------------------------------------------
    | window.requestAnimationFrame polyfill
    */

    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame){
        var lastFrameTime = 0;
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
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
        loop: true,
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
     * Update options or return current settings
     *
     * @param     {Object}    settings    optional
     *
     * @return    {Object}
     */
    ScrollAnimate.options = function(settings) {
        if(typeof settings === 'object') {
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

        if(options.loop) {
            animate(); // Start the wheel
        }

        this.addEventListeners();

        return this;
    };

    /**
     * Add event listeners
     */
    ScrollAnimate.addEventListeners = function () {
        if(!options.smoothScroll.enabled) {
            scrollEvent();
            $(window).scroll(scrollEvent);
        }

        if(options.smoothScroll.enabled) {
            // deal with the mouse wheel
            $(window).bind("mousewheel DOMMouseScroll", mouseScroll);
        }

        return this;
    };

    /**
     * Stop all event listeners
     */
    ScrollAnimate.removeEventListeners = function () {
        if(!options.smoothScroll.enabled) {
            $(window).unbind('scroll', scrollEvent);
        }

        if(options.smoothScroll.enabled) {
            $(window).unbind('mousewheel DOMMouseScroll', mouseScroll);
        }

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
        if(typeof state === 'boolean') {
            paused = !state;
        } else{
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
        if((new Date()).getTime() - scrollThrottle > 16) {
            scrollThrottle = (new Date()).getTime();
            window.requestAnimationFrame(animate);
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

        /*jshint validthis:true */
        if(!options.loop) {
            scrollEvent();
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
        if(options.$el) {
            options.id = 'el' + idCount++;
            for(var i = 0; i < items.length; i++) {
                if(options.$el.is(items[i].$el)) {
                    options.id = items[i].id;
                }
            }

            if(typeof options.tween === 'function') {
                options.tween = options.tween(options.$el).pause();
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
     * Upates the each item's property
     *
     * Each item will have a property value. This can either be a string or an object.
     * If it's an object the it must follow:
     * property {
     *     name: (String)              css property name e.g. 'transform'
     *     string: (String)            css value will be inserted at '%s' e.g. 'translateX(%spx)''
     * }
     */
    var animate = function() {
        /*--------------------------------------------------------------------------
        | Update item Properties
        */

        var scrollTop = $(window).scrollTop(),
            i;

        // Only update styles when the scroll top has changed
        if(paused !== true && scrollTop !== lastScrollTop) {
            var transforms = [];

            for(i = 0; i < items.length; i++) {
                // start and stop
                var start = items[i].scroll.start,
                    stop = items[i].scroll.stop;
                if(typeof start === 'function') {
                    start = start(items[i].$el);
                }
                if(typeof stop === 'function') {
                    stop = stop(items[i].$el);
                }

                // values
                var startVal = items[i].values.start,
                    stopVal = items[i].values.stop;
                if(typeof startVal === 'function') {
                    startVal = startVal(items[i].$el);
                }
                if(typeof stopVal === 'function') {
                    stopVal = stopVal(items[i].$el);
                }

                // Calculate what the value should be based on current scroll position
                var percent = percentage(scrollTop, start, stop),
                    adjustedMax = stopVal - startVal,
                    value = percent * adjustedMax + startVal;

                // Assign Value
                if(typeof items[i].tween === 'object' && typeof items[i].tween.progress === 'function') {
                    // Greensock TweenMax Support
                    items[i].tween.progress(percent);
                } else if (items[i].property === 'transform') {
                    // Transforms have to be applied after everything else as we have to concat multiple
                    // properties together
                    transforms[items[i].id] = transforms[items[i].id] || { $el: items[i].$el, value: ''};
                    transforms[items[i].id].value += ' ' + items[i].transform.replace('%s', value);
                } else if (items[i].property === 'scrollTop') {
                    items[i].$el.scrollTop(value);
                } else {
                    items[i].$el.css(items[i].property, value);
                }
            }

            // Apply css3 concated transforms
            for(i in transforms){
                transforms[i].$el.css('transform', transforms[i].value);
            }
        }
        lastScrollTop = scrollTop;


        /*--------------------------------------------------------------------------
        | Manually Scroll for smoother scrolling - Scroll Jack
        */
        if (options.smoothScroll.enabled && mouseWheelActive) {
            window.scrollBy(0, -mouseDelta * options.smoothScroll.speed);
            scrollCount++;

            // stop the scrolling after a few moments
            if (scrollCount > 10) {
                scrollCount = 0;
                mouseWheelActive = false;
                mouseDelta = 0;
            }
        }

        if(options.loop) {
            window.requestAnimationFrame(animate);
        }
    };

    /**
     * Calculates where in the scroll we should be
     *
     * @param     {Number}    scrollTop    the position of the scroll
     * @param     {Object}    options      options
     *
     * @return    {Number}                 should be between 0 and 1
     */
    function percentage(scrollTop, start, stop) {

        var value = scrollTop - start,
            adjustedMax = stop - start;
        if(value < 0) {
            return 0;
        } else if(value > adjustedMax) {
            return 1;
        } else {
            return  value / adjustedMax;
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
        for(var i in dest) {
            if(typeof dest[i] === 'object') {
                src[i] = extend(src[i] || {}, dest[i]);
            } else if(typeof src[i] === 'undefined') {
                src[i] = dest[i];
            }
        }
        return src;
    }

    return ScrollAnimate;
});