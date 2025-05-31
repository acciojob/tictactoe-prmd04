const start = document.getElementById("submit");
const playerInfo = document.querySelector(".player-input");
const messageDiv = document.querySelector(".message");
const gameDiv = document.querySelector(".game");
let boxes = document.querySelectorAll(".box");

let player1 = '';
let player2 = '';
let turnX = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Start the game
start.addEventListener("click", () => {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();
  
  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }
  
  playerInfo.style.display = "none";
  messageDiv.style.display = "block";
  messageDiv.innerText = `${player1}, you're up`;
  gameDiv.style.display = "flex"; 
});

// Handle box clicks
boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (box.innerText !== "") return; // Prevent overwriting

    box.innerText = turnX ? "x" : "o";
    box.disabled = true;
    
    messageDiv.innerText = turnX ? `${player2}, you're up` : `${player1}, you're up`;
    turnX = !turnX; // Switch turns

    checkWinner();
  });
});

// Check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 && pos1 === pos2 && pos2 === pos3) {
      const winnerName = pos1 === "x" ? player1 : player2;
      messageDiv.innerText = `${winnerName}, congratulations you won!`;
      boxes.forEach(box => box.disabled = true); // Disable all boxes
      return;
    }
  }
  
  // Check for draw condition
  if ([...boxes].every(box => box.innerText !== "")) {
    messageDiv.innerText = "It's a draw!";
  }
};