module.exports = function polartable(container, boat) {
	var vpp = boat.vpp;

	// prepare data:
	var header = ['Wind velocity'].concat(vpp.speeds.map(function (d) { return d + 'kts'; }));
	var data = [
		['Beat angles'].concat(vpp.beat_angle),
		['Beat VMG'].concat(vpp.beat_vmg)
	].concat(vpp.angles.map(function (angle) {
		return [angle + '°'].concat(vpp['' + angle]);
	})).concat([
		['Run VMG'].concat(vpp.run_vmg),
		['Gybe angles'].concat(vpp.run_angle)
	]);

	var table = container.selectAll('table').data([0]).enter()
		.append('table')
		.attr('class', 'table table-condensed polar-table');

	var thead = table.selectAll('thead').data([0]).enter().append('thead');
	var tbody = table.selectAll('tbody').data([0]).enter().append('tbody');

	thead.selectAll('tr').data([0]).enter().append('tr')
		.selectAll('th').data(header).enter().append('th').text(function (d) { return d; });

	var rows = tbody.selectAll('tr').data(data)
		.enter().append('tr');

	var cells = rows.selectAll('td').data(function (d) { return d; })
		.enter().append('td');

	cells.text(function (d) { return d; });
};
