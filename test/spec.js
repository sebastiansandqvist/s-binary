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

	it('should convert integer (base 10) to binary', function() {
		expect(binary.toBinary(10)).to.equal('1010');
		expect(binary.toBinary(255)).to.equal('11111111');
	});

});

describe('arithmetic', function() {

	it('should add two binary numbers', function() {
		expect(binary.add('1010', '1')).to.equal('1011');
		expect(binary.add('11111111', '1')).to.equal('100000000');
	});

	it('should add two bits', function() {
		
		expect(binary.addBits('0', '0')).to.deep.equal({
			sum: '0',
			carry: '0'
		});

		expect(binary.addBits('0', '1')).to.deep.equal({
			sum: '1',
			carry: '0'
		});

		expect(binary.addBits('1', '0')).to.deep.equal({
			sum: '1',
			carry: '0'
		});

		expect(binary.addBits('1', '1')).to.deep.equal({
			sum: '0',
			carry: '1'
		});

	});

	// it('should also add two binary numbers', function() {

	// 	expect(binary.add2('0', '0')).to.equal('0')
	// 	expect(binary.add2('01', '00')).to.equal('01')
	// 	expect(binary.add2('01', '10')).to.equal('11')
	// 	expect(binary.add2('01', '0')).to.equal('01')
	// 	expect(binary.add2('1', '1')).to.equal('10')

	// });

	it('should perform two\'s complement');

});

describe('etc', function() {

	it('should pad binary values', function() {
		expect(binary.pad('0111', 8)).to.equal('00000111');
		expect(binary.pad('0111', 2)).to.equal('0111');
		expect(binary.pad('11111111', 16)).to.equal('0000000011111111');
	});

});