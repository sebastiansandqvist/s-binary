import test from 'ava';
import binary from '../';

test('convert:should convert binary to integer (base 10)', (t) => {
  t.is(binary.toInt('1010'), 10);
  t.is(binary.toInt('00000001'), 1);
  t.is(binary.toInt('10000001'), 129);
  t.is(binary.toInt('11111111'), 255);
});

test('convert:should convert binary to hex', (t) => {
  t.is(binary.toHex('1010'), 'a');
  t.is(binary.toHex('11001100'), 'cc');
});

test('convert:should convert integer (base 10) to binary', (t) => {
  t.is(binary.toBinary(10), '1010');
  t.is(binary.toBinary(255), '11111111');
});

test('convert:should convert integer to binary with given length', (t) => {
  t.is(binary.toBinary(10, 8), '00001010');
  t.is(binary.toBinary(255, 8), '11111111');
});

test.todo('should convert binary to base64'); /* , (t) => {
  t.is(binary.toBase64('11111111'), 'MjU1');
});*/

test('convert:should convert strings to binary', (t) => {
  t.is(binary.toBinary('test'), '01110100011001010111001101110100');
  t.is(binary.toBinary('hi'), '0110100001101001');
});

test('convert:should convert buffers to binary', (t) => {
  var buf = new Buffer(2);
  buf.write('hi');
  t.is(binary.toBinary(buf), '0110100001101001');
});

test('convert:should convert binary to unicode', (t) => {
  var testStr = '01110100011001010111001101110100';
  var hi = '0110100001101001';
  t.is(binary.toUnicode(testStr), 'test');
  t.is(binary.toUnicode(hi), 'hi');
});

test('arithmetic: should add two binary numbers', (t) => {
  t.is(binary.add('1010', '1'), '1011');
  t.is(binary.add('11111111', '1'), '100000000');
});

test('arithmetic: should add two bits', (t) => {
  t.deepEqual(binary.addBits('0', '0'), ['0', '0']);
  t.deepEqual(binary.addBits('0', '1'), ['1', '0']);
  t.deepEqual(binary.addBits('1', '0'), ['1', '0']);
  t.deepEqual(binary.addBits('1', '1'), ['0', '1']);
});

test('arithmetic: should restrict addition to a given number of bits', (t) => {
  t.is(binary.add('0', '0', 4), '0000');
  t.is(binary.add('0', '1', 4), '0001');
  t.is(binary.add('1', '0', 4), '0001');
  t.is(binary.add('1', '1', 4), '0010');

  t.is(binary.add('10', '0', 4), '0010');
  t.is(binary.add('10', '1', 4), '0011');
  t.is(binary.add('11', '0', 4), '0011');
  t.is(binary.add('11', '1', 4), '0100');

  t.is(binary.add('0', '10', 4), '0010');
  t.is(binary.add('0', '11', 4), '0011');
  t.is(binary.add('1', '10', 4), '0011');
  t.is(binary.add('1', '11', 4), '0100');

  t.is(binary.add('00', '00', 4), '0000');
  t.is(binary.add('00', '01', 4), '0001');
  t.is(binary.add('00', '10', 4), '0010');
  t.is(binary.add('00', '11', 4), '0011');
  t.is(binary.add('01', '00', 4), '0001');
  t.is(binary.add('01', '01', 4), '0010');
  t.is(binary.add('01', '10', 4), '0011');
  t.is(binary.add('01', '11', 4), '0100');
  t.is(binary.add('10', '00', 4), '0010');
  t.is(binary.add('10', '01', 4), '0011');
  t.is(binary.add('10', '10', 4), '0100');
  t.is(binary.add('10', '11', 4), '0101');
  t.is(binary.add('11', '00', 4), '0011');
  t.is(binary.add('11', '01', 4), '0100');
  t.is(binary.add('11', '10', 4), '0101');
  t.is(binary.add('11', '11', 4), '0110');
});

test('arithmetic: should multiply two binary numbers', (t) => {
  t.is(binary.multiply('0', '0'), '0');
  t.is(binary.multiply('1', '0'), '0');
  t.is(binary.multiply('1', '1'), '1');
  t.is(binary.multiply('10', '10'), '100');
  t.is(binary.multiply('1010', '10'), '10100');
  t.is(binary.multiply('1010', '-10'), '-10100');
});

test('arithmetic: should divide two binary numbers', (t) => {
  t.is(binary.divide('1', '0'), 'Infinity');
  t.is(binary.divide('0', '1'), '0');
  t.is(binary.divide('1010', '1'), '1010');
  t.is(binary.divide('1010', '101'), '10'); // 10 / 5 = 2
  t.true(binary.divide('100', '11').indexOf('.') > -1); // decimal :(
  t.is(binary.divide('100', '-1'), '-100'); // should use two's compl. instead?
});

test.todo('arithmetic: division without decimals');

test('logic:NOT', (t) => {
  t.is(binary.not('1010'), '0101');
  t.is(binary.not('0000000011111111'), '1111111100000000');
});

test('logic:AND', (t) => {
  t.is(binary.and('0000', '1111'), '0000');
  t.is(binary.and('1101', '1111'), '1101');
  t.is(binary.and('0', '1111'), '0000');
  t.is(binary.and('101', '1010'), '0000');
});

test('logic:NAND', (t) => {
  t.is(binary.nand('0000', '1111'), '1111');
  t.is(binary.nand('1101', '1111'), '0010');
  t.is(binary.nand('101', '1010'), '1111');
});

test('logic:OR', (t) => {
  t.is(binary.or('0000', '1111'), '1111');
  t.is(binary.or('1101', '1001'), '1101');
  t.is(binary.or('0', '1111'), '1111');
  t.is(binary.or('101', '1010'), '1111');
});

test('logic:NOR', (t) => {
  t.is(binary.nor('0000', '1111'), '0000');
  t.is(binary.nor('1101', '1001'), '0010');
  t.is(binary.nor('0', '1111'), '0000');
  t.is(binary.nor('101', '1010'), '0000');
});

test('logic:XOR', (t) => {
  t.is(binary.xor('0000', '1111'), '1111');
  t.is(binary.xor('1101', '1001'), '0100');
  t.is(binary.xor('0', '1111'), '1111');
  t.is(binary.xor('101', '1010'), '1111');
});

test('logic:two\'s complement', (t) => {
  t.is(binary.complement('00000001'), '11111111');
  t.is(binary.complement('00000101'), '11111011');
  t.is(binary.complement('11111011'), '00000101');
  t.is(binary.complement('1010110'), '0101010'); // 7 bit
  t.is(binary.complement('10000000'), '10000000'); // -128
});

test('util:equalize', (t) => {
  t.deepEqual(binary.equalize('000', '1111'), ['0000', '1111']);
  t.deepEqual(binary.equalize('0000', '111'), ['0000', '0111']);
});

test('util:pad', (t) => {
  t.is(binary.pad('0111', 8), '00000111');
  t.is(binary.pad('0111', 2), '0111');
  t.is(binary.pad('11111111', 16), '0000000011111111');
});

test('util:split', (t) => {
  t.deepEqual(binary.split('1011', 2), ['10', '11']);
  t.deepEqual(binary.split('10111', 3), ['101', '11']);
  t.deepEqual(binary.split('1111111100000000'), ['11111111', '00000000']);
});

test('util:lsb', (t) => {
  var arr = binary.split(binary.toBinary('this is a test'), 8);
  t.is(binary.lsb(arr), '00110110100110');
});

