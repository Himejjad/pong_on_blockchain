const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill('');

const fetchStats = async () => {
    const response = await fetch('http://localhost:5000/api/games');
    const games = await response.json();
    console.log(games);
};

const updateGameStats = async (winner) => {
    const response = await fetch('http://localhost:5000/api/games/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ winner }),
    });
    await response.json();
};

// const resetGameStats = async () => {
//     const response = await fetch('http://localhost:5000/api/games/reset', {
//         method: 'POST',
//     });
//     const result = await response.json();
//     console.log(result.message);
// };

const checkWinner = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const makeMove = (index) => {
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            messageDiv.textContent = `${winner} wins!`;
            updateGameStats(winner);
            cells.forEach(cell => cell.style.pointerEvents = 'none');
        } else if (!board.includes('')) {
            messageDiv.textContent = `It's a draw!`;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

restartButton.addEventListener('click', () => {
    board.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.pointerEvents = 'auto';
    });
    messageDiv.textContent = '';
});

// resetButton.addEventListener('click', () => {
//     resetGameStats();
//     restartButton.click();
// });

// Load stats on page load
fetchStats();
