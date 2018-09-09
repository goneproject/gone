#!/bin/bash

#  Copyright 2018 The node-gpu Project Authors. All rights reserved.
#  Use of this source code is governed by a BSD-style license that can be
#  found in the LICENSE file.

# Creates a new Pipeline Config and stores it inside the config directroy:
#     cd <project_root>/.ci/config/
#     cat *.yml
# 
# The generated file will be automatically added to the .gitignore file.
# Verify the .gitignore file before pushing or committing to your Repo:
#     cat <project_root>/.gitignore
#
# After generating the Pipeline Config a new CI Pipeline is setup via fly CLI
# To lean more about Concourse Fly CLI visit: https://concourse-ci.org/fly.html

# SET GLOBAL VARIABLES
INTEND="    ";
SUB_INTEND="     ⮑  ";

RESET_CLR='\033[0m';
STDIN_CLR='\033[0;33m';
ERROR_CLR='\033[0;31m';
SUCCESS_CLR='\033[0;32m';
LINK_CLR='\033[4;36m\033[1;36m';
WARN_CLR='\033[0;35m';
JOB_CLR='\033[0;34m';

cat misc/asc/ci-setup/ci-setup.asc

echo -e "\nWelcome to the (Unofficial) Concourse CI Pipeline Wizard!\n";
echo -e "This Script will setup a 'node-gpu' Pipeline.\nhttps://concourse-ci.org/index.html\n";

# Check if in Git env
if [ -d .git ]; then
  echo -e "${SUCCESS_CLR}➜ [OK] Detected valid Git environment!";
else
  echo -e "${ERROR_CLR}➜ [ERROR] This script can only be executed inside a Git environment... Exiting graceful!\n";
  exit 0
fi;

# Check if Fly CLI is installed
if type fly &>/dev/null; then
  echo -e "${SUCCESS_CLR}➜ [OK] Detected Fly CLI!\n";
else
  echo -e "${WARN_CLR}➜ [WARNING] This script requires Fly CLI to setup pipelines... https://concourse-ci.org/fly.html\n";
fi;

echo -e "${INTEND}${RESET_CLR}Setup Script Configuration:";
echo -e -n "${STDIN_CLR}";
read -p "${SUB_INTEND}Enter a desired config name: " CONFIG_NAME;

if [ -f ".ci/config/${CONFIG_NAME}.yml" ]; then
  read -p "${SUB_INTEND}Config already exist! Remove config? [yes/no]: " OVERWRITE;
  echo -e "\n${JOB_CLR}[JOB] Remove old config file...";
  rm -rf ".ci/config/${CONFIG_NAME}.yml";

  if [ "$OVERWRITE" == "no" ]; then 
    echo -e "\n${ERROR_CLR}➜ [ERROR] Exiting graceful!\n";
    exit 0
  else
    if [ "$OVERWRITE" != "yes" ]; then 
      echo -e "\n${ERROR_CLR}➜ [ERROR] Invalid input... exiting :,(\n";
      exit 1;
    fi; 
  fi;
fi;

echo -e "\n${INTEND}${RESET_CLR}Please enter your ${LINK_CLR}https://hub.docker.com/${RESET_CLR} credentials:";
echo -e -n "${STDIN_CLR}";
read -ep "${SUB_INTEND}E-mail: " DOCKERHUB_EMAIL;
read -ep "${SUB_INTEND}Username: " DOCKERHUB_USERNAME;
read -sp "${SUB_INTEND}Password: " DOCKERHUB_PASSWORD;

echo -e "\n\n${INTEND}${RESET_CLR}Configure Pipeline:";
echo -e -n "${STDIN_CLR}";
read -p "${SUB_INTEND}New DockerHub Repository Name: " DOCKERHUB_REPOSITORY;
read -p "${SUB_INTEND}Concourse Project ID [e.g. myProject]: " CI_PROJECT_ID;

echo -e "\n${JOB_CLR}[JOB] Update .gitignore...";
echo ".ci/config/${CONFIG_NAME}.yml" >> .gitignore;

echo -e "${JOB_CLR}[JOB] Writing config file..."
echo "---" >> .ci/config/${CONFIG_NAME}.yml;
echo "# AUTOMATICALLY GENERATED CONCORUSE CI PIPELINE CONFIG" >> .ci/config/${CONFIG_NAME}.yml;
echo "docker-hub:" >> .ci/config/${CONFIG_NAME}.yml;
echo "  - username: ${DOCKERHUB_USERNAME}" >> .ci/config/${CONFIG_NAME}.yml;
echo "    password: ${DOCKERHUB_PASSWORD}" >> .ci/config/${CONFIG_NAME}.yml;
echo "    repository: ${DOCKERHUB_REPOSITORY}" >> .ci/config/${CONFIG_NAME}.yml;


if type fly &>/dev/null; then
  echo -e "${JOB_CLR}[JOB] Set Pipeline...${RESET_CLR}";
  fly set-pipeline node-gpu --vars-from .ci/config/${CONFIG_NAME}.yml -c .ci/pipeline.yml
fi;

echo -e "${RESET_CLR}\n... Done!\n"; 

exit 0;