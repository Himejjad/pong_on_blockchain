const { ethers } = require('hardhat');

async function main() {
    const TournamentScores = await ethers.getContractFactory("TournamentScores");

    const tournamentScores = await TournamentScores.deploy();

    await tournamentScores.deployed();
    
    console.log("TournamentScores deployed to:", tournamentScores.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
