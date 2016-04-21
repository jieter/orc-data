var d3 = require('d3');
var polarplot = require('./src/polarplot.js');
var import_polar = require('./src/polar-csv.js').import;
var render_metadata = require('./src/meta.js');
var getRandomElement = require('./src/array-random.js');

var plot = polarplot('#chart');

function match_boats (data, needle) {
    needle = needle.toLowerCase();

    for (var i in data) {
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

    var extended = d3.select('#extended-csv').property('checked');
    console.log(d3.select('#extended-csv').property('checked'));
    d3.json('data/' + sailnumber.substr(0, 3) + '/' + sailnumber + '.json', function (boat) {
        plot.render(boat);
        render_metadata(boat, extended);

        d3.selectAll('#list li').classed('active', function (d) {
            return d[0] === boat.sailnumber;
        });
    });
}

function reload_boat () {
    display_boat(current_sailnumber);
}

var list = d3.select('#list');
d3.json('index.json', function (response) {
    list.selectAll('li')
        .data(response)
        .enter()
            .append('li').attr('id', function (d) { return 'boat-' + d[0]; })
            .append('a')
            .attr({href: function (d) { return '#' + d[0]; }, class: 'boat'})
            .on('click', function (d) {
                console.log(d);
                display_boat(d[0]);
                d3.select('.row-offcanvas').classed('active', false);
            })
            .html(function (d) {
                return '<span class="sailnumber">' + d[0] + '</span> ' + d[1] +
                       '<br /><span class="type">' + d[2] + '</span>';
            });

    var polar_textarea = d3.select('textarea');
    if (!polar_textarea.empty()) {
        function render_from_textarea () {
            var csv = polar_textarea.property('value');
            var polar = import_polar(csv);

            plot.render(polar);
        }
        d3.select('textarea').on('keyup', render_from_textarea);

        render_from_textarea();

    } else if (window.location.hash === '') {
        // if window width is xs, do not randomly choose a boot but show
        // selection list
        if (window.innerWidth < 768) {
            d3.select('.row-offcanvas').classed('active', true);
            d3.select('#name').html('<i class="glyphicon glyphicon-arrow-left"></i> Kies een boot');
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
d3.select('#extended-csv').on('click', function () {
    reload_boat();
});
d3.select(window).on('resize', function () {
    plot.resize();
});
