let index = 0;
let audio = null;

const scenes = [
  {
    title: "Cold Open",
    text: "Remember The Office?\nWe didn’t just watch it.\nWe lived inside it.",
    bg: "images/office1.jpg",
    sound: "audio/michael.mp3"
  },
  {
    title: "Kelly Moment",
    text: "I tried being calm.\nDidn’t work.\nI missed you LOUDLY.",
    bg: "images/office1.jpg",
    sound: "audio/kelly.mp3"
  },
  {
    title: "Jim & Pam",
    text: "Some people don’t need drama.\nThey need consistency.\nLike us… once.",
    bg: "images/jim_pam.jpg"
  },
  {
    title: "Peaky Blinders",
    text: "You taught me loyalty before I understood it.",
    bg: "images/peaky.jpg",
    sound: "audio/peaky.mp3"
  },
  {
    title: "Kashmir",
    text: "Night walks.\nAuto rides.\nCold temples.\nWarm memories.",
    bg: "images/kashmir.jpg"
  },
  {
    title: "A Pause",
    text: "Before this continues…\nThere’s something I want you to do.",
    bg: "images/jim_pam.jpg",
    action: "typeform"
  }
];

const title = document.getElementById("title");
const text = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const scene = document.getElementById("scene");

function playSound(file) {
  if (!file) return;
  if (audio) audio.pause();
  audio = new Audio(file);
  audio.play();
}

function loadScene() {
  const s = scenes[index];
  title.innerText = s.title;
  text.innerText = s.text;
  scene.style.backgroundImage = `url(${s.bg})`;
  playSound(s.sound);

  if (s.action === "typeform") {
    nextBtn.innerText = "Open Quiz";
  } else {
    nextBtn.innerText = "Next ▶";
  }
}

nextBtn.onclick = () => {
  if (scenes[index].action === "typeform") {
    window.open("https://form.typeform.com/to/XGOLFc3e", "_blank");
    return;
  }
  index++;
  if (index < scenes.length) loadScene();
};

loadScene();
