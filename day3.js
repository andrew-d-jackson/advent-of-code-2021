const fs = require('fs');


const getInput = () => {
	const input = fs.readFileSync('./day3input.txt', 'utf-8');
	const lines = input.split('\n');
	return lines;
}

const day3 = () => {
	const input = (getInput());
	const start = Array.from(Array(input[0].length)).map(c => ({'0': 0, '1': 0}));

	const output = input.reduce((count, input) => {
		return count.map((c, i) => {
			return {
				'0': input[i] === '0' ? c['0'] + 1 : c['0'],
				'1': input[i] === '1' ? c['1'] + 1 : c['1'],
			}
		})
	}, start);
	console.log(output);
	const commonBits = output.map(o => o['0'] > o['1'] ? 0 : 1);
	const unCommonBits = output.map(o => o['0'] < o['1'] ? 0 : 1);
	console.log(commonBits);
	console.log(unCommonBits);
	const commonNum = parseInt(commonBits.join(''), 2);
	const uncommonNum = parseInt(unCommonBits.join(''), 2);
	console.log(commonNum);
	console.log(uncommonNum);

	console.log(commonNum * uncommonNum);

}

const day3pt2 = () => {
	const input = (getInput());
	/*const input = 
		["00100",
		"11110",
		"10110",
		"10111",
		"10101",
		"01111",
		"00111",
		"11100",
		"10000",
		"11001",
		"00010",
		"01010"]*/
	
	const start = Array.from(Array(input[0].length)).map(c => ({'0': 0, '1': 0}));

	let comNum;
	let uncomNum;

	let currentVals = input;
	for (let pos = 0; pos < input[0].length; pos++) {
		const output = currentVals.reduce((count, input) => {
			return count.map((c, i) => {
				return {
					'0': input[i] === '0' ? c['0'] + 1 : c['0'],
					'1': input[i] === '1' ? c['1'] + 1 : c['1'],
				}
			})
		}, start);
		const commonBit = output[pos]['0'] > output[pos]['1'] ? '0' : '1'; 
		currentVals = currentVals.filter(cv => {
			if (commonBit === '0') {
				return cv[pos] === '0';
			} else {
				return cv[pos] === '1';
			}
		})
		if (currentVals.length === 1) {
			console.log('done', currentVals);
			comNum=currentVals[0];
		}

	}

	currentVals = input;
	for (let pos = 0; pos < input[0].length; pos++) {
		const output = currentVals.reduce((count, input) => {
			return count.map((c, i) => {
				return {
					'0': input[i] === '0' ? c['0'] + 1 : c['0'],
					'1': input[i] === '1' ? c['1'] + 1 : c['1'],
				}
			})
		}, start);
		const commonBit = output[pos]['1'] < output[pos]['0'] ? '1' : '0'; 
		currentVals = currentVals.filter(cv => {
			if (commonBit === '0') {
				return cv[pos] === '0';
			} else {
				return cv[pos] === '1';
			}
		})
		if (currentVals.length === 1) {
			console.log('done', currentVals);
			uncomNum=currentVals[0];
		}

	}

	console.log(comNum, uncomNum);
	const commonNum = parseInt(comNum, 2);
	const uncommonNum = parseInt(uncomNum, 2);
	console.log(commonNum, uncommonNum);
	console.log(commonNum * uncommonNum);


}


day3pt2();
