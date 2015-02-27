describe("TransitionCtrl", function() {
	var transScope;
	var $injectr;
	var transCtrl;

	beforeEach(module('zappy-app'));

	beforeEach(inject(function($rootScope, $controller, $injector) {
		transScope = $rootScope.$new();
		var $trans = $injector.get('$trans');
		$controller('TransitionCtrl', {
			$scope: transScope,
			$trans: $trans
		});
		inject(function($injector) {
			$injectr = $injector;
		});
	}));

	var simData = {
       	targetNumEqs: 1,
       	clickDelay: 1, // 20
       	
    	clickCount: 0,
    	totalTime: 0,
    	lastFewTime: []
    };
    
	it('displays round results during round transition', function() {
		expect(transScope.trans).toBeDefined();
		expect(transScope.trans.start).toBeDefined();
	});
	
	it('updates stats', function(done) {
		var $equation = $injectr.get('$equation');
		$equation.genEqData();

		var eqData = angular.copy($equation.data);
		
		expect($equation.ansStr).toBe('' + eqData.ans);
		
		ZTestr.simNumClick($injectr, simData).then(function() {
			
			var time = transScope.trans.fastest();

			expect(transScope.trans.numEqs()).toBe(1);
			expect(transScope.trans.fastest()).toBeGreaterThan(3);
			expect(transScope.trans.slowest()).toBe(time);
			expect(transScope.trans.averageTime()).toBe(time);
			
			done();
		});
	});

});
