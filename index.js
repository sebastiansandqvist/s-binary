// ----------------------------------------------------------------------
//  includes:
//  1. unit conversions
//  2. arithmetic functions
//  3. logical operators
//  4. helper methods
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

// binary.toBase64 = function(str) {
//  str = parseInt(str, 2).toString();
//  var buf = new Buffer(str);
//  return buf.toString('base64');
// };

// @param n {Number | String | Buffer} input
// @param len? {Number} optional bitlength restriction
// @return {String} 8bit binary conversion
binary.toBinary = function(n, len) {
  var type = Object.prototype.toString.call(n);

  if (type === '[object Number]') {
    if (len) return binary.pad(n.toString(2), len);
    return n.toString(2);
  }

  var output = '';

  for (var i = 0; i < n.length; i++) {
    var cur = typeof n[i] === 'number' ?
      binary.pad(n[i].toString(2), 8) // buffers
      : binary.pad(n.charCodeAt(i).toString(2), 8); // strings

    output += cur;
  }

  return output;
};


// @param str {String} binary string
// @return {String} Unicode string
binary.toUnicode = function(str) {
  var arr = binary.split(str);
  var output = '';

  for (var i = 0, len = arr.length; i < len; i++) {
    var integer = binary.toInt(arr[i]);
    output += String.fromCharCode(integer);
  }

  return output;
};


// ----- arithmetic
// ---------------------------------------

// @param a {String} binary number
// @param b {String} binary number
// @param len? {Number} optional bitLength restriction
binary.add = function(a, b, len) {
  if (!len) {
    a = parseInt(a, 2);
    b = parseInt(b, 2);
    return (a + b).toString(2);
  }

  a = binary.pad(a, len);
  b = binary.pad(b, len);

  var result = '';
  var carry = '0';

  for (var i = len - 1; i >= 0; i--) {
    var and = binary.and(a[i], b[i]);
    var xor = binary.xor(a[i], b[i]);
    var sum = binary.xor(xor, carry);
    result = sum + result;
    carry = binary.or(and, binary.and(xor, carry));
  }

  return result;
};

binary.addBits = function(a, b) {
  a = a === '1' ? 1 : 0;
  b = b === '1' ? 1 : 0;

  var sum = a ^ b;
  var carry = a & b;

  return [sum.toString(), carry.toString()];
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
    if (a[i] === b[i]) result += a[i];
    else result += '0';
  }

  return result;
};

binary.or = function(a, b) {
  var eq = binary.equalize(a, b);
  a = eq[0];
  b = eq[1];

  var result = '';

  for (var i = 0; i < a.length; i++) {
    if (a[i] === '1' || b[i] === '1') result += '1';
    else result += '0';
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

// http://jsperf.com/bitwise-vs-string-operations
binary.xor = function(a, b) {
  var eq = binary.equalize(a, b);
  a = eq[0];
  b = eq[1];

  var result = '';

  for (var i = 0; i < a.length; i++) {
    if (a[i] === b[i]) result += '0';
    else result += '1';
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
  while (str.length < n) str = '0' + str;
  return str;
};

// @param a {String} binary string
// @param b {String} binary string
// @return {Array} [(padded) a, (padded) b]
binary.equalize = function(a, b) {
  var aLen = a.length;
  var bLen = b.length;

  if (aLen > bLen) b = binary.pad(b, aLen);
  if (bLen > aLen) a = binary.pad(a, bLen);
  return [a, b];
};

// @param str {String} binary string
// @param len? {Number} optional number of characters per chunk; default is 8
// @return {Array}
binary.split = function(str, len) {
  if (!len) len = 8;
  var regex = new RegExp('.{1,' + len + '}', 'g'); // /.{1,8}/g
  return str.match(regex);
};

// @param arr {Array} array of equal length binary strings
// @return {String} least significant bits
binary.lsb = function(arr) {
  var output = '';

  for (var i = 0, len = arr.length; i < len; i++) {
    var byteLength = arr[i].length;
    var bit = arr[i][byteLength - 1];
    var out = bit === '0' ? '0' : '1';
    output += out;
  }

  return output;
};
