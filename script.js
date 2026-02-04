let currentAudio = null;
let sceneIndex = 0;

const scenes = [
  {
    title: "Michael Scott Moment",
    text: "“Somehow I manage.”\n\nAnd somehow… I still think about you.",
    bg: "images/michael.jpg",
    sound: "theme.mp3"
  },
  {
    title: "Dwight Energy",
    text: "Whenever I miss you… my brain goes full Dwight mode.",
    bg: "images/dwight.jpg",
    sound: "wild.mp3"
  },
  {
    title: "Kelly Kapoor Phase",
    text: "I tried being calm.\nDidn’t work.\nI miss you LOUDLY.",
    bg: "images/kelly.jpg",
    sound: "deranged.mp3"
  },
  {
    title: "Jim & Pam Truth",
    text: "You don’t need fireworks.\nYou need someone who chooses you.\nEvery day.",
    bg: "images/jim_pam.jpg",
    sound: "she_said.mp3"
  },
  {
    title: "Peaky Blinders Energy",
    text: "In the end… I choose you.\nNo negotiations.",
    bg: "images/peaky.jpg",
    sound: "wild.mp3"
  },
  {
    title: "One Honest Question",
    text: "Should this story… continue?",
    bg: "images/jim_pam.jpg",
    sound: "theme.mp3",
    final: true
  }
];

const scene = document.getElementById("scene");
const title = document.getElementById("title");
const text = document.getElementById("text");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function playSound(file) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = new Audio(file);
  currentAudio.volume = 0.8;
  currentAudio.play();
}

function loadScene() {
  const s = scenes[sceneIndex];
  scene.style.backgroundImage = `url('${s.bg}')`;
  title.innerText = s.title;
  text.innerText = s.text;
  playSound(s.sound);

  if (s.final) {
    noBtn.style.display = "block";
  }
}

yesBtn.onclick = () => {
  sceneIndex++;
  if (sceneIndex < scenes.length) {
    loadScene();
  } else {
    title.innerText = "💛";
    text.innerText = "That’s all.\nBut I meant every second.";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
  }
};

noBtn.onmouseover = () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
};

loadScene();
