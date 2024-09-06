#!/bin/bash

function cleanup {
  npm run infra:down
  exit 0
}

trap cleanup INT

npm run infra:up && npm run wait-for-postgres && npm run migration:up && next dev
