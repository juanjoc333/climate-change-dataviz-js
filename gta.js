const colors = [
	'#d53e4f',
	'#f46d43',
	'#fdae61',
	'#fee08b',
	'#f6faaa',
	'#e6f598',
	'#abdda4',
	'#66c2a5',
	'#7ba5c7',
	'#a17bc7'
];

window.onload = async function() {
	const response = await fetch('./data/gta_data.json');
	const data = await response.json();

	createGraphic(data);
}

function createGraphic(data) {
	const dataTable = document.getElementById('data-table');
	createYearsRows(dataTable);
	setData(data);
	generateLegendFromColors(colors);
}

function createYearsRows(dataTable, data) {
	for (const year of range(1990, 2017)) {
		dataTable.append(
			createYearRow(year, data)
		)
	}
}

function createYearRow(year) {
	const rowNode = document.createElement('tr');
	const yearNode = document.createElement('th');
	yearNode.innerText = year;
	yearNode.id = year;
	rowNode.append(yearNode);

	createMonthsCells(rowNode, year)

	return rowNode;
}

function createMonthsCells(rowNode, year) {
	for (const month of range(0, 11)) {
		const monthNode = document.createElement('td');
		monthNode.id = `${year}-${month + 1}`;
		rowNode.append(monthNode);
	}
}

function setData(data) {
	for (const row of data) {
		let rank = 1;
		for (const cellData of row) {
			const cellId = cellData.year + '-' + cellData.month;
			const domCell = document.getElementById(cellId);
			addListeners(domCell, rank, cellData.value);
			domCell.style.backgroundColor = colors[rank - 1]
			rank++;
		}
	}
}

function addListeners(domCell, rank, value) {
	domCell.innerText = `${rank}`;
	domCell.onmouseover = (ev) => ev.target.innerText = value;
	domCell.onmouseout = (ev) => ev.target.innerText = rank;
}

function generateLegendFromColors(colors) {
	const legendContainer = document.getElementById('color-list');
	colors.forEach((color) => {
		const listNode = document.createElement('li');
		listNode.style.backgroundColor = color
		legendContainer.append(listNode)
	})
}

function* range(start, end) {
	yield start;
	if (start === end) return;
	yield *range(start + 1, end);
}
