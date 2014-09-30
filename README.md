# Scroll Animate

Animates elements by scroll position

## Basic

Currently requires LoDash and jQuery. Supports AMD.

````
ScrollAnimate
	.add({
		$el : $('.box'),
        scroll: {
            start: 0,
            stop: function() {
                return $(document).height() - $(window).height();
            }
        },
        values: {
            start: 0,
            stop: 100
        },
        property: 'transform',
        transform: 'translateX(%s%)'
	})
	.run();
````


## Todo

* Remove dependancy on LoDash