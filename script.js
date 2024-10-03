const rainContainer = document.querySelector('.rain-container');

// Define the positions for the letters of "Kinetic Rain"
const textPositions = [
    { x: 100, y: -20 }, { x: 120, y: -20 }, { x: 140, y: -20 }, { x: 160, y: -20 }, // K
    { x: 200, y: -20 }, { x: 220, y: -20 }, { x: 240, y: -20 }, // I
    { x: 280, y: -20 }, { x: 300, y: -20 }, { x: 320, y: -20 }, // N
    { x: 360, y: -20 }, { x: 380, y: -20 }, { x: 400, y: -20 }, // E
    { x: 440, y: -20 }, { x: 460, y: -20 }, // T
    { x: 500, y: -20 }, { x: 520, y: -20 }, { x: 540, y: -20 }, // I
    { x: 580, y: -20 }, { x: 600, y: -20 }, // C
    { x: 640, y: -20 }, { x: 660, y: -20 }, { x: 680, y: -20 }, // R
    { x: 720, y: -20 }, { x: 740, y: -20 }, { x: 760, y: -20 }, // A
    { x: 800, y: -20 }, { x: 820, y: -20 }, // I
    { x: 860, y: -20 }, { x: 880, y: -20 }, { x: 900, y: -20 }  // N
];

// Function to create raindrops at specified positions
function createRaindrops() {
    textPositions.forEach((pos) => {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = `${pos.x}px`;
        drop.style.top = `${pos.y}px`;

        // Randomize animation duration and delay
        const duration = Math.random() * 2 + 2; // Between 2s and 4s for a slower fall
        const delay = Math.random() * 2; // Between 0s and 2s

        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${delay}s`;

        rainContainer.appendChild(drop);
    });
}

// Update background color based on time of day
function updateBackgroundColor() {
    const hour = new Date().getHours();
    const body = document.body;

    if (hour >= 6 && hour < 12) { // Morning
        body.style.backgroundColor = '#87CEEB'; // Light sky blue
    } else if (hour >= 12 && hour < 18) { // Afternoon
        body.style.backgroundColor = '#ADD8E6'; // Lighter sky blue
    } else if (hour >= 18 && hour < 21) { // Evening
        body.style.backgroundColor = '#FFD700'; // Sunset yellow
    } else { // Night
        body.style.backgroundColor = '#1E1E1E'; // Dark night
    }
}

// Event listener for clicks and key presses
document.addEventListener('click', createRaindrops);
document.addEventListener('keydown', createRaindrops);

// Update the background color when the page loads
updateBackgroundColor();
