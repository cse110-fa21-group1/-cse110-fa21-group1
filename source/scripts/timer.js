let hours = 0;
let minutes = 0;
let seconds = 0;
let timeInSeconds = 0;
let interval = null;
let startButton = document.getElementById('start-button');
let pauseButton = document.getElementById('pause-button');
let stopButton = document.getElementById('stop-button');
let hourNum = document.getElementById('hours');
let minNum = document.getElementById('minutes');
let secNum = document.getElementById('seconds');

hourNum.addEventListener('keypress', e => {
  let isFull = hourNum.innerHTML.length >= 2;
  let notNum = isNaN(e.key);
  if (isFull || notNum) e.preventDefault();
});

minNum.addEventListener('keypress', e => {
  let isFull = minNum.innerHTML.length >= 2;
  let notNum = isNaN(e.key);
  if (isFull || notNum) e.preventDefault();
});

secNum.addEventListener('keypress', e => {
  let isFull = secNum.innerHTML.length >= 2;
  let notNum = isNaN(e.key);
  if (isFull || notNum) e.preventDefault();
});

function setTimerText(currHr, currMin, currSec) {
  hourNum.innerHTML = (currHr < 10) ? ('0' + currHr.toString()) : currHr;
  minNum.innerHTML = (currMin < 10) ? ('0' + currMin.toString()) : currMin;
  secNum.innerHTML = (currSec < 10) ? ('0' + currSec.toString()) : currSec;
}

function startTimer() {
  let displayTime = () => {
  	let displayHours = Math.floor(timeInSeconds / (60 * 60));
    let remainder = timeInSeconds - (displayHours * 60 * 60);
    let displayMinutes = Math.floor(remainder / 60);
    let displaySeconds = remainder - (displayMinutes * 60);
	setTimerText(displayHours, displayMinutes, displaySeconds);
  };
	interval = setInterval(() => {
  	displayTime();
  	timeInSeconds -= 1;
    if (timeInSeconds < 0) {
      clearInterval(interval);
	  startButton.classList.remove('hidden');
	  pauseButton.classList.add('hidden');
	  stopButton.classList.add('hidden');
	  hourNum.setAttribute('contenteditable', 'true');
	  minNum.setAttribute('contenteditable', 'true');
	  secNum.setAttribute('contenteditable', 'true');
    }
  }, 1000);
}
startButton.addEventListener('click', () => {
  hours = (hourNum.innerHTML.length == 0) ? 0 : parseInt(hourNum.innerHTML);
  minutes = (minNum.innerHTML.length == 0) ? 0 : parseInt(minNum.innerHTML);
  seconds = (secNum.innerHTML.length == 0) ? 0 : parseInt(secNum.innerHTML);
  initHrs = hours;
  initMin = minutes;
  initSec = seconds;
  if (seconds > 59) {
	minutes++;
	seconds -= 60;
  }
  if (minutes > 59) {
	hours++;
	minutes -= 60;
  }
  setTimerText(hours, minutes, seconds);
  timeInSeconds = (hours * 60 * 60) +
  (minutes * 60) +
  seconds;
  startTimer();
  startButton.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  stopButton.classList.remove('hidden');
  hourNum.setAttribute('contenteditable', 'false');
  minNum.setAttribute('contenteditable', 'false');
  secNum.setAttribute('contenteditable', 'false');
});

pauseButton.addEventListener('click', () => {
  if (pauseButton.innerHTML == 'Pause') {
	pauseButton.innerHTML = 'Resume';
	clearInterval(interval);
  } else {
	pauseButton.innerHTML = 'Pause';
	startTimer();
  }
});

stopButton.addEventListener('click', () => {
	clearInterval(interval);
	setTimerText(hours, minutes, seconds);
	startButton.classList.remove('hidden');
	pauseButton.classList.add('hidden');
	stopButton.classList.add('hidden');
	hourNum.setAttribute('contenteditable', 'true');
	minNum.setAttribute('contenteditable', 'true');
	secNum.setAttribute('contenteditable', 'true');
  });