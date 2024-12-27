// script.js
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "JavaScript is fun to learn.",
    "Typing speed tests are great for improving skills.",
    "Always aim for accuracy over speed."
];

let timer = 0;
let interval;
let currentSentence = "";
let isTyping = false;

const sentenceElement = document.getElementById("sentence");
const inputBox = document.getElementById("input-box");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const restartButton = document.getElementById("restart-btn");

// Initialize the test
function initTest() {
    clearInterval(interval);
    timer = 0;
    isTyping = false;
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    sentenceElement.textContent = currentSentence;
    inputBox.value = "";
    timerElement.textContent = "0";
    wpmElement.textContent = "0";
    accuracyElement.textContent = "100";
}

// Start the timer
function startTimer() {
    if (!isTyping) {
        isTyping = true;
        interval = setInterval(() => {
            timer++;
            timerElement.textContent = timer;
        }, 1000);
    }
}

// Calculate stats
function calculateStats() {
    const typedText = inputBox.value;
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const correctChars = typedText.split("").filter((char, index) => char === currentSentence[index]).length;
    const accuracy = ((correctChars / currentSentence.length) * 100).toFixed(2);
    const wpm = Math.round((wordsTyped / timer) * 60);

    accuracyElement.textContent = isNaN(accuracy) ? "100" : accuracy;
    wpmElement.textContent = isNaN(wpm) ? "0" : wpm;
}

// Event listeners
inputBox.addEventListener("input", () => {
    startTimer();
    calculateStats();
    if (inputBox.value === currentSentence) {
        clearInterval(interval);
        alert("Test complete!");
    }
});

restartButton.addEventListener("click", initTest);

// Initialize on load
initTest();
