

describe("Op Presets", function() {
	var $injectr;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
		});
	}));
	
			
	it('generates operation presets', function() {
		var nums = {
			num1low: 2,
			num1high: 9,
			num2low: 2,
			num2high: 9
		}

		expect(Op.Add.matchesPresets(nums, 0)).toBeTruthy();
		nums.num1high = 8;
		expect(Op.Add.matchesPresets(nums, 0)).toBeFalsy();
		
		nums = {
			num1low: 21,
			num1high: 198,
			num2low: 21,
			num2high: 198
		};

		expect(Op.Sub.matchesPresets(nums, 1)).toBeTruthy();
		nums.num2low = 22;
		expect(Op.Sub.matchesPresets(nums, 1)).toBeFalsy();
	});
});
