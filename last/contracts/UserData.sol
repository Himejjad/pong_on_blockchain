// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserData {
    struct User {
        string name;
        uint256 score;
        uint8 rank;
    }

    mapping(address => User) public users;

    event UserDataUpdated(address indexed user, string name, uint256 score, uint8 rank);

    function setUserData(string calldata _name, uint256 _score, uint8 _rank) external {
        users[msg.sender] = User(_name, _score, _rank);
        emit UserDataUpdated(msg.sender, _name, _score, _rank);
    }

    function getUserData(address _user) external view returns (string memory, uint256, uint8) {
        User memory user = users[_user];
        return (user.name, user.score, user.rank);
    }
}
