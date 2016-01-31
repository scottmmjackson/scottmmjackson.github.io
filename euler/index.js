import euler from './euler.js';
import eulerHtml from './euler.html!text';
import d3 from 'd3';

export default function bindEulerDemo(selector) {
	selector.innerHTML = eulerHtml;
	document.getElementById('eulerSubmit').addEventListener('click', function() {
		document.getElementById('eulerOutput').innerHTML = `<p>Output</p>`;
		let data;
		try {
			const diffEqString = document.getElementById('diffEq').value;
			if(!diffEqString) { 
				throw new Error('Please input a valid equation');
			}
			var diffEqFunc;
			// lol this is unsafe, but I don't want to program an equation parser today.
			eval('diffEqFunc = function(y,t) { return '+ diffEqString +'; }');

			const step = parseFloat(document.getElementById('step').value);
			const tInitial = parseFloat(document.getElementById('tInitial').value);
			const yInitial = parseFloat(document.getElementById('yInitial').value);
			const tFinal = parseFloat(document.getElementById('tFinal').value);

			data = euler(diffEqFunc,step,tInitial,yInitial,tFinal);
			console.log(data);
			} catch (e) {
			document.getElementById('eulerOutput').innerHTML = `${e}`;
			}
			const columns = ['t', 'y(t)', "y'(t)"];
			const outputTable = d3.select('#eulerOutput')
			  .append('table');
			outputTable.append('thead')
			  .append('tr')
				 .selectAll('th')
				 .data(columns)
				 .enter()
				 .append('th')
				 .text(c => c);
			outputTable.append('tbody')
			     .selectAll('tr')
			     	.data(data).enter()
			     	.append('tr')
				 .selectAll('td')
					.data(d => d).enter()
					.append('td').text(d => d);
	});
}
