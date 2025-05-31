//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const messageDiv = document.querySelector(".message");
const gameDiv = document.querySelector(".game");
const boardDiv = document.querySelector(".board");

let currentPlayer = "X";
let player1 = "";
let player2 = "";
let cells = [];
let board = Array(9).fill("");

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  document.querySelector(".player-input").style.display = "none";
  gameDiv.style.display = "block";
  renderBoard();
  updateMessage();
});

function renderBoard() {
  boardDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i + 1;
    cell.addEventListener("click", () => handleMove(i));
    boardDiv.appendChild(cell);
    cells[i] = cell;
  }
}

function updateMessage(text = "") {
  if (text) {
    messageDiv.textContent = text;
  } else {
    const currentName = currentPlayer === "X" ? player1 : player2;
    messageDiv.textContent = `${currentName}, you're up!`;
  }
}

function handleMove(index) {
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    const winnerName = currentPlayer === "X" ? player1 : player2;
    updateMessage(`${winnerName}, congratulations you won! 🎉`);
    disableBoard();
  } else if (board.every(cell => cell !== "")) {
    updateMessage("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage();
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
