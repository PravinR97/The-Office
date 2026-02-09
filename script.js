/* script.js
   - Office-style memory tour with multiple episodes
   - Uses all photos/GIFs/audio across scenes
   - Question overlays, typing effect, audio controls
*/

/* ---------- Configuration & assets ---------- */
const PHOTO_POOL = [
  "images/Andy_1.jpg",
  "images/Creed_2.jpg",
  "images/Creed_with_quote.jpg",
  "images/DDDDDD2.jpeg",
  "images/Dddddd3.jpeg",
  "images/Ddddddd_1.jpeg",
  "images/Devu1.jpeg",
  "images/Devuuuu_2.jpeg",
  "images/Devyani_3.jpeg",
  "images/Dwight cry 2.jpg",
  "images/Dwight smile.jpg",
  "images/Dwight_32.jpg",
  "images/Dwight_Cry1.jpg",
  "images/Dwight_Funny_face.jpg",
  "images/Dwight_Women_Wig.jpg",
  "images/Dwight_pam_Cry.jpg",
  "images/Dwight_with_jimFace.jpg",
  "images/Dwight_with_quote.jpg",
  "images/Jim 1.jpg",
  "images/Jim_Face_plushappy.jpg",
  "images/Jim_as_Dwight.jpg",
  "images/Jim_face.jpg",
  "images/Jim_face_While_Onphone.jpg",
  "images/Jim_with_quotes.jpg",
  "images/Jim_with_quotes2.jpg",
  "images/Kelly 1.jpg",
  "images/Kelly_1.jpg",
  "images/Kelly_kapoor_Couple.jpg",
  "images/Kevin 1.jpg",
  "images/Kevin_1.jpg",
  "images/Micahel_Superman.jpg",
  "images/Micahel_face.jpg",
  "images/Michael_Crying.jpg",
  "images/Michael_Gif_2.jpg",
  "images/Michael_Scott_1.jpg",
  "images/Michael_famous_meme.jpg",
  "images/Michael_with_quotes.jpg",
  "images/Office_bg_2.jpg",
  "images/Pam 1.jpg",
  "images/Pam_3_happy.jpg",
  "images/Pam_Salute.jpg",
  "images/Pam_happy.jpg",
  "images/Pam_with_quotes.jpg",
  "images/Prison_Mike.jpg",
  "images/Stanley_angry_Look.jpg",
  "images/That's_what_she_said.jpg",
  "images/The_officee_image.jpg",
  "images/Toby 1.jpg",
  "images/Toby_2.jpg",
  "images/Whole_squad.jpg",
  "images/Worlds_best_boss.jpg",
  "images/creed_1.jpg",
  "images/dddduuuu_3.jpeg",
  "images/devuuu_5.png",
  "images/devvvvvv_5.jpeg",
  "images/dwight_1.jpg",
  "images/dwight_2.jpg",
  "images/dwight_cry_1.jpg",
  "images/dwight_cry_2.jpg",
  "images/dwight_smile.jpg",
  "images/jim_1.jpg",
  "images/kelly_1.jpg",
  "images/kevin_1.jpg",
  "images/michael 1.jpg",
  "images/michael_1.jpg",
  "images/michael_6.jpg",
  "images/office_bg1.jpg",
  "images/office_bg2.jpg",
  "images/office_bg3.jpg",
  "images/pam_1.jpg",
  "images/pam_sad_Look.jpg",
  "images/peaky.jpg",
  "images/peaky_bg.jpg",
  "images/random_Toby_sad_face.webp",
  "images/toby_1.jpg",
  "images/tobyquote_12.webp",
  "images/whole_1.jpg",
];

const GIF_POOL = [
  "images/Dance_1.gif",
  "images/Dwight_Dancing.gif",
  "images/Dwight_Dancing_2.gif",
  "images/Dwight_gif_1.gif",
  "images/Dwight_let's_do_this.gif",
  "images/Dwight_would_a_Idiot.gif",
  "images/Kelly_Italkalotsoilearnedtojusttumemyselfout.gif",
  "images/Kelly_youknowguyslikeimreallysmart.gif",
  "images/Kevin_destroying_kitchen.gif",
  "images/Kevin_laughing.gif",
  "images/Michael_Dance_2.gif",
  "images/Michael_Dancing.gif",
  "images/Michael_Im_dead_Inside.gif",
  "images/Michael_TImeout.gif",
  "images/Michael_gif_1.gif",
  "images/Stanley_gif_1.gif",
  "images/let_me_love_you_Michael.gif",
];

