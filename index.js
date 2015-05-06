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


// @param n {Number | String | Buffer} input
// @return {String} 8bit binary conversion
// todo: get more test cases & verify
binary.toBinary = function(n) {

	var type = Object.prototype.toString.call(n)

	switch (type) {

		case '[object Number]':
			return n.toString(2);

		default: // strings and buffers

			var output = '';
		
			for (var i = 0; i < n.length; i++) {
		
				var cur = typeof n[i] === 'number' ?
					binary.pad(n[i].toString(2), 8) // buffers
					: binary.pad(n.charCodeAt(i).toString(2), 8); // strings
		
				output += cur;

			}

			return output;

	}

};


// ----- arithmetic
// ---------------------------------------

// @param a {String} binary number
// @param b {String} binary number
// todo: @param n {Number} optional bitLength restriction
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

// @param a {String} binary number
// @param b {String} binary number
// todo: @param n {Number} optional bitLength restriction
binary.multiply = function(a, b) {
	a = parseInt(a, 2);
	b = parseInt(b, 2);
	return (a * b).toString(2);
};

// @param a {String} binary number
// @param b {String} binary number
// todo: @param n {Number} optional bitLength restriction
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

// @param str {String} binary string
// @param n {Number} length of output
// @return {String} left-padded binary string
binary.pad = function(str, n) {
	while (str.length < n) {
		str = '0' + str;
	}
	return str;
};

// @param str {String} binary string
// @param n {Number} length of output
// @param fn {Function} callback
// @return {Function} callback(err, result)
binary.padSafe = function(str, n, fn) {

	while (str.length < n) {
		str = '0' + str;
	}

	if (str.length > n) {
		var err = new Error('input length exceeds expected length of output');
		return fn(err, str);
	}

	return fn(null, str);

};

// @param a {String} binary string
// @param b {String} binary string
// @return {Array} [(padded) a, (padded) b]
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

// @param str {String} binary string
// @param length {Number} number of characters per chunk
// @return {Array}
binary.split = function(str, length) {
	var regex = new RegExp('.{1,' + length + '}', 'g'); // /.{1,8}/g
	return str.match(regex);
};