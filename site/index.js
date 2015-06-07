var d3 = require('d3');
var polarplot = require('./src/polarplot.js');
var getRandomElement = require('./src/array-random.js');

var plot = polarplot('#chart');

function match_boats(data, needle) {
	needle = needle.toLowerCase();
	var values = [data.name, data.sailnumber, data.owner, data.boat.type];

	for (var i in values) {
		var value = values[i];
		if (value.toLowerCase().indexOf(needle) !== -1) {
			return true;
		}
	}
}

var list = d3.select('#list');
d3.json('../NED2015.json', function (response) {
	list.selectAll('li')
		.data(response)
		.enter()
			.append('li').append('a')
			.attr({href: function (d) { return '#' + d.sailnumber; }, class: 'boat'})
			.on('click', function (d) {
				plot.render(d);
				d3.select('.row-offcanvas').classed('active', false);
			})
			.html(function (d) {
				return '<span class="sailnumber">' + d.sailnumber + '</span> ' + d.name +
					   '<br /><span class="type">' + d.boat.type + '</span>';
			});
	if (window.location.hash === '') {
		plot.render(getRandomElement(response));
	} else {
		var sailnumber = window.location.hash.substring(1);

		response.forEach(function (boat) {
			if (boat.sailnumber === sailnumber) {
				plot.render(boat);
			}
		});
	}
});

function search() {
	var val = d3.select('input').property('value');

	if (val === '') {
		list.selectAll('a').attr('class', 'boat');
	}
	list.selectAll('a')
		.attr('class', function (d) {
			return 'boat' + (!match_boats(d, val) ? ' hidden' : '');
		});
	if (list.selectAll('a:not(.hidden)')[0].length === 1) {
		plot.render(list.selectAll('a:not(.hidden)').data()[0]);
	}
}
d3.select('input').on('keyup', search);
d3.select('button').on('click', search);

d3.select(window).on('resize', function () {
	plot.resize();
});
