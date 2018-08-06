/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

const deckOfCards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt',
'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];


const deck = document.querySelector('.deck');

// variable to hold cards
let openedCards = [];
let matchedCards = [];

// function to initialize game
function initGame() {
  shuffle(deckOfCards);
  for (let i = 0; i < deckOfCards.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `<i class="${deckOfCards[i]}"></i>`;
    deck.appendChild(card);
    //Invokes click function
    click(card);
    
  }
}

// Card Event Listener function (flips card)
function click(card) {
  card.addEventListener('click', function() {
    startTimer();
    const currentCard = this;
    const previousCard = openedCards[0];
    
    if (openedCards.length === 1) {
      card.classList.add('open', 'show', 'disable');
      openedCards.push(this);
      
      // Call function to compare open cards
      compare(currentCard, previousCard);
      
    } else {
      card.classList.add('open', 'show', 'disable');
      openedCards.push(this);
    }
  })
}

// Compares current and previous cards to see if there is a match
function compare(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    // Push matched cards into variable
    matchedCards.push(currentCard, previousCard);
    // Add match class to current/previous card
    currentCard.classList.add('match');
    previousCard.classList.add('match');
    // clear openCards when match is found
    openedCards = [];
    
    // check if match
    checkScore();
    
  } else {
    // clear openCards when match is not found
    openedCards = [];
    // Allow 2nd card to display - timeout for 1500ms
    setTimeout(function() {
      currentCard.classList.remove('open', 'show', 'disable');
      previousCard.classList.remove('open', 'show', 'disable');
    }, 1500);
  }
  
  // Calls addMove function, adds move to move counter
  addMove();
}

// Checks if game is complete
function checkScore() {
  if (matchedCards.length === deckOfCards.length) {
    stopTimer();
    // setTimeout allows final move count to be recorded in modal
    setTimeout(openModal, 15);
    getStars();
  }
}
// gets stars
function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  return starCount;
}
// Variables for move counter function
const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;

// Adds move to move variable/counter
function addMove() {
  moves++;
  movesContainer.innerHTML = moves;
  // Check Star Rating
  rating();
}

// Star Rating query selector
const starRating = document.querySelector('.stars');
// Star Rating function
function rating() {
  // setting rates based on moves
  if (moves === 15 || moves === 22) {
    hideStar();
  }
  
}
// Hides the stars
function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

// restartBtn query selector
const restartBtn = document.querySelector('.restart');

// Click Event Listener: Restart game when clicking restart icon
restartBtn.addEventListener('click', function() {
  // Clears deck
  deck.innerHTML = "";
  // Reset Star Rating
  starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
  // Calls 'initGame' function to re-initialize game
  initGame();
  // Resets openCards, matchedCards, and move variables
  openedCards = [];
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  resetTimer();
})

// Initialize game
initGame();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}

/* Modal Code */
const modal = document.getElementById('modal');
// Get modal close button
const closeBtn = document.getElementsByClassName('closeBtn')[0];

// Listen for click on modal x button, calls modalClose function
closeBtn.addEventListener('click', modalClose);

// function to display Modal
function openModal() {
  modal.style.display = 'block';
  score();
}
// Modal close button will close modal
function modalClose() {
  modal.style.display = 'none';
}
// Get modal-score variable:
const modalScore = document.getElementById('modal_score');

// function to retrieve score and place inside modal (Star Rating, Move Counter, and Ending Time)
function score() {
  modalScore.innerHTML = `Your Rating is: ${starRating.innerHTML} &nbsp; | &nbsp; You've made: ${movesContainer.innerHTML} Moves | &nbsp; Your Time Was: ${timerCount.innerHTML}`
}

// Play Again query selector
const restartGame = document.querySelector('.restart-footer');

// Click Event Listener: Restart game when clicking restart footer
restartGame.addEventListener('click', function() {
  // Clears deck
  deck.innerHTML = "";
  // Reset Star Rating
  starRating.innerHTML = `<li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
  // Calls 'initGame' function to re-initialize game
  initGame();
  // Resets openCards, matchedCards, and move variables
  openedCards = [];
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  modalClose();
  resetTimer();
})

// timer variables
let second = 0;
let minute = 0;
let active = false;
let clockT = false;
const timerCount = document.querySelector('#clock');

// Timer function.
function timer() {
  if (active) {
    second++;
    if (second < 10) {
      second = "0" + second;
      if (minute < 1) {
        minute = 0 + "0"
      }
    }
    if (second == 60) {
      minute++;
      second = 0 + "0";
      if (minute < 10) {
        minute = "0" + minute;
      }
    }
    
    timerCount.innerHTML = `${minute}:${second}`;
    // repeat timer every 1 second
    setTimeout(timer, 1000)
  }
}

function startTimer() {
  if (!clockT) {
    clockT = true;
    active = true;
    timer();
  }
}

function stopTimer() {
  active = false;
}

function resetTimer() {
  second = 0;
  minute = 0;
  timerCount.innerHTML = `Time 0${minute}:0${second}`;
  active = false;
  clockT = false;
  resetStyle();
}

// function to reset .score-panel width to normal
function resetStyle() {
  document.querySelector('.score-panel').style.width = "350px";
}

