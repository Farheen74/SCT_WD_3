const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const player1Card = document.getElementById("player1");
const player2Card = document.getElementById("player2");
const resultModal = document.getElementById("resultModal");
const resultMessage = document.getElementById("resultMessage");
const newGameBtn = document.getElementById("newGameBtn");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

cells.forEach((cell) => cell.addEventListener("click", playerMove));
restartBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", () => {
    closeResultModal();
    resetGame();
});
resultModal.addEventListener("click", (event) => {
    if (event.target === resultModal) {
        closeResultModal();
    }
});

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function updateTurnUI() {
    player1Card.classList.toggle("active", currentPlayer === "X");
    player2Card.classList.toggle("active", currentPlayer === "O");
    statusText.textContent = gameOver
        ? "Game over — tap the button to play again."
        : `Player ${currentPlayer === "X" ? "1" : "2"}'s turn (${currentPlayer})`;
}

function showResultModal(message) {
    resultMessage.textContent = message;
    resultModal.classList.remove("hidden");
    statusText.textContent = message;
}

function closeResultModal() {
    resultModal.classList.add("hidden");
}

async function playerMove() {
    const index = Number(this.dataset.index);
    if (board[index] !== "" || gameOver) {
        return;
    }

    const response = await fetch("/play_move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ board, index, current_player: currentPlayer })
    });

    const data = await response.json();
    board = data.board;
    currentPlayer = data.current_player;
    updateBoard();

    if (data.winner) {
        gameOver = true;
        let message = "";

        if (data.winner === "X") {
            message = "🎉 Player 1 wins!";
        } else if (data.winner === "O") {
            message = "🎉 Player 2 wins!";
        } else {
            message = "🤝 It's a draw!";
        }

        showResultModal(message);
    } else {
        updateTurnUI();
    }
}

function resetGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameOver = false;
    updateBoard();
    updateTurnUI();
    closeResultModal();
}

updateTurnUI();
