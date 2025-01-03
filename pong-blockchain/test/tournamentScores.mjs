import { expect } from "chai";
// import { ethers } from "hardhat";

describe("TournamentScores Contract", function () {
    let TournamentScores;
    let tournamentScores;

    beforeEach(async function () {
        TournamentScores = await ethers.getContractFactory("TournamentScores");
        tournamentScores = await TournamentScores.deploy();
        await tournamentScores.deployed();
    });

    it("should submit a score", async function () {
        await tournamentScores.submitScore("Alice", 100);
        const scores = await tournamentScores.getScores();
        expect(scores.length).to.equal(1);
        expect(scores[0].playerName).to.equal("Alice");
        // Correctly compare BigNumber objects
        expect(ethers.utils.formatUnits(scores[0].score, 0)).to.equal("100");
    });
});
