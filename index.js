'use strict';

// ----------------------------------------------------------------------
// ----- main exported object
//		includes:
//		1. unit conversions
//		2. arithmetic functions
//		3. logical operators
//		4. helper methods
// ----------------------------------------------------------------------

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
	};
};

binary.multiply = function(a, b) {
	a = parseInt(a, 2);
	b = parseInt(b, 2);
	return (a * b).toString(2);
};

binary.divide = function(a, b) {
	a = parseInt(a, 2);
	b = parseInt(b, 2);
	return (a / b).toString(2);
};


// ----- logic
// ---------------------------------------
binary.not = function(str) {
	var inverse = '';
	for (var i = 0; i < str.length; i++) {
		inverse += str[i] === '1' ? '0' : '1';
	}
	return inverse;
};

binary.and = function(a, b) {

	var eq = binary.equalize(a, b);
	a = eq[0];
	b = eq[1];

	var result = '';

	for (var i = 0; i < a.length; i++) {
		if (a[i] === b[i]) {
			result += a[i];
		}
		else {
			result += '0';
		}
	}

	return result;

};

binary.or = function(a, b) {

	var eq = binary.equalize(a, b);
	a = eq[0];
	b = eq[1];

	var result = '';

	for (var i = 0; i < a.length; i++) {
		if (a[i] === '1' || b[i] === '1') {
			result += '1';
		}
		else {
			result += '0';
		}
	}

	return result;

};

binary.nand = function(a, b) {
	var and = binary.and(a, b);
	return binary.not(and);
};

binary.nor = function(a, b) {
	var or = binary.or(a, b);
	return binary.not(or);
};

binary.xor = function(a, b) {

	var eq = binary.equalize(a, b);
	a = eq[0];
	b = eq[1];

	var result = '';

	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			result += '1';
		}
		else {
			result += '0';
		}
	}

	return result;

};

binary.complement = function(str) {
	var inverse = binary.not(str);
	var complement = binary.add(inverse, 1);
	return binary.pad(complement, str.length);
};


// ----- etc
// ---------------------------------------
binary.pad = function(str, n) {
	while (str.length < n) {
		str = '0' + str;
	}
	return str;
};

binary.equalize = function(a, b) {

	var aLen = a.length;
	var bLen = b.length;

	if (aLen > bLen) {
		b = binary.pad(b, aLen);
	}

	if (bLen > aLen) {
		a = binary.pad(a, bLen);
	}

	return [a, b];

};