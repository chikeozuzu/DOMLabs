// Simple Guessing Game
// Uses window.prompt for input, window.alert for final messages, and DOM manipulation
// to show progress, hints, and results on the page.

// Select the app container where we'll render the game's UI
const app = document.getElementById('app');

// Create UI elements
const gameEl = document.createElement('div');
gameEl.className = 'game';

gameEl.innerHTML = `
    <h1>Guess the Number</h1>
    <p class="instructions">I'm thinking of a number between <span class="min">1</span> and <span class="max">100</span>. You have <span class="limit">10</span> attempts.</p>
    <div class="status">Range: <strong><span class="range">1 - 100</span></strong></div>
    <div class="hint">Click <strong>Start Guessing</strong> to begin.</div>
    <div class="controls">
        <button class="start">Start Guessing</button>
        <button class="reset">Reset Game</button>
    </div>
    <div class="progress"><div class="bar"><div class="fill" style="width:0%"></div></div></div>
    <div class="guesses"><strong>Guesses:</strong> <span class="list">(none yet)</span></div>
    <div class="result"></div>
`;

app.appendChild(gameEl);

// Game state
let secret = null;
let min = 1;
let max = 100;
let attempts = 0;
const maxAttempts = 10;
let guesses = [];

// Element references
const startBtn = gameEl.querySelector('.start');
const resetBtn = gameEl.querySelector('.reset');
const hintEl = gameEl.querySelector('.hint');
const rangeEl = gameEl.querySelector('.range');
const minSpan = gameEl.querySelector('.min');
const maxSpan = gameEl.querySelector('.max');
const listEl = gameEl.querySelector('.list');
const fillEl = gameEl.querySelector('.fill');
const resultEl = gameEl.querySelector('.result');

// Initialize a new secret and reset the UI
function initGame() {
    secret = Math.floor(Math.random() * 100) + 1; // secret between 1 and 100
    min = 1;
    max = 100;
    attempts = 0;
    guesses = [];
    rangeEl.textContent = `${min} - ${max}`;
    minSpan.textContent = min;
    maxSpan.textContent = max;
    hintEl.textContent = 'Click Start Guessing to begin.';
    listEl.textContent = '(none yet)';
    fillEl.style.width = '0%';
    resultEl.textContent = '';
    startBtn.disabled = false;
}

// Update the UI after each guess
function updateUI() {
    rangeEl.textContent = `${min} - ${max}`;
    minSpan.textContent = min;
    maxSpan.textContent = max;
    listEl.textContent = guesses.length ? guesses.join(', ') : '(none yet)';
    const pct = Math.min(100, Math.round((attempts / maxAttempts) * 100));
    fillEl.style.width = pct + '%';
}

// Ask the user for a guess using window.prompt and process it.
function askGuess() {
    // If game over, do nothing
    if (attempts >= maxAttempts) return;

    // Use window.prompt to gather input from the user
    const raw = window.prompt(`Enter a number between ${min} and ${max} (attempt ${attempts + 1} of ${maxAttempts})`);

    // If user cancelled prompt (raw === null), stop prompting
    if (raw === null) {
        hintEl.textContent = 'You cancelled the current round.';
        return;
    }

    const n = parseInt(raw, 10);
    // Validate input
    if (Number.isNaN(n)) {
        hintEl.textContent = 'That is not a valid number. Try again.';
        return;
    }
    if (n < min || n > max) {
        hintEl.textContent = `Please guess within the current range ${min} - ${max}.`;
        return;
    }

    // Record the guess and update attempts
    guesses.push(n);
    attempts += 1;

    // If guess is correct, win
    if (n === secret) {
        updateUI();
        resultEl.textContent = `Correct! The number was ${secret}. You guessed it in ${attempts} attempt(s).`;
        window.alert(`You win! The number was ${secret}. Attempts: ${attempts}`);
        startBtn.disabled = true;
        hintEl.textContent = 'You found the number — congratulations!';
        return;
    }

    // Push user toward the correct answer by narrowing the min/max range
    if (n < secret) {
        // Guess is too low, raise the min bound
        min = Math.max(min, n + 1);
        hintEl.textContent = 'Too low — try a higher number.';
    } else {
        // Guess is too high, lower the max bound
        max = Math.min(max, n - 1);
        hintEl.textContent = 'Too high — try a lower number.';
    }

    updateUI();

    // Check for run out of attempts
    if (attempts >= maxAttempts) {
        resultEl.textContent = `Out of attempts. The number was ${secret}.`;
        window.alert(`Game over. The number was ${secret}.`);
        startBtn.disabled = true;
    }
}

// Wire up controls
startBtn.addEventListener('click', () => {
    // On each Start click we ask one guess (keeps DOM-driven flow while using prompt)
    askGuess();
});

resetBtn.addEventListener('click', () => {
    initGame();
});

// Initialize first game on page load
initGame();

// Comments explaining key logic are placed inline above each function.
