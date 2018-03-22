#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

docker build . -t gorilla/builder-tool:$VERSION --build-arg NODE_VERSION=$VERSION
