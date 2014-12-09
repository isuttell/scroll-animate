describe("ScrollAnimate", function() {
    var scroll;
    beforeEach(function(){
        scroll = void 0;
        scroll = new ScrollAnimate();
        scroll.clear();
    });



    it("should be defined", function() {
        expect(ScrollAnimate).toBeDefined();
    });

    describe("ScrollAnimate.update", function() {
        it("should be a function", function() {
            spyOn(scroll, 'update');
            expect(typeof scroll.update).toBe('function');
            scroll.update();
            expect(scroll.update).toHaveBeenCalled();
        });

        it('should update an item\'s current value', function() {
            var item = {
                    $el : $('<div></div>'),
                    // scrollTop positions to track. values can be either a number or a function
                    scroll: {
                        start: 0,
                        stop: 100
                    },
                    // Values to tween, these can also either be a function or number
                    values: {
                        start: 0,
                        stop: 100
                    },
                    ease: 'ExpoInOut',
                    property: 'transform',
                    transform: 'translateX(%s%)' // %s is replaced with the current value
                };
            scroll.add(item).update();
            expect(scroll.items[0].val).toBe(0);
        });

        it('should update an take Numbers for scroll/values start/stop', function() {
            var item = {
                    $el : $('<div></div>'),
                    // scrollTop positions to track. values can be either a number or a function
                    scroll: {
                        start: 0,
                        stop: 100
                    },
                    // Values to tween, these can also either be a function or number
                    values: {
                        start: 100,
                        stop: 0
                    },
                    ease: 'ExpoInOut',
                    property: 'transform',
                    transform: 'translateX(%s%)' // %s is replaced with the current value
                };
            scroll.add(item).update();
            expect(scroll.items[0].val).toBe(100);
        });

        it('should update an take Functions for scroll/values start/stop', function() {
            var item = {
                    $el : $('<div></div>'),
                    // scrollTop positions to track. values can be either a number or a function
                    scroll: {
                        start: function(){ return 0; },
                        stop: function(){ return 100; }
                    },
                    // Values to tween, these can also either be a function or number
                    values: {
                        start: function(){ return 50; },
                        stop: function(){ return 0; },
                    },
                    property: 'transform',
                    transform: 'translateX(%s%)' // %s is replaced with the current value
                };

            scroll.add(item).update();
            expect(scroll.items[0].val).toBe(50);
        });

        it('should apply the item context to each scroll/value function', function() {
            var contexts = [];
            var item = {
                $el : $('<div></div>'),
                // scrollTop positions to track. values can be either a number or a function
                scroll: {
                    start: function(){ contexts.push(this); return 0; },
                    stop: function(){ contexts.push(this); return 100; }
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: function(){ contexts.push(this); return 50; },
                    stop: function(){ contexts.push(this); return 0; }
                },
                property: 'transform',
                transform: 'translateX(%s%)' // %s is replaced with the current value
            };
            scroll.add(item).update();
            for(var i = 0; i < contexts.length; i++){
                expect(contexts[i]).toBe(scroll.items[0]);
            }
        });

        it('should supply the $el argument to each scroll/value function', function() {
            var typeofs = [];
            var item = {
                $el : $('<div></div>'),
                // scrollTop positions to track. values can be either a number or a function
                scroll: {
                    start: function($el){ typeofs.push(typeof $el); return 0; },
                    stop: function($el){ typeofs.push(typeof $el); return 100; }
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: function($el){ typeofs.push(typeof $el); return 50; },
                    stop: function($el){ typeofs.push(typeof $el); return 0; }
                },
                property: 'transform',
                transform: 'translateX(%s%)' // %s is replaced with the current value
            };
            scroll.add(item).update();
            for(var i = 0; i < typeofs.length; i++){
                expect(typeofs[i]).not.toBe('undefined');
            }
        });

        it('should update a property on an element', function() {
            var $element = $('<div></div>');
            var item = {
                $el : $element,
                // scrollTop positions to track. values can be either a number or a function
                scroll: {
                    start: 0,
                    stop: 100
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: 0,
                    stop: 1
                },
                property: 'opacity',
            };
            spyOn(scroll, 'scrollPosition').andReturn(100);
            scroll.add(item).update();
            expect($element.css('opacity')).toBe('1');
        });

        it('should update a property on an element', function() {
            var $element = $('<div></div>');
            var item = {
                $el : $element,
                // scrollTop positions to track. values can be either a number or a function
                scroll: {
                    start: 0,
                    stop: 100
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: 0,
                    stop: 1
                },
                property: 'opacity',
            };
            spyOn(scroll, 'scrollPosition').andReturn(100);
            scroll.add(item).update();
            expect($element.css('opacity')).toBe('1');
        });
    });

    describe('ScrollAnimate.updateScrollPosition', function(){
        it('should move the scrollPosition property bu options.speed', function() {
            var $element = $('<div></div>');
            var item = {
                $el : $element,
                // scrollTop positions to track. values can be either a number or a function
                scroll: {
                    start: 0,
                    stop: 100
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: 0,
                    stop: 1
                },
                property: 'opacity',
            };
            scroll.options.speed = 0.3;
            scroll.scrollPosition = 0;
            spyOn(scroll, 'getScrollTop').andReturn(100);
            scroll.updateScrollPosition();
            expect(scroll.scrollPosition).toBe(30);
        });

        it('should return scrollTop when the it\'s really close', function() {
            var $element = $('<div></div>');
            var item = {
                $el : $element,
                // scrollTop positions to track. values can be either a number or a function
                scroll: {
                    start: 0,
                    stop: 100
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: 0,
                    stop: 1
                },
                property: 'opacity',
            };
            scroll.options.speed = 0.3;
            scroll.scrollPosition = 99.99999;
            spyOn(scroll, 'getScrollTop').andReturn(100);
            scroll.updateScrollPosition();
            expect(scroll.scrollPosition).toBe(100);
        });
    });

    describe("ScrollAnimate.add", function() {
        it("should be a function", function() {
            expect(typeof scroll.add).toBe('function');
        });

        it('should be chainable', function() {
            expect(scroll.add({$el:$('<div></div>')})).toBe(scroll);
        });

        it("should be take the 'tween' option", function() {
            scroll.add({
                $el: $('<div></div>'),
                tween: function($el) {
                    return new TimelineMax().to( $('<div></div>'), {opacity: 0}, 0);
                }
            });
            scroll.update();
            expect(scroll.items[0]).toBeDefined();
        });

        it("should be take the 'filter' option", function() {
            scroll.add({
                $el: $('<div></div>'),
                scroll: {
                    start: 0,
                    stop: 100
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: 0,
                    stop: 100
                },
                property: 'filter',
                filter: 'grayscale(%s)'
            });
            scroll.update(0);
            expect(scroll.items[0]).toBeDefined();
        });

        it("should be take the 'scrollTop' option", function() {
            var $el = $('<div></div>');
            scroll.add({
                $el: $el,
                scroll: {
                    start: 0,
                    stop: 100
                },
                // Values to tween, these can also either be a function or number
                values: {
                    start: 0,
                    stop: 100
                },
                property: 'scrollTop'
            });
            spyOn(scroll.items[0].$el, 'scrollTop');
            scroll.update();
            expect(scroll.items[0].$el.scrollTop).toHaveBeenCalled();
        });

        it('should assign an unique id to each item', function() {
            var items = scroll.add({$el:$('<div></div>')}).add({$el:$('<div></div>')}).items;

            expect(items[0].id).toBeDefined();
            expect(items[1].id).toBeDefined();

            expect(items[0].id).not.toBe(items[1].id);
        });

        it('should assign the same id to the same item', function() {
            var $item = $(document.createElement('div')),
                items = scroll.add({$el:$item}).add({$el:$item}).items;

            expect(items[0].id).toBeDefined();
            expect(items[1].id).toBeDefined();

            expect(items[0].id).toBe(items[1].id);
        });

    });

    describe("ScrollAnimate.pause", function() {
        it("should be a function", function() {
            expect(typeof scroll.pause).toBe('function');
        });

        it("should set 'paused' tp true", function(){
            scroll.running(true);
            scroll.pause();
            expect(scroll.running()).toBe(false);
        });

        it('should be chainable', function() {
            expect(scroll.pause()).toBe(scroll);
        });
    });

    describe("ScrollAnimate.play", function() {
        it("should be a function", function() {
            expect(typeof scroll.play).toBe('function');
        });

        it("should set 'paused' to false", function(){
            scroll.running(false);
            scroll.play();
            expect(scroll.running()).toBe(true);
        });

        it('should be chainable', function() {
            expect(scroll.pause()).toBe(scroll);
        });
    });

    describe("ScrollAnimate.toggle", function() {
        it("should be a function", function() {
            expect(typeof scroll.toggle).toBe('function');
        });

        it('should toggle the paused state', function(){
            scroll.running(false);
            expect(scroll.running()).toBe(false);
            scroll.toggle();
            expect(scroll.running()).toBe(true);
        });
    });

    describe("ScrollAnimate.running", function() {
        it("should be a function", function() {
            expect(typeof scroll.running).toBe('function');
        });

        it("should return a boolean", function() {
            expect(typeof scroll.running()).toBe('boolean');
        });

        it("should be able to set the running set", function() {
            scroll.running(false);
            expect(scroll.running()).toBe(false);
            scroll.running(true);
            expect(scroll.running()).toBe(true);
        });
    });

    describe("ScrollAnimate.clear", function() {
        it("should be a function", function() {
            expect(typeof scroll.clear).toBe('function');
        });

        it('should remove all animations', function() {
            scroll.add({$el: $('<div></div>')}).clear();
            expect(scroll.items.length).toBe(0);
        });

        it('should be chainable', function() {
            expect(scroll.clear()).toBe(scroll);
        });
    });

   xdescribe("ScrollAnimate.addEventListeners", function() {
        it("should be a function", function() {
            expect(typeof scroll.addEventListeners).toBe('function');
        });

        it('should be chainable', function() {
            expect(scroll.addEventListeners()).toBe(scroll);
        });
    });

    xdescribe("ScrollAnimate.removeEventListeners", function() {
        it("should be a function", function() {
            expect(typeof scroll.removeEventListeners).toBe('function');
        });

        it('should be chainable', function() {
            expect(scroll.removeEventListeners()).toBe(scroll);
        });
    });

    describe('tweenPosition', function() {
        it('should turn Numbers in between 0 and 1', function(){
            expect(typeof Utilities.tweenPosition(0, 0, 100)).toBe('number');
            expect(Utilities.tweenPosition(0, 0, 100)).toBe(0);
            expect(Utilities.tweenPosition(100, 0, 100)).toBe(1);

            expect(Utilities.tweenPosition(200, 0, 100)).toBe(1);
            expect(Utilities.tweenPosition(0, 100, 200)).toBe(0);
        });
    });

    describe('ScrollAnimate.getScrollTop', function() {
        it('should return the scroll position', function(){
            expect(scroll.getScrollTop()).toBe(0);
            expect(typeof scroll.getScrollTop()).toBe('number');
        });
    });

});
