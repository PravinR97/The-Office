let step = 0;

const scenes = [

  // 0 — Michael
  {
    img: "images/michael_1.jpg",
    title: "So… you clicked.",
    text: "This is not a quiz. This is Prison Mike’s exercise.",
    yes: "I love inside jokes",
    no: "I want to leave",
    forceYes: false
  },

  // 1 — Dwight
  {
    img: "images/dwight_1.jpg",
    title: "Dwight here.",
    text: "Commitment is not optional.",
    yes: "I’m serious",
    no: "I’m scared",
    forceYes: true
  },

  // 2 — Dwight cries
  {
    img: "images/dwight_cry_1.jpg",
    title: "Dwight cries once a year.",
    text: "Love is weakness. Except when it isn’t.",
    yes: "Continue",
    no: "",
    forceYes: true
  },

  // 3 — Jim
  {
    img: "images/jim_1.jpg",
    title: "Jim is watching.",
    text: "You know this isn’t really about The Office, right?",
    yes: "I know",
    no: "Pretend I don’t",
    forceYes: false
  },

  // 4 — Pam
  {
    img: "images/pam_1.jpg",
    title: "Pam would pause here.",
    text: "Some stories don’t start loud. They grow quietly.",
    yes: "Tell me more",
    no: "I’m uncomfortable",
    forceYes: false
  },

  // 5 — YOU
  {
    img: "images/creed_1.jpg",
    title: "This is where I talk.",
    text: "I loved the time in Jammu & Kashmir. The walks. The food. The silence.",
    yes: "I remember",
    no: "Change topic",
    forceYes: false
  },

  // 6 — FINAL
  {
    img: "images/kelly_1.jpg",
    title: "One last question.",
    text: "Should this story stay here… or continue someday?",
    yes: "Continue someday",
    no: "Let it rest",
    forceYes: false
  }

];

const img = document.getElementById("sceneImage");
const title = document.getElementById("sceneTitle");
const text = document.getElementById("sceneText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function renderScene() {
  const s = scenes[step];
  img.style.opacity = 0;

  setTimeout(() => {
    img.src = s.img;
    title.innerText = s.title;
    text.innerText = s.text;
    yesBtn.innerText = s.yes;

    if (s.forceYes || s.no === "") {
      noBtn.classList.add("hidden");
    } else {
      noBtn.innerText = s.no;
      noBtn.classList.remove("hidden");
    }

    img.style.opacity = 1;
  }, 300);
}

yesBtn.onclick = () => {
  step++;
  if (step < scenes.length) renderScene();
};

noBtn.onclick = () => {
  if (scenes[step].forceYes) {
    alert("Dwight says no is not allowed.");
  } else {
    step++;
    renderScene();
  }
};

renderScene();
