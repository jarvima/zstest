
var ZTestr = {
		
		// TOOD set up parameters or something
		
	simNumClick: function($injectr, simData) {
		var $equation = $injectr.get('$equation');
    	var deferred = $injectr.get('$q').defer();
    	if (simData.clickCount < simData.targetNumEqs) {
    		simData.clickCount++;
			ZTestr.log('testing equation: ' + $equation.getEqStr() + " " + $equation.ansStr);
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
				
				ZTestr.simNumClick($injectr, simData).then(function() {
					deferred.resolve();
				});
				$injectr.get('$rootScope').$apply();

        	}, simData.clickDelay * simData.clickCount);
    	}
    	else {
    		deferred.resolve();
    	}
    	return deferred.promise;
    },
	log: function(text) {
		console.log(text);
	}
};
