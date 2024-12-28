import { ethers } from '/hardhat';

async function main() {
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; 
    const TournamentScores = await ethers.getContractFactory("TournamentScores");
    const tournamentScores = await TournamentScores.attach(contractAddress);

    await tournamentScores.submitScore("Alice", 100);
    await tournamentScores.submitScore("Bob", 50);

    console.log("Scores submitted!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
