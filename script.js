// Array of math problems, with different questions each day based on date.
const mathProblems = [
    { question: '5 + 3', answer: 8 },
    { question: '12 - 7', answer: 5 },
    { question: '9 * 2', answer: 18 },
    { question: '15 / 3', answer: 5 },
    { question: '6 + 14', answer: 20 },
    { question: '20 - 9', answer: 11 },
];

// Function to generate a random question daily
function generateQuestion() {
    const today = new Date().getDate();
    const question = mathProblems[today % mathProblems.length];
    document.getElementById('question-box').innerText = `Question: ${question.question}`;
    return question.answer;
}

let correctAnswer = generateQuestion();

// Function to check if the answer is correct
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const result = document.getElementById('result');
    if (userAnswer === correctAnswer) {
        result.innerText = 'Correct!';
        result.style.color = 'green';
    } else {
        result.innerText = 'Wrong! Try again.';
        result.style.color = 'red';
    }
}

// ChatGPT Integration
async function askChatGPT() {
    const query = document.getElementById('chat-input').value;
    const responseBox = document.getElementById('chat-response');

    // Here you would replace the URL with your API URL to communicate with ChatGPT.
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: query }]
        })
    });

    const data = await response.json();
    responseBox.innerText = data.choices[0].message.content;
}
