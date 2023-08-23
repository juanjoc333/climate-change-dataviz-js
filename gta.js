window.onload = async function() {
	const response = await fetch('./data/gta_data.json');
	const data = await response.json();

	createGraphic(data);
}

function createGraphic(data) {
	const dataTable = document.getElementById('data-table');
	createYearsRows(dataTable);
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

function* range(start, end) {
	yield start;
	if (start === end) return;
	yield *range(start + 1, end);
}
