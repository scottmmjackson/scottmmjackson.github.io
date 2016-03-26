var needle = document.getElementById('needle');
var direction = 0;
window.addEventListener('deviceorientation', orientationHandler, true);
function orientationHandler(event) {
  direction = event.alpha || 0;
}

var needleDirector = setInterval(directNeedle, 50);

function directNeedle() {
  needle.setAttribute('transform','translate(50 50) rotate('+direction+') translate(-50 -50)');
}

var container = document.documentElement;

container.addEventListener('click',toggleFullscreen);
container.requestFullscreen = container.requestFullscreen || container.mozRequestFullscreen || container.webkitRequestFullscreen || container.msRequestFullscreen;

function toggleFullscreen() {
  container.requestFullscreen();
}
