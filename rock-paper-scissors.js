

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/* The Above code is a shortcut for the code below
if (!score) {
score = {
  wins: 0,
  losses: 0,
  ties: 0
};
}
*/

let isAutoPlaying = false;
let intervalId;


function autoPlay() {

  const autoPlayButton =
    document.querySelector('.auto-play-button');

  if (!isAutoPlaying) {

    intervalId = setInterval(() => {

      const playerMove = pickComputerMove();

      playGame(playerMove);

    }, 1000);

    isAutoPlaying = true;

    autoPlayButton.innerHTML = 'Stop Auto Play';

  } else {

    clearInterval(intervalId);

    isAutoPlaying = false;

    autoPlayButton.innerHTML = 'Auto Play';
  }

}

document.querySelector('.js-rock-button')
  .addEventListener('click',() =>{
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click' , () => {

    playGame('paper');
  });


document.querySelector('.js-scissors-button')
  .addEventListener('click',() =>{
    playGame('scissors');
  });


document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {

    playGame('rock');
  } else if(event.key === 'p') {
    playGame('paper');
  } else if(event.key === 's') {
    playGame('scissors');
  }

});





function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';


  if (playerMove === 'scissors') {

    if (computerMove === 'rock') {
      result = 'You Lose!';
    }
    else if (computerMove === 'paper') {
      result = 'You Win!';
    }
    else {
      result = 'Tie';
    }
  }
  else if (playerMove === 'rock') {

    if (computerMove === 'rock') {
      result = 'Tie';
    }
    else if (computerMove === 'paper') {
      result = 'You Lose!';
    }
    else if (computerMove === 'scissors') {
      result = 'You Win!';
    }

  }
  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win!';
    }
    else if (computerMove === 'paper') {
      result = 'Tie';
    }
    else {
      result = 'You Lose!';
    }
  }


  if (result === 'You Win!') {
    score.wins++;

  } else if (result === 'You Lose!') {
    score.losses++;

  } else {
    score.ties++;

  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `Your move
  <img src="img/${playerMove}-emoji.png" class="move-icon">
    Computer move
    <img src="img/${computerMove}-emoji.png" class="move-icon">`;
}


function pickComputerMove() {

  let computerMove = '';
  const randomNumber = Math.random();


  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else {
    computerMove = 'scissors';
  }

  return computerMove;



}
function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses} Ties: ${score.ties}`;
}


