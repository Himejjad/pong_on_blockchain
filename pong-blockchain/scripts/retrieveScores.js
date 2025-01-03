const { ethers } = require("hardhat");

async function main() {
    // Use your actual deployed contract address here
    const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; 

    // Attach to the deployed TournamentScores contract
    const TournamentScores = await ethers.getContractFactory("TournamentScores");
    const tournamentScores = await TournamentScores.attach(contractAddress);

    // Call the getScores function to retrieve scores
    const scores = await tournamentScores.getScores();

    // Display the retrieved scores
    console.log("Tournament Scores:");
    console.log("-----------------");
    
    scores.forEach((score) => {
        const playerName = score.playerName;
        const scoreValue = score.score.toString(); // Convert BigNumber to string
        const timestampValue = new Date(score.timestamp.toNumber() * 1000).toLocaleString(); // Convert timestamp to readable format
        
        console.log(`Player Name: ${playerName}`);
        console.log(`Score: ${scoreValue}`);
        console.log(`Timestamp: ${timestampValue}`);
        console.log("-----------------"); // Separator for better readability
    });
}

// Execute the main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
