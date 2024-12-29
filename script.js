let timer;
let isRunning = false;
let timeRemaining = 90 * 60; // 90 minutes in seconds
let breakTime = 10 * 60; // 10 minutes break time in seconds
let isBreak = false;

function updateDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.getElementById('timeDisplay').innerText = timeString;
  
  const progressBar = document.getElementById('progressBar');
  const progressInner = document.createElement('div');
  progressInner.classList.add('progress-bar-inner');
  progressBar.innerHTML = '';
  progressBar.appendChild(progressInner);
  
  progressInner.style.width = (isBreak ? (timeRemaining / breakTime) : (timeRemaining / (90 * 60))) * 100 + '%';
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById('startStopButton').innerText = 'Start';
  } else {
    timer = setInterval(function() {
      timeRemaining--;
      updateDisplay();

      if (timeRemaining <= 0) {
        clearInterval(timer);
        if (isBreak) {
          timeRemaining = 90 * 60; // reset to 90 minutes for the work session
          isBreak = false;
          alert("Break time is over! Time to work!");
        } else {
          timeRemaining = breakTime; // start break
          isBreak = true;
          alert("Work time is over! Take a short break!");
        }
        updateDisplay();
      }
    }, 1000);
    document.getElementById('startStopButton').innerText = 'Stop';
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  timeRemaining = 90 * 60; // Reset to 90 minutes for focus time
  isBreak = false;
  isRunning = false;
  updateDisplay();
  document.getElementById('startStopButton').innerText = 'Start';
}

updateDisplay(); // Initial display setup
