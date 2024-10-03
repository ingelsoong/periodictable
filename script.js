let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let startButton = document.getElementById("startButton");

let score = 0;
let isJumping = false;
let isGameOver = false;
let gameInterval;
let obstacleInterval;

// Start the game
startButton.addEventListener("click", startGame);

function startGame() {
    score = 0;
    isGameOver = false;
    scoreDisplay.innerText = "Score: " + score;
    obstacle.style.right = "-30px"; // Reset obstacle position
    startButton.style.display = "none"; // Hide start button

    gameInterval = setInterval(() => {
        score++;
        scoreDisplay.innerText = "Score: " + score;
    }, 1000);

    obstacleInterval = setInterval(() => {
        moveObstacle();
    }, 20);
}

// Jump function
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 50) {
            clearInterval(jumpInterval);
            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 5;
                player.style.bottom = jumpHeight + "px";
            }, 20);
        }
        jumpHeight += 5;
        player.style.bottom = jumpHeight + "px";
    }, 20);
}

// Move the obstacle
function moveObstacle() {
    let obstaclePosition = parseInt(getComputedStyle(obstacle).right);
    if (obstaclePosition < 400 && !isGameOver) {
        obstacle.style.right = obstaclePosition + 5 + "px"; // Move the obstacle to the left
    } else {
        obstacle.style.right = "-30px"; // Reset obstacle position
    }

    checkCollision(obstaclePosition);
}

// Check for collisions
function checkCollision(obstaclePosition) {
    const playerPosition = parseInt(getComputedStyle(player).bottom);
    if (obstaclePosition > 20 && obstaclePosition < 70 && playerPosition < 50) {
        gameOver();
    }
}

// End the game
function gameOver() {
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
    isGameOver = true;
    alert("Game Over! Your score: " + score);
    startButton.style.display = "block"; // Show start button again
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});
