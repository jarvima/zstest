describe("Equation Service", function() {
	var $injectr, $equation;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
			$equation = $injectr.get('$equation');
		});
	}));
	
	afterEach(function(){
    });

	var log = function(text) {
		console.log("equation service spec: " + text);
	}

	var simData = {
       	targetNumEqs: 10, // 20 - must be at least 10
       	clickDelay: 1, // 20
       	
    	clickCount: 0,
    	totalTime: 0,
    	lastFewTime: []
    };
    
	it('updates stats', function(done) {
		console.log('testing equation-service-spec...');

		var simData = {
	       	targetNumEqs: 10, // 20 - must be at least 10
	       	clickDelay: 1, // 20
	       	
	    	clickCount: 0,
	    	totalTime: 0,
	    	lastFewTime: []
	    };
	    
	    var storedStats = zappy.cookies.read('stats');
	    simData.totalTime = storedStats.averageTime * storedStats.correctCount;
	    simData.startingCount = storedStats.correctCount;
		    
		var statsData = $injectr.get('$stats').data;
		var simDataAvg = simData.totalTime / simData.startingCount;
		expect(simDataAvg).toBeCloseTo(statsData.averageTime, 9);
		
		$equation.genEqData();

		var settingsData = $injectr.get('$settings').data;			
		var eqData = angular.copy($equation.data);
		
		expect(settingsData.op.genAnswer(eqData)).toBe(eqData.ans);
		expect($equation.ansStr).toBe('' + eqData.ans);
		
		simData.testDetails = true;
		ZTestr.simNumClick($injectr, simData).then(function() {
			var statsData = $injectr.get('$stats').data;
			
			var simDataAvg = simData.totalTime / (simData.targetNumEqs + simData.startingCount);
			expect(simDataAvg).toBeCloseTo(statsData.averageTime, 9);
			
			var lastFewAvg = 0;
			for (var j = 0; j < statsData.lastFewNum; j++) {
				lastFewAvg += simData.lastFewTime[j];
			}
			lastFewAvg = lastFewAvg / statsData.lastFewNum;
			expect(lastFewAvg).toBe(statsData.lastFewAvgTime);
			
			done();
		});
	});

	it('manages the equation', function() {
		$equation.genEqData();
		var eqStr = $equation.getEqStr();
		expect($equation.getEqStr()).toBe(eqStr);
	});
	
});
