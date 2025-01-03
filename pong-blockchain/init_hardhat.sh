#!/bin/sh

npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethers

npx hardhat compile

npx hardhat node &

sleep 10s

npx hardhat run scripts/deploy.js --network localhost

while true
do
  sleep 1
done