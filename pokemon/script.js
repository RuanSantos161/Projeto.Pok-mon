const body = document.querySelector('body');
const game = document.querySelector('.game');

const count = document.querySelector('h1');

const restart = document.querySelector('.restart');

const ash = document.querySelector('#ash');

const charmander = document.querySelector('#charmander');
const zubat = document.querySelector('#zubat');
const pikaxu = document.querySelector('#pikaxu');

const audio = document.querySelector('audio');

audio.volume = 0.1;

const control = document.querySelector('.music-control');

control.addEventListener('click', (event) => {

  event.stopPropagation();

  event.target.src = `!${event.target.src}`.includes('https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/icons/on.png?raw=true') ? 'https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/icons/off.png?raw=true' : 'https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/icons/on.png?raw=true';

  `${event.target.src}`.includes('https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/icons/on.png?raw=true') ? audio.play() : audio.pause();
});


function getRightPosition() {
  return parseInt(ash.style.right.split('px')[0]) || 2;
}

function getTopPosition() {
  return parseInt(ash.style.top.split('px')[0]) || 2;
}

let findCharmander = false;
let findPikaxu = false;
let findZubat = false;


restart.addEventListener('click', () => {
  window.location.reload();
  restart.style.display = 'none';
});

function clearCharactersAndFinshGame() {
  ash.style.display = 'none';
  pikaxu.style.display = 'none';
  charmander.style.display = 'none';
  zubat.style.display = 'none';

  restart.style.display = 'block';

  count.textContent = '';
}

let currentCount = 60;

const interval = setInterval(() => {
  if (currentCount <= 0) {
    game.style.backgroundImage = "https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/game-over.jpg?raw=true')";

    clearCharactersAndFinshGame();
    clearInterval(interval);
    return
  }
  currentCount--;
  count.textContent = currentCount
}, 1000);

function finishGame() {
  if (findCharmander && findPikaxu && findZubat) {
    clearCharactersAndFinshGame();

    setTimeout(() => {
      game.style.backgroundImage = "https://steamuserimages-a.akamaihd.net/ugc/955214984621402016/E1160B3DF762312B57A787062E4076E3936AF2B6/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false";


      clearInterval(interval);

      audio.pause();
    }, 400);

    return
  }
}

function verifyLookPokemon(to) {
  finishGame();

  const pokemonRightPosition = to === 'ArrowLeft' ? `${getRightPosition() - 64}px` : `${getRightPosition() + 64}px`;

  if (findCharmander) {
    const newTopPosition = to === 'ArrowUp' ? `${getTopPosition() + 8}px` : `${getTopPosition() - 8}px`;

    charmander.style.right = pokemonRightPosition;
    charmander.style.top = newTopPosition;
  }

  if (findPikaxu) {
    const newTopPosition = to === 'ArrowUp' ? `${getTopPosition() + 36}px` : `${getTopPosition() - 36}px`;

    pikaxu.style.right = pokemonRightPosition;
    pikaxu.style.top = newTopPosition;
  }

  if (findZubat) {
    const newTopPosition = to === 'ArrowUp' ? `${getTopPosition() + 72}px` : `${getTopPosition() - 72}px`;

    zubat.style.right = pokemonRightPosition;
    zubat.style.top = newTopPosition;
  }

  if ((getTopPosition() >= 2 && getTopPosition() <= 98)
    && (getRightPosition() >= 130 && getRightPosition() <= 216)) {
    charmander.style.display = 'block';
    findCharmander = true;
    return;
  }

  if ((getTopPosition() >= 474 && getTopPosition() <= 594)
    && (getRightPosition() <= 138 && getRightPosition() >= 42)) {
    zubat.style.display = 'block';
    findZubat = true;
    return;
  }

  if ((getTopPosition() >= 266 && getTopPosition() <= 394)
    && (getRightPosition() >= 546 && getRightPosition() <= 650)) {
    pikaxu.style.display = 'block';
    findPikaxu = true;
    return;
  }

}

body.addEventListener('keydown', (event) => {

  event.stopPropagation();

  switch (event.code) {
    case 'ArrowLeft':
      if (getRightPosition() < 770) {
        ash.style.right = `${getRightPosition() + 8}px`;
        ash.src = 'https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/left.png?raw=true';
      }
      break;
    case 'ArrowRight':
      if (getRightPosition() > 2) {
        ash.style.right = `${getRightPosition() - 8}px`;
        ash.src = 'https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/right.png?raw=true';
      }
      break;
    case 'ArrowDown':
      if (getTopPosition() < 625) {
        ash.style.top = `${getTopPosition() + 8}px`;
        ash.src = 'https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/front.png?raw=true';
      }
      break;
    case 'ArrowUp':
      if (getTopPosition() > 2) {
        ash.style.top = `${getTopPosition() - 8}px`;
        ash.src = 'https://github.com/danieldeandradelopes/pokemon-game/blob/main/assets/back.png?raw=true';
      }
      break;
    default:
      break;
  }

  verifyLookPokemon(event.code);
});