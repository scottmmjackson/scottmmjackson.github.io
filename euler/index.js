import euler from './euler.js';
import eulerHtml from './euler.html!text';
import d3 from 'd3';
import mathjs from 'mathjs';

export default function bindEulerDemo(selector) {
	selector.innerHTML = eulerHtml;
	document.getElementById('eulerSubmit').addEventListener('click', () => {
		const output = document.getElementById('eulerOutput');
		output.innerHTML = '';
		const spinner = document.getElementById('eulerSpinner')
		spinner.style.display = 'inline-block';
		new Promise((resolve, reject) => {
			const diffEqString = document.getElementById('diffEq').value;

			if(!diffEqString) { 
				throw new Error('Please input a valid equation');
			}

			const diffEqFunc = mathjs.parse(diffEqString).compile();
			console.log(diffEqFunc);

			const step = parseFloat(document.getElementById('step').value);
			const tInitial = parseFloat(document.getElementById('tInitial').value);
			const yInitial = parseFloat(document.getElementById('yInitial').value);
			const tFinal = parseFloat(document.getElementById('tFinal').value);

			resolve(euler(diffEqFunc,step,tInitial,yInitial,tFinal));
		}).then((data) => {
			setTimeout(() => {
				document.getElementById('eulerSpinner').style.display = 'none';
				// d3 business logic
				const columns = ['t', 'y(t)', "y'(t)"];
				const outputTable = d3.select(output)
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
						.append('td').text(d => d.toPrecision(7));
			},50);
		}).catch((e) => {
			output.innerHTML = `${e}`;
		});
	});
}
