var d3 = require('d3');
var polarcsv = require('./polar-csv.js');
var polartable = require('./polartable.js');

var deg2rad = Math.PI / 180;

module.exports = function polarplot(container) {

	var containerElement = document.getElementById(container.substring(1));
	var width = function() {
		return containerElement.offsetWidth - 40;
	};
	var height = function () {
		return Math.min(window.innerHeight, width() * 2) - 20;
	};
	var radius = function () {
		return Math.min(height() / 2.2 - 20, width()) - 40;
	};

	var r = d3.scale.linear().domain([0, 10]).range([0, radius()]);

	var svg = d3.select(container).append('svg')
		.attr({width: width(), height: height()})
		.append('g')
		.attr('transform', 'translate(' + 10 + ',' + (height() / 2) + ')');

	// speed rings
	var gr = svg.append('g')
		.attr('class', 'r axis')
		.selectAll('g')
			.data(r.ticks(10).slice(1))
			.enter().append('g');

	gr.append('circle').attr('r', r);

	gr.append('text')
		.attr('y', function(d) { return -r(d) - 4; })
		.attr('transform', 'rotate(15)')
		.style('text-anchor', 'middle')
		.text(function(d) { return d % 2 === 0 ? d + 'kts' : ''; });

	// wind direction
	var graph = svg.append('g')
		.attr('class', 'a axis')
		.selectAll('g')
			.data([0, 45, 52, 60, 75, 90, 110, 120, 135, 150, 165].map(function (d) { return d - 90; }))
				.enter().append('g')
					.attr('transform', function(d) { return 'rotate(' + d + ')'; });

	graph.append('line').attr('x2', radius());

	var xaxis = function (sel) {
		sel.attr('x', radius() + 6)
		.attr('dy', '.35em')
		.style('text-anchor', function(d) { return d < 270 && d > 90 ? 'end' : null; })
		.attr('transform', function(d) { return d < 270 && d > 90 ? 'rotate(180 ' + (radius() + 6) + ', 0)' : null; })
		.text(function(d) { return (d + 90) + '°'; });
	};

	graph.append('text')
		.attr('class', 'xlabel').call(xaxis);


	var line = d3.svg.line.radial()
		.radius(function(d) { return r(d[1]); })
		.angle(function(d) { return d[0]; })
		.interpolate('cardinal');

	var scatter = function (s) {
		s.attr({
			// x: function(d) { return r(d[1]) * Math.sin(d[0]); },
			// y: function(d) { return r(d[1]) * -Math.cos(d[0]); },
			transform: function (d) {
				return 'translate(' + (r(d[1]) * Math.sin(d[0])) + ', ' + (r(d[1]) * -Math.cos(d[0])) + ')';
			},
			d: d3.svg.symbol().type('diamond').size(32)
		});
	};

	var meta = d3.select('#meta').append('div').attr('class', 'meta');

	var plot = function () {};

	plot.render = function (data) {
		var vpp_angles = data.vpp.angles.map(function (d) { return d * deg2rad; });
		var run_data = [];

		var vpp_data = data.vpp.speeds.map(function (windspeed, i) {
			var series = d3.zip(vpp_angles, data.vpp.angles.map(function (angle) {
				return data.vpp[angle][i];
			}));
			// prepend beat angle/VMG
			var beat_angle = data.vpp.beat_angle[i] * deg2rad;
			var beat_speed = data.vpp.beat_vmg[i] / Math.cos(beat_angle);
			series.unshift([beat_angle, beat_speed]);

			// append run angle/VMG
			var run_angle = data.vpp.run_angle[i] * deg2rad;
			var run_speed = data.vpp.run_vmg[i] / -Math.cos(run_angle);
			series.push([run_angle, run_speed]);
			run_data.push([run_angle, run_speed]);

			return series.sort(function (a, b) { return a[0] - b[0]; });
		});

		var run_points = svg.selectAll('.vmg-run').data(run_data);
		run_points.enter().append('path').attr('class', 'vmg-run');
		run_points.exit().remove();
		run_points.call(scatter);

		var lines = svg.selectAll('.line').data(vpp_data);
		lines.enter().append('path').attr('class', 'line');
		lines.exit().remove();
		lines.transition().duration(200).attr('d', line);


		d3.select('#name').html(data.name);
		meta.selectAll('.meta-item')
			.data([
				['zeilnummer', data.sailnumber],
				['type', data.boat.type],
				['lengte', data.boat.sizes.loa + 'm'],
				['diepgang', data.boat.sizes.draft + 'm'],
				['breedte', data.boat.sizes.beam + 'm'],
				'<br />',
				['GPH', data.rating.gph],
				['offshore TN', data.rating.triple_offshore.join(', ')],
				['inshore TN', data.rating.triple_inshore.join(', ')],
				'<div class="table-container"></table>',
				['polar (csv)', '<textarea>' + polarcsv(data) + '</textarea>', 'polar']
			]).enter().append('div').attr('class', 'meta-item');

		meta.selectAll('.meta-item').html(function (d) {
			if (typeof d === 'string') {
				return d;
			} else {
				var className = 'meta-label' + (d.length === 3 ? ' ' + d[2] : '');
				return '<span class="' + className + '">' + d[0] + '</span> ' +  d[1];
			}
		});
		polartable(meta.select('.table-container'), data);
	};
	var originalSize = width();
	plot.resize = function () {
		if (width() === originalSize) {
			return;
		}
		d3.select('svg').attr({
			width: width(),
			height: height()
		});

		svg.attr('transform', 'translate(' + 10 + ',' + (height() / 2) + ')');
		r.range([0, radius()]);

		gr.selectAll('.axis.r circle').attr('r', r);
		gr.selectAll('.axis.r text').attr('y', function(d) { return -r(d) - 4; });

		graph.selectAll('line').attr('x2', radius());
		svg.selectAll('.xlabel').call(xaxis);

		svg.selectAll('.line').transition().duration(200).attr('d', line);
		svg.selectAll('.vmg-run').transition().duration(200).call(scatter);

		originalSize = width();
	};

	return plot;
};
