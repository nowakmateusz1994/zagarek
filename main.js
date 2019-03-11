const watch = document.querySelector('header div.watch');
const stoper = document.querySelector('header div.stoper');
const counter = document.querySelector('header div.counter');

watch.addEventListener('click', () => {
    document.querySelector('section div.watch').style.zIndex = 1;
    document.querySelector('section div.stoper').style.zIndex = 0;
    document.querySelector('section div.counter').zIndex = 0;
})

stoper.addEventListener('click', () => {
    document.querySelector('section div.watch').style.zIndex = 0;
    document.querySelector('section div.stoper').style.zIndex = 1;
    document.querySelector('section div.counter').zIndex = 0;
})

counter.addEventListener('click', () => {
    document.querySelector('section div.watch').style.zIndex = 0;
    document.querySelector('section div.stoper').style.zIndex = 0;
    document.querySelector('section div.counter').zIndex = 1;
})



//watch

const currentHours = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours();
    const minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
    const seconds = currentDate.getSeconds() < 10 ? '0' + currentDate.getSeconds() : currentDate.getSeconds();

    const showWatch = document.querySelector('section div.watch h1');
    showWatch.textContent = `${hours} : ${minutes} : ${seconds}`;
}

setInterval(currentHours, 1000);


//stoper

const start = document.querySelector('section div.stoper button.start');
const reset = document.querySelector('section div.stoper button.reset');
const showStoper = document.querySelector('section div.stoper h1');
let time = 0;
let activ = false;
let index;

const timeStart = () => {
    if (!activ) {
        activ = !activ;
        start.textContent = 'Pauza';
        index = setInterval(timeActiv, 10);
    } else {
        activ = !activ;
        start.textContent = 'Start';
        clearInterval(index);
    }
};

const timeActiv = () => {
    time++;
    showStoper.textContent = (time / 100).toFixed(2);
}


const timeReset = () => {
    clearInterval(index);
    showStoper.textContent = '---'
    time = 0;
    activ = false;
    start.textContent = 'Start';
}


start.addEventListener('click', timeStart);
reset.addEventListener('click', timeReset);


//counter

const counterStart = document.querySelector('section div.counter form');
const input = document.querySelector('section div.counter input');
const counterH1 = document.querySelector('section div.counter h1.minutes');


let minutesToStop;
let minutesToStop2;
let secondsToStop = '00';


const counting = (e) => {
    e.preventDefault();


    if (input.value === '') return;
    minutesToStop = input.value;
    counterH1.textContent = `${minutesToStop} : ${secondsToStop}`;
    minutesToStop--;
    secondsToStop = 60;
    input.value = '';
    indexCounter = setInterval(counterNow, 1000);


}

const counterNow = () => {
    secondsToStop--
    counterH1.textContent = `${minutesToStop} : ${secondsToStop}`;
    if (secondsToStop <= 0 && minutesToStop <= 0) {
        clearInterval(indexCounter);
        counterH1.textContent = '---'
    }
    if (secondsToStop == 0) {

        secondsToStop = 59;
        minutesToStop--
    }

}


counterStart.addEventListener('submit', counting);