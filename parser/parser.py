from __future__ import print_function

import glob
import re
import json
import pprint

from .util import log


def parse_json(filename):
    '''returns a list of dicts containing the data from filename'''

    country = filename.split('/')[2][0:3]

    with open(filename) as rms:
        data = json.load(rms)["rms"]
        map(lambda k: k.update({"country": country}), data)
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
