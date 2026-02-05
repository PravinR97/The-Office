/* Updated script.js
   - Paths updated to use the images/ folder and audio files present in the repo root (as uploaded).
   - Added more sarcastic / funny quotes (The Office, Peaky Blinders, Bridgerton).
   - Improved audio autoplay handling (visible "tap to play" when blocked).
   - Better UX for short-answer and MCQ questions, and safer string usage.
*/

const scenes = [
  {
    id: "intro-office",
    title: "Welcome to Dunder Mifflin — JAMMU BRANCH",
    text: "I don't know why I made this website... then I remembered the only thing better than chaos is a little shared chaos with you.",
    bg: "images/office_bg1.jpg",
    gif: "images/Michael_gif_1.jpg",
    audio: "Michael_scott_thank_you.mp3",
    quote: "Sometimes I'll start a sentence and I don't even know where it's going. — Michael Scott"
  },
  {
    id: "jim-knows",
    title: "That Look",
    text: "Remember the look Jim gave Pam? I have that look saved as my 'serious face when you laugh at my jokes' setting.",
    bg: "images/office_bg2.jpg",
    gif: "images/jim_look.gif",
    audio: "That's_What_she_said.mp3",
    quote: "You miss 100% of the shots you don't take. - Michael Scott",
    question: {
      type: "short",
      key: "favorite_office_episode",
      prompt: "Which episode of The Office made you laugh the hardest?"
    }
  },
  {
    id: "michael-energy",
    title: "Michael Energy",
    text: "Confidence and nonsense in equal measure — in short: peak Michael.",
    bg: "images/office_bg3.jpg",
    gif: "images/Michael_Gif_2.jpg",
    audio: "cage.mp3",
    quote: "I am Beyoncé, always. — Michael Scott"
  },
  {
    id: "peaky",
    title: "Peaky Vibes",
    text: "We binge Peaky Blinders together — so intense, so dramatic (and we both love Tommy's coat).",
    bg: "images/peaky_bg.jpg",
    gif: "images/peaky.gif",
    audio: "theme.mp3",
    quote: "You don't parley when you're a Shelby. — Tommy Shelby",
    question: {
      type: "mcq",
      key: "peaky_character",
      prompt: "Who's the most dangerous-looking? (pick one)",
      choices: ["Tommy", "Arthur", "Polly", "They're all very dark and brooding"]
    }
  },
  {
    id: "mummy-ishaan",
    title: "Mummy & Ishaan",
    text: "You love Mummy & Ishaan quietly. You act chidchidi but your heart is full.",
    bg: "images/family_bg.jpg",
    gif: "images/family.gif",
    audio: "shesaid.mp3",
    quote: "Family is more than blood — it's the small stubborn things we do for each other.",
    question: {
      type: "short",
      key: "what_she_loves_most",
      prompt: "What's one small thing you love about Mummy or Ishaan?"
    }
  },
  {
    id: "himachal-dream",
    title: "Himachal Dreams",
    text: "You said you'd leave everything and live in Himachal. I think I could follow you anywhere — but only if there's good tea.",
    bg: "images/himachal_bg.jpg",
    gif: "images/trek.gif",
    audio: "nogod.mp3",
    quote: "Let's run away to the mountains — even if for a day.",
    question: {
      type: "short",
      key: "live_in_himachal",
      prompt: "Would you still want that Himachal life? (yes / maybe / depends)"
    }
  },
  {
    id: "vaishno-devi",
    title: "Vaishno Devi",
    text: "You went three times. I wish I had gone with you. Forgive me for the trips I missed.",
    bg: "images/vaishno_bg.jpg",
    gif: "images/temple.gif",
    audio: "punish.mp3",
    quote: "A promise to be there for you — starting now.",
    question: {
      type: "short",
      key: "vaishno_memory",
      prompt: "What do you remember about your favourite trip to Vaishno Devi?"
    }
  },
  {
    id: "kashmir",
    title: "Kashmir Nights",
    text: "BurgerKing, dosa, midnight walks, cold water on temple steps. My favourite days were with you.",
    bg: "images/kashmir_bg.jpg",
    gif: "images/srinagar_night.gif",
    audio: "wild.mp3",
    quote: "We walked and talked until the stars looked close enough to touch.",
    question: {
      type: "short",
      key: "best_food_memory",
      prompt: "Which food from our Kashmir days should we go back to first?"
    }
  },
  {
    id: "football-tease",
    title: "Football Tease",
    text: "I love Arsenal, Barca and Messi. You pretend not to care — but you smile when I scream at the TV.",
    bg: "images/football_bg.jpg",
    gif: "images/football_reaction.gif",
    audio: "goal_cheer.mp3",
    quote: "If loving football is wrong, I don't want to be right.",
    question: {
      type: "mcq",
      key: "football_interest",
      prompt: "Are you Team Arsenal, Team Barca, or 'I just enjoy snacks'?",
      choices: ["Arsenal", "Barcelona", "Snacks > Football", "Messi is magic"]
    }
  },
  {
    id: "bridgerton-tease",
    title: "A Little Bridgerton",
    text: "A dash of drama, a pinch of romance, and you asking who's that duke again — classic Bridgerton energy.",
    bg: "images/bridgerton_bg.jpg",
    gif: "images/bridgerton.gif",
    audio: "deranged.mp3",
    quote: "When in doubt, say something witty and let everyone else be confused."
  },
  {
    id: "final",
    title: "To You — A Little Quiz, A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "images/final_bg.jpg",
    gif: "images/heart_fireworks.gif",
    audio: "daffyduck.mp3",
    quote: "Pam & Jim had their story; this is ours — messy, beautiful, and mine.",
    final: true
  }
];

