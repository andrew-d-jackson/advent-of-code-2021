const fs = require('fs');


const getInput = () => {
	const input = fs.readFileSync('./day6input.txt', 'utf-8');
	const lines = input.split(',');
	return lines.map(n => Number(n));
}


const cache = {};

const getFishForNumberAndRemaningDays = (fishNumber, remaningDays) => {
	const cacheKey = `${fishNumber}-${remaningDays}`
	if (cache[cacheKey]) {
		return cache[cacheKey];
	}
	let daysWillProduce = [];
	for (let i = 0; i <= remaningDays; i++) {
		if (fishNumber - i === -1 || (fishNumber - i < -3 && Math.abs(fishNumber - i) % 7 === 1)) {
			daysWillProduce.push(remaningDays - i);
		}
	}
	const baseAdd = daysWillProduce.length;
	const others = daysWillProduce.map(d => getFishForNumberAndRemaningDays(8, d));
	const total = baseAdd + others.reduce((a, b) => a + b, 0);
	cache[cacheKey] = total;
	return total;
}


const day6 = () => {
	const input = getInput();
	let x = input.map(i => getFishForNumberAndRemaningDays(i, 256)).reduce((a, b) => a + b);
	console.log(x + input.length);
	
}

day6();
