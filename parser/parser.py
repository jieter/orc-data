from __future__ import print_function

import codecs
import glob
import json

from .util import log


def parse_json(filename):
    '''returns a list of dicts containing the data from filename'''

    country = filename.split('/')[2][0:3]

    try:
        rms = json.load(codecs.open(filename, 'r', 'utf-8-sig'))
    except json.decoder.JSONDecodeError as e:
        print('error parsing file: {}, error: {}'.format(filename, str(e)))
        return []

    data = rms['rms']

    for item in data:
        item['country'] = country

    return data


def parse_json_glob(pattern):
    '''returns a list of dicts containing the data from files matching the globbing
    pattern supplied'''

    ret = []
    for filename in glob.glob(pattern):
        data = parse_json(filename)

        ret.extend(data)
        log('Loaded %d boats from %s' % (len(data), filename))

    return ret
