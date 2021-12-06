const fs = require('fs');

const getInput = () => {
	const input = fs.readFileSync('./day1input.txt', 'utf-8');
	const lines = input.split('\n');
	return lines;
}

const day1 = () => {
	const input = (getInput());
	const directions = input.map((val, index) => {
		if (index === 0) {
			return 'NA';
		}
		if (val > input[index-1]) {
			return 'INCREASE';
		}
		if (val < input[index-1]) {
			return 'DECREASE';
		}
	})
	console.log(directions.filter(x => x === 'INCREASE').length)

}


const day1dash2 = () => {
	const input = (getInput());
	const sums = input.map((val, index) => {
		if (index < 2) {
			return 'NA';
		}
		return Number(val) + Number(input[index - 1]) + Number(input[index - 2])
	}).filter(v => v !== 'NA')

	let increased = 0;
	for (let i = 1; i < sums.length; i++) {
		if (sums[i] > sums[i-1]) {
			increased++;
		}
	}
	console.log('a', increased)

	const directions = sums.map((val, index) => {
		if (index === 0) {
			return 'NA';
		}
		if (val > sums[index-1]) {
			return 'INCREASE';
		}
		if (val < sums[index-1]) {
			return 'DECREASE';
		}
	})
	console.log(directions.filter(x => x === 'INCREASE').length)

}

day1dash2();
