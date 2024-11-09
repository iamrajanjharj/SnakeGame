document.addEventListener("DOMContentLoaded", () => {
  const gameArena = document.getElementById("game-arena");
  const arenaSize = 600;
  const cellSize = 20;

  let gameStarted = false;
  let food = { x: 300, y: 200 };
  let snake = [
    { x: 160, y: 200 },
    { x: 140, y: 200 },
    { x: 120, y: 200 },
  ];
  let dX = cellSize; // displacement on horizontal axis
  let dY = 0; // displacement on vertical axis

  function startGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena);

    const startBtn = document.createElement("button");
    startBtn.classList.add("start-button");
    startBtn.textContent = "Start";
    document.body.appendChild(startBtn);
  }

  startGame();
});
