var numberOfRounds;
var playerClicked;
let userScore = 0;
let computerScore = 0;
let userWins = 0;
let computerWins = 0;
const buttons = document.querySelectorAll('.gameButton');
const submitButton = document.querySelector('#submit');
const restart = document.querySelector('#restart');
const log = document.querySelector('#log');
const score = document.querySelector('#score');
const plays = document.querySelector('#plays');
const start = document.querySelector('.start');
const tally = document.querySelector('.tally');
const computer = document.getElementById('computer');
const user = document.getElementById('user');


submitButton.addEventListener('click', (e) => {
    numberOfRounds = document.getElementById('entry').value;
    hideThings();
    return numberOfRounds;
});
restart.addEventListener('click', (e) => {
    restartClicked();
});
buttons.forEach((gameButton) => {
    gameButton.addEventListener('click', (e) => {
        console.log(e);
        if (numberOfRounds == undefined) {
            alert('Please enter number of rounds');
        } else {
            playerClicked = e.path[0].id;
            playRound();
            return playerClicked;
        }
    });
});

function hideThings() {
    start.classList.toggle('hide');
    tally.classList.toggle('hide');
}
function restartClicked() {
    enableButton();
    hideThings();
    resetGame();
    removeLogItems();
    numberOfRounds = undefined;
    user.removeChild(user.firstChild);
    computer.removeChild(computer.firstChild);
    userWins = 0;
    computerWins = 0;
}

function computerPlay() {
    computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    return computerChoice;
}

function playRound() {
    numberOfRounds = document.getElementById('entry').value;
    const playerSelection = playerClicked;
    const computerSelection = computerPlay();
    if ((playerSelection == computerSelection)) {
        draw();
    } else if (playerSelection == 'rock' && computerSelection == 'paper' || playerSelection == 'scissors' && computerSelection == 'rock' || playerSelection == 'paper' && computerSelection == 'scissors') {
        computerScore++;
        computerGame();
    } else if (playerSelection == 'rock' && computerSelection == 'scissors' || playerSelection == 'paper' && computerSelection == 'rock' || playerSelection == 'scissors' && computerSelection == 'paper') {
        userScore++;
        playerGame();
    }
    compPlay();
    checkResults();
}

function checkResults() {
    if (userScore + computerScore == numberOfRounds) {
        if (userScore > computerScore) {
            const dd = document.createElement('dd');
            dd.innerHTML = `You win! ${userScore} to ${computerScore}.`;
            score.appendChild(dd);
            userWins += 1;
        } else if (computerScore > userScore) {
            const dd = document.createElement('dd');
            dd.innerHTML = `You lose! ${computerScore} to ${userScore}`;
            score.appendChild(dd);
            computerWins += 1;
        } else {
            const dd = document.createElement('dd');
            dd.innerHTML = `It's a tie! Please play again!`;
            score.appendChild(dd);
        }
        resetGame();
        disableButton();
        calculateScores();
    }
}

function calculateScores() {
    computer.innerHTML = `Computer Score: ${computerWins}`;
    user.innerHTML = `Player Score: ${userWins}`;
}

function disableButton() {
    buttons.forEach((gameButton) => {
        gameButton.disabled = true;
    });
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
    while (score.hasChildNodes()){
        score.removeChild(score.firstChild);
    }
}

function draw() {
    const dd = document.createElement('dd');
    dd.innerHTML = `It's a tie, you both played ${playerClicked}.`;
    log.appendChild(dd);
}

function computerGame() {
    const dd = document.createElement('dd');
    dd.innerHTML = `You Lose! ${computerChoice} beats ${playerClicked}.`;
    log.appendChild(dd);
}

function playerGame() {
    const dd = document.createElement('dd');
    dd.innerHTML = `You win! ${playerClicked} beats ${computerChoice}.`;
    log.appendChild(dd);
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