let index = 0;
const responses = {}; // collected answers

// DOM elements
const sceneDiv = document.getElementById("scene");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const gifEl = document.getElementById("gif");
const btn = document.getElementById("nextBtn");
const quoteEl = document.getElementById("quote");
const audioEl = document.getElementById("sceneAudio");
const questionOverlay = document.getElementById("questionOverlay");
const questionPrompt = document.getElementById("questionPrompt");
const questionInput = document.getElementById("questionInput");
const mcqContainer = document.getElementById("mcqContainer");
const finishOverlay = document.getElementById("finishOverlay");
const finishMessage = document.getElementById("finishMessage");
const autoplayHint = document.getElementById("autoplayHint");
const startAudioBtn = document.getElementById("startAudioBtn");

// Preload images and audio if available
function preloadAssets() {
  scenes.forEach(s => {
    if (s.bg) { const i = new Image(); i.src = s.bg; }
    if (s.gif) { const g = new Image(); g.src = s.gif; }
    if (s.audio) {
      // create Audio object but don't play
      try {
        const a = new Audio();
        a.src = s.audio;
      } catch (e) { /* ignore */ }
    }
  });
}

function setBackground(url) {
  if (!url) {
    sceneDiv.style.backgroundImage = "";
    return;
  }
  sceneDiv.style.backgroundImage = `url("${url}")`;
}

function playAudio(src) {
  if (!src) {
    audioEl.pause();
    audioEl.src = "";
    return;
  }
  audioEl.src = src;
  audioEl.currentTime = 0;
  const playPromise = audioEl.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked — show tap hint
      showAutoplayHint();
    });
  }
}

function showAutoplayHint() {
  const hint = document.getElementById("autoplayHint");
  if (!hint) return;
  hint.style.display = "block";
}

function hideAutoplayHint() {
  const hint = document.getElementById("autoplayHint");
  if (!hint) return;
  hint.style.display = "none";
}

if (startAudioBtn) {
  startAudioBtn.addEventListener("click", () => {
    // try playing current audio again
    hideAutoplayHint();
    const current = scenes[index];
    if (current && current.audio) {
      audioEl.src = current.audio;
      audioEl.play().catch(() => {});
    }
  });
}

