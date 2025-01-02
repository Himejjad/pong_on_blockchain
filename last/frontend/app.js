import { ethers } from 'ethers'; // Import Ethers.js

const CONTRACT_ADDRESS = "0x5d913987ac8bf28fd8db6209676a6ad9bc625bdf"; // Replace with your deployed contract address
const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
            { "indexed": false, "internalType": "uint256", "name": "score", "type": "uint256" },
            { "indexed": false, "internalType": "uint8", "name": "rank", "type": "uint8" }
        ],
        "name": "UserDataUpdated",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "users",
        "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "uint256", "name": "score", "type": "uint256" },
            { "internalType": "uint8", "name": "rank", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "uint256", "name": "_score", "type": "uint256" },
            { "internalType": "uint8", "name": "_rank", "type": "uint8" }
        ],
        "name": "setUserData",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
        "name": "getUserData",
        "outputs": [
            { "internalType": "string", "name": "", "type": "string" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint8", "name": "", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];

let currentAccount = null; // Variable to store user's current account

async function connectMetaMask() {
    if (typeof window.ethereum === 'undefined') {
        console.error("MetaMask is not installed.");
        alert("MetaMask is not installed! Please install it and try again.");
        return false;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
        console.log("Requesting MetaMask connection...");
        const accounts = await provider.send("eth_requestAccounts", []);
        currentAccount = accounts[0]; // Store the user's account
        console.log("Connected to MetaMask:", currentAccount);
        document.getElementById('setDataStatus').innerText = "Connected to MetaMask!";
        return true;
    } catch (error) {
        console.error("MetaMask connection error:", error);
        alert("MetaMask connection failed. Please allow access to your wallet.");
        return false;
    }
}

document.getElementById('connectButton').addEventListener('click', async () => {
    const isConnected = await connectMetaMask();
    if (isConnected) {
        document.getElementById('setDataStatus').innerText = "Wallet connected successfully.";
    }
});

/* Set user data in the smart contract */
document.getElementById('setData').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    const rank = document.getElementById('rank').value;

    if (!currentAccount) {
        alert("Please connect your wallet first.");
        return;
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, new ethers.providers.Web3Provider(window.ethereum).getSigner());
    try {
        console.log("Sending transaction to set user data...");
        const tx = await contract.setUserData(name, score, parseInt(rank));
        document.getElementById('setDataStatus').innerText = "Transaction sent! Waiting for confirmation...";
        await tx.wait();
        console.log("Transaction confirmed.");
        document.getElementById('setDataStatus').innerText = "Data successfully updated!";
    } catch (err) {
        console.error("Error while setting user data:", err);
        document.getElementById('setDataStatus').innerText = `Error: ${err.message}`;
    }
});

/* Get user data from the smart contract */
document.getElementById('getData').addEventListener('click', async () => {
    const address = document.getElementById('address').value;

    if (!currentAccount) {
        alert("Please connect your wallet first.");
        return;
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, new ethers.providers.Web3Provider(window.ethereum).getSigner());
    try {
        console.log("Fetching user data...");
        const userData = await contract.getUserData(address);
        const name = userData[0];
        const score = userData[1];
        const rank = userData[2];
        console.log("User data fetched:", { name, score, rank });
        document.getElementById('dataResult').innerText = `Name: ${name}, Score: ${score}, Rank: ${rank}`;
    } catch (err) {
        console.error("Error while fetching user data:", err);
        document.getElementById('dataResult').innerText = `Error: ${err.message}`;
    }
});
