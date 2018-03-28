#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

NODE_VERSION=8.9

docker run --rm -v $(pwd)/../../:/app \
-w /app \
-e NODE_ENV=$NODE_ENV \
gorilla/builder:$NODE_VERSION ash -c \
"node_modules/.bin/mocha "test/unit/**/*.js" --timeout 5000 --exit"

TESTRESULT=$?

exit $TESTRESULT
