const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const gameOverText = document.getElementById("game-over");

let isJumping = false;
let isGameOver = false;

// Handle jumping
document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !isJumping && !isGameOver) {
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
