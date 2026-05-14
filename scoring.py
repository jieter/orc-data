#!/usr/bin/env python3

from __future__ import print_function

import sys

from parser.json_output import jsonwriter_extremes, jsonwriter_site, jsonwriter_list
from parser.parser import parse_json_glob
from parser.util import log

YEAR = 2025

if __name__ == "__main__":
    # display help:
    if len(sys.argv) <= 1:
        log(
            "Usage: scoring.py json                 print json data for all boats to orc-data.json\n"
            "       scoring.py site                 Export data for gh-pages site to site/index.json and site/data/*.json"
        )
        sys.exit(1)

    pattern = f"data/{YEAR}/*{YEAR}.json"
    rms = parse_json_glob(pattern)
    log(f"Loaded a total of {len(rms)} boats with pattern {pattern}.")

    if sys.argv[1] == "json":
        jsonwriter_list(rms)

    elif sys.argv[1] == "site":
        jsonwriter_site(rms)
        jsonwriter_extremes()
        log("Exported for website: site/index.json, site/extremes.json and site/data/*.json")
