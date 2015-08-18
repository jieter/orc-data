import csv
import sys

from .util import log


def csvwriter(rmsdata, outfile=sys.stdout):
    if len(rmsdata) == 0:
        log('No boats to write to CSV')
        sys.exit(1)

    writer = csv.DictWriter(outfile, fieldnames=rmsdata[0].keys())

    writer.writeheader()
    for row in rmsdata:
        writer.writerow(row)
