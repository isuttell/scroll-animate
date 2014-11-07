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
});
