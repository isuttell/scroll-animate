describe("ScrollAnimate", function() {

	it("should be defined", function() {
		expect(ScrollAnimate).toBeDefined();
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

	describe("ScrollAnimate.destroy", function() {
		it("should be a function", function() {
			expect(typeof ScrollAnimate.destroy).toBe('function');
		});
	});
});