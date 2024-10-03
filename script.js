const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Expanded character set including English, Japanese, and Chinese characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'


const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1); // Start with one drop in each column
const targetMessage = 'Happy Birthday Renee'; // Target message to form
const messageLength = targetMessage.length; // Length of the target message
let messageDropped = false; // Flag to check if the message has dropped
let showMessage = false; // Flag to determine whether to show the message
const dropSpeed = 35; // The interval to draw
const messageStartColumn = Math.floor((columns - messageLength) / 2); // Start column for message
const holdTime = 5000; // Time to hold the message (5 seconds)
const freezeDistance = 500; // Distance at which letters freeze
let messageTimeout; // Variable to store the timeout ID
let messageDrops = Array(messageLength).fill(0); // To track each letter's position
let fadeLevels = Array(messageLength).fill(0); // Array to track fade level for each letter
const fadeSpeed = 0.05; // Speed of fade-in effect

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Translucent black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Green color for the text
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = showMessage && i >= messageStartColumn && i < messageStartColumn + messageLength
            ? targetMessage.charAt(i - messageStartColumn) // Display target message if it's time
            : characters.charAt(Math.floor(Math.random() * characters.length)); // Random character

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // If the message has been dropped, it stays in place
        if (showMessage) {
            drops[i]++;
            if (drops[i] * fontSize >= freezeDistance / fontSize) {
                drops[i] = Math.floor(freezeDistance / fontSize); // Freeze at the specified distance
            }
            continue; // Skip dropping for message columns
        }

        // Reset drop to the top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0; // Reset the drop to the top
        }

        drops[i]++;
    }

    // Check if it's time to drop the message
    if (!messageDropped && Math.random() < 0.01) {
        messageDropped = true; // Start dropping the message

        // Set the drops for the message columns to start from the top
        for (let i = 0; i < messageLength; i++) {
            // Stagger each letter's drop with an increasing delay
            setTimeout(() => {
                messageDrops[i] = 0; // Start each letter's fall
                drops[messageStartColumn + i] = 0; // Set drop for the respective column

                // Initialize fade level for each letter
                fadeLevels[i] = 0; 
                
                // Gradually fade in the letters
                const fadeInterval = setInterval(() => {
                    if (fadeLevels[i] < 1) {
                        fadeLevels[i] += fadeSpeed; // Increment fade level
                    } else {
                        clearInterval(fadeInterval); // Stop fading when fully visible
                    }
                }, 50); // Update every 50 milliseconds

            }, i * 300); // 300ms delay for each letter
        }

        // Set a timeout to show the message
        messageTimeout = setTimeout(() => {
            showMessage = true; // Show the message
            setTimeout(() => {
                showMessage = false; // Hide the message after the hold time
            }, holdTime);
        }, messageLength * 300 + 500); // Delay to allow the message to drop a little
    }

    // Draw the message with fade effect
    if (showMessage) {
        for (let i = 0; i < messageLength; i++) {
            if (fadeLevels[i] > 0) {
                ctx.fillStyle = `rgba(0, 255, 0, ${fadeLevels[i]})`; // Apply fade level
                ctx.fillText(targetMessage.charAt(i), (messageStartColumn + i) * fontSize, freezeDistance);
            }
        }
    }
}

// Adjust the canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the animation
setInterval(draw, dropSpeed); // Draw every 35 milliseconds
