from __future__ import print_function

import sys


def time_allowance2speed(arg):
    return round(3600 / float(arg), 2)


def log(*args, **kwargs):
    '''Print to stderr'''
    kwargs['file'] = sys.stderr
    print(*args, **kwargs)
