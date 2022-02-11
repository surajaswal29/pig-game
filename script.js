'use strict';

// functionality button
const rollDice = document.querySelector('#roll-dice');
const holdUp = document.querySelector('#hold-up');
const newGame = document.querySelector('#new-game');

const diceImage = document.querySelector('#dice-img'); //dice image

// scores
const mainScoreP1 = document.querySelector('#score-final-0');
const currentScoreP1 = document.querySelector('#score-current-0');
const mainScoreP2 = document.querySelector('#score-final-1');
const currentScoreP2 = document.querySelector('#score-current-1');

// selecting player boxes
const player1 = document.querySelector('#player-0');
const player2 = document.querySelector('#player-1');

diceImage.style.display = 'none';

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// switch player
function switchPlayer() {
  document.getElementById(`score-current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
}

// Rolling Dice functionality
rollDice.addEventListener('click', function () {
  let diceNumber = Math.trunc(Math.random() * 6) + 1; //Generating random dice number

  diceImage.style.display = 'block';
  diceImage.src = `dice-${diceNumber}.png`; //Showing random Dice Number

  //Check if dicenumber is not 1
  if (diceNumber !== 1) {
    currentScore += diceNumber;
    let a = document.getElementById(`score-current-${activePlayer}`);
    a.textContent = currentScore;
  } else {
    // switch player
    switchPlayer();
  }
});

holdUp.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score-final-${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .getElementById(`player-${activePlayer}`)
      .classList.remove('player-active');
    document
      .getElementById(`player-${activePlayer}`)
      .classList.add('winner-box');
    document.getElementById(`score-current-${activePlayer}`).textContent = 0;
    diceImage.style.display = 'none';
    rollDice.setAttribute('disabled', 'true');
    holdUp.setAttribute('disabled', 'true');
  } else {
    switchPlayer();
  }
});

newGame.addEventListener('click', function () {
  activePlayer = 0;
  player1.classList.add('player-active');
  player2.classList.remove('player-active');
  player2.classList.remove('winner-box');
  player1.classList.remove('winner-box');
  rollDice.removeAttribute('disabled', 'true');
  holdUp.removeAttribute('disabled', 'true');
  currentScore = 0;
  scores = [0, 0];
  mainScoreP1.textContent = 0;
  mainScoreP2.textContent = 0;
  currentScoreP1.textContent = 0;
  currentScoreP2.textContent = 0;
});
