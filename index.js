const time = document.getElementById("time-container");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapHeadContainer = document.querySelector(".lap-head-container");
const lapContainer = document.querySelector("#lap-container");
const lapTable = document.getElementById("lap-table");

let startTime = 0;
let elapsedTime = 0;
let timeInterval;
let lapStartTime = 0;
let totalLapElapsedTime = 0;
let lapCount = 0;

startBtn.addEventListener("click", function () {
  startTime = Date.now() - elapsedTime;
  timeInterval = setInterval(printTime, 10);
  startBtn.style.display = "none";
  stopBtn.style.display = "inline-block";
  resetBtn.style.display = "inline-block";
  lapBtn.style.display = "inline-block";
  lapStartTime = startTime;
});

function printTime() {
  elapsedTime = Date.now() - startTime;
  time.innerText = timeTostring(elapsedTime);
}

function timeTostring(time) {
  let timeInDays = time / 86400000;
  let dd = Math.floor(timeInDays);
  let timeInHours = time / 3600000;
  let hh = Math.floor(timeInHours%24);
  let timeInMins = (timeInHours - hh) * 60;
  let mm = Math.floor(timeInMins%60);
  let timeInSec = (timeInMins - mm) * 60;
  let ss = Math.floor(timeInSec%60);
  let timeInMiliSec = (timeInSec - ss) * 100;
  let ms = Math.floor(timeInMiliSec%1000);

  let preciseDay = dd < 10 ? "0" + dd : dd;
  let preciseHour = hh < 10 ? "0" + hh : hh;
  let preciseMin = mm < 10 ? "0" + mm : mm;
  let preciseSec = ss < 10 ? "0" + ss : ss;
  let preciseMilliSec = ms < 10 ? "0" + ms : ms;

  return `${preciseDay}:${preciseHour}:${preciseMin}:${preciseSec}:${preciseMilliSec}`;
}

stopBtn.addEventListener("click", function () {
  clearInterval(timeInterval);
  startBtn.style.display = "inline-block";
  stopBtn.style.display = "none";
  lapBtn.style.display = "none";
});

resetBtn.addEventListener("click", function () {
  clearInterval(timeInterval);
  elapsedTime = 0;
  lapCount = 0;
  totalLapElapsedTime = 0;
  startTime = 0;
  lapStartTime = 0;
  totalLapTime = 0;
  time.innerText = "00:00:00:00:00";
  startBtn.style.display = "inline-block";
  stopBtn.style.display = "none";
  resetBtn.style.display = "none";
  lapBtn.style.display = "none";
  lapTable.style.display = "none";
  lapContainer.innerHTML = "";
});

lapBtn.addEventListener("click", function () {
  lapCount++;
  let { lapTime, totalLapTime } = getLap();
  if (lapCount > 0) {
    lapHeadContainer.style.display = "flex";
  }
  const lapRow = document.createElement("div");
  lapRow.classList.add("lap");

  const lapNoDiv = document.createElement("div");
  lapNoDiv.classList.add("lap-no");

  const lapCountNo = lapCount < 10 ? "0" + lapCount : lapCount;
  lapNoDiv.innerHTML = "Lap " + lapCountNo;

  const lapTimeDiv = document.createElement("div");
  lapTimeDiv.classList.add("lap-time");

  const totalLapTimeDiv = document.createElement("div");
  totalLapTimeDiv.classList.add("total-lap-time");
  lapTable.style.display = "block";

  dislayLapTime(lapTimeDiv, lapTime);
  dislayLapTime(totalLapTimeDiv, totalLapTime);

  lapContainer.appendChild(lapRow);
  lapRow.appendChild(lapNoDiv);
  lapRow.appendChild(lapTimeDiv);
  lapRow.appendChild(totalLapTimeDiv);
});

function getLap() {
  const elapsedLapTime = Date.now() - lapStartTime;
  const lapTime = timeTostring(elapsedLapTime);
  lapStartTime = Date.now();
  totalLapElapsedTime = totalLapElapsedTime + elapsedLapTime;
  const totalLapTime = timeTostring(totalLapElapsedTime);
  return { lapTime, totalLapTime };
}

function dislayLapTime(div, time) {
  const [day, hour, min, sec, millisec] = time.split(":").map(Number);

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedHour = hour < 10 ? "0" + hour : hour;
  const formattedMin = min < 10 ? "0" + min : min;
  const formattedSec = sec < 10 ? "0" + sec : sec;
  const formattedMilliSec = millisec < 10 ? "0" + millisec : millisec;

  div.innerHTML = `${formattedDay}:${formattedHour}:${formattedMin}:${formattedSec}:${formattedMilliSec}`;
}
