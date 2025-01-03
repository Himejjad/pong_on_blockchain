// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TournamentScores {
    struct Score {
        string playerName;
        uint256 score;
        uint256 timestamp;
    }

    Score[] public scores;

    event ScoreSubmitted(string playerName, uint256 score, uint256 timestamp);

    function submitScore(string memory playerName, uint256 score) public {
        scores.push(Score(playerName, score, block.timestamp));
        emit ScoreSubmitted(playerName, score, block.timestamp);
    }

    function getScores() public view returns (Score[] memory) {
        return scores;
    }
}
