const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const gameOverText = document.getElementById("game-over");
const startButton = document.getElementById("start-button");

let isJumping = false;
let isGameOver = false;
let gameStarted = false;

// Start game on button click
startButton.addEventListener("click", function() {
    cactus.style.animation = "moveCactus 2s linear infinite"; // Start cactus movement
    startButton.style.display = "none"; // Hide the Start button
    gameStarted = true;
});

// Handle jumping
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping && !isGameOver && gameStarted) {
        jump();
    }
});

function jump() {
    if (isJumping) return;

    let position = 0;
    isJumping = true;

    let jumpInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(jumpInterval);

            // Falling down
            let fallInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    position -= 10;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            position += 10;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

// Detect collision
let collisionCheck = setInterval(() => {
    if (!gameStarted) return; // Don't check collision before the game starts

    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

    if (cactusLeft >= 40 && cactusLeft <= 80 && dinoBottom <= 40) {
        // Stop the game
        cactus.style.animation = "none";
        cactus.style.display = "none";
        isGameOver = true;
        gameOverText.classList.remove("hidden");
    }
}, 10);
