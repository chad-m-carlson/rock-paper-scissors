let userScore = 0;
let computerScore = 0;
let userWins = 0;
let computerWins = 0;
let numberOfDraws = 0;
const buttons = document.querySelectorAll('.gameButton');
const playButton = document.getElementById('play');
const restart = document.querySelector('#restart');
const log = document.querySelector('#log');
const score = document.querySelector('#score');
const plays = document.querySelector('#plays');
const computer = document.getElementById('computer');
const user = document.getElementById('user');
const drawGame = document.getElementById('draw');

buttons.forEach((gamebutton) => gamebutton.disabled = true);

playButton.addEventListener('click', (e) => {
    if (document.getElementById('rounds').value == '' || document.getElementById('games').value == '') alert('Please enter number of games and rounds');
    else {
        buttons.forEach((gamebutton) => gamebutton.disabled = false);
        hideInputs();
    }
});
restart.addEventListener('click', (e) => {
    restartClicked();
});
buttons.forEach((gameButton) => {
    gameButton.addEventListener('click', (e) => {
        playerClicked = e.path[0].id;
        playRound(playerClicked);
    });
});

function hideInputs() {
    const tally = document.querySelector('.tally');
    const start = document.querySelector('.start');
    start.classList.toggle('hide');
    tally.classList.toggle('hide');
}

function restartClicked() {
    buttons.forEach((gamebutton) => gamebutton.disabled = true);
    hideInputs();
    resetGame();
    removeLogItems();
    user.removeChild(user.firstChild);
    computer.removeChild(computer.firstChild);
    drawGame.removeChild(draw.firstChild);
    userWins = 0;
    computerWins = 0;
    numberOfDraws = 0;
}

function computerPlay() {
    computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    return computerChoice;
}

function playRound(playerSelection) {
    numberOfGames = document.getElementById('games').value;
    const computerSelection = computerPlay();
    if ((playerSelection == computerSelection)) {
        gameResults('draw');
    } else if (playerSelection == 'rock' && computerSelection == 'paper' || playerSelection == 'scissors' && computerSelection == 'rock' || playerSelection == 'paper' && computerSelection == 'scissors') {
        computerScore++;
        gameResults('computer');
    } else if (playerSelection == 'rock' && computerSelection == 'scissors' || playerSelection == 'paper' && computerSelection == 'rock' || playerSelection == 'scissors' && computerSelection == 'paper') {
        userScore++;
        gameResults('player');
    }
    compPlay();
    checkResults();
}

function checkResults() {
    if (userScore + computerScore == numberOfGames) {
        if (userScore > computerScore) {
            const dd = document.createElement('dd');
            dd.innerHTML = `You win! ${userScore} to ${computerScore}.`;
            score.appendChild(dd);
            userWins++;
        } else if (computerScore > userScore) {
            const dd = document.createElement('dd');
            dd.innerHTML = `You lose! ${computerScore} to ${userScore}`;
            score.appendChild(dd);
            computerWins++;
        } else {
            const dd = document.createElement('dd');
            dd.innerHTML = `It's a tie! Please play again!`;
            score.appendChild(dd);
            numberOfDraws++;
        }
        resetGame();
        disableButton();
        writeScores();
        setTimeout(function () {
            rounds();
        }, 2000);
    }
}

function writeScores() {
    computer.innerHTML = `Computer Score: ${computerWins}`;
    user.innerHTML = `Player Score: ${userWins}`;
    drawGame.innerHTML = `Draw Game: ${numberOfDraws}`;
}

function rounds() {
    const numberOfRounds = document.getElementById('rounds').value;
    if (computerWins + userWins == numberOfRounds) {
        if (computerWins > userWins) {
            alert('Game Over! Computer wins the game');
        } else if (computerWins < userWins) {
            alert('Congratulations! You Win the Game');
        } else if (computerWins === userWins) {
            alert('It\'s a tie');
        }
        resetRounds();
        hideInputs();
    }
}

function disableButton() {
    buttons.forEach((gameButton) => gameButton.disabled = true);
    setTimeout(function () {
        enableButton();
        removeLogItems();
    }, 3000);
}

function enableButton() {
    buttons.forEach((gameButton) => {
        gameButton.disabled = false;
    });
}

function removeLogItems() {
    while (plays.hasChildNodes()) {
        plays.removeChild(plays.firstChild);
    }
    while (log.hasChildNodes()) {
        log.removeChild(log.firstChild);
    }
    while (score.hasChildNodes()) {
        score.removeChild(score.firstChild);
    }
}

function gameResults(winner) {
    if (winner == 'draw') {
        const dd = document.createElement('dd');
        dd.innerHTML = `It's a tie, you both played ${playerClicked}.`;
        log.appendChild(dd);
    }
    if (winner == 'computer') {
        const dd = document.createElement('dd');
        dd.innerHTML = `You Lose! ${computerChoice} beats ${playerClicked}.`;
        log.appendChild(dd);
    }
    if (winner == 'player') {
        const dd = document.createElement('dd');
        dd.innerHTML = `You win! ${playerClicked} beats ${computerChoice}.`;
        log.appendChild(dd);
    }
}

function compPlay() {
    const dd = document.createElement('dd');
    const t = document.createTextNode(`Computer played ${computerChoice}.`);
    dd.appendChild(t);
    plays.appendChild(dd);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
}

function resetRounds() {
    userWins = 0;
    computerWins = 0;
    numberOfDraws = 0;
    computer.innerHTML = '';
    user.innerHTML = '';
    drawGame.innerHTML = '';
}