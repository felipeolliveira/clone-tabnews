#!/bin/bash

function cleanup {
  npm run infra:down
  exit 0
}

trap cleanup INT

npm run infra:up && next dev
