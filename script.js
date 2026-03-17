const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Create the snake
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = spawnFood();
let score = 0;

// Game loop
setInterval(gameLoop, 100);

function gameLoop() {
    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        resetGame();
    }
    if (checkFood()) {
        score++;
        food = spawnFood();
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };
    snake.unshift(head);
    snake.pop();
}

function checkCollision() {
    // Wall collision
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function checkFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function spawnFood() {
    const x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    const y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
    return { x, y };
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    food = spawnFood();
}

// Control snake direction
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = { x: 1, y: 0 };
            }
            break;
    }
});