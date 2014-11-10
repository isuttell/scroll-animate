describe("_util", function() {

    describe('tweenPosition', function() {
        it('should turn Numbers in between 0 and 1', function(){
            expect(typeof ScrollAnimate._util.tweenPosition(0, 0, 100)).toBe('number');
            expect(ScrollAnimate._util.tweenPosition(0, 0, 100)).toBe(0);
            expect(ScrollAnimate._util.tweenPosition(100, 0, 100)).toBe(1);

            expect(ScrollAnimate._util.tweenPosition(200, 0, 100)).toBe(1);
            expect(ScrollAnimate._util.tweenPosition(0, 100, 200)).toBe(0);
        });
    });

    describe('Type checks', function() {
        var tests = {
          fn: function() {},
          nl: null,
          undef: void 0,
          arr: [],
          obj: {},
          str: ''
        };

        describe('isFunction', function() {
            it('should check if a variable is a function', function() {
                for(var test in tests) {
                    expect(ScrollAnimate._util.isFunction(tests[test])).toBe(test === 'fn');
                }
            });
        });

        describe('isString', function() {
            it('should check if a variable is a object', function() {
                for(var test in tests) {
                    expect(ScrollAnimate._util.isObject(tests[test])).toBe(test === 'obj');
                }
            });
        });

        describe('isString', function() {
            it('should check if a variable is a String', function() {
                for(var test in tests) {
                    expect(ScrollAnimate._util.isString(tests[test])).toBe(test === 'str');
                }
            });
        });
    });

    describe('results', function() {

        var testObject, _this, args;

        beforeEach(function(){
            _this = void 0;
            args = void 0;

            testObject = {
                str: 'str',
                num: 100,
                fn: function() {
                    args = arguments;
                    _this = this;
                    return 50;
                }
            };
        });


        it('should return return a basic value from an object', function() {
            expect(ScrollAnimate._util.results(testObject, 'str')).toBe(testObject.str);
            expect(ScrollAnimate._util.results(testObject, 'num')).toBe(testObject.num);
        });

        it('should return `undefined` when a value isn\'t found', function(){
            expect(typeof ScrollAnimate._util.results(testObject, 'undef')).toBe('undefined');
        });

        it('should return the result of a function', function (){
            expect(ScrollAnimate._util.results(testObject, 'fn')).toBe(testObject.fn.call());
        });

        it('should apply `this` context', function() {
            var testValue = 10;
            ScrollAnimate._util.results(testObject, 'fn', { mockThis : testValue});
            expect(_this.mockThis).toBe(testValue);
        });

        it('should apply additional args', function() {
            var testValue = 25;
            ScrollAnimate._util.results(testObject, 'fn', {}, testValue);
            expect(args[0]).toBe(testValue);
        });
    });
});
