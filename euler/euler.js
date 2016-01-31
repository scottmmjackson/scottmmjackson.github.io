'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = euler;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function euler(diffeq) {
	var hStep = arguments.length <= 1 || arguments[1] === undefined ? 0.1 : arguments[1];
	var tInitial = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	var yInitial = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	var tFinal = arguments.length <= 4 || arguments[4] === undefined ? 1 : arguments[4];

	var eq = diffeq;
	if (typeof diffeq !== 'function') {
		if ((typeof diffeq === 'undefined' ? 'undefined' : _typeof(diffeq)) === 'object' && diffeq.hasOwnProperty('eval') && typeof diffeq.eval === 'function') {
			eq = function eq(y, t) {
				return diffeq.eval({
					y: y,
					t: t
				});
			};
		} else {
			throw new Error('type of diffeq must be a javascript function or a mathjs expression');
		}
	}

	var eulerArray = [];
	var y = yInitial;
	var yPrime = undefined;
	for (var t = tInitial; t <= tFinal; t += hStep) {
		// first step is special because we have a yInitial
		if (t !== tInitial) {
			y = y + hStep * yPrime;
		}
		yPrime = eq(y, t);
		eulerArray.push([t, y, yPrime]);
	}
	return eulerArray;
}