#!/bin/bash

DIR=$(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)
cd $DIR

SERVICE=${DIR%%/test/*}
SERVICE=${SERVICE##*/}

PROJECT=ci$(date +%N)

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

cleanup () {
  docker-compose down
}

trap 'cleanup ; printf "${RED}Tests Failed For Unexpected Reasons${NC}\n"'\
  HUP INT QUIT PIPE TERM
docker-compose build && docker-compose up -d
if [ $? -ne 0 ] ; then
  printf "${RED}Docker Compose Failed unit_gorilla-server_1 \n"
  exit -1
fi

docker logs -f unit_gorilla-server_1

TEST_EXIT_CODE=`docker inspect unit_gorilla-server_1  --format='{{.State.ExitCode}}'`

if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" != "0" ] ; then
  printf "${RED}Tests Failed unit_gorilla-server_1  - Exit Code: $TEST_EXIT_CODE\n"
else
  printf "${GREEN}Tests Passed unit_gorilla-server_1 \n"
fi
cleanup
exit $TEST_EXIT_CODE
