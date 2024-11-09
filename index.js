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
  let score = 0;
  let dX = cellSize; // displacement on horizontal axis
  let dY = 0; // displacement on vertical axis

  function drawScoreBoard() {
    const scoreBoard = document.getElementById("score-board");
    scoreBoard.textContent = `Score: ${score}`;
  }

  function drawDiv(x, y, className) {
    const div = document.createElement("div");
    div.classList.add(className);
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;

    return div;
  }

  function drawFoodAndSnake() {
    // Wipe out everything on game arena and redraw with new updated
    // coordinates when snake moves.
    gameArena.innerHTML = "";

    snake.forEach((snakeCell) => {
      const elem = drawDiv(snakeCell.x, snakeCell.y, "snake");
      gameArena.appendChild(elem);
    });

    const foodElement = drawDiv(food.x, food.y, "food");
    gameArena.appendChild(foodElement);
  }

  function gameLoop() {
    setInterval(() => {
      drawScoreBoard();
      drawFoodAndSnake();
    }, 1000);
  }

  function runGame() {
    gameStarted = true;
    gameLoop();
  }

  function initiateGame() {
    const scoreBoard = document.createElement("div");
    scoreBoard.id = "score-board";
    document.body.insertBefore(scoreBoard, gameArena);

    const startBtn = document.createElement("button");
    startBtn.classList.add("start-button");
    startBtn.textContent = "Start";
    document.body.appendChild(startBtn);

    startBtn.addEventListener("click", () => {
      startBtn.style.display = "none";
      runGame();
    });
  }

  initiateGame();
});
