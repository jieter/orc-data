// import "core-js/stable";
// import "regenerator-runtime/runtime";

import { select, selectAll } from 'd3-selection';
import { json } from 'd3-fetch';
import { polarplot } from './src/polarplot.js';
import { polarImport } from './src/polar-csv.js';
import { getRandomElement } from './src/util.js';
import { renderMetadata } from './src/meta.js';


var plot = polarplot('#chart');

function matchBoats(data, needle) {
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

function displayBoat(sailnumber) {
    console.log(`Loading ${sailnumber}`);
    current_sailnumber = sailnumber;

    var extended = select('#extended-csv').property('checked');

    json(`data/${sailnumber}.json`).then(function(boat) {
        plot.render(boat);
        renderMetadata(boat, extended);

        selectAll('#list li').classed('active', function(d) {
            return d[0] === boat.sailnumber;
        });
    });
}

function reloadBoat() {
    displayBoat(current_sailnumber);
}

var list = select('#list');
json('index.json').then(function(response) {
    list.selectAll('li')
        .data(response)
        .enter()
        .append('li').attr('id', function(d) { return 'boat-' + d[0]; })
        .append('a')
        .attr('href', function(d) { return '#' + d[0]; })
        .attr('class', 'boat')
        .on('click', function(event, d) {
            displayBoat(d[0]);
            select('.row-offcanvas').classed('active', false);
        })
        .html(function(d) {
            const [number, name, type] = d;

            return `<span class="sailnumber">${number}</span> ${name}<br /><span class="type">${type}</span>`;
        });

    var polar_textarea = select('textarea');
    if (!polar_textarea.empty()) {
        const renderFromTextArea = () => plot.render(polarImport(polar_textarea.property('value')));

        select('textarea').on('keyup', renderFromTextArea);
        renderFromTextArea();

    } else if (window.location.hash === '') {
        // If window width is xs, do not randomly choose a boot but show selection list
        if (window.innerWidth < 768) {
            select('.row-offcanvas').classed('active', true);
            select('#name').html('<i class="glyphicon glyphicon-arrow-left"></i> Kies een boot');
        } else {
            var sailnumber = getRandomElement(response)[0];
            displayBoat(sailnumber);
        }
    } else {
        displayBoat(window.location.hash.substring(1));
    }
});

function search() {
    var val = select('input').property('value');

    console.log(val);
    if (val === '') {
        list.selectAll('a').attr('class', 'boat');
    }
    list.selectAll('a')
        .attr('class', function(d) {
            return 'boat' + (!matchBoats(d, val) ? ' hidden' : '');
        });
    if (list.selectAll('a:not(.hidden)')[0].length === 1) {
        plot.render(list.selectAll('a:not(.hidden)').data()[0]);
    }
}
select('input').on('keyup', search);
select('button').on('click', search);
select('#extended-csv').on('click', function() {
    reloadBoat();
});
select(window).on('resize', function() {
    plot.resize();
});