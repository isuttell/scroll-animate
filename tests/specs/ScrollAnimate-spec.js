describe("ScrollAnimate", function() {

    it("should be defined", function() {
        expect(ScrollAnimate).toBeDefined();
    });


    describe("ScrollAnimate.options", function() {
        var expectedDefaults;

        beforeEach(function(){
            expectedDefaults = {
                loop: true,
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
            var actual = ScrollAnimate.options({loop: false}),
                expected = expectedDefaults;
            expected.loop = false;
            expect(ScrollAnimate.options()).toEqual(expected);
        });

        it("should be chainable when passed an object", function(){
            expect(ScrollAnimate.options({loop: false})).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.run", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.run).toBe('function');
        });
    });

    describe("ScrollAnimate.add", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.add).toBe('function');
        });

        it('should be chainable', function() {
            expect(ScrollAnimate.add({$el:$('<div></div>')})).toBe(ScrollAnimate);
        });
    });

    describe("ScrollAnimate.pause", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.pause).toBe('function');
        });
    });

    describe("ScrollAnimate.play", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.play).toBe('function');
        });
    });

    describe("ScrollAnimate.toggle", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.toggle).toBe('function');
        });

        it('should toggle the paused state', function(){
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

    describe("ScrollAnimate.reset", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.play).toBe('function');
        });

        xit('should remove all animations', function() {

        });
    });

    describe("ScrollAnimate.removeEventListeners", function() {
        it("should be a function", function() {
            expect(typeof ScrollAnimate.removeEventListeners).toBe('function');
        });
    });
});