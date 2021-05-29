#!/usr/bin/env python

from __future__ import print_function

import sys

from parser.parser import parse_json_glob
from parser.util import log

YEAR = 2021

if __name__ == "__main__":
    # display help:
    if len(sys.argv) <= 1:
        log(
            "Usage: scoring.py json                 print json data for all boats to orc-data.json\n"
            "       scoring.py json <sailnumber>    print json data for a single boat to stdout\n"
            "       scoring.py site                 Export data for gh-pages site to site/index.json and site/data/*.json"
        )
        sys.exit(1)

    pattern = f"data/{YEAR}/*{YEAR}.json"
    rms = parse_json_glob(pattern)
    log(f"Loaded a total of {len(rms)} boats with pattern {pattern}.")

    if sys.argv[1] == "json":

        if len(sys.argv) == 3:
            from parser.json_output import jsonwriter_single

            jsonwriter_single(rms, sailnumber=sys.argv[2])
        else:
            from parser.json_output import jsonwriter_list

            jsonwriter_list(rms)

        log("Exported to json")

    if sys.argv[1] == "extremes":
        from parser.json_output import jsonwriter_extremes

        jsonwriter_extremes(rms)

    elif sys.argv[1] == "site":
        from parser.json_output import jsonwriter_site

        jsonwriter_site(rms)

        log("Exported for website: site/index.json + site/data/*.json")