const VIDEO_POOL = ["images/Bhindi_bohot_paasand.mp4"];

const AUDIO = {
  theme: "theme.mp3",
  wild: "wild.mp3",
  gamble: "gamble.mp3",
  punish: "punish.mp3",
  weapons: "weapons.mp3",
  nogod: "nogod.mp3",
  deranged: "deranged.mp3",
  cage: "cage.mp3",
  daffy: "daffyduck.mp3",
  thatsSheSaid: "That's_What_she_said.mp3",
  shesaid: "shesaid.mp3",
  michaelThankYou: "Michael_scott_thank_you.mp3",
  dwightSmile: "Dwight_about_smile_chimpanzee_begging.mp3",
};

const scenes = [
  {
    id: "gate",
    title: "Before You Enter…",
    text: "Do you want to go inside…?",
    bg: "images/office_bg1.jpg",
    gif: "images/Dwight_would_a_Idiot.gif",
    quote:
      "“Whenever I’m about to do something, I think, ‘Would an idiot do that?’ And if they would, I do not do that thing.” — Dwight Schrute",
    gate: true,
  },
  {
    id: "intro",
    title: "Welcome to Dunder Mifflin — IIM Jammu Branch",
    text:
      "Welcome to IIM Jammu Branch of Dunder Mifflin Paper Company...\nThis little tour is for you — tiny memories, big apologies, and a million smiles.",
    bg: ["images/The_officee_image.jpg", "images/Worlds_best_boss.jpg", "images/office_bg2.jpg"],
    gif: "images/Michael_Dancing.gif",
    people: PHOTO_POOL,
    thumbs: { pool: PHOTO_POOL },
    quote:
      "Jim is my enemy. But it turns out Jim is also his own worst enemy... so actually, Jim is my friend. — Dwight logic",
    question: {
      type: "short",
      key: "favorite_office_episode",
      prompt:
        "We started The Office together... which episode is your favorite right now? (Diversity Day, The Dundies, Goodbye Michael, or any other).",
    },
    bgAudio: AUDIO.theme,
  },
  {
    id: "episode-2",
    title: "Episode 2 — That Look (Missing You)",
    text:
      "All you need is love? False. The four basic human necessities are air, water, food and shelter.\n\nAlso: I miss you. A lot. Like Jim hiding a smile after Pam laughs.\nI’m sorry for the times I messed up — I want to do better, every day.",
    bg: ["images/office_bg2.jpg", "images/Pam_happy.jpg", "images/Jim_face.jpg", "images/Pam_3_happy.jpg"],
    gif: "images/Kelly_Italkalotsoilearnedtojusttumemyselfout.gif",
    people: ["images/jim_1.jpg", "images/pam_1.jpg", "images/kelly_1.jpg", "images/michael_1.jpg"],
    thumbs: { pool: PHOTO_POOL },
    quote: "Sarcastic? Always. Missing you? Always more.",
    question: {
      type: "short",
      key: "today_smile",
      prompt: "Tell me one tiny thing from today that made you smile.",
    },
    bgAudio: AUDIO.wild,
  },
  {
    id: "episode-3",
    title: "Episode 3 — Katakirr Misal, Bhindi & Discipline",
    text:
      "You and your food choices are iconic: katakirr misal, bhindi, and healthy schedule energy.\nI love that you care about discipline, good sleep, and steady routines.\nI want to be part of that — your calm, not your chaos.",
    bg: ["images/Office_bg_2.jpg", "images/Stanley_angry_Look.jpg", "images/Pam_Salute.jpg"],
    video: "images/Bhindi_bohot_paasand.mp4",
    people: ["images/Kevin_1.jpg", "images/Stanley_angry_Look.jpg", "images/Pam_happy.jpg"],
    thumbs: { pool: PHOTO_POOL },
    quote: "Eat, breathe, plan, repeat. The Schrutes respect discipline.",
    question: {
      type: "mcq",
      key: "favorite_food",
      prompt: "Pick your vibe today:",
      choices: ["Katakirr misal", "Bhindi", "Both", "Surprise me"],
    },
    bgAudio: AUDIO.gamble,
  },
  {
    id: "episode-4",
    title: "Episode 4 — Inside Jokes & Office Chaos",
    text:
      "This is the episode where we laugh at our own jokes.\nI promise to bring more smiles, fewer sighs, and a lot more silly moments.",
    bg: ["images/Michael_famous_meme.jpg", "images/Dwight_Funny_face.jpg", "images/Prison_Mike.jpg"],
    gif: "images/Michael_Im_dead_Inside.gif",
    people: ["images/Dwight_Funny_face.jpg", "images/Michael_Scott_1.jpg", "images/Creed_2.jpg"],
    thumbs: { pool: PHOTO_POOL },
    quote: "That’s what she said. (Only when perfectly timed.)",
    question: {
      type: "short",
      key: "inside_joke",
      prompt: "Tell me one inside joke I should never forget.",
    },
    sfxOnLoad: AUDIO.thatsSheSaid,
    bgAudio: AUDIO.daffy,
  },
  {
    id: "episode-5",
    title: "Episode 5 — Us, But Make It Epic",
    text:
      "Some days we’re soft, some days we’re stormy.\nBut I want to show up — consistently, kindly, and with intention.\nYou deserve that.",
    bg: ["images/Whole_squad.jpg", "images/peaky_bg.jpg", "images/Worlds_best_boss.jpg"],
    gif: "images/Dwight_Dancing_2.gif",
    people: ["images/Devyani_3.jpeg", "images/Devu1.jpeg", "images/devvvvvv_5.jpeg", "images/dddduuuu_3.jpeg"],
    thumbs: { pool: PHOTO_POOL },
    quote: "I’m not superstitious, but I am a little stitious. — Michael",
    question: {
      type: "short",
      key: "one_promise",
      prompt: "One promise you want me to keep, every single day?",
    },
    bgAudio: AUDIO.weapons,
  },
  {
    id: "episode-6",
    title: "Episode 6 — The Memory Wall",
    text:
      "A quick wall of faces, chaos, and laughter.\nEvery picture is a tiny reminder that we still have so many chapters left.",
    bg: PHOTO_POOL,
    gif: GIF_POOL,
    people: PHOTO_POOL,
    thumbs: { pool: PHOTO_POOL },
    quote: "I wish there was a way to know you’re in the good old days... — Andy",
    question: {
      type: "short",
      key: "memory_wall",
      prompt: "Which memory should we add next to this wall?",
    },
    bgAudio: AUDIO.deranged,
  },
  {
    id: "fights",
    title:
      "Episode 7 — The Hard Talks (Apologies & Fixes)",
    text:
      "This part matters. I want to say sorry — truly — for the moments I regret. I’ll walk through each one and ask one small question.",
    bg: ["images/whole_1.jpg", "images/Dwight_pam_Cry.jpg", "images/Michael_Crying.jpg", "images/Dwight_Cry1.jpg"],
    gif: "images/let_me_love_you_Michael.gif",
    people: ["images/dwight_cry_1.jpg", "images/jim_1.jpg"],
    thumbs: { pool: PHOTO_POOL },
    quote: "I wish there was a way to know you’re in the good old days...",
    fights: [
      {
        id: "mba-chaiwala",
        title: "MBA Chaiwala — I was wrong",
        text:
          "At MBA chaiwala — not once, but many times — I handled things badly.\nI’m sorry for the words and the tone. I want to fix this memory for us.",
        bg: ["images/office_bg2.jpg", "images/Michael_Crying.jpg", "images/dddduuuu_3.jpeg"],
        people: ["images/dwight_cry_1.jpg", "images/devvvvvv_5.jpeg"],
        gif: "images/Dwight_let's_do_this.gif",
        quote: "Sometimes I start a sentence and I don’t even know where it’s going. — Michael",
        thumbs: { pool: PHOTO_POOL },
        question: {
          type: "short",
          key: "mba_chaiwala_fix",
          prompt: "What one small thing could I do to make this right?",
        },
      },
      {
        id: "maggie-place",
        title: "Maggie’s Place — I’m sorry",
        text:
          "That fight at Maggie’s place... I regret it. I’m sorry for adding stress instead of peace.",
        bg: ["images/Devuuuu_2.jpeg", "images/Jim 1.jpg", "images/Pam_happy.jpg"],
        gif: "images/Michael_TImeout.gif",
        quote: "I am running away from my responsibilities. And it feels good. — (but not this time)",
        thumbs: { pool: PHOTO_POOL },
        question: {
          type: "short",
          key: "maggie_place_fix",
          prompt: "What helped you calm down that day?",
        },
      },
      {
        id: "kashmir",
        title: "Pahalgam — I ruined the morning",
        text:
          "That night in Kashmir was magic. The morning turned bad because of me.\nI’m truly sorry — let me fix this memory for us.",
        bg: ["images/Devu1.jpeg", "images/devvvvvv_5.jpeg", "images/Ddddddd_1.jpeg"],
        people: ["images/michael_1.jpg"],
        gif: "images/Michael_gif_1.gif",
        quote: "I wish there was a way to know you’re in the good old days...",
        thumbs: { pool: PHOTO_POOL },
        question: {
          type: "short",
          key: "kashmir_fix",
          prompt: "If I could change one thing from that trip, what should I do first?",
        },
      },
    ],
  },
  {
    id: "final",
    title: "To You — My Little Message, A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "images/office_bg3.jpg",
    gif: "images/let_me_love_you_Michael.gif",
    final: true,
  },
];

