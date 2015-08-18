from __future__ import print_function

import glob
import re

from .util import log

SPACE_ALLOWED = (
    'NATCERTN.FILE_ID', 'SAILNUMB', 'TYPE', 'NAME', 'BUILDER', 'DESIGNER', 'OWNER',
    'DD_MM_yyYY', 'CLUB',
)


class RMSParseException(Exception):
    pass


def parse_rms(filename):
    '''returns a list of dicts containing the data from filename'''

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
                    raise RMSParseException("field '%s' (%d) offset: %d, '%s'" % (name, length, start, value))

                values.append(value)
                start += length
            return dict(zip(header_names, values))

        return [parse_row(row) for row in rms if len(row.strip()) > 1000]


def parse_rms_glob(pattern):
    '''returns a list of dicts containing the data from files matching the globbing
    pattern supplied'''

    ret = []
    for filename in glob.glob(pattern):
        try:
            data = parse_rms(filename)
        except RMSParseException as e:
            log('Error parsing %s: %s' % (filename, str(e)))
            continue

        ret.extend(data)
        log('Loaded %d boads from %s' % (len(data), filename))

    return ret
