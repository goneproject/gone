#!/usr/bin/python3

"""Generate .gclient file for Angle.

Because gclient won't accept "--name ." use a different name then edit.
"""

import subprocess
import sys


def main():
    cmd = ('cd third_party/angle '
            '&& python scripts/bootstrap.py '
            '&& ../depot_tools/gclient config --name change2dot --unmanaged https://chromium.googlesource.com/angle/angle.git')
    try:
        rc = subprocess.call(cmd, shell=True)
    except OSError:
        print('could not run "%s" via shell' % cmd)
        sys.exit(1)

    if rc:
        print('failed command: "%s"' % cmd)
        sys.exit(1)

    with open('third_party/angle/.gclient') as gclient_file:
        content = gclient_file.read()

    with open('third_party/angle/.gclient', 'w') as gclient_file:
        gclient_file.write(content.replace('change2dot', '.'))

if __name__ == '__main__':
    main()
