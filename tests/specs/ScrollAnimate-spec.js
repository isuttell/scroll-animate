describe("ScrollAnimate", function() {

    beforeEach(function(){
        ScrollAnimate.clear();
    });

    it("should be defined", function() {
        expect(ScrollAnimate).toBeDefined();
    });

    describe("ScrollAnimate.options", function() {
        var expectedDefaults;

        beforeEach(function(){
            expectedDefaults = {
                smoothScroll: {
                    enabled: false,
                    speed: 15
                }
            };
        });

        it("should be a function", function() {
            expect(typeof ScrollAnimate.options).toBe('function');
        });

        it("should return current options when no arguments are set", function() {
            expect(typeof ScrollAnimate.options()).toBe('object');
            expect(ScrollAnimate.options()).toEqual(expectedDefaults);
        });

        it("should update options when passed an 'object' as an argument", function(){
            var actual = ScrollAnimate.options({ smoothScroll: { enabled: true } }),
                expected = expectedDefaults;
            expected.smoothScroll.enabled = true;
            expect(ScrollAnimate.options()).toEqual(expected);
        });

        it("should be chainable when passed an object", function(){
            expect(ScrollAnimate.options({ smoothScroll: { enabled: true } })).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.run", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.run).toBe('function');
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.run()).toBe(ScrollAnimate);
        });

        it('should take options and save them', function() {
            var expected = true;
            expect(ScrollAnimate.run({ smoothScroll: { enabled: expected } }).options().smoothScroll.enabled).toBe(expected);
        });
    });

    describe("ScrollAnimate.add", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.add).toBe('function');
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.add({$el:$('<div></div>')})).toBe(ScrollAnimate);
        });

        it("should be take the 'tween' option", function() {
            ScrollAnimate.add({
                $el: $('<div></div>'),
                tween: function($el) {
                    return new TimelineMax().to( $('<div></div>'), {opacity: 0}, 0);
                }
            });
            expect(ScrollAnimate._getItems()[0]).toBeDefined();
        });

        it('should assign an unique id to each item', function() {
            var items = ScrollAnimate.add({$el:$('<div></div>')}).add({$el:$('<div></div>')})._getItems();

            expect(items[0].id).toBeDefined();
            expect(items[0].id).not.toBe(items[1].id);
        });

        it('should assign the same id to the same item', function() {
            var $item = $('<div></div>'),
                items = ScrollAnimate.add({$el:$item}).add({$el:$item})._getItems();

            expect(items[0].id).toBeDefined();
            expect(items[0].id).toBe(items[1].id);
        });

    });

    describe("ScrollAnimate.pause", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.pause).toBe('function');
        });

        it("should set 'paused' tp true", function(){
            ScrollAnimate.running(true);
            ScrollAnimate.pause();
            expect(ScrollAnimate.running()).toBe(false);
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.pause()).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.play", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.play).toBe('function');
        });

        it("should set 'paused' to false", function(){
            ScrollAnimate.running(false);
            ScrollAnimate.play();
            expect(ScrollAnimate.running()).toBe(true);
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.pause()).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.toggle", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.toggle).toBe('function');
        });

        it('should toggle the paused state', function(){
            ScrollAnimate.running(false);
            expect(ScrollAnimate.running()).toBe(false);
            ScrollAnimate.toggle();
            expect(ScrollAnimate.running()).toBe(true);
        });
    });

    describe("ScrollAnimate.running", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.running).toBe('function');
        });

        it("should return a boolean", function() {
            expect(typeof ScrollAnimate.running()).toBe('boolean');
        });

        it("should be able to set the running set", function() {
            ScrollAnimate.running(false);
            expect(ScrollAnimate.running()).toBe(false);
            ScrollAnimate.running(true);
            expect(ScrollAnimate.running()).toBe(true);
        });
    });

    describe("ScrollAnimate.clear", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.clear).toBe('function');
        });

        it('should remove all animations', function() {
            ScrollAnimate.add({$el: $('<div></div>')}).clear();
            expect(ScrollAnimate._getItems().length).toBe(0);
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.clear()).toBe(ScrollAnimate);
        });
    });

   describe("ScrollAnimate.addEventListeners", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.addEventListeners).toBe('function');
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.addEventListeners()).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.removeEventListeners", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.removeEventListeners).toBe('function');
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.removeEventListeners()).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.options.smoothScroll", function(){
        it('should be a an object with two options', function(){
            expect(typeof ScrollAnimate.options().smoothScroll).toBe('object');
            expect(typeof ScrollAnimate.options().smoothScroll.enabled).toBe('boolean');
            expect(typeof ScrollAnimate.options().smoothScroll.speed).toBe('number');
        });
    });

    describe("ScrollAnimate.update", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.update).toBe('function');
            spyOn(ScrollAnimate, 'update');
            ScrollAnimate.update();
            expect(ScrollAnimate.update).toHaveBeenCalled();

        });
    });

    xdescribe("ScrollAnimate animate", function() {
        beforeEach(function(){

            ScrollAnimate.add({
                $el: $('<div></div>')
            });
        });
        spyOn($.fn, 'scrollTop').andReturn(100);
        expect($(document).scrollTop()).toBe(100);
    });
});