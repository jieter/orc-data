#!/usr/bin/env python

from __future__ import print_function

import sys

from rms.parser import parse_rms_glob
from rms.util import log

if __name__ == '__main__':
    # display help:
    if len(sys.argv) <= 1:
        log('Usage: scoring.py json                 print json data for all boats to stdout')
        log('       scoring.py json <sailnumber>    print json data for a single boat to stdout')
        log('       scoring.py csv                  pritn csv data for all boats to stdout')
        sys.exit(1)

    pattern = 'data/*'
    rms = parse_rms_glob(pattern)
    log('Loaded a total of %d boats with pattern %s.' % (len(rms), pattern))

    if sys.argv[1] == 'csv':
        from rms.csv_output import csvwriter

        csvwriter(rms)

    elif sys.argv[1] == 'json':
        from rms.json_output import jsonwriter_single, jsonwriter_list

        if len(sys.argv) == 3:
            jsonwriter_single(rms, sys.argv[2])
        else:
            jsonwriter_list(rms)

        log('Exported to json')
