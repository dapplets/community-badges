#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying contract"

# https://docs.near.org/tools/near-cli#near-dev-deploy
NEAR_ENV=mainnet near deploy --wasmFile ./target/wasm32-unknown-unknown/release/badge_registry.wasm --masterAccount dapplets.mybadge.near --accountId dapplets.mybadge.near