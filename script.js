const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const messageDiv = document.querySelector(".message");
const gameDiv = document.querySelector(".game");
const boardDiv = document.querySelector(".board");

let currentPlayer = "x";
let player1 = "";
let player2 = "";
let board = Array(9).fill("");
let cells = [];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.querySelector(".player-input").style.display = "none";
  gameDiv.style.display = "block";

  renderBoard();
  updateMessage();
});

function renderBoard() {
  boardDiv.innerHTML = "";
  board = Array(9).fill("");
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = (i + 1).toString(); // For Cypress test
    cell.addEventListener("click", () => handleMove(i));
    boardDiv.appendChild(cell);
    cells.push(cell);
  }
}

function handleMove(index) {
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === "x" ? "player1" : "player2";
	updateMessage(`${winner} congratulations you won!`);
    disableBoard();
  } else if (board.every(cell => cell !== "")) {
    updateMessage("It's a draw!");
  } else {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    updateMessage();
  }
}

function updateMessage(msg = "") {
  if (msg) {
    messageDiv.textContent = msg;
  } else {
    const name = currentPlayer === "x" ? player1 : player2;
    messageDiv.textContent = `${name}, you're up`;
  }
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function disableBoard() {
  cells.forEach(cell => {
    cell.style.pointerEvents = "none";
  });
}