/* ---------- State ---------- */
let index = 0;
let responses = {};
let sceneState = {};
let fightsIndex = 0;
const sceneSfxPlayed = new Set();

/* ---------- DOM ---------- */
const sceneEl = document.getElementById("scene");
const titleEl = document.getElementById("title");
const sceneTitle = document.getElementById("sceneTitle");
const textEl = document.getElementById("text");
const quoteEl = document.getElementById("quote");
const gifImg = document.getElementById("gifImg");
const gifVideo = document.getElementById("gifVideo");
const peopleBg = document.getElementById("peopleBg");
const nextBtn = document.getElementById("nextBtn");

const thumbTL = document.getElementById("thumb-top-left");
const thumbTR = document.getElementById("thumb-top-right");
const thumbBL = document.getElementById("thumb-bottom-left");
const thumbBR = document.getElementById("thumb-bottom-right");

/* overlays */
const questionOverlay = document.getElementById("questionOverlay");
const questionPrompt = document.getElementById("questionPrompt");
const mcqContainer = document.getElementById("mcqContainer");
const questionInput = document.getElementById("questionInput");
const questionSubmit = document.getElementById("questionSubmit");
const questionSkip = document.getElementById("questionSkip");
const questionClose = document.getElementById("questionClose");

const finishOverlay = document.getElementById("finishOverlay");
const finishMessage = document.getElementById("finishMessage");
const finishClose = document.getElementById("finishClose");
const finishSend = document.getElementById("finishSend");

