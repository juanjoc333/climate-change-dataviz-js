window.onload = async function() {
	const response = await fetch('./data/gta_data.json');
	const data = await response.json();

	console.log(data);
}


