var CSV_PREAMBLE = 'twa/tws';
var CSV_SEPARATOR = ';';

function zeros (n) {
	return Array.apply(null, new Array(n)).map(function () { return 0.0; });
}
function int (n) {
	return parseInt(n);
}
function float (n) {
	return +n;
}
function polarimport (str) {
	str = str.trim();

	if (str.indexOf(CSV_PREAMBLE) !== 0) {
		throw 'CSV should start with ' + CSV_PREAMBLE;
	}

	// split by lines, filter empty lines and comments (starting with #)
	var rows = str.split(/\r?\n/).filter(function (s) { return s.length > 0 && s[0] != '#'; });

	var polar = {
		speeds: rows[0].split(CSV_SEPARATOR).slice(1).map(int),
		angles: []
	};

	rows.slice(1).forEach(function (row) {
		var items = row.split(CSV_SEPARATOR);
		var twa = int(items[0]);

		polar.angles.push(twa);
		polar[twa] = items.slice(1).map(float);
	});

	return polar;
}


function polarexport (data) {
	vpp = ('vpp' in data) ? data.vpp : data;

	var ret = [
		[CSV_PREAMBLE].concat(data.speeds),
		zeros(data.speeds.length + 1)
	];

	data.angles.forEach(function (angle) {
		ret.push([angle].concat(data[angle]));
	});

	return ret.join('\n').map(function (row) { return row.join(CSV_SEPARATOR); });
}

module.exports = {
	export: polarexport,
	import: polarimport
}
