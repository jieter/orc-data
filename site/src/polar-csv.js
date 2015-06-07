
function zeros(n) {
	return Array.apply(null, new Array(n)).map(function () { return 0.0; });
}

module.exports = function polarexport(data) {
	data = data.vpp;

	var ret = ['twa/tws;' + data.speeds.join(';')];
	ret.push(zeros(data.speeds.length + 1));

	data.angles.forEach(function (angle) {
		var row = [angle].concat(data[angle]);
		ret.push(row.join(';'));
	});

	return ret.join('\n');
};
