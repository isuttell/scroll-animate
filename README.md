# scroll-animate

Animates elements by scroll position. Currently requires jQuery. Supports AMD.

[![Build Status](https://img.shields.io/travis/isuttell/scroll-animate.svg?&style=flat)](https://travis-ci.org/isuttell/scroll-animate)
[![Coverage Status](https://img.shields.io/coveralls/isuttell/scroll-animate.svg?&style=flat)](https://coveralls.io/r/isuttell/scroll-animate)
[![Codacy Badge](https://www.codacy.com/project/badge/e8b62ca02cf7498ab4d6142fc51b4249)](https://www.codacy.com/public/isuttell/scrollanimate)
[![Bower version](https://img.shields.io/bower/v/scroll-animate.svg?&style=flat)](http://badge.fury.io/gh/isuttell%2Fscroll-animate)

## Bower
scroll-animate is available through [Bower](http://bower.io/).

```shell
bower install scroll-animate --save
```

## Basic Usage

```js
// Create a new instance
var scroll = new ScrollAnimate();

scroll
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
  });


// You can also call the 'update' method to manully update values
window.addEventListener('resize', function(){
  ScrollAnimate.update();
}, false);
````

## Easing

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


## License
scroll-animate is open-sourced software licensed under the MIT license

## Release History
- v0.4.0 - Refactor and improved scroll smoothness
- v0.3.3
- v0.3.2
- v0.3.1
- v0.3.0
- v0.2.2
- v0.2.1
- v0.2.0
- v0.1.0 - Initial Release

