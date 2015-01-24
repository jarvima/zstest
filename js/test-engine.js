
var Testr = {
	tests: [],
	register: function(test) {
		this.tests.push(test);
	},
	run: function() {
		if (this.tests.length == 0) {
			this.log("no test to run");
			return;
		}
		
		var testrRef = this;
		
		this.log("running test suite...");
		this.runTest(0).then(function() {
			testrRef.log("testr completed successfully");
		});

	},
	runTest: function(index) {
		var deferred = $.Deferred();
		if (index >= this.tests.length) {
			this.log('all tests completed');
			deferred.resolve();
		}
		else {
			var test = this.tests[index];
			test.testrData = {
				index: index
			};
			
			var testrRef = this;
			
			this.log(test.name + ' is running');
			test.run(test).then(function(test) {
				testrRef.log(test.name + ' success');
				
				testrRef.runTest(test.testrData.index + 1).then(function() {
					//console.log("run test call resolved");
					deferred.resolve();
				}).fail(function() {
					testrRef.log("huh?");
				}).done();
			});
		}
		
		
		return deferred;
	},
	assert: function(o1, o2, info) {
		if (o1 != o2) {
			throw o1 + " not equal to " + o2 + (info ? ' ' + info : '');
		}
	},
	assertNot: function(o1, o2, info) {
		if (o1 == o2) {
			throw o1 + " is equal to " + o2 + (info ? ' ' + info : '');
		}
	},
	precision: 100000000,
	round: function(num) {
		return Math.round(num * this.precision) / this.precision;
	},
	log: function(text) {
		console.log(text);
	}
};
