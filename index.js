document.addEventListener("DOMContentLoaded", () => {
  const gameArena = document.getElementById("game-arena");
  const arenaSize = 600;
  const cellSize = 20;

  const LEFT_KEY = 37;
  const UP_KEY = 38;
  const RIGHT_KEY = 39;
  const DOWN_KEY = 40;

  let gameSpeed = 300;
  let intervalId;

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
      newX =
        Math.floor((Math.random() * (arenaSize - cellSize)) / cellSize) *
        cellSize;
      newY =
        Math.floor((Math.random() * (arenaSize - cellSize)) / cellSize) *
        cellSize;
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

      if (gameSpeed > 30) {
        gameSpeed -= 10;
        clearInterval(intervalId);
        gameLoop();
      }

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
    const isHittingLeftWall = snake[0].x + cellSize < 0;
    const isHittingTopWall = snake[0].y + cellSize < 0;
    const isHittingRightWall = snake[0].x + cellSize >= arenaSize;
    const isHittingBottonWall = snake[0].y + cellSize >= arenaSize;

    return (
      isHittingLeftWall ||
      isHittingRightWall ||
      isHittingTopWall ||
      isHittingBottonWall
    );
  }

  function gameLoop() {
    intervalId = setInterval(() => {
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
    }, gameSpeed);
  }

  function changeDirection(event) {
    event.preventDefault();
    const keyPressed = event.keyCode;
    const isGoingUp = dY == -cellSize;
    const isGoingDown = dY == cellSize;
    const isGoingRight = dX == cellSize;
    const isGoingLeft = dX == -cellSize;

    if (keyPressed == LEFT_KEY && !isGoingRight) {
      dX = -cellSize;
      dY = 0;
    } else if (keyPressed == RIGHT_KEY && !isGoingLeft) {
      dX = cellSize;
      dY = 0;
    } else if (keyPressed == UP_KEY && !isGoingDown) {
      dX = 0;
      dY = -cellSize;
    } else if (keyPressed == DOWN_KEY && !isGoingUp) {
      dX = 0;
      dY = cellSize;
    }
  }

  function runGame() {
    if (!gameStarted) {
      gameStarted = true;
      gameLoop();
      document.addEventListener("keydown", changeDirection);
    }
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
