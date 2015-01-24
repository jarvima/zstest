describe("EquationCtrl", function() {
	var equationScope, childScope, grandChildScope;

	beforeEach(module('zappy-app'));

	beforeEach(inject(function($rootScope, $controller) {
		equationScope = $rootScope.$new();
		$controller('EquationCtrl', {
			$scope: equationScope
		});
		/*
		childScope = mainScope.$new();
		$controller('ChildController', {
			$scope: childScope
		});
		grandChildScope = childScope.$new();
		$controller('GrandChildController', {
			$scope: grandChildScope
		});
		*/
	}));

	it('has functionality', function() {
		expect(equationScope.equation).toBeDefined();
		expect(equationScope.equation.quit).toBeDefined();
		/*
		expect(childScope.timeOfDay).toBe('morning');
		expect(childScope.name).toBe('Mattie');
		expect(grandChildScope.timeOfDay).toBe('evening');
		expect(grandChildScope.name).toBe('Gingerbreak Baby');
		*/
	});
});
