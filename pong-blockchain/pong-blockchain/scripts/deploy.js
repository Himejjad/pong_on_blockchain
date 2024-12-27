const { ethers } = require('hardhat');

async function main() {
    // Get the contract factory
    const TournamentScores = await ethers.getContractFactory("TournamentScores");

    // Deploy the contract
    const tournamentScores = await TournamentScores.deploy();

    // Wait for the deployment to satisfy any conditions
    await tournamentScores.deployed();
    
    // Log the deployed contract address
    console.log("TournamentScores deployed to:", tournamentScores.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
