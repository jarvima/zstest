

describe("Op Limits", function() {
	var $injectr;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
		});
	}));
	
	var expectTrue = function(value, info) {
		expect(value + ' ' + info).toBe(true + ' ' + info);
	}

	var expectInfo = function(value1, value2, info) {
		expect(value1 + ' ' + info).toBe(value2 + ' ' + info);
	}

	it('generates operation limits', function() {

		var maxLimits = Op.Add.maxLimits();
		expect(maxLimits.num1low).toBe(0);
		expect(maxLimits.num1high).toBe(999);
		expect(maxLimits.num2low).toBe(0);
		expect(maxLimits.num2high).toBe(999);

		maxLimits = Op.Sub.maxLimits();
		expect(maxLimits.num1low).toBe(1);
		expect(maxLimits.num1high).toBe(999);
		expect(maxLimits.num2low).toBe(0);
		expect(maxLimits.num2high).toBe(999);

		maxLimits = Op.Mul.maxLimits();
		expect(maxLimits.num1low).toBe(1);
		expect(maxLimits.num1high).toBe(99);
		expect(maxLimits.num2low).toBe(1);
		expect(maxLimits.num2high).toBe(99);

		maxLimits = Op.Div.maxLimits();
		expect(maxLimits.num1low).toBe(1);
		expect(maxLimits.num1high).toBe(9801);
		expect(maxLimits.num2low).toBe(1);
		expect(maxLimits.num2high).toBe(99);
		
		for (var j in Op) {
			var op = Op[j];
			for (var k in op.levels) {
				var info = op.name + ' level index: ' + k;
				var level = op.levels[k];
				expectTrue(op.withinLimits(level.presets, k), info);
				expectTrue(level.limits.num1low < level.limits.num1high, info);
				expectTrue(level.limits.num2low < level.limits.num2high, info);
				expectTrue(level.presets.num1low < level.presets.num1high, info);
				expectTrue(level.presets.num2low < level.presets.num2high, info);
			}
		}

		for (var j in Op) {
			var op = Op[j];
			for (var k = 0; k < op.levels.length - 1; k++) {
				var info = op.name + ' level index: ' + k;
				var limits = op.levels[k].limits;
				var nextLimits = op.levels[k + 1].limits;
				expectInfo(limits.num1high + 1, nextLimits.num1low, info);
				expectInfo(limits.num2high + 1, nextLimits.num2low, info);
			}
		}

	});
});
