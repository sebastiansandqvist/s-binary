var binary = module.exports = {};

binary.toInt = function(str) {
	return parseInt(str, 2);
};

binary.toHex = function(str) {
	return parseInt(str, 2).toString(16);
};