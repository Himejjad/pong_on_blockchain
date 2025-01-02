const HDWalletProvider = require('@truffle/hdwallet-provider');
const InfuraApiKey = "YOUR_INFURA_API_KEY"; // Replace with your Infura API Key
const mnemonic = "YOUR_MNEMONIC"; // Replace with your wallet seed phrase

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545, // This is the default port Ganache uses
            network_id: "*" // Match any network id
        },
        goerli: {
            provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${InfuraApiKey}`),
            network_id: 5,       // Goerli's id
            gas: 5500000,        // Gas limit
            confirmations: 2,    // # of confirmations to wait between deployments
            timeoutBlocks: 200,  // # of blocks before a deployment times out
            skipDryRun: true     // Skip dry run before migrations? (default: false for public nets)
        }
    },
    compilers: {
        solc: {
            version: "0.8.0",    // Specify the Solidity version (ensure it matches your contract)
        }
    },
};
