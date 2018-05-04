import {select} from 'd3-selection';

import {polarexport} from './polar-csv.js';
import {polartable} from './polartable.js';

var meta = select('#meta').attr('class', 'meta');

function metaItem (label, className, contents, title) {
    var className = 'meta-label' + (className ? ' ' + className : '');
    var title = title ? 'title="' + title + '"' : '';

    return '<span class="' + className + '" ' + title  + '>' + label + '</span> ' + contents;
}

function table (data) {
    var header = '';
    var contents = '';
    for (var i = 0; i < data[0].length; i++) {
        header += '<td class="meta-label">' + data[0][i] + '</td>';
        contents += '<td>' + data[1][i] + '</td>'
    }
    return '<table class="meta-table"><tr>' + header + '</tr><tr>' + contents + '</tr></table>';
}

export function render_metadata (boat, extended) {
    select('#name').html(boat.name || '<span class="text-muted">Name unknown</span>');

    var sizes = boat.boat.sizes;

    var sailsTable = [['main', 'genoa'], [sizes.main + 'm²', sizes.genoa + 'm²']];
    if (sizes.spinnaker > 0) {
        sailsTable[0].push('spinnaker');
        sailsTable[1].push(sizes.spinnaker + 'm²');
    }
    if (sizes.spinnaker_asym > 0) {
        sailsTable[0].push('asym. spinnaker');
        sailsTable[1].push(sizes.spinnaker_asym + 'm²');
    }

    meta.selectAll('.meta-item')
        .data([
            table([
                ['sail number', 'type', 'designer', 'owner'],
                [boat.sailnumber, boat.boat.type, boat.boat.designer, boat.owner]
            ]),
            table([
                ['length', 'beam', 'draft', 'displacement'],
                [sizes.loa + 'm', sizes.beam + 'm', sizes.draft + 'm', sizes.displacement + ' kg']
            ]),
            ['Max sail area', table(sailsTable)],
            '<br />',
            table([['GPH', 'OSN'], [boat.rating.gph, boat.rating.osn]]),
            ['offshore TN', boat.rating.triple_offshore.join(', '), 'Offshore triple number'],
            ['inshore TN', boat.rating.triple_inshore.join(', '), 'Inshore triple number'],
            '<div class="table-container"></table>',
            metaItem(
                'polar (csv)',
                'polar',
                '<textarea class="' + (extended ? 'csv-extended' : '') + '">' + polarexport(boat, extended) + '</textarea>'
            )
        ]).enter().append('div').attr('class', 'meta-item');

    meta.selectAll('.meta-item').html(function (d) {
        return (typeof d === 'string') ? d : metaItem(d[0], undefined, d[1], d[2]);
    });

    polartable(meta.select('.table-container'), boat);
};
