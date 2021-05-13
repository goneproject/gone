#!/usr/bin/python3

"""Build Angle from Source
"""

import subprocess
import sys
import getopt


def main(argv):
    branch = 'master'
    target = 'out/Debug'

    try:
        opts, args = getopt.getopt(argv, "hb:t:", ["help","branch=","target="])
    except getopt.GetoptError:
        print('Missing parameters. Use -h to see help')
        sys.exit(2)

    for opt, arg in opts:
        if opt == ('-h', '--help'):
            print(('%s\n'
                '--branch | -b <GIT_BRANCH>\n',
                '--target | -t <BUILD_TARGET>'), sys.argv[0])
            sys.exit()

        elif opt in ('-b', '--branch'):
            branch = arg

        elif opt in ('-t', '--target'):
            target = arg

    cmd = ('cd third_party/angle '
            '&& git checkout %s ' % (branch) +
            '&& ../depot_tools/gn gen %s ' % (target) +
            '&& autoninja -C %s ' % (target))
    
    try:
        rc = subprocess.call(cmd, shell=True)
    except OSError:
        print('could not run "%s" via shell' % cmd)
        sys.exit(1)

    if rc:
        print('failed command: "%s"' % cmd)
        sys.exit(1)

    print('[successfully build angle]')

if __name__ == '__main__':
    main(sys.argv[1:])
