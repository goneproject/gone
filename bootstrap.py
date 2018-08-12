#!/usr/bin/python2

# Copyright 2015 Google Inc.  All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

"""Generate .gclient file for Angle.

Because gclient won't accept "--name ." use a different name then edit.
"""

import subprocess
import sys


def main():
    #Export Depot_tools
    cmd = ("export PATH=$PATH:$PWD/engine/submodules/depot_tools "
           "&& (cd engine/submodules/angle/scripts && python bootstrap.py) "
           "&& (cd engine/submodules/angle && gclient sync) "
           "&& (cd engine/submodules/angle && git checkout master) "
           "&& (cd engine/submodules/angle && ./build/install-build-deps.sh) "
           "&& (cd engine/submodules/angle && GYP_GENERATORS=ninja gclient runhooks) "
           "&& (cd engine/submodules/angle && mkdir -p out/Debug) "
           "&& (cd engine/submodules/angle && ninja -j 10 -k1 -C out/Debug)")

    try:
        rc = subprocess.call(cmd, shell=True)
    except OSError:
        print 'could not run "%s" via shell' % cmd
        sys.exit(1)

    if rc:
        print 'failed command: "%s"' % cmd
        sys.exit(1)

    print 'bootstrapped node-gpu'

if __name__ == '__main__':
    main()