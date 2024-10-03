const container = document.getElementById('container');
const numberOfDrops = 100; // Total number of raindrops

function createDrop() {
    const drop = document.createElement('div');
    drop.classList.add('drop');

    // Set random position and animation duration
    const randomX = Math.random() * window.innerWidth; // Random X position
    const randomDuration = Math.random() * 1 + 1; // Random duration between 1s and 2s
    drop.style.left = `${randomX}px`; // Position the drop
    drop.style.animationDuration = `${randomDuration}s`; // Set the drop's fall duration
    drop.style.animationDelay = `${Math.random() * 2}s`; // Random delay for each drop

    container.appendChild(drop); // Add the drop to the container

    // Remove the drop after animation ends
    drop.addEventListener('animationend', () => {
        drop.remove(); // Remove drop from DOM
        createDrop(); // Create a new drop to maintain the rain effect
    });
}

// Create the initial drops
for (let i = 0; i < numberOfDrops; i++) {
    createDrop();
}
