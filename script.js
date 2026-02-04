let currentAudio = null;

function playSound(file) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(file);
  currentAudio.volume = 0.8;
  currentAudio.play();
}
