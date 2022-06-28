'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    activePlayer = activePlayer === 0 ? 1 : 0; //if the activePlayer is 0, then let it be 1.

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Starting conditions:
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling dice functionality:
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3. Check if rolled 1: if true, switch to next player
        if (dice !== 1) {
            //Add dice to the current score
            currentScore += dice;

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore; //CHANGE LATER
        } else {
            //Switch to the next player

            switchPlayer();
        }
    }
})

//Hold the score:
btnHold.addEventListener('click', function () {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //2. Check if player's score >= 100
        //Finish the game

        if (scores[activePlayer] >= 100) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.src = 'deer.jpeg'
            diceEl.style.width = '250px'
            diceEl.style.height = '250px'
            diceEl.style.transition = 'all 1000ms'
            btnHold.classList.add('hidden');
            btnRoll.classList.add('hidden');
        } else {
            //3. Switch to the next player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', function () {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    currentScore = 0;
    activePlayer = 0;
    scores[0] = 0;
    scores[1] = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    playing = true;
    diceEl.style.width = '10rem';
    diceEl.style.height = '10rem';
    diceEl.classList.add('hidden');
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');


})