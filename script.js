const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const gameTime = 15000;

let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes){
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if(hole === lastHole){
        return randHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peep(){
    const time = randTime(300, 1000);
    const hole = randHole(holes);

    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp){
            peep();
        }
    }, time);
}

function startGame(){
    scoreBoard.textContent = '0';
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, gameTime);
}

function bonk(e){
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));