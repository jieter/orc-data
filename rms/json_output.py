import json

from util import time_allowance2speed

from . import WIND_ANGLES, WIND_SPEEDS


def select(boats, key, value):
    for boat in boats:
        if boat[key] in (value, 'NED%s' % value):
            return boat

    return None

def clean_string(str):
    return unicode(str, errors='replace')

def format_data(data):
    ret = {
        'sailnumber': clean_string(data['SAILNUMB']).replace(' ', '').replace('-', ''),
        'name': clean_string(data['NAME']),
        'owner': clean_string(data['OWNER']),
        'rating': {
            'gph': float(data['GPH']),
            'triple_offshore': map(float, [data['OTNLOW'], data['OTNMED'], data['OTNHIG']]),
            'triple_inshore': map(float, [data['ITNLOW'], data['ITNMED'], data['ITNHIG']]),
        },
        'boat': {
            'builder': clean_string(data['BUILDER']),
            'type': data['TYPE'],
            'designer': clean_string(data['DESIGNER']),
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


def jsonwriter_single(rmsdata, sailno):
    data = map(format_data, rmsdata)
    data = select(data, 'sailnumber', sailno)

    print data
    print(json.dumps(data, indent=2))


def jsonwriter_list(rmsdata):
    data = map(format_data, rmsdata)
    data = sorted(data, key=lambda x: x['name'])
    print(json.dumps(data, separators=(',', ':')))
