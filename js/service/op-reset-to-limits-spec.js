

describe("Op Reset Limits", function() {
	var $injectr;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
		});
	}));

	it('resets operation limits', function() {
		var nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		var limits = {
			num1low: 11,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		Op.Add.resetToLimits(nums, limits);
		expect(Op.Add.matches(nums, limits)).toBeTruthy();
		
		nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		limits = {
			num1low: 9,
			num1high: 98,
			num2low: 11,
			num2high: 97
		};
		Op.Add.resetToLimits(nums, limits);
		limits = {
			num1low: 10,
			num1high: 98,
			num2low: 11,
			num2high: 97
		};
		expect(Op.Add.matches(nums, limits)).toBeTruthy();
				
		nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		limits = {
			num1low: 20,
			num1high: 80,
			num2low: 30,
			num2high: 70
		};
		Op.Add.resetToLimits(nums, limits);
		expect(Op.Add.matches(nums, limits)).toBeTruthy();
				
		nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		limits = {
			num1low: 2,
			num1high: 100,
			num2low: 1,
			num2high: 200
		};
		Op.Add.resetToLimits(nums, limits);
		limits = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		expect(Op.Add.matches(nums, limits)).toBeTruthy();
						
	});
});
