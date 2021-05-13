#!/bin/bash -e

BUILD_TARGET=$1
BRANCH=$2

python scripts/build_gn.py \
    --target=$BUILD_TARGET --branch=$BRANCH
python scripts/build_angle.py \
    --target=$BUILD_TARGET --branch=$BRANCH
