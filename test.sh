#!/bin/bash

cd $(dirname `[[ $0 = /* ]] && echo "$0" || echo "$PWD/${0#./}"`)

test/unit/test.sh
test/integration/test.sh

exit $?
