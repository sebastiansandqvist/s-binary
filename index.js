var binary = module.exports = {};

// ----- unit conversion
// ---------------------------------------
binary.toInt = function(str) {
	return parseInt(str, 2);
};

binary.toHex = function(str) {
	return parseInt(str, 2).toString(16);
};

binary.toBinary = function(n) {
	return n.toString(2);
};


// ----- arithmetic
// ---------------------------------------
binary.add = function(a, b) {
	a = parseInt(a, 2);
	b = parseInt(b, 2);
	return (a + b).toString(2);
};

binary.addBits = function(a, b) {
	a = a === '1' ? 1 : 0;
	b = b === '1' ? 1 : 0;

	var sum = a ^ b;
	var carry = a & b;

	return {
		sum: sum.toString(),
		carry: carry.toString()
	}
};

// binary.add2 = function(a, b) {

// 	var aLen = a.length;
// 	var bLen = b.length;

// 	if (aLen > bLen) {
// 		b = this.pad(b, aLen);
// 	}

// 	if (bLen > aLen) {
// 		a = this.pad(a, bLen);
// 	}

// 	var result = '';
// 	var tmp;
// 	var carry = '0';

// 	while (aLen > 0) {

// 		aLen--;

// 		tmp = this.addBits(a[aLen], b[aLen]);
// 		carry = tmp.carry || carry;
// 		tmp = this.addBits(tmp.sum, carry);

// 		result = tmp.sum + result;

// 	}

// 	return result;

// };

// ----- etc
// ---------------------------------------
binary.pad = function(str, n) {
	while (str.length < n) {
		str = '0' + str;
	}
	return str;
};