function showQuestion(q) {
  if (!q) return;
  questionPrompt.innerText = q.prompt;
  questionInput.value = "";
  questionOverlay.dataset.key = q.key;

  mcqContainer.innerHTML = "";
  questionInput.style.display = q.type === "short" ? "block" : "none";

  if (q.type === "mcq") {
    mcqContainer.style.display = "flex";
    q.choices.forEach((c) => {
      const b = document.createElement("button");
      b.className = "mcqBtn";
      b.innerText = c;
      b.addEventListener("click", () => {
        responses[q.key] = c;
        hideQuestion();
        nextScene();
      });
      mcqContainer.appendChild(b);
    });
  } else {
    mcqContainer.style.display = "none";
  }

  questionOverlay.style.display = "flex";
}

function hideQuestion() {
  questionOverlay.style.display = "none";
}

function showFinal() {
  // assemble a short message using responses
  const ep = responses.favorite_office_episode || "our favourite silly episode";
  const food = responses.best_food_memory || "that delicious dosa/burger";
  const vaish = responses.vaishno_memory || "your Vaishno Devi stories";
  const hima = responses.live_in_himachal || "a mountain getaway";
  const familyThing = responses.what_she_loves_most || "the small ways you love";
  const sport = responses.football_interest || responses.peaky_character || "your playful choices";

  const message = [
    "Hey love — I made this for you.",
    `I remember laughing with you at ${ep}.`,
    `I want to try ${food} again with you.`,
    `I hear your Vaishno memories in your voice: "${vaish}".`,
    `If you want Himachal, I will come: ${hima}.`,
    `I love the ways you love: ${familyThing}.`,
    `Even when you pretend not to care about football: ${sport}.`,
    "",
    "These things are mine to keep — just ours.",
    "Will you give me one more chance to make new memories?"
  ].join("\n");

  finishMessage.innerText = message;
  finishOverlay.style.display = "flex";

  // small celebration if confetti lib loaded
  if (window.confetti) {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.2 }
    });
  }
}

function loadScene() {
  const current = scenes[index];
  setBackground(current.bg || "");
  titleEl.innerText = current.title || "";
  textEl.innerText = current.text || "";
  quoteEl.innerText = current.quote || "";

  if (current.gif) {
    gifEl.style.display = "block";
    gifEl.src = current.gif;
  } else {
    gifEl.style.display = "none";
    gifEl.src = "";
  }

  // play audio for scene
  playAudio(current.audio || "");

  // If scene has a question, show it after a short delay
  if (current.question) {
    setTimeout(() => {
      showQuestion(current.question);
    }, 700);
  } else {
    hideQuestion();
  }

  // update button text for final
  btn.innerText = current.final ? "FINISH" : "NEXT";
}

function nextScene() {
  index++;
  if (index >= scenes.length) {
    // reached end — show final reveal if not already final
    showFinal();
    return;
  }
  loadScene();
}

// handle main button
btn.addEventListener("click", () => {
  const current = scenes[index];
  // If current scene had a short-answer question visible, collect answer
  if (current.question && current.question.type === "short" && questionOverlay.style.display === "flex") {
    const val = questionInput.value.trim();
    if (val && val.toLowerCase() !== "skip") {
      responses[current.question.key] = val;
      hideQuestion();
      nextScene();
      return;
    } else if (val.toLowerCase() === "skip" || val === "") {
      // allow skip
      hideQuestion();
      nextScene();
      return;
    }
  }

  // If on final scene, reveal final message
  if (current.final) {
    showFinal();
    return;
  }

  nextScene();
});

// close handlers
document.getElementById("questionClose").addEventListener("click", hideQuestion);
document.getElementById("finishClose").addEventListener("click", () => finishOverlay.style.display = "none");
document.getElementById("finishSend").addEventListener("click", () => {
  // copy final message to clipboard or notify
  navigator.clipboard.writeText(finishMessage.innerText).then(() => {
    alert("Message copied — you can paste it into a chat or save it.");
  }).catch(() => {
    alert("Could not copy automatically — please select and copy the message.");
  });
});

// small safety: ensure elements exist before starting
preloadAssets();
loadScene();
