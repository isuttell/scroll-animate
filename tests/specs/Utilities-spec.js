describe("Utilties", function() {

    describe('Type checks', function() {
        var tests = {
          fn: function() {},
          nl: null,
          undef: void 0,
          arr: [],
          obj: {},
          str: '',
          num: 10,
          bool: true
        };

        describe('isFunction', function() {
            it('should check if a variable is a function', function() {
                for(var test in tests) {
                    expect(Utilities.isFunction(tests[test])).toBe(test === 'fn');
                }
            });
        });

        describe('isString', function() {
            it('should check if a variable is a object', function() {
                for(var test in tests) {
                    expect(Utilities.isObject(tests[test])).toBe(test === 'obj');
                }
            });
        });

        describe('isString', function() {
            it('should check if a variable is a String', function() {
                for(var test in tests) {
                    expect(Utilities.isString(tests[test])).toBe(test === 'str');
                }
            });
        });

        describe('isNumber', function() {
            it('should check if a variable is a Number', function() {
                for(var test in tests) {
                    expect(Utilities.isNumber(tests[test])).toBe(test === 'num');
                }
            });
        });

        describe('isBoolean', function() {
            it('should check if a variable is a Boolean', function() {
                for(var test in tests) {
                    expect(Utilities.isBoolean(tests[test])).toBe(test === 'bool');
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
            expect(Utilities.results(testObject, 'str')).toBe(testObject.str);
            expect(Utilities.results(testObject, 'num')).toBe(testObject.num);
        });

        it('should return `undefined` when a value isn\'t found', function(){
            expect(typeof Utilities.results(testObject, 'undef')).toBe('undefined');
        });

        it('should return the result of a function', function (){
            expect(Utilities.results(testObject, 'fn')).toBe(testObject.fn.call());
        });

        it('should apply `this` context', function() {
            var testValue = 10;
            Utilities.results(testObject, 'fn', { mockThis : testValue});
            expect(_this.mockThis).toBe(testValue);
        });

        it('should apply additional args', function() {
            var testValue = 25;
            Utilities.results(testObject, 'fn', {}, testValue);
            expect(args[0]).toBe(testValue);
        });
    });
});
