// Function to generate random numbers
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random math question
function generateQuestion() {
    const operations = ['+', '-', '*', '/'];
    const num1 = getRandomNumber(1, 20);  // Generate random numbers between 1 and 20
    const num2 = getRandomNumber(1, 20);
    const operation = operations[getRandomNumber(0, operations.length - 1)];

    let question, correctAnswer;

    if (operation === '+') {
        question = `${num1} + ${num2}`;
        correctAnswer = num1 + num2;
    } else if (operation === '-') {
        question = `${num1} - ${num2}`;
        correctAnswer = num1 - num2;
    } else if (operation === '*') {
        question = `${num1} * ${num2}`;
        correctAnswer = num1 * num2;
    } else if (operation === '/') {
        // Ensure division leads to an integer result
        const dividend = num1 * num2; // This ensures num1 is a multiple of num2
        question = `${dividend} / ${num1}`;
        correctAnswer = dividend / num1;
    }

    document.getElementById('question-box').innerText = `Question: ${question}`;
    return correctAnswer;
}

let correctAnswer = generateQuestion(); // Store the correct answer

// Function to check if the answer is correct
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const result = document.getElementById('result');

    if (userAnswer === correctAnswer) {
        result.innerText = 'Correct!';
        result.style.color = 'green';
    } else {
        result.innerText = 'Wrong! Try again.';
        result.style.color = 'red';
    }
}
