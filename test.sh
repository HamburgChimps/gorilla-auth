#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

# server/test/unit/test.sh
server/test/integration/test.sh

exit $?
