# s-binary

## Work in progress

[![NPM version](https://img.shields.io/npm/v/s-binary.svg)](https://www.npmjs.com/package/s-binary) ![Dependencies](https://img.shields.io/david/sebastiansandqvist/s-binary.svg) [![build status](http://img.shields.io/travis/sebastiansandqvist/s-binary.svg)](https://travis-ci.org/sebastiansandqvist/s-binary) [![NPM license](https://img.shields.io/npm/l/s-binary.svg)](https://www.npmjs.com/package/s-binary) ![Stability](https://img.shields.io/badge/stability-unstable-orange.svg)

## Usage example
```javascript
var binary = require('s-binary');

binary.toInt('11001100'); // returns 204

// 8bit 5 - 9
var five = binary.toBinary(5, 8); // '00000101'
var nine = binary.toBinary(9, 8); // '00001001'
var negativeNine = binary.complement(nine); // '11110111'
var sum = binary.add(five, negativeNine); // '11111100'
var checkAnswer = binary.complement(sum); // '00000100'

binary.toInt(checkAnswer); // 4
```

## Installation
```bash
npm install --save s-binary
```

## Available methods
*This module assumes big-endian byte order*

### Unit conversion
##### binary to integer
```javascript
binary.toInt('11001100'); // returns 204
```

##### binary to hex
```javascript
binary.toHex('11001100'); // returns 'cc'
```

##### binary to Unicode
```javascript
binary.toUnicode('0110100001101001'); // returns 'hi'
```

##### string/integer/buffer to binary
```javascript
binary.toBinary(204); // returns '11001100'
binary.toBinary('foo'); // returns '011001100110111101101111'
```

### Arithmetic
##### Simple addition
```javascript
binary.add('111', '1'); // returns '1000'
```

##### Bit addition
```javascript
binary.addBits('1', '1'); // returns ['0', '1']
// ------------------------------- sum ^ -- ^ carry
```

##### Multiplication
```javascript
binary.multiply('1010', '10'); // returns '10100'
//            10 ^     2 ^              20 ^
```

##### Division
```javascript
binary.divide('1010', '101'); // returns '10'
//          10 ^     5 ^                2 ^
```

### Logic
##### NOT
```javascript
binary.not('1011'); // returns '0100'
```

##### AND
```javascript
binary.and('101', '110'); // returns '100'
```
##### OR
```javascript
binary.or('101', '110'); // returns '111'
```

##### XOR
```javascript
binary.xor('101', '110'); // returns '011'
```

##### NAND
```javascript
binary.nand('101', '110'); // returns '011'
```

##### NOR
```javascript
binary.nor('101', '110'); // returns '000'
```

##### Two's complement
```javascript
binary.complement('00000101'); // returns '11111011'
```

### Helper methods
##### (Left) pad
```javascript
binary.pad('01', 4); // returns '0001' (left pad)
```

##### Equalize lengths by padding shorter value
```javascript
binary.equalize('11', '0001'); // returns ['0011', '0001']
```

##### Split
```javascript
binary.split('1111111100000000', 8); // returns ['11111111', '00000000']
```

##### LSB (get least significant bits)
*Last bit from each byte. Note: bytes can be of any length.*
```javascript
var data = ['01000100', '11001100', '01010101'];
binary.lsb(data); // returns '001'
```
