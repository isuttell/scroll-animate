# Scroll Animate

Animates elements by scroll position. Currently requires jQuery. Supports AMD.

[![Build Status](https://travis-ci.org/isuttell/scroll-animate.svg)](https://travis-ci.org/isuttell/scroll-animate)


### Basics

````
// scroll jacking for browsers without smooth scrolling
ScrollAnimate.options({
    smoothScroll: {
        enabled: true,
        speed: 15
    }
});

ScrollAnimate
	.add({
		$el : $('.box-1'),
		// scrollTop positions to track. values can be either a number or a function
        scroll: {
            start: 0,
            stop: function($el) {
                return $(document).height() - $(window).height();
            }
        },
        // Values to tween, these can also either be a function or number
        values: {
            start: 0,
            stop: 100
        },
        ease: 'ExpoInOut',
        property: 'transform',
        transform: 'translateX(%s%)' // %s is replaced with the current value
	})
	// Adds are chainable
	.add({
		$el : $('.box-2'),
        scroll: {
            start: 100,
            stop: 200
        },
        values: {
            start: 0,
            stop: 1
        },
        ease: 'SineInOut',
        property: 'opacity',
	})
	// GSAP's Tweens and Timelines
	.add({
		$el : $('.box-3'),
        scroll: {
            start: 0,
            stop: 1000
        },
        tween: function($el) {
            return new TimelineMax()
                .to($el, 1, { rotation: 180, ease: Cubic.easeIn })
                .to($el, 1, { rotation: 90, ease: Cubic.easeIn });
        }
	})
	.run();


// You can also call the 'update' method to manully update values
window.addEventListener('resize', function(){
    ScrollAnimate.update();
}, false);
````

### Easing

You can specify any of the follow easing function to the default `property` tweens:

* QuadIn
* QuadOut
* QuadInOut
* CubicIn
* CubicOut
* CubicInOut
* QuartIn
* QuartOut
* QuartInOut
* QuintIn
* QuintOut
* QuintInOut
* SineIn
* SineOut
* SineInOut
* ExpoIn
* ExpoOut
* ExpoInOut
* CircIn
* CircOut
* CircInOut
* ElasticIn
* ElasticOut
* ElasticInOut
* BounceIn
* BounceOut
* BounceInOut