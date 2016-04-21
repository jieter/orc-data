var d3 = require('d3');

var polarcsv = require('./polar-csv.js').export;
var polartable = require('./polartable.js');

var meta = d3.select('#meta').attr('class', 'meta');

module.exports = function render_metadata (boat) {
    d3.select('#name').html(boat.name || '<span class="text-muted">Geen naam bekend</span>');

    meta.selectAll('.meta-item')
        .data([
            ['zeilnummer', boat.sailnumber],
            ['type', boat.boat.type],
            ['lengte', boat.boat.sizes.loa + 'm'],
            ['diepgang', boat.boat.sizes.draft + 'm'],
            ['breedte', boat.boat.sizes.beam + 'm'],
            '<br />',
            ['GPH', boat.rating.gph],
            ['offshore TN', boat.rating.triple_offshore.join(', ')],
            ['inshore TN', boat.rating.triple_inshore.join(', ')],
            '<div class="table-container"></table>',
            ['polar (csv)', '<textarea>' + polarcsv(boat) + '</textarea>', 'polar']
        ]).enter().append('div').attr('class', 'meta-item');

    meta.selectAll('.meta-item').html(function (d) {
        if (typeof d === 'string') {
            return d;
        } else {
            var className = 'meta-label' + (d.length === 3 ? ' ' + d[2] : '');
            return '<span class="' + className + '">' + d[0] + '</span> ' +  d[1];
        }
    });
    polartable(meta.select('.table-container'), boat);
};
