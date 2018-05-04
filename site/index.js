
import {json} from 'd3-fetch';
import {select, selectAll} from 'd3-selection';

import {polarplot} from './src/polarplot.js';
import {polarimport} from './src/polar-csv.js';

import {render_metadata} from './src/meta.js';
import {getRandomElement} from './src/util.js';

var plot = polarplot('#chart');

function match_boats (data, needle) {
    needle = needle.toLowerCase();

    for (var i in data) {
        if (!data[i]) {
            continue;
        }
        var value = data[i];
        if (value.toLowerCase().indexOf(needle) !== -1) {
            return true;
        }
    }
}

var current_sailnumber;
function display_boat (sailnumber) {
    console.log('Loading ', sailnumber);
    current_sailnumber = sailnumber;

    var extended = select('#extended-csv').property('checked');

    json(`data/${sailnumber}.json`).then(function (boat) {
        plot.render(boat);
        render_metadata(boat, extended);

        selectAll('#list li').classed('active', function (d) {
            return d[0] === boat.sailnumber;
        });
    });
}

function reload_boat () {
    display_boat(current_sailnumber);
}

var list = select('#list');
json('index.json').then(function (response) {
    list.selectAll('li')
        .data(response)
        .enter()
            .append('li').attr('id', function (d) { return 'boat-' + d[0]; })
            .append('a')
            .attr('href', function (d) { return '#' + d[0]; })
            .attr('class', 'boat')
            .on('click', function (d) {
                display_boat(d[0]);
                select('.row-offcanvas').classed('active', false);
            })
            .html(function (d) {
                return `<span class="sailnumber">${d[0]}</span> ${d[1]}<br /><span class="type">${d[2]}</span>`;
            });

    var polar_textarea = select('textarea');
    if (!polar_textarea.empty()) {
        function render_from_textarea () {
            var csv = polar_textarea.property('value');
            var polar = polarimport(csv);

            plot.render(polar);
        }
        select('textarea').on('keyup', render_from_textarea);

        render_from_textarea();

    } else if (window.location.hash === '') {
        // if window width is xs, do not randomly choose a boot but show
        // selection list
        if (window.innerWidth < 768) {
            select('.row-offcanvas').classed('active', true);
            select('#name').html('<i class="glyphicon glyphicon-arrow-left"></i> Kies een boot');
        } else {
            var sailnumber = getRandomElement(response)[0];
            display_boat(sailnumber);
        }
    } else {
        var sailnumber = window.location.hash.substring(1);
        display_boat(sailnumber);
    }
});

function search () {
    var val = select('input').property('value');

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
select('input').on('keyup', search);
select('button').on('click', search);
select('#extended-csv').on('click', function () {
    reload_boat();
});
select(window).on('resize', function () {
    plot.resize();
});
