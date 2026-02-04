function nextStep(step) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  document.getElementById('step' + step).classList.remove('hidden');
}

function easterEgg() {
  alert("Dwight says: Identity theft is not a joke, Jim!");
}

function finalAnswer(choice) {
  if (choice === 'stay') {
    alert("No pressure. Some stories are meant to rest.");
  } else {
    alert("Maybe someday, when the time feels right.");
  }
}
