#!/usr/bin/env bash
#this is for exiting the sh when a non-zero code is returned by any operation
set -e

if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]
then
   echo "usage: sh init.sh <GIT_USER> <GIT_PROJECT_NAME> <DOCKER_CONTAINER_BASE_IMAGE> <TIMEOUT_FOR_BUILD>"
   echo "example: sh init.sh elephantseed <%= appName %> node-server 30m"
   exit
fi

GIT_USER=$1
GIT_PROJECT_NAME=$2
CONTAINER=$3
TIMEOUT_FOR_BUILD=$4
SCRIPT=(greadlink -n $0)
SCRIPT_PATH=`dirname $SCRIPT`
SOURCE_PATH=`dirname $SCRIPT_PATH`

echo "Container to be used: $CONTAINER."
docker pull $CONTAINER
#TODO comment this line before commit

#timeout for the build script, to avoid zombies in case of uncontrolled failure
TIMEOUT=$TIMEOUT_FOR_BUILD
echo "Triggering the build (with ${TIMEOUT} timeout) to avoid Zombies..."
gtimeout --signal=SIGKILL ${TIMEOUT} \
  docker run -v /Users/sloppylopez/workspace/ephimerald:/source \
  -e "GIT_PROJECT_NAME=$GIT_PROJECT_NAME" \
  --rm \
  $CONTAINER sh -c "/source/build.sh"

echo "Running $GIT_PROJECT_NAME"

sh run.sh $GIT_PROJECT_NAME

echo "All init tasks completed"