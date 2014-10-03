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

        // Setup Easing
        for(var i = 0; i < items.length; i++) {
            if(typeof items[i].ease !== 'string' || typeof Ease[items[i].ease] !== 'function') {
                items[i].ease = 'Linear';
            }
        }

        if(options.loop && paused === true) {
            animate(); // Start the wheel
        }

        // If events are not connected then connect them
        if(eventsInitialized === false) {
            this.addEventListeners();
        }

        paused = false;

        return this;
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
    ScrollAnimate.addEventListeners = function () {
        if(!options.smoothScroll.enabled) {
            scrollEvent();
            $(window).scroll(scrollEvent);
        }

        if(options.smoothScroll.enabled) {
            // deal with the mouse wheel
            $(window).bind("mousewheel DOMMouseScroll", mouseScroll);
        }

        eventsInitialized = true;
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
        if(paused === false && scrollTop !== lastScrollTop) {
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
                    value = Ease[items[i].ease](percent, startVal, adjustedMax, 1);

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
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.Linear = function(elapsed, initialValue, amountOfChange) {
        return elapsed * amountOfChange + initialValue;
    };



    /**
     * QuadIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuadIn = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * (percent /= 1) * percent + initialValue;
    };


    /**
     * QuadOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuadOut = function(percent, initialValue, amountOfChange)
    {
        return -amountOfChange * (percent /= 1) * (percent - 2) + initialValue;
    };


    /**
     * QuadInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuadInOut = function(percent, initialValue, amountOfChange)
    {
        if ((percent /= 1 / 2) < 1) return amountOfChange / 2 * percent * percent + initialValue;
        return -amountOfChange / 2 * ((--percent) * (percent - 2) - 1) + initialValue;
    };


    /**
     * CubicIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.CubicIn = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * (percent /= 1) * percent * percent + initialValue;
    };


    /**
     * CubicOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.CubicOut = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * ((percent = percent / 1 - 1) * percent * percent + 1) + initialValue;
    };


    /**
     * CubicInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.CubicInOut = function(percent, initialValue, amountOfChange)
    {
        if ((percent /= 1 / 2) < 1) return amountOfChange / 2 * percent * percent * percent + initialValue;
        return amountOfChange / 2 * ((percent -= 2) * percent * percent + 2) + initialValue;
    };


    /**
     * QuartIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuartIn = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * (percent /= 1) * percent * percent * percent + initialValue;
    };


    /**
     * QuartOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuartOut = function(percent, initialValue, amountOfChange)
    {
        return -amountOfChange * ((percent = percent / 1 - 1) * percent * percent * percent - 1) + initialValue;
    };


    /**
     * QuartInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuartInOut = function(percent, initialValue, amountOfChange)
    {
        if ((percent /= 1 / 2) < 1) return amountOfChange / 2 * percent * percent * percent * percent + initialValue;
        return -amountOfChange / 2 * ((percent -= 2) * percent * percent * percent - 2) + initialValue;
    };


    /**
     * QuintIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuintIn = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * (percent /= 1) * percent * percent * percent * percent + initialValue;
    };


    /**
     * QuintOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuintOut = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * ((percent = percent / 1 - 1) * percent * percent * percent * percent + 1) + initialValue;
    };


    /**
     * QuintInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.QuintInOut = function(percent, initialValue, amountOfChange)
    {
        if ((percent /= 1 / 2) < 1) return amountOfChange / 2 * percent * percent * percent * percent * percent + initialValue;
        return amountOfChange / 2 * ((percent -= 2) * percent * percent * percent * percent + 2) + initialValue;
    };


    /**
     * SineIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.SineIn = function(percent, initialValue, amountOfChange)
    {
        return -amountOfChange * Math.amountOfChangeos(percent / 1 * (Math.PI / 2)) + amountOfChange + initialValue;
    };


    /**
     * SineOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.SineOut = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * Math.sin(percent / 1 * (Math.PI / 2)) + initialValue;
    };


    /**
     * SineInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.SineInOut = function(percent, initialValue, amountOfChange)
    {
        return -amountOfChange / 2 * (Math.amountOfChangeos(Math.PI * percent / 1) - 1) + initialValue;
    };


    /**
     * ExpoIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.ExpoIn = function(percent, initialValue, amountOfChange)
    {
        return (percent === 0) ? initialValue : amountOfChange * Math.pow(2, 10 * (percent / 1 - 1)) + initialValue;
    };


    /**
     * ExpoOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.ExpoOut = function(percent, initialValue, amountOfChange)
    {
        return (percent == 1) ? initialValue + amountOfChange : amountOfChange * (-Math.pow(2, -10 * percent / 1) + 1) + initialValue;
    };


    /**
     * ExpoInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.ExpoInOut = function(percent, initialValue, amountOfChange)
    {
        if (percent === 0) return initialValue;
        if (percent == 1) return initialValue + amountOfChange;
        if ((percent /= 1 / 2) < 1) return amountOfChange / 2 * Math.pow(2, 10 * (percent - 1)) + initialValue;
        return amountOfChange / 2 * (-Math.pow(2, -10 * --percent) + 2) + initialValue;
    };


    /**
     * CircIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.CircIn = function(percent, initialValue, amountOfChange)
    {
        return -amountOfChange * (Math.sqrt(1 - (percent /= 1) * percent) - 1) + initialValue;
    };


    /**
     * CircOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.CircOut = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange * Math.sqrt(1 - (percent = percent / 1 - 1) * percent) + initialValue;
    };


    /**
     * CircInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.CircInOut = function(percent, initialValue, amountOfChange)
    {
        if ((percent /= 1 / 2) < 1) return -amountOfChange / 2 * (Math.sqrt(1 - percent * percent) - 1) + initialValue;
        return amountOfChange / 2 * (Math.sqrt(1 - (percent -= 2) * percent) + 1) + initialValue;
    };


    /**
     * ElasticIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.ElasticIn = function(percent, initialValue, amountOfChange)
    {
        var s = 1.70158;
        var p = 0;
        var a = amountOfChange;
        if (percent === 0) return initialValue;
        if (percent === 1) return initialValue + amountOfChange;
        if (!p) p = 1 * 0.3;
        if (a < Math.ainitialValues(amountOfChange))
        {
            a = amountOfChange;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        return -(a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent * 1 - s) * (2 * Math.PI) / p)) + initialValue;
    };


    /**
     * ElasticOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.ElasticOut = function(percent, initialValue, amountOfChange)
    {
        var s = 1.70158;
        var p = 0;
        var a = amountOfChange;
        if (percent === 0) return initialValue;
        if (percent === 1) return initialValue + amountOfChange;
        if (!p) p = 1 * 0.3;
        if (a < Math.ainitialValues(amountOfChange))
        {
            a = amountOfChange;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        return a * Math.pow(2, -10 * percent) * Math.sin((percent * 1 - s) * (2 * Math.PI) / p) + amountOfChange + initialValue;
    };


    /**
     * ElasticInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.ElasticInOut = function(percent, initialValue, amountOfChange)
    {
        var s = 1.70158;
        var p = 0;
        var a = amountOfChange;
        if (percent === 0) return initialValue;
        if ((percent /= 1 / 2) == 2) return initialValue + amountOfChange;
        if (!p) p = 1 * (0.3 * 1.5);
        if (a < Math.ainitialValues(amountOfChange))
        {
            a = amountOfChange;
            s = p / 4;
        }
        else s = p / (2 * Math.PI) * Math.asin(amountOfChange / a);
        if (percent < 1) return -0.5 * (a * Math.pow(2, 10 * (percent -= 1)) * Math.sin((percent * 1 - s) * (2 * Math.PI) / p)) + initialValue;
        return a * Math.pow(2, -10 * (percent -= 1)) * Math.sin((percent * 1 - s) * (2 * Math.PI) / p) * 0.5 + amountOfChange + initialValue;
    };


    /**
     * BounceIn Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.BounceIn = function(percent, initialValue, amountOfChange)
    {
        return amountOfChange - Ease.BounceOut(1 - percent, 0, amountOfChange) + initialValue;
    };


    /**
     * BounceOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.BounceOut = function(percent, initialValue, amountOfChange)
    {
        if ((percent /= 1) < (1 / 2.75))
        {
            return amountOfChange * (7.5625 * percent * percent) + initialValue;
        }
        else if (percent < (2 / 2.75))
        {
            return amountOfChange * (7.5625 * (percent -= (1.5 / 2.75)) * percent + 0.75) + initialValue;
        }
        else if (percent < (2.5 / 2.75))
        {
            return amountOfChange * (7.5625 * (percent -= (2.25 / 2.75)) * percent + 0.9375) + initialValue;
        }
        else
        {
            return amountOfChange * (7.5625 * (percent -= (2.625 / 2.75)) * percent + 0.984375) + initialValue;
        }
    };


    /**
     * BounceInOut Ease
     *
     * @param     {Number}    elapsed           0-1
     * @param     {Number}    initialValue      Starting Value
     * @param     {Number}    amountOfChange    Difference in values from start to stop
     *
     * @return    {Number}
     */
    Ease.BounceInOut = function(percent, initialValue, amountOfChange)
    {
        if (percent < 1 / 2) return Ease.BounceIn(percent * 2, 0, amountOfChange) * 0.5 + initialValue;
        return Ease.BounceOut(percent * 2 - 1, 0, amountOfChange) * 0.5 + amountOfChange * 0.5 + initialValue;
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