// ----- dependencies
// ---------------------------------------
require('blanket')({
    pattern: function (filename) {
        return !/node_modules/.test(filename);
    }
});

var expect = require('chai').expect;
var binary = require('../index.js');


// ----- tests
// ---------------------------------------
describe('unit conversion', function() {

	it('should convert binary to integer (base 10)', function() {
		expect(binary.toInt('1010')).to.equal(10);
		expect(binary.toInt('00000001')).to.equal(1);
		expect(binary.toInt('10000001')).to.equal(129);
		expect(binary.toInt('11111111')).to.equal(255);
	});

	it('should convert binary to hex', function() {
		expect(binary.toHex('1010')).to.equal('a')
		expect(binary.toHex('11001100')).to.equal('cc')
	});

});