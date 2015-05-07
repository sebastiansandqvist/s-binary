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

	// it('should convert binary to base64', function() {
	// 	expect(binary.toBase64('11111111')).to.equal('MjU1');
	// });

	it('should convert strings to binary', function() {
		expect(binary.toBinary('test')).to.equal('01110100011001010111001101110100');
		expect(binary.toBinary('hi')).to.equal('0110100001101001');
	});

	it('should convert buffers to binary', function() {
		var buf = new Buffer(2);
		buf.write('hi');
		expect(binary.toBinary(buf)).to.equal('0110100001101001');
	});

	it('should convert binary to unicode', function() {
		var test = '01110100011001010111001101110100';
		var hi = '0110100001101001';
		expect(binary.toUnicode(test)).to.equal('test');
		expect(binary.toUnicode(hi)).to.equal('hi');
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

	it('should restrict addition to a given number of bits');

	it('should subtract two binary numbers');

	it('should restrict subtraction to a given number of bits');

	it('should multiply two binary numbers', function() {
		expect(binary.multiply('0','0')).to.equal('0');
		expect(binary.multiply('1','0')).to.equal('0');
		expect(binary.multiply('1','1')).to.equal('1');
		expect(binary.multiply('10','10')).to.equal('100');
		expect(binary.multiply('1010','10')).to.equal('10100');
		expect(binary.multiply('1010','-10')).to.equal('-10100');
	});

	it('should divide two binary numbers', function() {
		expect(binary.divide('1', '0')).to.equal('Infinity');
		expect(binary.divide('0', '1')).to.equal('0');
		expect(binary.divide('1010', '1')).to.equal('1010');
		expect(binary.divide('1010', '101')).to.equal('10'); // 10 / 5 = 2
		expect(binary.divide('100', '11')).to.include('.'); // decimal :(
		expect(binary.divide('100', '-1')).to.equal('-100'); // should use two's compl. instead?
	});

	// it('should also add two binary numbers', function() {

	// 	expect(binary.add2('0', '0')).to.equal('0')
	// 	expect(binary.add2('01', '00')).to.equal('01')
	// 	expect(binary.add2('01', '10')).to.equal('11')
	// 	expect(binary.add2('01', '0')).to.equal('01')
	// 	expect(binary.add2('1', '1')).to.equal('10')

	// });


});


describe('logic', function() {

	it('NOT', function() {
		expect(binary.not('1010')).to.equal('0101');
		expect(binary.not('0000000011111111')).to.equal('1111111100000000');
	});

	it('AND', function() {
		expect(binary.and('0000', '1111')).to.equal('0000');
		expect(binary.and('1101', '1111')).to.equal('1101');
		expect(binary.and('0', '1111')).to.equal('0000');
		expect(binary.and('101', '1010')).to.equal('0000');
	});

	it('NAND', function() {
		expect(binary.nand('0000', '1111')).to.equal('1111');
		expect(binary.nand('1101', '1111')).to.equal('0010');
		expect(binary.nand('101', '1010')).to.equal('1111');
	});

	it('OR', function() {
		expect(binary.or('0000', '1111')).to.equal('1111');
		expect(binary.or('1101', '1001')).to.equal('1101');
		expect(binary.or('0', '1111')).to.equal('1111');
		expect(binary.or('101', '1010')).to.equal('1111');
	});

	it('NOR', function() {
		expect(binary.nor('0000', '1111')).to.equal('0000');
		expect(binary.nor('1101', '1001')).to.equal('0010');
		expect(binary.nor('0', '1111')).to.equal('0000');
		expect(binary.nor('101', '1010')).to.equal('0000');
	});

	it('XOR', function() {
		expect(binary.xor('0000', '1111')).to.equal('1111');
		expect(binary.xor('1101', '1001')).to.equal('0100');
		expect(binary.xor('0', '1111')).to.equal('1111');
		expect(binary.xor('101', '1010')).to.equal('1111');
	});

	it('should perform two\'s complement', function() {
		expect(binary.complement('00000101')).to.equal('11111011');
		expect(binary.complement('11111011')).to.equal('00000101');
		expect(binary.complement('1010110')).to.equal('0101010'); // 7 bit
		expect(binary.complement('10000000')).to.equal('10000000'); // -128
	});

});


describe('etc', function() {

	it('equalize', function() {
		expect(binary.equalize('000', '1111')).to.deep.equal(['0000', '1111']);
		expect(binary.equalize('0000', '111')).to.deep.equal(['0000', '0111']);
	});

	it('pad', function() {
		expect(binary.pad('0111', 8)).to.equal('00000111');
		expect(binary.pad('0111', 2)).to.equal('0111');
		expect(binary.pad('11111111', 16)).to.equal('0000000011111111');
	});

	it('padSafe (normal)', function(done) {
		binary.padSafe('0111', 8, function(err, value) {
			expect(err).to.be.null;
			expect(value).to.equal('00000111')
			done();
		});
	});
	
	it('padSafe (error)', function(done) {
		binary.padSafe('0111', 2, function(err, value) {
			expect(err.message).to.include('input length exceeds expected length of output');
			expect(value).to.equal('0111');
			done();
		});
	});

	it('split', function() {
		expect(binary.split('1011', 2)).to.deep.equal(['10','11']);
		expect(binary.split('10111', 3)).to.deep.equal(['101','11']);
		expect(binary.split('1111111100000000')).to.deep.equal(['11111111', '00000000'])
	});

	it('lsb', function() {
		var arr = binary.split(binary.toBinary('this is a test'), 8);
		expect(binary.lsb(arr)).to.equal('00110110100110');
	});

});

/*describe('help', function() {
	it('helps', function() {
		var ten = binary.toBinary(10);
		var two = binary.toBinary(2);
		var ten_8bit = binary.pad(ten, 8);
		var two_8bit = binary.pad(two, 8);
		var twosComplement = binary.complement(two_8bit);
		var sum = binary.add(ten_8bit, twosComplement);
		// console.log(binary.subtract(ten, two));
		// binary.toInt(sum) === 8; // true :)

		// or just...
		// binary.subtract(ten, two); // 
	});
});*/