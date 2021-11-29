let hours = 0;
let minutes = 0;
let seconds = 0;
let timeInSeconds = 0;
let interval = null;
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const hourNum = document.getElementById('hours');
const minNum = document.getElementById('minutes');
const secNum = document.getElementById('seconds');

/**
 * Adds event listeners to the editable numbers so that
 * only numbers can be inputted and that there cannot be
 * more than 2 numbers.
 */
hourNum.addEventListener('keypress', (e) => {
  const isFull = hourNum.innerHTML.length >= 2;
  const notNum = isNaN(e.key);
  if (isFull || notNum) e.preventDefault();
});
minNum.addEventListener('keypress', (e) => {
  const isFull = minNum.innerHTML.length >= 2;
  const notNum = isNaN(e.key);
  if (isFull || notNum) e.preventDefault();
});
secNum.addEventListener('keypress', (e) => {
  const isFull = secNum.innerHTML.length >= 2;
  const notNum = isNaN(e.key);
  if (isFull || notNum) e.preventDefault();
});
/**
 * Updates the timer's text with an hour, min, and sec value.
 * @param {Int} currHr Number to replace hour's text in the timer
 * @param {Int} currMin Number to replace min's text in the timer
 * @param {Int} currSec Number to replace sec's text in the timer
 */
function setTimerText(currHr, currMin, currSec) {
  hourNum.innerHTML = (currHr < 10) ? ('0' + currHr.toString()) : currHr;
  minNum.innerHTML = (currMin < 10) ? ('0' + currMin.toString()) : currMin;
  secNum.innerHTML = (currSec < 10) ? ('0' + currSec.toString()) : currSec;
}
/**
 * Starts/resumes the countdown timer
 */
function startTimer() {
  let displayTime = () => {
  	const displayHours = Math.floor(timeInSeconds / (60 * 60));
    const remainder = timeInSeconds - (displayHours * 60 * 60);
    const displayMinutes = Math.floor(remainder / 60);
    const displaySeconds = remainder - (displayMinutes * 60);
    setTimerText(displayHours, displayMinutes, displaySeconds);
  };
  interval = setInterval(() => {
    displayTime();
    timeInSeconds -= 1;
  /* When the timer hits 0, revert to the state before the timer started */
    if (timeInSeconds < 0) {
      clearInterval(interval);
      startButton.classList.remove('hidden');
      pauseButton.classList.add('hidden');
      stopButton.classList.add('hidden');
      hourNum.setAttribute('contenteditable', 'true');
      minNum.setAttribute('contenteditable', 'true');
      secNum.setAttribute('contenteditable', 'true');
      setTimerText(hours, minutes, seconds);
    }
  }, 1000);
}
/**
 * Adds an event listener to start button: changes seconds, minutes, and
 * hours such that minutes and seconds are < 60, sets the timer's text
 * accordingly, and starts the timer. Additionally, replaces the start
 * button with a pause and a stop button and prevents time from being
 * edited.
 */
startButton.addEventListener('click', () => {
  hours = (hourNum.innerHTML.length == 0) ? 0 : parseInt(hourNum.innerHTML);
  minutes = (minNum.innerHTML.length == 0) ? 0 : parseInt(minNum.innerHTML);
  seconds = (secNum.innerHTML.length == 0) ? 0 : parseInt(secNum.innerHTML);
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
/**
 * Adds an event listener to the pause/resume button, which
 * pause the timer and resume the timer accordingly.
 */
pauseButton.addEventListener('click', () => {
  if (pauseButton.innerHTML == 'Pause') {
    pauseButton.innerHTML = 'Resume';
    clearInterval(interval);
  } else {
    pauseButton.innerHTML = 'Pause';
    startTimer();
  }
});
/**
 * Adds an event listener to the stop button, which resets the
 * timer back to the state before the timer was started.
 */
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
