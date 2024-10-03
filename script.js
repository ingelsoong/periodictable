const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const gameOverText = document.getElementById("game-over");
const startButton = document.getElementById("start-button");

let isJumping = false;
let isGameOver = false;
let gameStarted = false;

// Start the game on button click
startButton.addEventListener("click", function() {
    cactus.style.animation = "moveCactus 2s linear infinite"; // Start cactus movement
    startButton.style.display = "none"; // Hide the Start button
    gameStarted = true;
    isGameOver = false;
    cactus.style.display = "block"; // Ensure cactus is visible
});

// Handle jumping when spacebar is pressed
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping && !isGameOver && gameStarted) {
        jump();
    }
});

function jump() {
    if (isJumping) return; // Prevent multiple jumps at the same time

    let position = 0;
    isJumping = true;

    // Dino goes up
    let jumpInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(jumpInterval);

            // Dino goes down
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

// Collision detection
let collisionCheck = setInterval(() => {
    if (!gameStarted || isGameOver) return; // Don't check if the game hasn't started or is over

    const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Check if the cactus and dino collide
    if (cactusLeft > 50 && cactusLeft < 90 && dinoBottom <= 40) {
        // Stop the game
        cactus.style.animation = "none"; // Stop cactus movement
        isGameOver = true;
        gameOverText.classList.remove("hidden"); // Show Game Over message
    }
}, 10);
