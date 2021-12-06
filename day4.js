const fs = require('fs');


const getInput = () => {
	const input = fs.readFileSync('./day4input.txt', 'utf-8');
	const lines = input.split('\n');
	return lines;
}

const parseInput = () => {
	const [numbersInput,, ...input] = (getInput());
	const numbers = numbersInput.split(',').map(n => Number(n));
	let cards = [];
	let currentCard = [];
	input.forEach((line) => {
		if (line) {
		      currentCard = [...currentCard, line.split(' ').filter(x => !!x).map(n => Number(n))]
		} else {
		      cards = [...cards, currentCard];
		      currentCard = [];
		}
	});
	cards = [...cards, currentCard];
	currentCard = [];
	return [numbers, cards];

}

const rotate = (array) => array[0].map((_, colIndex) => array.map(row => row[colIndex]));

                       // card, numbers[]
const doesCardHaveLine = (card, numbersToCheck) => {
	for (let rowIndex = 0; rowIndex < card.length; rowIndex++) {
		const row = card[rowIndex];
		const hasNonMatching = row.map((val) => numbersToCheck.includes(val)).filter(x => !x).length;
		if (!hasNonMatching) {
			return { found: true, row: row};
		}
	}

	const roatated = rotate(card);

	for (let colIndex = 0; colIndex < roatated.length; colIndex++) {
		const col = roatated[colIndex];
		const hasNonMatching = col.map((val) => numbersToCheck.includes(val)).filter(x => !x).length;
		if (!hasNonMatching) {
			return { found: true, col: col};
		}
	}

	return { found: false };
}

const getFirstMatch = (numbers, cards) => {
  for (let numberIndex = 0; numberIndex < numbers.length; numberIndex++) {
	for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
		const result = doesCardHaveLine(cards[cardIndex], numbers.slice(0, numberIndex));
		if (result.found) {
			return {result, cardIndex, card: cards[cardIndex], number: numbers[numberIndex-1], numbers: numbers.slice(0, numberIndex)};
		}
	}
  }
}


const day4 = () => {
	const [numbers, cards] = parseInput();
	let cardsCurrent = cards;
	let result;
	for(let i = 0; i < cards.length; i++) {
		result = getFirstMatch(numbers, cardsCurrent);
		console.log(result);
		cardsCurrent = cardsCurrent.filter((_, i) => i !== result.cardIndex);
	}
	const cardNumbers = result.card.flat();
	const unused = cardNumbers.filter(n => !result.numbers.includes(n));
	console.log(unused);
	const total = unused.reduce((a, b) => a + b, 0);
	console.log(total * result.number);

}

day4();
