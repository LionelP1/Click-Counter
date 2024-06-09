const clickArea = document.querySelector(".clickArea");
const timerDiv = document.querySelector(".timer");
const cpsDiv = document.querySelector(".cps");
const clicksDiv = document.querySelector(".clicks");
const buttons = document.querySelectorAll(".secBtn");




let gameOn = false;
let counter = 0;
let cps = 0;
let clicks = 0;
let startTime = 0;
let gameTime = 5;


clickArea.addEventListener("click", () => startGame(gameTime));


buttons.forEach(button => {
    button.addEventListener("click", () => {
        gameTime = parseInt(button.textContent.replace(" Seconds", ""));
        setButtonColor(button);
    });
});



function startGame(seconds){
    clickArea.textContent = '';
    if(!gameOn){
        gameOn = true;
        startTime = Date.now();
        updateClicks();
        let timer = setInterval(updateClock, 10);
        setTimeout(() => resetGame(timer), seconds * 1000);
    }
    else{
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
    showPopup();
    gameOn = false;
    counter = 0;
    cps = 0;
    clicks = 0;
    startTime = 0;
    timerDiv.textContent = "0.0";
    cpsDiv.textContent = 0;
    clicksDiv.textContent = 0;
    clickArea.textContent = 'Click Here';
}


function setButtonColor(clickedButton){
    buttons.forEach(button => {
        button.style.backgroundColor = "#343536";
    });
    clickedButton.style.backgroundColor = "#3498DB";
}


/*Popup*/
document.getElementById("closeButton").addEventListener("click", hidePopup);
document.getElementById("closePopup").addEventListener("click", hidePopup);

function showPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("clicksText").textContent = `Clicks: ${clicks}`;
    document.getElementById("cpsText").textContent = `Cps: ${cps}`;
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}
