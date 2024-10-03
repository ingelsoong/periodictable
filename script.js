const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');

let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -10,
    velocity: 0
};

let pipes = [];
let pipeWidth = 30;
let pipeGap = 120;
let frameCount = 0;
let score = 0;
let isGameOver = false;
let gameStarted = false;

startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    pipes = [];
    bird.y = 150;
    bird.velocity = 0;
    isGameOver = false;
    gameStarted = true;
    scoreDisplay.textContent = "Score: 0";
    startButton.style.display = 'none';

    // Game loop
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (isGameOver) return;

    update();
    draw();

    requestAnimationFrame(gameLoop);
}

function update() {
    frameCount++;

    // Bird physics
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Bird flaps with spacebar
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            bird.velocity = bird.lift;
        }
    });

    // Generate new pipes
    if (frameCount % 90 === 0) {
        let pipeY = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            y: pipeY,
            width: pipeWidth,
            gap: pipeGap
        });
    }

    // Move pipes and check for collisions
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 2;

        // Check for collision
        if (
            bird.x + bird.width > pipes[i].x &&
            bird.x < pipes[i].x + pipeWidth &&
            (bird.y < pipes[i].y || bird.y + bird.height > pipes[i].y + pipeGap)
        ) {
            gameOver();
        }

        // Remove pipes off screen
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }

    // Bird hits the ground or flies off-screen
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver();
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = '#ff0';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Draw pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipe.gap, pipe.width, canvas.height - (pipe.y + pipe.gap));
    });
}

function gameOver() {
    isGameOver = true;
    gameStarted = false;
    scoreDisplay.textContent = `Game Over! Final Score: ${score}`;
    startButton.style.display = 'inline-block';
}
