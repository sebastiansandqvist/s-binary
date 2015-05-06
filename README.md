# s-binary 

## Work in progress

[![NPM version](https://img.shields.io/npm/v/s-binary.svg)](https://www.npmjs.com/package/s-binary) ![Dependencies](https://img.shields.io/david/sebastiansandqvist/s-binary.svg) [![build status](http://img.shields.io/travis/sebastiansandqvist/s-binary.svg)](https://travis-ci.org/sebastiansandqvist/s-binary) [![NPM license](https://img.shields.io/npm/l/s-binary.svg)](https://www.npmjs.com/package/s-binary) ![Stability](https://img.shields.io/badge/stability-unstable-orange.svg) [![Test Coverage](https://codeclimate.com/github/sebastiansandqvist/s-binary/badges/coverage.svg)](https://codeclimate.com/github/sebastiansandqvist/s-binary/coverage)

## Usage example
```javascript
var binary = require('s-binary');

binary.toInt('11001100'); // returns 204
```

## Installation
```bash
npm install --save s-binary
```

## Available methods

### Unit conversion
##### binary to integer
```javascript
binary.toInt('11001100'); // returns 204
```

##### binary to hex
```javascript
binary.toHex('11001100'); // returns 'cc'
```

##### integer to binary
```javascript
binary.toBinary(204); // returns '11001100'
```

### Arithmetic
##### Simple addition
```javascript
binary.add('111', '1'); // returns '1000'
```

##### Bit addition
```javascript
binary.addBits('1', '1'); // returns {sum: '0', carry: '1'}
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
```javascript
binary.pad('01', 4); // returns '0001' (left pad)
binary.equalize('11', '0001'); // returns ['0011', '0001']
```

## License
Copyright (c) 2015, Sebastian Sandqvist <s.github@sparque.me>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.