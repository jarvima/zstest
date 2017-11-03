

describe("Op Level Keys", function() {
	var $injectr;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
		});
	}));

	it('generates level keys', function() {
		console.log('testing op-level-key-spec...');
		var $op = $injectr.get('$op');

		var nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 99
		};
		expect($op.Add.getLevelKey(nums)).toBe('lvlKey1_preset');

		nums = {
			num1low: 1,
			num1high: 18,
			num2low: 1,
			num2high: 9
		};
		expect($op.Sub.getLevelKey(nums)).toBe('lvlKey0_preset');

		nums = {
			num1low: 21,
			num1high: 99,
			num2low: 21,
			num2high: 99
		};
		expect($op.Mul.getLevelKey(nums)).toBe('lvlKey2_preset');

		nums = {
			num1low: 5,
			num1high: 81,
			num2low: 2,
			num2high: 10
		};
		expect($op.Div.getLevelKey(nums)).toBe('lvlKey0_1_custom');

		nums = {
			num1low: 10,
			num1high: 99,
			num2low: 10,
			num2high: 100
		};
		expect($op.Add.getLevelKey(nums)).toBe('lvlKey1_2_custom');

		nums = {
			num1low: 21,
			num1high: 201,
			num2low: 9,
			num2high: 200
		};
		expect($op.Sub.getLevelKey(nums)).toBe('lvlKey0_1_2_custom');

		nums = {
			num1low: 101,
			num1high: 400,
			num2low: 9,
			num2high: 21
		};
		expect($op.Div.getLevelKey(nums)).toBe('lvlKey0_1_2_custom');

		nums = {
			num1low: 3,
			num1high: 9,
			num2low: 2,
			num2high: 9
		};
		expect($op.Add.getLevelKey(nums)).toBe('lvlKey0_custom');

		nums = {
			num1low: 21,
			num1high: 200,
			num2low: 10,
			num2high: 200
		};
		expect($op.Sub.getLevelKey(nums)).toBe('lvlKey1_custom');
	});
	
});