/* audio elements */
const bgAudio = document.getElementById("bgAudio");
const sfxAudio = document.getElementById("sfxAudio");
const voiceAudio = document.getElementById("voiceAudio");

/* control buttons */
const muteBtn = document.getElementById("muteBtn");
const gifPauseBtn = document.getElementById("gifPauseBtn");
const playAudioBtn = document.getElementById("playAudioBtn");
const autoplayHint = document.getElementById("autoplayHint");
const autoplayPlay = document.getElementById("autoplayPlay");

/* ---------- Helpers ---------- */
function resolveAsset(asset) {
  if (!asset) return "";
  if (Array.isArray(asset)) {
    return asset[Math.floor(Math.random() * asset.length)] || "";
  }
  if (typeof asset === "string") return asset.trim();
  return asset;
}

function shuffle(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandomItems(list, count) {
  if (!Array.isArray(list)) return [];
  return shuffle(list).slice(0, count);
}

function setBackground(url) {
  const resolvedUrl = resolveAsset(url);
  if (!resolvedUrl) {
    sceneEl.style.backgroundImage = "";
    return;
  }
  const img = new Image();
  img.onload = () => {
    sceneEl.style.backgroundImage = `url("${resolvedUrl}")`;
    sceneEl.style.backgroundSize = "cover";
    sceneEl.style.backgroundPosition = "center";
  };
  img.onerror = () => {
    sceneEl.style.backgroundImage = `linear-gradient(135deg,#222,#0b0b0b)`;
  };
  img.src = resolvedUrl;
}

function handleGate() {
  nextBtn.innerText = "";
  nextBtn.disabled = true;

  const yesBtn = document.createElement("button");
  yesBtn.innerText = "Yessssss 😁";
  yesBtn.className = "gateYes";

  const noBtn = document.createElement("button");
  noBtn.innerText = "Noooo 😢";
  noBtn.className = "gateNo";

  yesBtn.addEventListener("click", () => {
    removeGateButtons();
    index += 1;
    loadScene();
  });

  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform =
      `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;
  });

  nextBtn.parentElement.appendChild(yesBtn);
  nextBtn.parentElement.appendChild(noBtn);
}

function renderPeople(list = []) {
  peopleBg.innerHTML = "";
  if (!list || list.length === 0) return;
  const people = getRandomItems(list, 4);
  people.forEach((src, i) => {
    const img = document.createElement("img");
    img.className = "person";
    img.src = src;
    img.alt = "";
    img.style.zIndex = 20 + i;
    img.addEventListener("error", () => (img.style.display = "none"));
    peopleBg.appendChild(img);
  });
}

function setCornerThumbs(obj = {}) {
  let payload = obj;
  if (obj && obj.pool) {
    const picks = getRandomItems(obj.pool, 4);
    payload = {
      tl: picks[0],
      tr: picks[1],
      bl: picks[2],
      br: picks[3],
    };
  }
  const mapping = [
    [thumbTL, payload.tl],
    [thumbTR, payload.tr],
    [thumbBL, payload.bl],
    [thumbBR, payload.br],
  ];
  mapping.forEach(([el, src]) => {
    if (src) {
      el.src = src;
      el.style.display = "block";
      el.addEventListener("error", () => (el.style.display = "none"));
    } else {
      el.style.display = "none";
      el.src = "";
    }
  });
}

function showMedia(gifPath, videoPath, fallbackImage, poster) {
  gifImg.style.display = "none";
  if (gifVideo) gifVideo.style.display = "none";
  if (gifVideo) {
    gifVideo.pause();
    gifVideo.removeAttribute("src");
  }

  if (!gifPath && !videoPath && !fallbackImage) return;

  if (gifPath) {
    const test = new Image();
    test.onload = () => {
      gifImg.src = gifPath;
      gifImg.style.display = "block";
      gifImg.alt = "";
    };
    test.onerror = () => {
      if (videoPath) {
        gifVideo.src = videoPath;
        gifVideo.poster = poster || "";
        gifVideo.style.display = "block";
        gifVideo.play().catch(() => {});
      } else if (fallbackImage) {
        gifImg.src = fallbackImage;
        gifImg.style.display = "block";
      } else {
        gifImg.style.display = "none";
      }
    };
    test.src = gifPath;
    return;
  }

  if (videoPath) {
    gifVideo.src = videoPath;
    gifVideo.poster = poster || "";
    gifVideo.style.display = "block";
    gifVideo.play().catch(() => {});
    return;
  }

  if (fallbackImage) {
    gifImg.src = fallbackImage;
    gifImg.style.display = "block";
  }
}

function playBg(src) {
  if (!src) {
    fadeOut(bgAudio);
    return;
  }
  if (bgAudio.src && bgAudio.src.includes(src)) return;
  fadeOut(bgAudio, 200);
  bgAudio.src = src;
  bgAudio.volume = muted ? 0 : 0.36;
  const p = bgAudio.play();
  if (p !== undefined) p.catch(() => showAutoplayHint());
}

function fadeOut(audioEl, ms = 300) {
  try {
    if (!audioEl.src || audioEl.paused) return audioEl.pause();
    const start = audioEl.volume;
    const step = 50;
    const steps = Math.max(1, Math.floor(ms / step));
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      audioEl.volume = Math.max(0, start * (1 - i / steps));
      if (i >= steps) {
        clearInterval(t);
        audioEl.pause();
        audioEl.volume = start;
      }
    }, step);
  } catch (e) {
    audioEl.pause();
  }
}

function playSfx(src, { volume = 0.9 } = {}) {
  if (!src) return;
  sfxAudio.src = src;
  sfxAudio.currentTime = 0;
  sfxAudio.volume = muted ? 0 : volume;
  const p = sfxAudio.play();
  if (p !== undefined) p.catch(() => showAutoplayHint());
}

function playVoice(src, { volume = 0.9 } = {}) {
  if (!src) return;
  voiceAudio.src = src;
  voiceAudio.currentTime = 0;
  voiceAudio.volume = muted ? 0 : volume;
  const p = voiceAudio.play();
  if (p !== undefined) p.catch(() => showAutoplayHint());
}

let muted = false;
function setMute(v) {
  muted = v;
  bgAudio.muted = v;
  sfxAudio.muted = v;
  voiceAudio.muted = v;
  muteBtn.innerText = v ? "🔇" : "🔈";
}

function typeText(el, text, speed = 30) {
  return new Promise((resolve) => {
    el.innerText = "";
    let i = 0;
    function step() {
      if (i <= text.length) {
        el.innerText = text.slice(0, i);
        i += 1;
        setTimeout(step, speed + Math.random() * 20);
      } else {
        resolve();
      }
    }
    step();
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
        proceedAfterAnswer();
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

function removeGateButtons() {
  const yes = document.querySelector(".gateYes");
  const no = document.querySelector(".gateNo");
  if (yes) yes.remove();
  if (no) no.remove();
}

function maybePlaySceneSfx(scene) {
  if (!scene || !scene.sfxOnLoad) return;
  if (sceneSfxPlayed.has(scene.id)) return;
  sceneSfxPlayed.add(scene.id);
  playSfx(scene.sfxOnLoad);
}

function loadScene() {
  removeGateButtons();
  const current = scenes[index];
  if (!current) return;

  if (current.id === "gate") {
    setBackground(current.bg);
    sceneTitle.innerText = current.title || "";
    quoteEl.innerText = current.quote || "";
    renderPeople([]);
    setCornerThumbs({});
    showMedia(current.gif || "", "", resolveAsset(current.bg) || "");

    textEl.innerText = current.text || "";
    handleGate();
    playBg("");
    return;
  }

  if (current.id === "fights") {
    fightsIndex = 0;
    sceneState.fightsStep = 0;
  }

  setBackground(current.bg || "");
  sceneTitle.innerText = current.title || "";
  quoteEl.innerText = current.quote || "";

  renderPeople(current.people || []);
  setCornerThumbs(current.thumbs || {});

  const resolvedGif = resolveAsset(current.gif || "");
  const resolvedVideo = resolveAsset(current.video || "");
  showMedia(resolvedGif, resolvedVideo, resolveAsset(current.bg) || "", resolveAsset(current.poster));

  textEl.innerText = "";

  if (current.id === "intro") {
    nextBtn.disabled = true;
    nextBtn.innerText = "Continue";
    typeText(textEl, current.text || "", 36).then(() => {
      nextBtn.disabled = false;
      sceneState.introStep = 0;
    });
    playBg(current.bgAudio || "");
    return;
  }

  if (current.id === "fights") {
    nextBtn.disabled = true;
    nextBtn.innerText = "Start";
    typeText(textEl, current.text || "", 28).then(() => {
      nextBtn.disabled = false;
    });
    playBg(current.bgAudio || "");
    return;
  }

  textEl.innerText = current.text || "";
  nextBtn.innerText = current.final ? "FINISH" : "NEXT";
  nextBtn.disabled = false;

  if (current.bgAudio) {
    playBg(current.bgAudio);
  } else {
    playBg("");
  }

  maybePlaySceneSfx(current);

  if (current.question) {
    setTimeout(() => showQuestion(current.question), 700);
  } else {
    hideQuestion();
  }
}

function proceedAfterAnswer() {
  const current = scenes[index];
  if (!current) return;
  if (current.id === "fights") {
    handleNextFight();
    return;
  }
  nextScene();
}

function nextScene() {
  index += 1;
  if (index >= scenes.length) {
    showFinal();
    return;
  }
  loadScene();
}

async function handleIntroClick() {
  const current = scenes[index];
  if (!current || current.id !== "intro") return;
  sceneState.introStep = sceneState.introStep || 0;

  if (sceneState.introStep === 0) {
    nextBtn.disabled = true;
    playSfx(AUDIO.shesaid, { volume: 0.8 });
    setTimeout(() => {
      quoteEl.innerText =
        "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing. — Dwight Schrute";
      nextBtn.innerText = "You wanna listen...";
      nextBtn.disabled = false;
      sceneState.introStep = 1;
    }, 800);
    return;
  }

  if (sceneState.introStep === 1) {
    nextBtn.disabled = true;
    playVoice(AUDIO.michaelThankYou, { volume: 0.9 });
    setTimeout(() => {
      if (current.question) showQuestion(current.question);
      nextBtn.innerText = "Let’s gooooo";
      nextBtn.disabled = false;
      sceneState.introStep = 2;
    }, 1400);
    return;
  }

  if (sceneState.introStep === 2) {
    if (
      questionOverlay.style.display === "flex" &&
      current.question &&
      current.question.type === "short"
    ) {
      const val = questionInput.value.trim();
      if (val && val.toLowerCase() !== "skip") {
        responses[current.question.key] = val;
      }
      hideQuestion();
      nextScene();
      return;
    }
    nextScene();
  }
}

/* ---------- Fights micro-scene handling ---------- */
function startFightsSequence() {
  fightsIndex = 0;
  loadFight(fightsIndex);
}

function loadFight(i) {
  const fights = (scenes[index] && scenes[index].fights) || [];
  if (i < 0 || i >= fights.length) return;
  const f = fights[i];
  sceneTitle.innerText = f.title;
  quoteEl.innerText = f.quote || "";
  setBackground(f.bg || scenes[index].bg || "");
  renderPeople(f.people || []);
  setCornerThumbs(f.thumbs || {});

  const fightGif = resolveAsset(f.gif || "");
  const fightVideo = resolveAsset(f.video || "");
  showMedia(fightGif, fightVideo, resolveAsset(f.bg) || "", resolveAsset(f.poster));

  nextBtn.disabled = true;
  nextBtn.innerText = "Continue";
  typeText(textEl, f.text || "", 28).then(() => {
    setTimeout(() => {
      nextBtn.disabled = false;
      if (f.question) showQuestion(f.question);
    }, 700);
  });

  playBg(scenes[index].bgAudio || "");
}

function handleNextFight() {
  const fights = (scenes[index] && scenes[index].fights) || [];
  fightsIndex += 1;
  if (fightsIndex >= fights.length) {
    nextScene();
    return;
  }
  loadFight(fightsIndex);
}

/* ---------- Final message ---------- */
function showFinal() {
  const ep = responses.favorite_office_episode || "our favourite silly episode";
  const smile = responses.today_smile || "that tiny thing you smiled about";
  const food = responses.favorite_food || "our comfort food";
  const joke = responses.inside_joke || "that one inside joke";
  const promise = responses.one_promise || "showing up with kindness";
  const mbaFix = responses.mba_chaiwala_fix || "let me make it up to you";
  const maggieFix = responses.maggie_place_fix || "I will calm things next time";
  const kashFix = responses.kashmir_fix || "plan a redo trip just for us";
  const wall = responses.memory_wall || "a small moment we keep close";

  const message = [
    "Hey love — I made this for you.",
    `I remember laughing with you at ${ep}.`,
    `You told me today: ${smile}. That made me smile too.`,
    `Food vibe today: ${food}.`,
    `Inside joke to keep forever: ${joke}.`,
    `Promise I will keep: ${promise}.`,
    `MBA chaiwala: ${mbaFix}.`,
    `Maggie’s place: ${maggieFix}.`,
    `Kashmir: ${kashFix}.`,
    `Memory wall: ${wall}.`,
    "",
    "I'm sorry for the times I hurt you. I regret the bad things I've done.",
    "I love you, I care for you, and I want to keep making better memories with you.",
    "",
    "Will you give me one more chance to make new memories?",
  ].join("\n\n");

  finishMessage.innerText = message;
  finishOverlay.style.display = "flex";
}

/* ---------- Event wiring ---------- */
nextBtn.addEventListener("click", () => {
  const current = scenes[index];
  if (current && current.id === "gate") return;

  if (current && current.id === "intro") {
    handleIntroClick();
    return;
  }
  if (current && current.id === "fights") {
    if (!sceneState.fightsStep || sceneState.fightsStep === 0) {
      sceneState.fightsStep = 1;
      startFightsSequence();
      return;
    }
    if (questionOverlay.style.display !== "flex") {
      handleNextFight();
    }
    return;
  }

  if (questionOverlay.style.display === "flex") {
    submitQuestion();
    return;
  }

  if (current && current.final) {
    showFinal();
    return;
  }

  nextScene();
});

function submitQuestion() {
  const key = questionOverlay.dataset.key;
  if (!key) {
    hideQuestion();
    return;
  }
  const currentScene = scenes[index];
  const q = (currentScene && currentScene.question) || findFightQuestionByKey(key);
  if (q && q.type === "short") {
    const val = questionInput.value.trim();
    if (val && val.toLowerCase() !== "skip") {
      responses[key] = val;
    }
    hideQuestion();
    if (currentScene.id === "fights") {
      handleNextFight();
    } else {
      nextScene();
    }
  } else {
    hideQuestion();
  }
}

function findFightQuestionByKey(key) {
  const fights = (scenes[index] && scenes[index].fights) || [];
  for (const f of fights) {
    if (f.question && f.question.key === key) return f.question;
  }
  return null;
}

questionSubmit.addEventListener("click", submitQuestion);
questionSkip.addEventListener("click", () => {
  const key = questionOverlay.dataset.key;
  if (key) responses[key] = "skipped";
  hideQuestion();
  const current = scenes[index];
  if (current && current.id === "fights") {
    handleNextFight();
  } else {
    nextScene();
  }
});
questionClose.addEventListener("click", hideQuestion);

finishClose.addEventListener("click", () => (finishOverlay.style.display = "none"));
finishSend.addEventListener("click", () => {
  navigator.clipboard
    .writeText(finishMessage.innerText)
    .then(() => {
      alert("Message copied — you can paste it into a chat or save it.");
    })
    .catch(() => {
      alert("Could not copy automatically — please select and copy the message.");
    });
});

muteBtn.addEventListener("click", () => setMute(!muted));
gifPauseBtn.addEventListener("click", () => {
  if (!gifVideo) return;
  if (gifVideo.style.display === "block" && !gifVideo.paused) {
    gifVideo.pause();
    gifPauseBtn.innerText = "▶ GIF";
  } else {
    gifVideo.play().catch(() => {});
    gifPauseBtn.innerText = "⏸️ GIF";
  }
});
playAudioBtn.addEventListener("click", () => {
  try {
    if (bgAudio.src) {
      bgAudio.play().catch(() => {});
    } else {
      playSfx(AUDIO.thatsSheSaid, { volume: 0.8 });
    }
  } catch (e) {}
});

function showAutoplayHint() {
  autoplayHint.style.display = "block";
}
autoplayPlay.addEventListener("click", () => {
  autoplayHint.style.display = "none";
  try {
    bgAudio.play().catch(() => {});
  } catch (e) {}
});

/* ---------- Preload assets ---------- */
function preloadAssets() {
  const urls = new Set();
  const addAsset = (asset) => {
    if (!asset) return;
    if (Array.isArray(asset)) {
      asset.forEach((item) => item && urls.add(item));
      return;
    }
    urls.add(asset);
  };
  scenes.forEach((s) => {
    addAsset(s.bg);
    addAsset(s.gif);
    addAsset(s.video);
    if (s.people && Array.isArray(s.people)) s.people.forEach((p) => urls.add(p));
    if (s.thumbs && s.thumbs.pool) addAsset(s.thumbs.pool);
    if (s.fights && Array.isArray(s.fights)) {
      s.fights.forEach((f) => {
        addAsset(f.bg);
        addAsset(f.gif);
        if (f.people && Array.isArray(f.people)) f.people.forEach((p) => urls.add(p));
        if (f.thumbs && f.thumbs.pool) addAsset(f.thumbs.pool);
      });
    }
  });
  addAsset(PHOTO_POOL);
  addAsset(GIF_POOL);
  addAsset(VIDEO_POOL);
  Object.values(AUDIO).forEach((src) => urls.add(src));

  urls.forEach((u) => {
    if (u.endsWith(".mp3") || u.endsWith(".wav")) {
      try {
        const a = new Audio();
        a.src = u;
      } catch (e) {}
      return;
    }
    const im = new Image();
    im.src = u;
  });
}
preloadAssets();

/* ---------- Initialize ---------- */
function init() {
  titleEl.innerText = "For You";
  index = 0;
  responses = {};
  sceneState = {};
  loadScene();
  setMute(false);
}

init();

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionOverlay.style.display === "flex") {
    submitQuestion();
  }
});
