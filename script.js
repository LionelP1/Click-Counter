const clickArea = document.querySelector(".clickArea");
const timerDiv = document.querySelector(".timer");
const cpsDiv = document.querySelector(".cps");
const clicksDiv = document.querySelector(".clicks");

const btnTen = document.querySelector(".btnTen");
const btnFive = document.querySelector(".btnFive");

let gameOn = false;
let counter = 0;
let cps = 0;
let clicks = 0;
let startTime = 0;
let gameTime = 5;


clickArea.addEventListener("click", () => startGame(gameTime));
btnTen.addEventListener("click", () => gameTime = 10);
btnFive.addEventListener("click", () => gameTime = 5);

function startGame(seconds){
    if(!gameOn){
        gameOn = true;
        startTime = Date.now();
        updateClicks();
        let timer = setInterval(updateClock, 10);
        setTimeout(() => resetGame(timer), seconds * 1000);
    }else{
        updateClicks();
    }
}

function updateClock(){
    const currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    let seconds = Math.floor(elapsedTime / 1000);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    seconds = String(seconds);
    milliseconds = String(milliseconds).padStart(2,"0");

    cps = String((clicks/(elapsedTime/1000)).toFixed(2));

    cpsDiv.textContent = cps;
    timerDiv.textContent = `${seconds}.${milliseconds}`;

}
function updateClicks(){
    clicks+=1;
    clicksDiv.textContent = clicks;
}

function resetGame(timer){
    clearInterval(timer);
    gameOn = false;
    counter = 0;
    cps = 0;
    clicks = 0;
    startTime = 0;

}