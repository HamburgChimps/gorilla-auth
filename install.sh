#!/bin/bash

VERSION=8.9

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

VERSION=$VERSION builder/ensure.sh

docker run --rm -v $(pwd):/app \
-w /app/ \
-e NODE_ENV=$NODE_ENV \
gorilla/builder:$VERSION bash -c \
"yarn install $@ && chown -R $(id -u):$(id -g) yarn.lock node_modules"
