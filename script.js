/* Updated script.js — implements your requested changes:
   - removed Mummy & Ishaan scene, added Family scene
   - added "Us" scene with Michael gif + relationship quote
   - improved image/gif fallbacks and background load check
   - "That's what she said" SFX plays every time a question is answered
   - Katakirr misal line with joking "that's what she said" after it
   - final message includes apology + affection
*/

/* Helper: filenames to try for the "that's what she said" effect.
   The repo screenshot contains multiple similarly-named files; we attempt sensible fallbacks.
*/
const ANSWER_SFX_CANDIDATES = [
  "Thats_What_she_said.mp3",
  "That's_What_she_said.mp3",
  "shesaid.mp3",
  "ThatsWhatSheSaid.mp3"
];

const scenes = [
  {
    id: "intro-office",
    title: "Welcome to Dunder Mifflin — JAMMU BRANCH",
    text: "I don't know why I made this website... then I remembered the only thing better than chaos is a little shared chaos with you.",
    bg: "images/office_bg1.jpg",
    gif: "Michael_Im_dead_Inside.gif",
    audio: "Michael_scott_thank_you.mp3",
    quote: "Sometimes I'll start a sentence and I don't even know where it's going. — Michael Scott"
  },
  {
    id: "Jim / Devyaniiii-knows",
    title: "That Look when I do something wrong and very Unlikable",
    text: "Remember the look Jim gave Pam? I have that look saved as my 'serious face when you laugh at my jokes' setting.",
    bg: "images/Jim_face_While_Onphone.jpg",
    gif: "Stanley_gif_1.gif",
    audio: "That's_What_she_said.mp3",
    quote: "You miss 100% of the shots you don't take. — Michael Scott/n and  ",
    question: {
      type: "short",
      key: "favorite_office_episode",
      prompt: "Which episode of The Office made you laugh the hardest?"
    }
  },
  {
    id: "michael-energy",
    title: "Michael Energy",
    text: "Confidence and nonsense in equal measure — peak Michael energy.",
    bg: "images/office_bg3.jpg",
    gif: "Kevin_destroying_kitchen.gif",
    audio: "cage.mp3",
    quote: "I am Beyoncé, always. — Michael Scott"
  },
  {
    id: "peaky",
    title: "Peaky Vibes",
    text: "We binge Peaky Blinders together — so intense, so dramatic.",
    bg: "images/peaky_bg.jpg",
    gif: "images/peaky.gif",
    audio: "theme.mp3",
    quote: "You don't parley when you're a Shelby. — Tommy Shelby",
    question: {
      type: "mcq",
      key: "peaky_character",
      prompt: "Who's the most dangerously charismatic? (pick one)",
      choices: ["Tommy", "Arthur", "Polly", "All very broody"]
    }
  },

  {
    id: "family-ties",
    title: "Family Holds Together",
    text: "Family isn't perfect — it's the stubborn glue that keeps the good and messy parts together.",
    bg: "images/family_bg.jpg",
    gif: "images/family.gif",
    audio: "deranged.mp3",
    quote: "Family will carry you through — even when you don't ask them to. — Peaky office vibes",
    question: {
      type: "short",
      key: "family_thing",
      prompt: "What's one small family memory that always makes you smile?"
    }
  },

  // new "Us" scene to show relationship presence
  {
    id: "us",
    title: "Us",
    text: "This is us — silly, imperfect, warm. A little Michael awkwardness; a lot of real feeling.",
    bg: "images/Kelly_kapoor_Couple.jpg",
    gif: "Stanley_gif_1.gif",
    audio: "daffyduck.mp3",
    quote: "Pam & Jim had their story; this is ours — messy, beautiful, and mine.",
    question: {
      type: "short",
      key: "us_memory",
      prompt: "Tell me one tiny moment of us you still keep in your head"
    }
  },

  {
    id: "himachal-dream",
    title: "Himachal Dreams",
    text: "what I thought of when You said you'd leave everything and live in Himachal (Sound). I think I could follow you anywhere — but only if there's good Zamindar Dhaba Nearby and Burger King.",
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
    title: "Whenver the Topic Vaishno Devi come....I know what you think of me ",
    text: "I am so sorrryyyyyyyyyy for thatttttttt",
    bg: "images/vaishno_bg.jpg",
    gif: "images/temple.gif",
    audio: "punish.mp3",
    quote: "A promise to be there for you — starting now.",

  },
  {
    id: "kashmir",
    title: "Kashmir Nights",
    text: "BurgerKing, dosa, midnight walks — my favourite days were with you.",
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
    id: "footballlllll",
    title: "Football but why , Kay garaj aahe he add karaycha faltu darr veles ",
    text: "I love ___ ___ ___. Mi pan n kahi pan karat basto n madhech Football aanto madhech ... but you know Arsenal is 1st in league in Champions League , Premier League , Carabao Cup Final.......Very Happy year this year for me and Arsenal",
    bg: "images/football_bg.jpg",
    gif: "images/football_reaction.gif",
    audio: "goal_cheer.mp3",
    quote: "If loving football is wrong, I don't want to be right.",
    question: {
      type: "mcq",
      key: "football_interest",
      prompt: "Are you Team Arsenal, Team Barca, or 'I just don't give fuck about you and your football'?",
      choices: ["Arsenal", "Barcelona", "Snacks > Football", "fuck it"]
    }
  },

  // Katakirr misal scene (funny, personal)
  {
    id: "katakirr",
    title: "Katakirr Misal (the truth)",
    text: "I haven't eaten Katakirr misal in a long time — the places I went with you mean more than the food. I will never go alone or with anyone else. (laugh)",
    bg: "images/misal_bg.jpg",
    gif: "images/misal_giggle.gif",
    audio: "shesaid.mp3", // We'll also trigger the answer SFX after this line
    quote: "And to be clear: I will not go alone — that's my promise.",
    // no question here, but we will play That's-what-she-said SFX once this scene shows
  },

  {
    id: "bridgerton-tease",
    title: "A Little Bridgerton",
    text: "A dash of drama, a pinch of romance, and you asking 'who's that duke again' — classic Bridgerton energy.",
    bg: "images/bridgerton_bg.jpg",
    gif: "images/bridgerton.gif",
    audio: "theme.mp3",
    quote: "When in doubt, say something witty and let everyone else be confused."
  },
  {
    id: "final",
    title: "To You — A Little Quiz, A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "images/final_bg.jpg",
    gif: "images/heart_fireworks.gif",
    audio: "daffyduck.mp3",
    quote: "This is mine to keep, but I wanted you to see it first.",
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

/* Preload and check background before applying (so broken backgrounds don't produce blank white) */
function setBackground(url) {
  if (!url) {
    sceneDiv.style.backgroundImage = "";
    return;
  }
  const test = new Image();
  test.onload = () => {
    sceneDiv.style.backgroundImage = `url("${url}")`;
  };
  test.onerror = () => {
    // fallback gradient if bg couldn't load
    sceneDiv.style.backgroundImage = `linear-gradient(135deg,#333,#111)`;
  };
  test.src = url;
}

/* Gif fallback: hide gif if not loaded and expand quote area */
gifEl.addEventListener("error", () => {
  gifEl.style.display = "none";
});

/* play audio with autoplay handling */
function playAudio(src) {
  if (!src) {
    audioEl.pause();
    audioEl.src = "";
    return;
  }
  audioEl.src = src;
  audioEl.currentTime = 0;
  const promise = audioEl.play();
  if (promise !== undefined) {
    promise.catch(() => {
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
    hideAutoplayHint();
    const current = scenes[index];
    if (current && current.audio) {
      audioEl.src = current.audio;
      audioEl.play().catch(()=>{});
    }
  });
}

/* Attempt to play the "that's what she said" SFX from multiple possible filenames */
function playAnswerSfx() {
  // create an ephemeral audio element to play SFX without affecting scene audio
  const sfx = new Audio();
  // try candidates in sequence until one loads and plays
  let tried = 0;
  function tryNext() {
    if (tried >= ANSWER_SFX_CANDIDATES.length) return;
    const candidate = ANSWER_SFX_CANDIDATES[tried++];
    sfx.src = candidate;
    sfx.currentTime = 0;
    const p = sfx.play();
    if (p !== undefined) {
      p.catch(() => {
        // try another candidate
        tryNext();
      });
    }
  }
  tryNext();
}

/* show question overlay */
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
        // play the cheeky SFX when she answers
        playAnswerSfx();
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

/* hide question */
function hideQuestion() {
  questionOverlay.style.display = "none";
}

/* show final assembled message (includes apology & affection) */
function showFinal() {
  const ep = responses.favorite_office_episode || "our favourite silly episode";
  const food = responses.best_food_memory || "that delicious dosa/burger";
  const vaish = responses.vaishno_memory || "your Vaishno Devi stories";
  const hima = responses.live_in_himachal || "a mountain getaway";
  const familyThing = responses.family_thing || responses.what_she_loves_most || "the small ways you love";
  const sport = responses.football_interest || responses.peaky_character || "your playful choices";
  const usmem = responses.us_memory || "the little moment you smiled that I keep replaying";

  const message = [
    "Hey love — I made this for you.",
    `I remember laughing with you at ${ep}.`,
    `I want to try ${food} again with you.`,
    `I remember your Vaishno story: "${vaish}".`,
    `If you want Himachal, I will come: ${hima}.`,
    `I love the ways you love: ${familyThing}.`,
    `Even when you pretend not to care about football: ${sport}.`,
    `One tiny moment of us I keep: ${usmem}.`,
    "",
    "I also want to say I'm sorry for the times I hurt you. I regret the bad things I've done.",
    "I hope you are doing fine. I love you, I care for you, and I want to keep making better memories with you.",
    "",
    "Will you give me one more chance to make new memories?"
  ].join("\n");

  finishMessage.innerText = message;
  finishOverlay.style.display = "flex";

  if (window.confetti) {
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.2 } });
  }
}

