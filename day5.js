const fs = require('fs');


const getInput = () => {
	const input = fs.readFileSync('./day5input.txt', 'utf-8');
	const lines = input.split('\n');
	return lines;
}

const parseVent = (input) => {
	const [sp, ep] = input.split(' -> ');
	const start = sp.split(',').map(n => Number(n));
	const end = ep.split(',').map(n => Number(n));
	const point = ({
		startX: start[0],
		startY: start[1],
		endX: end[0],
		endY: end[1],
	});
	point.isVertical = point.startX === point.endX;
	point.isHorizontal = point.startY === point.endY;

	if (point.isVertical) {
		let start = Math.min(point.startY, point.endY);
		const end = Math.max(point.startY, point.endY);
		let points = [];
		for (; start <= end; start++) {
			points.push([point.startX, start]);
		}
		point.points = points;
	}

	if (point.isHorizontal) {
		let start = Math.min(point.startX, point.endX);
		const end = Math.max(point.startX, point.endX);
		let points = [];
		for (; start <= end; start++) {
			points.push([start, point.startY]);
		}
		point.points = points;
	}


	if (!point.isHorizontal && !point.isVertical) {
		let xDir = point.startX > point.endX ? -1 : 1;
		let yDir = point.startY > point.endY ? -1 : 1;

		let points = [];
		for (let i = 0; true; i++) {
			points.push([point.startX+(i*xDir), point.startY+(i*yDir)]);
			if (point.startX+(i*xDir) === point.endX && point.startY+(i*yDir) === point.endY) {
				point.points = points;
				return point; 
			}
		}
		point.points = points;
	}

	return point;
}

const day5 = () => {
	const input = getInput();
	const parsed = input.map(parseVent);
	console.log(1);

	const rows = parsed.filter(p => p.points).map(p => p.points);
	let points = [];
	let overlappingPoints = [];
	let overlaps = 0;
	rows.map(row => row.forEach(p => {
		const s = JSON.stringify(p);
		if (points.includes(s) && !overlappingPoints.includes(s)) {
			overlaps++;
			overlappingPoints.push(s);
		} else {
			points.push(s);
		}
	}));

	console.log(overlaps);
}

day5();
