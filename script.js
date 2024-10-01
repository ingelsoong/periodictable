const rainContainer = document.getElementById('rain');

function createDrop() {
    const drop = document.createElement('div');
    drop.classList.add('drop');

    // Set random position for the raindrop
    drop.style.left = Math.random() * window.innerWidth + 'px';

    // Set random animation duration for the raindrop
    drop.style.animationDuration = Math.random() * 1 + 0.5 + 's'; // 0.5 to 1.5 seconds

    rainContainer.appendChild(drop);

    // Remove the drop after it falls
    drop.addEventListener('animationend', () => {
        drop.remove();
    });
}

// Create a raindrop every 100 milliseconds
setInterval(createDrop, 100);
