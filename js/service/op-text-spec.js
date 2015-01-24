

describe("Op Text", function() {
	var $injectr;
	
	beforeEach(module('zappy-app'));
	
	beforeEach(inject(function() {
		inject(function($injector) {
			$injectr = $injector;
		});
	}));
	
			
	it('generates operation text', function() {
		var $text = $injectr.get('$text');
		expect(Op.Add.getText($text)).toBe('Addition');
		expect(Op.Sub.getText($text)).toBe('Subtraction');
		expect(Op.Mul.getText($text)).toBe('Multiplication');
		expect(Op.Div.getText($text)).toBe('Division');

		var $op = $injectr.get('$op');
		expect($op.Add.text()).toBe('Addition');
		expect($op.Sub.text()).toBe('Subtraction');
		expect($op.Mul.text()).toBe('Multiplication');
		expect($op.Div.text()).toBe('Division');
	});
});
