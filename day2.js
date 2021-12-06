const fs = require('fs');


const getInput = () => {
	const input = fs.readFileSync('./day2input.txt', 'utf-8');
	const lines = input.split('\n');
	return lines;
}


const myFn = () => {
	return ["Error", "Somethign went wrong"]
	return ["Success", "52"]
}

const day2 = () => {
	const input = (getInput());

	const output = input.reduce((depthInfo, input) => {
		const [command, amount] = input.split(' ');

		console.log()
		if (command === 'forward') {
			return {
				...depthInfo,
				pos: depthInfo.pos + Number(amount),
				depth: depthInfo.depth + (Number(amount) * depthInfo.aim)
			}
		}
		if (command === 'down') {
			return {
				...depthInfo,
				aim: depthInfo.aim + Number(amount)
			}
		}
		if (command === 'up') {
			return {
				...depthInfo,
				aim: depthInfo.aim - Number(amount)
			}

		}
	}, { depth: 0, pos: 0, aim: 0 })

	console.log(output);
	console.log(output.depth * output.pos);
}

day2();
