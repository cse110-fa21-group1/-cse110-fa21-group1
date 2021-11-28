let hours = 0;
let minutes = 0;
let seconds = 0;
let interval = null;

document.getElementById('hours').addEventListener('change', e => {
	hours = +e.target.value;
});

document.getElementById('minutes').addEventListener('change', e => {
	minutes = +e.target.value;
});

document.getElementById('seconds').addEventListener('change', e => {
	seconds = +e.target.value;
});

document.getElementById('startTimer').addEventListener('click', () => {
	let timeInSeconds = (hours * 60 * 60) +
  	(minutes * 60) +
    seconds;

  let displayTime = () => {
  	let displayHours = Math.floor(timeInSeconds / (60 * 60));
    let remainder = timeInSeconds - (displayHours * 60 * 60);
    let displayMinutes = Math.floor(remainder / 60);
    let displaySeconds = remainder - (displayMinutes * 60);
    document.getElementById("timer").innerHTML = displayHours + " : " +
		displayMinutes + " : " + displaySeconds;
  };
	interval = setInterval(() => {
  	displayTime();
  	timeInSeconds -= 1;
    if (timeInSeconds < 0) {
    	clearInterval(interval);
    }
  }, 1000);
});