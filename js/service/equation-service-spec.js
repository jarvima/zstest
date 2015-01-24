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
    
    var storedStats = zappy.cookies.read('stats');
    simData.totalTime = storedStats.averageTime * storedStats.answerCount;
    simData.startingCount = storedStats.answerCount;
    
    var simNumClick = function() {
    	var deferred = $injectr.get('$q').defer();
    	if (simData.clickCount < simData.targetNumEqs) {
    		simData.clickCount++;
			log('testing equation: ' + $equation.getEqStr() + " " + $equation.ansStr);
        	setTimeout(function() {
				var eqData = angular.copy($equation.data);

				var ansStr = $equation.ansStr;
				for (var j = 0; j < ansStr.length; j++) {
					//log('num hit: ' + ansStr[j]);
					$equation.numhit(ansStr[j]);
				}
			
				var updateEqData = angular.copy($equation.data);
				expect(updateEqData.ans).not.toBe(eqData.ans);
				
				simData.totalTime += updateEqData.lastAttempt.time;
				simData.lastFewTime.unshift(updateEqData.lastAttempt.time);
				
				simNumClick().then(function() {
					deferred.resolve();
				});
				$injectr.get('$rootScope').$apply();

        	}, simData.clickDelay * simData.clickCount);
    	}
    	else {
    		deferred.resolve();
    	}
    	return deferred.promise;
    };
    
	it('updates stats', function(done) {
		$equation.genEqData();

		var settingsData = $injectr.get('$settings').data;			
		var eqData = angular.copy($equation.data);
		
		expect(settingsData.op.genAnswer(eqData)).toBe(eqData.ans);
		expect($equation.ansStr).toBe('' + eqData.ans);
		
		simNumClick().then(function() {
			var statsData = $injectr.get('$stats').data;
			
			var simDataAvg = simData.totalTime / (simData.targetNumEqs + simData.startingCount);
			log('simData.totalTime: ' + simData.totalTime + ' simData.targetNumEqs: ' + simData.targetNumEqs + ' simData.startingCount: ' + simData.startingCount);
			log('checking average: ' + simDataAvg + ' and ' + statsData.averageTime);
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
		
		//'use strict';
		var o = new Object();
		console.log(o.constructor == Object);
		var n = new Object(1);
		console.log(n.constructor == Number);
		var b = new Object(true);
		console.log(b.constructor == Boolean);
	});
	
});
