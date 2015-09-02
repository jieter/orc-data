var d3 = require('d3');
var polarplot = require('./src/polarplot.js');

var import_polar = require('./src/polar-csv.js').import;

var plot = polarplot('#chart');


function update() {
    var csv = d3.select('textarea').property('value');

    var polar = import_polar(csv);

    console.log(polar);

    plot.render(polar);
}

d3.select('textarea').on('keyup', update);

update();
