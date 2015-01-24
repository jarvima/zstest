


describe("Op Within Limits", function() {
	var $injectr;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
		});
	}));

	it('checks operation limits', function() {

		var nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		}

		expect(Op.Add.withinLimits(nums, 1)).toBeTruthy();
		nums.num1low = 11;
		expect(Op.Add.withinLimits(nums, 1)).toBeTruthy();
		nums.num1high = 98;
		expect(Op.Add.withinLimits(nums, 1)).toBeTruthy();
		nums.num2low = 11;
		expect(Op.Add.withinLimits(nums, 1)).toBeTruthy();
		nums.num1high = 100;
		expect(Op.Add.withinLimits(nums, 1)).toBeFalsy();
		
		nums = {
			num1low: 11,
			num1high: 20,
			num2low: 11,
			num2high: 20
		};

		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();
		nums.num2low = 12;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();
		nums.num2high = 19;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();
		nums.num1low = 12;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();

		nums.num1low = 9;
		expect(Op.Mul.withinLimits(nums, 1)).toBeFalsy();
		nums.num1low = 11;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();

		nums.num1high = 21;
		expect(Op.Mul.withinLimits(nums, 1)).toBeFalsy();
		nums.num1high = 20;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();
		
		nums.num2low = 10;
		expect(Op.Mul.withinLimits(nums, 1)).toBeFalsy();
		nums.num2low = 11;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();

		nums.num2high = 21;
		expect(Op.Mul.withinLimits(nums, 1)).toBeFalsy();
		nums.num2high = 20;
		expect(Op.Mul.withinLimits(nums, 1)).toBeTruthy();
		
			
	});
});
