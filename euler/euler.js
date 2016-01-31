'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = euler;
function euler(diffeq) {
	var hStep = arguments.length <= 1 || arguments[1] === undefined ? 0.1 : arguments[1];
	var tInitial = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	var yInitial = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	var tFinal = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];

	if (typeof diffeq !== 'function') {
		throw new Error('type of diffeq must be a javascript function');
	}

	var eulerArray = [];
	var y = yInitial;
	var yPrime = undefined;
	for (var t = tInitial; t <= tFinal; t += hStep) {
		// first step is special because we have a yInitial
		if (t !== tInitial) {
			y = y + hStep * yPrime;
		}
		yPrime = diffeq(y, t);
		eulerArray.push([t, y, yPrime]);
	}
	return eulerArray;
}