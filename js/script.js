// new game button
var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

//pick buttons
var pickRock = document.getElementById('js-playerPick_rock'),
      pickPaper = document.getElementById('js-playerPick_paper'),
      pickScissors = document.getElementById('js-playerPick_scissors');
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//containers handle
var newGameElem = document.getElementById('js-newGameElement'),
      pickElem = document.getElementById('js-playerPickElement'),
      resultsElem = document.getElementById('js-resultsTableElement');

//inital values for scoreboard
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// Game Status function
function setGameElements() {
  switch(gameState) {
    case 'started':
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
    break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

// variables needed before start
var playerPointsElem = document.getElementById('js-playerPoints'),
      playerNameElem = document.getElementById('js-playerName'),
      computerPointsElem = document.getElementById('js-computerPoints');

// New Game onlclick function
function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();

  }
}

//Computer pick function
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

//handle for scoreboard elements
var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//Player pick function
function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPick, computerPick);
  setGamePoints();
}

//Check who wins round function
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
}

// Set Game Points in scoreboard
function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;

  var playerScore = player.score;
  var computerScore = computer.score;
  checkIfFinished(playerScore, computerScore);

}

//Check if there is a winner
function checkIfFinished(playerScore, computerScore) {
  var isFinished = false;
  var whoWon = '';
  if (playerScore == 10) {
    isFinished = true;
    whoWon = player.name;
  } else if (computerScore == 10) {
    isFinished = true;
    whoWon = 'computer';
  }

  if (isFinished) {
    doFinish(isFinished, whoWon);
  }
}

// Last function set game state as ended
function doFinish(isFinished, whoWon) {
  gameState = 'ended';
  setGameElements();
  var newText = document.createElement('p');
  newText.innerHTML = 'Zwycieża ' + whoWon + ' !';
  newGameElem.appendChild(newText);
  newText.style.textAlign = 'center';
  newText.style.fontWeight = 'bold';
  newText.style.paddingTop = '10px';
}
