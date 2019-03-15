var numberOfRounds;
var playerClicked;
var computerSelection;
var playerSelection;
let userScore = 0;
let computerScore = 0;
const buttons = document.querySelectorAll('.gameButton');
const submitButton = document.querySelector('#submit');
const restart = document.querySelector('#restart');
const log = document.querySelector('#log');
const para = document.createElement('p');
const score = document.querySelector('#score');
const plays = document.querySelector('#plays');



submitButton.addEventListener('click', (e) => {
    numberOfRounds = document.getElementById('entry').value;
    return numberOfRounds;
});
restart.addEventListener('click', (e) => {
    enableButton();
});
buttons.forEach((gameButton) => {
    gameButton.addEventListener('click', (e) => {
        if (numberOfRounds == undefined) {
            alert('Please enter number of rounds');
        } else {
            playerClicked = e.path[0].id;
            playRound();
            return playerClicked;
        }
    });
});

function computerPlay() {
    computerChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    return computerChoice;
}

function playRound() {
    const playerSelection = playerClicked;
    const computerSelection = computerPlay();
    if ((playerSelection == computerSelection)) {
        compPlay();
        draw();
        checkResults();
    } else if (playerSelection == 'rock' && computerSelection == 'paper' || playerSelection == 'scissors' && computerSelection == 'rock' || playerSelection == 'paper' && computerSelection == 'scissors') {
        compPlay();
        computerScore++;
        computerGame();
        checkResults();
    } else if (playerSelection == 'rock' && computerSelection == 'scissors' || playerSelection == 'paper' && computerSelection == 'rock' || playerSelection == 'scissors' && computerSelection == 'paper') {
        compPlay();
        userScore++;
        playerGame();
        checkResults();
    }
}

function checkResults() {
    if (userScore + computerScore == numberOfRounds) {
        if (userScore > computerScore) {
            const li = document.createElement('li');
            const t = document.createTextNode(`You win! ${userScore} to ${computerScore}.`);
            li.appendChild(t);
            score.appendChild(li);
            resetGame();
            disableButton();
        } else if (computerScore > userScore) {
            const li = document.createElement('li');
            const t = document.createTextNode(`You lose! ${computerScore} to ${userScore}`);
            li.appendChild(t);
            score.appendChild(li);
            resetGame();
            disableButton();
        } else {
            const li = document.createElement('li');
            const t = document.createTextNode(`It's a tie! Please play again!`);
            li.appendChild(t);
            score.appendChild(li);
            resetGame();
            disableButton();
        }
    }
}

function disableButton() {
    document.getElementById('rock').disabled = true;
    document.getElementById('paper').disabled = true;
    document.getElementById('scissors').disabled = true;
}

function enableButton() {
    document.getElementById('rock').disabled = false;
    document.getElementById('paper').disabled = false;
    document.getElementById('scissors').disabled = false;
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

function draw() {
    const li = document.createElement('li');
    const t = document.createTextNode(`It's a tie, you both played ${playerClicked}.`);
    li.appendChild(t);
    log.appendChild(li);
}

function computerGame() {
    const li = document.createElement('li');
    const t = document.createTextNode(`You Lose! ${computerChoice} beats ${playerClicked}.`);
    li.appendChild(t);
    log.appendChild(li);
}

function playerGame() {
    const li = document.createElement('li');
    const t = document.createTextNode(`You win! ${playerClicked} beats ${computerChoice}.`);
    li.appendChild(t);
    log.appendChild(li);
}

function compPlay() {
    const li = document.createElement('li');
    const t = document.createTextNode(`Computer played ${computerChoice}.`);
    li.appendChild(t);
    plays.appendChild(li);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    numberOfRounds = undefined;
}