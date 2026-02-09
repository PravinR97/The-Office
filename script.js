/* =========================
   OFFICE EPISODE MODE
   FIXED: Gate YES/NO shows ONLY on first page
   ========================= */

/* ---------- Configuration ---------- */
const ANSWER_SFX_CANDIDATES = [
  "That's_what_she_said.mp3",
  "Thats_What_she_said.mp3",
  "Michael_scott_thank_you.mp3",
  "daffyduck.mp3",
  "theme.mp3",
  "shesaid.mp3",
  "ThatsWhatSheSaid.mp3"
];

/* ---------- Scenes ---------- */
const scenes = [
  {
    id: "gate",
    title: "Before You Enter This…",
    text: "Do you want to go inside…?",
    bg: "images/office_bg1.jpg",
    gif: "images/Dwight_would_a_Idiot.gif",
    quote:
      "“Whenever I’m about to do something, I think, ‘Would an idiot do that?’ And if they would, I do not do that thing.” — Dwight Schrute",
    gate: true
  },
  {
    id: "intro",
    title: "Welcome to Dunder Mifflin — IIM Jammu Branch",
    text:
      "Welcome to IIM Jammu Branch of Dunder Mifflin Paper Company...\nThis little tour is for you — tiny memories, big apologies, and a million ‘that’s what she said’ moments.",
    bg: "images/The_office_image.jpg",
    gif: "images/Kelly_Italkalotsoilearnedtojusttumemyselfout.gif",
    quote:
      "Jim is my enemy. But it turns out Jim is also his own worst enemy...",
    question: {
      type: "short",
      key: "favorite_episode",
      prompt:
        "Which Office episode is your favorite? Diversity Day / Dundies / Goodbye Michael?"
    }
  },
  {
    id: "final",
    title: "To You — A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "images/final_bg.jpg",
    gif: "images/heart_fireworks.gif",
    final: true
  }
];

/* ---------- State ---------- */
let index = 0;
let responses = {};
let muted = false;

/* ---------- DOM ---------- */
const sceneEl = document.getElementById("scene");
const sceneTitle = document.getElementById("sceneTitle");
const textEl = document.getElementById("text");
const quoteEl = document.getElementById("quote");
const gifImg = document.getElementById("gif");
const nextBtn = document.getElementById("nextBtn");

const questionOverlay = document.getElementById("questionOverlay");
const questionPrompt = document.getElementById("questionPrompt");
const questionInput = document.getElementById("questionInput");
const questionSubmit = document.getElementById("questionSubmit");

const finishOverlay = document.getElementById("finishOverlay");
const finishMessage = document.getElementById("finishMessage");

/* ---------- Audio ---------- */
const bgAudio = document.getElementById("sceneAudio");
const sfxAudio = new Audio();

/* ---------- Helpers ---------- */
function setBackground(url) {
  sceneEl.style.backgroundImage = url
    ? `url("${url}")`
    : "linear-gradient(135deg,#111,#000)";
  sceneEl.style.backgroundSize = "cover";
  sceneEl.style.backgroundPosition = "center";
}

function playSfx() {
  if (muted) return;
  sfxAudio.src =
    ANSWER_SFX_CANDIDATES[
      Math.floor(Math.random() * ANSWER_SFX_CANDIDATES.length)
    ];
  sfxAudio.play().catch(() => {});
}

/* ---------- GATE BUTTON CONTROL ---------- */
function removeGateButtons() {
  document.querySelector(".gateYes")?.remove();
  document.querySelector(".gateNo")?.remove();
}

function handleGate() {
  nextBtn.style.display = "none";

  const yesBtn = document.createElement("button");
  yesBtn.className = "gateYes";
  yesBtn.innerText = "Yessssss 😁";

  const noBtn = document.createElement("button");
  noBtn.className = "gateNo";
  noBtn.innerText = "Noooo 😢";

  yesBtn.onclick = () => {
    removeGateButtons();
    index++;
    loadScene();
  };

  noBtn.onmouseenter = () => {
    noBtn.style.transform = `translate(${Math.random() * 200 - 100}px, ${
      Math.random() * 150 - 75
    }px)`;
  };

  sceneEl.appendChild(yesBtn);
  sceneEl.appendChild(noBtn);
}

/* ---------- QUESTIONS ---------- */
function showQuestion(q) {
  questionPrompt.innerText = q.prompt;
  questionInput.value = "";
  questionOverlay.style.display = "flex";
  questionOverlay.dataset.key = q.key;
}

questionSubmit.onclick = () => {
  const key = questionOverlay.dataset.key;
  const val = questionInput.value.trim();
  if (val) responses[key] = val;
  playSfx();
  questionOverlay.style.display = "none";
  nextScene();
};

/* ---------- SCENE LOADER ---------- */
function loadScene() {
  removeGateButtons(); // 🔥 CRITICAL FIX
  const current = scenes[index];
  if (!current) return;

  setBackground(current.bg);
  sceneTitle.innerText = current.title || "";
  textEl.innerText = current.text || "";
  quoteEl.innerText = current.quote || "";
  gifImg.src = current.gif || "";
  gifImg.style.display = current.gif ? "block" : "none";

  if (current.id === "gate") {
    handleGate();
    return;
  }

  nextBtn.style.display = "inline-block";
  nextBtn.innerText = current.final ? "FINISH" : "NEXT";

  if (current.question) {
    setTimeout(() => showQuestion(current.question), 600);
  }
}

/* ---------- NAV ---------- */
function nextScene() {
  index++;
  if (index >= scenes.length) {
    showFinal();
  } else {
    loadScene();
  }
}

nextBtn.onclick = () => {
  if (scenes[index]?.final) {
    showFinal();
  } else {
    nextScene();
  }
};

/* ---------- FINAL ---------- */
function showFinal() {
  finishMessage.innerText = `
Hey…
This was made just for you.

Favorite episode: ${responses.favorite_episode || "our silly one"}

I’m sorry.
I care about you.
And I’d like to make better memories.

— Always yours ❤️
  `;
  finishOverlay.style.display = "flex";
}

/* ---------- INIT ---------- */
function init() {
  index = 0;
  responses = {};
  loadScene();
}
init();
