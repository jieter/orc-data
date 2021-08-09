import { float, int, round, vmg2sog, zeros } from './util.js';

const CSV_PREAMBLE = 'twa/tws';
const CSV_SEPARATOR = ';';


export function polarImport(str) {
    str = str.trim();

    if (str.indexOf(CSV_PREAMBLE) !== 0) {
        throw 'CSV should start with ' + CSV_PREAMBLE;
    }

    // split by lines, filter empty lines and comments (starting with #)
    var rows = str.split(/\r?\n/).filter(s => s.length > 0 && s[0] != '#');

    var polar = {
        speeds: rows[0].split(CSV_SEPARATOR).slice(1).map(int),
        angles: []
    };

    rows.slice(1).forEach(function(row) {
        var items = row.split(CSV_SEPARATOR);
        var twa = float(items[0]);

        polar.angles.push(twa);
        polar[twa] = items.slice(1).map(float);
    });

    return polar;
}


export function polarExport(data, extended) {
    var vpp = ('vpp' in data) ? data.vpp : data;

    var ret = [
        [CSV_PREAMBLE, ...vpp.speeds],
        zeros(vpp.speeds.length + 1)
    ];

    if (extended) {
        vpp.beat_angle.forEach(function(beat_angle, i) {
            var beat = [beat_angle, ...zeros(vpp.speeds.length)];
            beat[i + 1] = round(vmg2sog(beat_angle, vpp.beat_vmg[i]), 2);
            ret.push(beat);
        });
    }

    vpp.angles.forEach(function(angle) {
        ret.push([angle].concat(vpp[angle]));
    });

    if (extended) {
        vpp.run_angle.forEach(function(run_angle, i) {
            var run = [run_angle, ...zeros(vpp.speeds.length)];
            run[i + 1] = round(vmg2sog(run_angle, -vpp.run_vmg[i]), 2);
            ret.push(run);
        });
    }

    return ret.map(row => row.join(CSV_SEPARATOR)).join('\n');
}