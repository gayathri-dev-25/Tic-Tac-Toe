const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const xScoreEl = document.getElementById('xScore');
const oScoreEl = document.getElementById('oScore');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const restartBtn = document.getElementById('restartBtn');

let xTurn = true;
let gameActive = false;
let xScore = 0;
let oScore = 0;

const WINNING_COMBINATIONS = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

startBtn.addEventListener('click', () => {
  resetBoard();
  gameActive = true;
  message.textContent = "Game Started!";
});

stopBtn.addEventListener('click', () => {
  gameActive = false;
  message.textContent = "Game Stopped.";
});

restartBtn.addEventListener('click', () => {
  xScore = 0;
  oScore = 0;
  updateScores();
  resetBoard();
  message.textContent = "Game Restarted!";
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

    cell.classList.add(xTurn ? 'x' : 'o');
    cell.textContent = xTurn ? 'X' : 'O';

    if (checkWin(xTurn ? 'x' : 'o')) {
      gameActive = false;
      const winner = xTurn ? 'X' : 'O';
      message.textContent = `${winner} wins! 🎉`;
      if (xTurn) {
        xScore++;
      } else {
        oScore++;
      }
      updateScores();
    } else if (isDraw()) {
      gameActive = false;
      message.textContent = "It's a draw!";
    } else {
      xTurn = !xTurn;
    }
  });
});

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => cells[index].classList.contains(player));
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function resetBoard() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x');
    cell.classList.remove('o');
  });
  xTurn = true;
  gameActive = true;
}

function updateScores() {
  xScoreEl.textContent = xScore;
  oScoreEl.textContent = oScore;
}


 