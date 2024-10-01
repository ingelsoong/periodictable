const gameArea = document.getElementById('game');
const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score');

let birdY = 250; // Initial bird position
let gravity = 2; // Gravity effect
let isGameOver = false;
let score = 0;

// Function to make the bird jump
function jump() {
    if (!isGameOver) {
        birdY -= 50; // Move the bird up
        bird.style.bottom = birdY + 'px'; // Update bird position
    }
}

// Function to create pipes
function createPipe() {
    const pipe = document.createElement('div');
    const randomHeight = Math.floor(Math.random() * 200) + 100; // Random height for the gap
    pipe.classList.add('pipe');
    pipe.style.height = randomHeight + 'px';
    pipe.style.left = '400px'; // Start from the right edge
    gameArea.appendChild(pipe);

    // Move the pipe to the left
    const movePipe = setInterval(() => {
        if (isGameOver) {
            clearInterval(movePipe);
            return;
        }

        const pipeLeft = parseInt(pipe.style.left);
        if (pipeLeft < -50) {
            clearInterval(movePipe);
            gameArea.removeChild(pipe);
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
        } else {
            pipe.style.left = pipeLeft - 3 + 'px';
        }

        // Collision detection
        if (pipeLeft < 100 && pipeLeft > 50 && birdY < randomHeight) {
            gameOver();
        }
    }, 20);
}

// Function to end the game
function gameOver() {
    isGameOver = true;
    alert('Game Over! Your score: ' + score);
    location.reload(); // Reload the page to restart the game
}

// Start the game
document.addEventListener('keydown', jump);
setInterval(createPipe, 2000); // Create a new pipe every 2 seconds

// Apply gravity
setInterval(() => {
    if (!isGameOver) {
        birdY += gravity; // Move the bird down
        bird.style.bottom = birdY + 'px'; // Update bird position

        // Check if the bird hits the ground
        if (birdY < 0) {
            gameOver();
        }
    }
}, 20);
