const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const gameTime = 15000;
const minMoleTime = 300;
const maxMoleTime = 1000;

let lastHole;
let isGame = false;
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
    const time = randTime(minMoleTime, maxMoleTime);
    const hole = randHole(holes);

    hole.addEventListener('click', stopBonk);

    hole.classList.add('up');
    
    setTimeout(() => {
        hole.classList.remove('up');
        hole.removeEventListener('click', stopBonk);
        if(!timeUp){
            peep();
        }
    }, time);
}

function stopBonk(e){
    if(e.target.matches('.mole')){
        this.classList.remove('up');
    }
}

function startGame(){
    if(isGame){
        return;
    }
    isGame = true;
    scoreBoard.textContent = '0';
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => {
        timeUp = true;
        isGame = false
    }, gameTime);
}

function bonk(e){
    score++;
    scoreBoard.textContent = score;
    return;
}

moles.forEach(mole => mole.addEventListener('click', bonk));