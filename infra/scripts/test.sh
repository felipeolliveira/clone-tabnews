#!/bin/bash

function cleanup {
  npm run infra:down
  exit 0
}

trap cleanup INT

npm run infra:up &&
  npx concurrently --names next,jest \
    --hide next \
    --kill-others \
    -k --success command-jest \
    "next dev" "npx jest --runInBand"
