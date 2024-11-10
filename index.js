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

  function moveFood() {
    let newX, newY;

    do {
      newX = Math.floor(
        Math.random() + ((arenaSize - cellSize) / cellSize) * cellSize
      );
      newY = Math.floor(
        Math.random() + ((arenaSize - cellSize) / cellSize) * cellSize
      );
    } while (
      snake.some((snakeCell) => snakeCell.x == newX && snakeCell.y == newY)
    );

    food = { x: newX, y: newY };
  }

  function updateSnake() {
    const newHead = { x: snake[0].x + dX, y: snake[0].y + dY };
    snake.unshift(newHead); // add new head coordinates in front of the snake array
    if (newHead.x == food.x && newHead.y == food.y) {
      // collision of the snake and food happened
      // consume the food and grow the snake(don't pop the tail)
      score += 5;

      // move the food
      moveFood();
    } else {
      snake.pop(); // remove the last tail from the snake array.
    }
  }

  function isGameOver() {
    // check snake body hit

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) return true;
    }

    // check for wall collision
    const isHittingLeftWall = snake[0].x < 0;
    const isHittingTopWall = snake[0].y < 0;
    const isHittingRightWall = snake[0].x >= arenaSize;
    const isHittingBottonWall = snake[0].y >= arenaSize;

    return (
      isHittingLeftWall ||
      isHittingRightWall ||
      isHittingTopWall ||
      isHittingBottonWall
    );
  }

  function gameLoop() {
    setInterval(() => {
      // check if game started;

      if (!gameStarted) return;

      // check for game over

      if (isGameOver()) {
        gameStarted = false;
        window.alert(`Game Over. Score: ${score}`);
        window.location.reload();
        return;
      }

      updateSnake();
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
