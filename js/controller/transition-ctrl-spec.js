describe("TransitionCtrl", function() {
	var transitionScope;
	var $injectr;

	beforeEach(module('zappy-app'));

	beforeEach(inject(function($rootScope, $controller) {
		transitionScope = $rootScope.$new();
		$controller('TransitionCtrl', {
			$scope: equationScope
		});
		inject(function($injector) {
			$injectr = $injector;
		});
	}));

	it('displays round results during round transition', function() {
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
