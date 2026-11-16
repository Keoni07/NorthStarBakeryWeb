/* connect the video file and audio file on index.html

javascript form validation add to contact.html

use local/session storage for the form in contact.html
*/

const video = document.getElementById("bakeryVideo");
const audio = document.getElementById("bakeryAudio");

function start() {
	audio.currentTime = video.currentTime;
	audio.play();
}

function stop() {
	audio.pause();
}

function sync() {
	audio.currentTime = video.currentTime;
}

video.addEventListener("play", start);
video.addEventListener("pause", stop);
video.addEventListener("seeked", sync);
video.addEventListener("ended", stop);

