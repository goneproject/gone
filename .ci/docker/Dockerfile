# Copyright 2018 Robin Roeper  All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

FROM debian:latest

LABEL maintainer "robinroeper@api-spot.com"

# SWITCH TO USER ROOT
USER root

# ENSURE GPP (GENERAL PURPOSE PACKAGES) AVAILABILITY
RUN apt-get update && apt-get install -y apt-utils gnupg2 sudo curl git ssh tar gzip  ca-certificates python

RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install nodejs yarn

# OS INFO
RUN cat /etc/os-release

# CHECK VERSION
RUN git --version

# CLONE PROJECT
RUN git clone --recurse-submodules -j8 https://github.com/robin-rpr/node-gpu.git
ENV APP_PATH node-gpu
WORKDIR $APP_PATH

# INSTALL NODE-GPU DEPENDENCIES
RUN apt-get install -y g++-6-arm-linux-gnueabihf gcc-arm-linux-gnueabihf gcc-arm-linux-gnueabihf xserver-xorg-dev libxext-dev libxi-dev libpci-dev

# EXPORT DEPOT_TOOLS
ENV PATH="${PATH}:../depot_tools"

# BOOTSTRAP ANGLE
WORKDIR engine/submodules/angle
RUN echo $PATH
RUN echo $PWD
RUN python scripts/bootstrap.py
RUN gclient sync
RUN git checkout master
RUN ./build/install-build-deps.sh --syms --lib32 --arm --chromeos-fonts --nacl
RUN GYP_GENERATORS=ninja gclient runhooks
RUN ls -la
RUN pwd
RUN mkdir -p out/Debug
RUN ninja -j 10 -k1 -C out/Debug

# CONFIGURE NODE-GYP
RUN node-gyp configure --use_x11=1 --use_ozone=1 --chromeos=0 --angle_path=/home/git/node-gpu/engine/submodules/angle -- -Dpkg-config=/usr/bin/pkg-config

# BUILD NODE-GPU
RUN node-gyp build

# BABEL COMPILE ES6
RUN babel bin -d lib
