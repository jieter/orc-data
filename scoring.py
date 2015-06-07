#!/usr/bin/env python

from __future__ import print_function

import re
import sys

SPACE_ALLOWED = (
    'NATCERTN.FILE_ID', 'SAILNUMB', 'TYPE', 'NAME', 'BUILDER', 'DESIGNER', 'OWNER',
    'DD_MM_yyYY', 'CLUB',
)

WIND_SPEEDS = (6, 8, 10, 12, 14, 16, 20)
WIND_ANGLES = (52, 60, 75, 90, 110, 120, 135, 150)


def log(*args, **kwargs):
    kwargs['file'] = sys.stderr

    print(*args, **kwargs)


def time_allowance2speed(arg):
    return round(3600 / float(arg), 2)


def format_data(data):
    ret = {
        'sailnumber': data['SAILNUMB'].replace(' ', ''),
        'name': data['NAME'],
        'owner': data['OWNER'],
        'rating': {
            'gph': float(data['GPH']),
            'triple_offshore': map(float, [data['OTNLOW'], data['OTNMED'], data['OTNHIG']]),
            'triple_inshore': map(float, [data['ITNLOW'], data['ITNMED'], data['ITNHIG']]),
        },
        'boat': {
            'builder': data['BUILDER'],
            'type': data['TYPE'],
            'designer': data['DESIGNER'],
            'year': data['YEAR'],
            'sizes': {
                'loa': float(data['LOA']),
                'beam': round(float(data['BMAX']), 2),
                'draft': round(float(data['DRAFT']), 2),
                'displacement': float(data['DSPL']),
                'genoa': float(data['GENOA']),
                'main': float(data['MAIN']),
                'spinnaker': float(data['SYM']),
                'spinnaker_asym': float(data['ASYM']),
            },
        },
        # 'raw': data,
    }
    ret['vpp'] = {
        'angles': WIND_ANGLES,
        'speeds': WIND_SPEEDS,
    }
    for twa in WIND_ANGLES:
        ret['vpp'][twa] = [time_allowance2speed(data['R%d%d' % (twa, tws)]) for tws in WIND_SPEEDS]

    ret['vpp']['beat_angle'] = [float(data['UA%d' % tws]) for tws in WIND_SPEEDS]
    ret['vpp']['beat_vmg'] = [time_allowance2speed(data['UP%d' % tws]) for tws in WIND_SPEEDS]

    ret['vpp']['run_angle'] = [float(data['DA%d' % tws]) for tws in WIND_SPEEDS]
    ret['vpp']['run_vmg'] = [time_allowance2speed(data['D%d' % tws]) for tws in WIND_SPEEDS]

    return ret


def parse_rms(filename):
    with open(filename) as rms:
        header_row = rms.readline()

        header_names = header_row.split()
        header = zip(header_names, map(len, re.findall(r"([0-9a-zA-Z_.\:-]+\s+)", header_row)))

        def parse_row(row):
            values = []
            start = 0

            for name, length in header:
                value = row[start:start + length].strip()
                if ' ' in value and name not in SPACE_ALLOWED:
                    log("field '%s' (%d) offset: %d, '%s'" % (name, length, start, value))
                    sys.exit(1)
                values.append(value)
                start += length
            return dict(zip(header_names, values))

        return [parse_row(row) for row in rms if len(row.strip()) > 1000]


def select(boats, key, value):
    for boat in boats:
        if boat[key] in (value, 'NED%s' % value):
            return boat

    return None


if __name__ == '__main__':
    filename = 'NED2015.rms'
    rms = parse_rms(filename)

    log('Loaded %d boats from %s' % (len(rms), filename))

    if len(sys.argv) > 1:
        if sys.argv[1] == 'csv':
            import csv
            if len(rms) == 0:
                log('No boats to write to CSV')
                sys.exit(1)

            writer = csv.DictWriter(sys.stdout, fieldnames=rms[0].keys())

            writer.writeheader()
            for row in rms:
                writer.writerow(row)

        elif sys.argv[1] == 'json':
            import json

            data = map(format_data, rms)
            if len(sys.argv) == 3:
                # use ./scoring.py json <sailnumber> for a single boat.
                sailno = sys.argv[2]
                data = select(data, 'sailnumber', sailno)
                print(json.dumps(data, indent=2))
            else:
                data = sorted(data, key=lambda x: x['name'])
                print(json.dumps(data))
            log('Exported to json')
