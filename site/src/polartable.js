function degrees(d) {
    return d + '°';
}

export function polartable(container, boat) {
    var vpp = boat.vpp;
    var header = ['Wind velocity', ...vpp.speeds.map((d) => `${d}kts`)];
    var data = [
        ['Beat angles', ...vpp.beat_angle.map(degrees)],
        ['Beat VMG', ...vpp.beat_vmg],
        ...vpp.angles.map((angle) => [degrees(angle), ...vpp['' + angle]]),
        ['Run VMG', ...vpp.run_vmg],
        ['Gybe angles', ...vpp.run_angle.map(degrees)],
    ];

    var table = container
        .selectAll('table')
        .data([0])
        .enter()
        .append('table')
        .attr('class', 'table table-condensed polar-table');

    var thead = table.selectAll('thead').data([0]).enter().append('thead');
    var tbody = table.selectAll('tbody').data([0]).enter().append('tbody');

    thead
        .selectAll('tr')
        .data([0])
        .enter()
        .append('tr')
        .selectAll('th')
        .data(header)
        .enter()
        .append('th')
        .text((d) => d);

    var rows = tbody
        .selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .attr('class', (d, i) => (i >= 2 && i <= 9 ? `twa-${vpp.angles[i - 2]}` : ''));

    rows.selectAll('td')
        .data((d) => d)
        .enter()
        .append('td')
        .attr('class', function (d, i) {
            return i > 0 ? `tws-${vpp.speeds[i - 1]}` : '';
        })
        .text((d) => d);
}
