import {storage} from './storage.js';
import {getURLid, isSearched} from './url.js';
let hours = 0;
let minutes = 0;
let seconds = 0;
let timeInSeconds = 0;
let interval = null;
let soundInterval = null;
const audio = new Audio('assets/alarmsound.mp3');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const soundButton = document.getElementById('sound-button');
const hourNum = document.getElementById('hours');
const minNum = document.getElementById('minutes');
const secNum = document.getElementById('seconds');

window.addEventListener('DOMContentLoaded', init);


/** Adds event listeners to the timer after page is loaded. */
function init() {
  // Extract query id
  const id = getURLid();
  // Fetch recipe from local storage
  const recipe = (isSearched()) ?
                    storage.getSearchedRecipe(id) :
                    storage.getRecipe(id);
  if (Object.keys(recipe).length == 0) return;
  const splitTime =
  recipe.totalTime.split(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  const initHr = (isNaN(parseInt(splitTime[1]))) ?
  0 : parseInt(splitTime[1]);
  const initMin = (isNaN(parseInt(splitTime[2]))) ?
  0 : parseInt(splitTime[2]);
  setTimerText(initHr, initMin, 0);
  addTimeTextListeners();
  addButtonListeners();
}

/**
 * Limit's the timer's text to numbers,
 * no more than 2, no pasting.
 * @param {HTMLElement} time Timer chunk to limit
 */
function addInputLimitations(time) {
  time.addEventListener('keypress', (e) => {
    const isFull = time.innerHTML.length >= 2;
    const notNum = isNaN(e.key);
    if (notNum) {
      e.preventDefault();
    } else {
      if (isFull) {
        if (window.getSelection()) {
          const toReplace = window.getSelection();
          const range = toReplace.getRangeAt(0);
          if (range.toString().length > 0) {
            range.deleteContents();
            range.insertNode(document.createTextNode(e.key));
          } else {
            e.preventDefault();
          }
        }
      }
    }
  });
  time.addEventListener('paste', (e) => {
    e.preventDefault();
  });
}
/** Adds event listeners to the timer text. */
function addTimeTextListeners() {
  addInputLimitations(hourNum);
  addInputLimitations(minNum);
  addInputLimitations(secNum);
}

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
/** Resets the timer back to the state before it was started. */
function resetTimerView() {
  startButton.classList.remove('hidden');
  hourNum.setAttribute('contenteditable', 'true');
  minNum.setAttribute('contenteditable', 'true');
  secNum.setAttribute('contenteditable', 'true');
  setTimerText(hours, minutes, seconds);
}
/** Adds event listeners to the timer text. */
function endAlarm() {
  clearTimeout(soundInterval);
  soundButton.classList.add('hidden');
  audio.pause();
  audio.currentTime = 0;
  resetTimerView();
}
/**
 * Ends the countdown timer, sets numbers to original numbers
 * @param {Boolean} forced If wasn't forced, play alarm
 */
function timerFinish(forced) {
  pauseButton.classList.add('hidden');
  stopButton.classList.add('hidden');
  clearInterval(interval);
  setTimerText(hours, minutes, seconds);
  if (!forced) {
    soundButton.classList.remove('hidden');
    audio.play();
    soundInterval = setTimeout(() => {
      endAlarm();
    }, 20000);
  } else {
    resetTimerView();
  }
}
/**
 * Starts/resumes the countdown timer
 */
function startTimer() {
  const displayTime = () => {
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
      timerFinish(false);
    }
  }, 1000);
}
/** Adds event listeners to the timer buttons. */
function addButtonListeners() {
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
    timerFinish(true);
  });
  soundButton.addEventListener('click', () => {
    endAlarm();
  });
}
