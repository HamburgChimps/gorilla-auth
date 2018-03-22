#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

if docker inspect gorilla/builder-tool:$VERSION  > /dev/null 2>&1 ; then
  echo "Node builder image with version $VERSION exists"
else
  echo "Node builder image with version $VERSION not existing, building it"
  OLD_WD=$(pwd)
  VERSION=$VERSION ./build.sh
  cd $OLD_WD
fi
