var d3 = require('d3');

var polarcsv = require('./polar-csv.js').export;
var polartable = require('./polartable.js');

var meta = d3.select('#meta').attr('class', 'meta');

function metaItem(label, className, contents, title) {
    var className = 'meta-label' + (className ? ' ' + className : '');
    var title = title ? 'title="' + title + '"' : '';

    return '<span class="' + className + '" ' + title  + '>' + label + '</span> ' + contents;
}

module.exports = function render_metadata (boat, extended) {
    d3.select('#name').html(boat.name || '<span class="text-muted">Name unkown</span>');

    var sizes = boat.boat.sizes;

    meta.selectAll('.meta-item')
        .data([
            ['sail number', boat.sailnumber],
            ['type', boat.boat.type],
            ['length', sizes.loa + ' m', 'length over all'],
            ['displacement', sizes.displacement + ' kg', 'displacement'],
            ['draft', sizes.draft + ' m'],
            ['beam', sizes.beam + ' m'],
            '<br />',
            [
                'Max sail area',
                'main: ' + sizes.main + ' m²' + ', genoa: ' + sizes.genoa + ' m²' +
                (sizes.spinnaker > 0 ? ', spinnaker: ' + sizes.spinnaker + ' m²' : '') +
                (sizes.spinnaker_asym > 0 ? ', asym. spinnaker: ' + sizes.spinnaker_asym + 'm²' : '')
            ],
            '<br />',
            ['GPH', boat.rating.gph, 'General purpose handicap'],
            ['offshore TN', boat.rating.triple_offshore.join(', '), 'Offshore triple number'],
            ['inshore TN', boat.rating.triple_inshore.join(', '), 'Inshore triple number'],
            '<div class="table-container"></table>',
            metaItem(
                'polar (csv)',
                'polar',
                '<textarea class="' + (extended ? 'csv-extended' : '') + '">' + polarcsv(boat, extended) + '</textarea>'
            )
        ]).enter().append('div').attr('class', 'meta-item');

    meta.selectAll('.meta-item').html(function (d) {
        return (typeof d === 'string') ? d : metaItem(d[0], undefined, d[1], d[2]);
    });

    polartable(meta.select('.table-container'), boat);
};