/* Load a scene: background, text, gif, audio, and question handling */
function loadScene() {
  const current = scenes[index];
  setBackground(current.bg || "");
  titleEl.innerText = current.title || "";
  textEl.innerText = current.text || "";
  quoteEl.innerText = current.quote || "";

  if (current.gif) {
    gifEl.style.display = "block";
    gifEl.src = current.gif;
    // if GIF fails, onerror hides gif (see listener above)
  } else {
    gifEl.style.display = "none";
    gifEl.src = "";
  }

  playAudio(current.audio || "");

  // if this is the katakirr scene, after showing text, play the cheeky SFX
  if (current.id === "katakirr") {
    // play the "that's what she said" after a short delay to match the joke
    setTimeout(() => {
      playAnswerSfx();
    }, 1000);
  }

  if (current.question) {
    setTimeout(() => {
      showQuestion(current.question);
    }, 700);
  } else {
    hideQuestion();
  }

  btn.innerText = current.final ? "FINISH" : "NEXT";
}

/* Advance to next scene */
function nextScene() {
  index++;
  if (index >= scenes.length) {
    showFinal();
    return;
  }
  loadScene();
}

/* Next button behavior: handle short answer submission + final */
btn.addEventListener("click", () => {
  const current = scenes[index];
  // If current scene had a short-answer question visible, collect answer
  if (current.question && current.question.type === "short" && questionOverlay.style.display === "flex") {
    const val = questionInput.value.trim();
    if (val && val.toLowerCase() !== "skip") {
      // play cheeky sfx when she answers
      playAnswerSfx();
      responses[current.question.key] = val;
      hideQuestion();
      nextScene();
      return;
    } else {
      // allow skip or empty, move forward
      hideQuestion();
      nextScene();
      return;
    }
  }

  if (current.final) {
    showFinal();
    return;
  }

  nextScene();
});

/* close handlers */
document.getElementById("questionClose").addEventListener("click", hideQuestion);
document.getElementById("finishClose").addEventListener("click", () => finishOverlay.style.display = "none");
document.getElementById("finishSend").addEventListener("click", () => {
  navigator.clipboard.writeText(finishMessage.innerText).then(() => {
    alert("Message copied — you can paste it into a chat or save it.");
  }).catch(() => {
    alert("Could not copy automatically — please select and copy the message.");
  });
});

/* Preload images/audio and start */
function preloadAssets() {
  scenes.forEach(s => {
    if (s.bg) { const i = new Image(); i.src = s.bg; }
    if (s.gif) { const g = new Image(); g.src = s.gif; }
    if (s.audio) {
      try { const a = new Audio(); a.src = s.audio; } catch(e) {}
    }
  });
}
preloadAssets();
loadScene();
