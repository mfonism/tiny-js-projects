const
    minNum = 0,
    maxNum = 20
    ;

let
    winningNum,
    guessesLeft = 5
    ;

const
    game = document.getElementById('game'),
    guessForm = document.getElementById('guessForm'),
    minNumDisplay = document.querySelector('.min-num'),
    maxNumDisplay = document.querySelector('.max-num'),
    numGuessesDisplay = document.querySelector('.num-guesses-left'),
    guessInput = document.getElementById('guess'),
    guessSubmitBtn = document.querySelector('button'),
    messageDisplay = document.querySelector('.message')
    ;

minNumDisplay.appendChild(document.createTextNode(`${minNum}`));
maxNumDisplay.appendChild(document.createTextNode(`${maxNum}`));

window.addEventListener('DOMContentLoaded', init);
guessForm.addEventListener('submit', checkGuess);
guessInput.addEventListener('keyup', setSubmitButtonState);

function init() {
    winningNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    numGuessesDisplay.innerText = guessesLeft;
}

function checkGuess(event) {
    event.preventDefault();

    let guess = Number(guessInput.value);

    if (!isFinite(guess)) {
        displayMessage(`${guessInput.value} is not a number, you dolt!`, isError = true);
        return
    }

    guessesLeft--;
    numGuessesDisplay.innerText = guessesLeft;
    if (guess < winningNum) {
        displayMessage('Too low, bro!', isError = true);
        endGameIfOutOfGuesses();
    } else if (guess > winningNum) {
        displayMessage('Too hi, fi!', isError = true);
        endGameIfOutOfGuesses();
    } else {
        endGame(isLoss = false); // not the movie, LOL
    }
}

function displayMessage(message, isError = false) {
    messageDisplay.textContent = message;
    if (isError) {
        messageDisplay.classList.add('text-danger');
    } else {
        messageDisplay.classList.remove('text-danger');
        messageDisplay.classList.add('text-success');
    }
}

function setSubmitButtonState() {
    if (guessInput.value === '') {
        guessSubmitBtn.disabled = true;
    } else {
        guessSubmitBtn.disabled = false;
    }
}

function endGameIfOutOfGuesses() {
    if (guessesLeft < 1) {
        endGame();
    }
}

function endGame(isLoss = true) {
    if (isLoss) {
        displayMessage(`You\'re out of guesses, loser! The answer is ${winningNum}.`, isError = true);
    } else {
        displayMessage('Yaaaaayyyy, you win!');
    }
    guessSubmitBtn.disabled = true;
    guessInput.disabled = true;
}
