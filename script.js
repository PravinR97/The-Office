/* script.js (updated)
   - Better media enable flow (user must click "Enable media")
   - Reliable GIF/Video handling with fallbacks
   - Audio play attempts only after user enables media
   - Stops overlapping audio
   - More episodes added that include personal photos + Office stills
*/

const ANSWER_SFX_CANDIDATES = [
  "audio/Thats_What_she_said.mp3",
  "audio/ThatsWhatSheSaid.mp3",
  "audio/shesaid.mp3",
  "images/That's_what_she_said.mp3",
  "images/shesaid.mp3"
];

let mediaEnabled = false;
let muted = false;

/* Scenes: added 4 more episodes as requested */
const scenes = [
  {
    id: "intro",
    title: "Welcome — I made this for you",
    text: "Welcome to IIM Jammu Branch of Dunder Mifflin Paper Company......\nThis little tour is for you — tiny memories, big apologies, and a million 'that's what she said' moments.",
    bg: "images/The_office_image.jpg",
    gif: "images/Michael_Im_dead_Inside.gif",
    people: ["images/jim_1.jpg", "images/kelly_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", tr: "images/devuuu_5.jpg", bl: "images/Devuuu_2.jpg", br: "images/ddddduuuu_3.jpg" },
    quote: "Would I rather be feared or loved? Easy. Both. — Michael Scott",
    question: { type: "short", key: "favorite_office_episode", prompt: "Which episode of The Office made you laugh the hardest?" }
  },

  {
    id: "that-look",
    title: "That Look — Missing You",
    text: `How am I feeling? Oh, absolutely fantastic. Like unbelievably fine — but maybe thinking about you a little.
Tell me one tiny thing from the day that made you smile.`,
    bg: "images/office_bg2.jpg",
    gif: "images/Michael_Dance_2.gif",
    people: ["images/kelly_1.jpg", "images/Michael_1.jpg", "images/pam_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", tr: "images/Devuuu_2.jpg", bl: "images/ddddduuuu_3.jpg", br: "images/Devu1.jpg" },
    quote: "Sarcastic? Always. Missing you? Always more.",
    question: { type: "short", key: "how_are_you_feeling_today", prompt: "Tell me one tiny thing from the day that made you smile (even if tiny)." }
  },

  {
    id: "coffee-date",
    title: "Coffee Date (MBA chaiwala)",
    text: `MBA chaiwala — I was wrong. Toh manus aheech bhandan lavanyasathiii. Aapli kahi chuki nahi... Hot astaa.\nI'm sorry for that moment.`,
    bg: "images/Devuuu_2.jpg",
    gif: "images/dwight_smile.gif",
    people: ["images/dwight_1.jpg","images/michael_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", br: "images/ddddduuuu_3.jpg" },
    quote: "Sometimes I'll start a sentence and I don't even know where it's going. — Michael Scott",
    question: { type: "short", key: "mba_chaiwala_fix", prompt: "What one small thing could I do to make this right?" },
    audio: "audio/soft_piano_loop.mp3"
  },

  {
    id: "maggie-concert",
    title: "Concert Night (Maggie's place)",
    text: `At Maggie's place we had our moment. I am very sorry for that. I never wanted to hurt you.`,
    bg: "images/devvvvv_5.jpg",
    gif: "images/Michael_Dance_2.gif",
    people: ["images/pam_1.jpg","images/jim_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", br: "images/Devu1.jpg" },
    quote: "I am running away from my responsibilities. And it feels good. — (not this time)",
    question: { type: "short", key: "maggie_place_fix", prompt: "What helped you calm down that day?" },
    audio: "audio/soft_guitar_loop.mp3"
  },

  {
    id: "kashmir-night",
    title: "Kashmir — Night & Morning",
    text: `The night in Kashmir was magic. The morning I ruined it and I'm sorry.\nI will do better. I will make it right.`,
    bg: "images/Devu1.jpg",
    gif: "images/heart_fireworks.gif",
    people: ["images/michael_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", br: "images/ddddddd_1.jpg" },
    quote: "I wish there was a way to know you’re in the good old days before you’ve actually left them.",
    question: { type: "short", key: "kashmir_fix", prompt: "If I could change one thing from that trip, what should I do first?" },
    audio: "audio/ambient_strings.mp3"
  },

  {
    id: "football-banter",
    title: "Football Banter",
    text: `You and football — I tease, you roll your eyes, we both laugh. Which team are you secretly cheering for?`,
    bg: "images/football_bg.jpg",
    gif: "images/goal_cheer.gif",
    people: ["images/whole_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", br: "images/ddddduuuu_3.jpg" },
    question: { type: "mcq", key: "football_interest", prompt: "Who would you pick?", choices: ["Arsenal","Barcelona","Snacks > Football","I don't care"] }
  },

  {
    id: "katakirr-misal",
    title: "Katakirr Misal — The Truth",
    text: `I haven't eaten Katakirr misal in a long time — the places I went with you mean more than the food. I will never go alone or with anyone else.`,
    bg: "images/misal_bg.jpg",
    gif: "images/misal_giggle.gif",
    people: ["images/dwight_1.jpg"],
    thumbs: { tl: "images/devvvvv_5.jpg", br: "images/ddddduuuu_3.jpg" },
    quote: "And to be clear: I will not go alone — that's my promise.",
  },

  {
    id: "final",
    title: "To You — A Little Quiz, A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "images/final_bg.jpg",
    gif: "images/heart_fireworks.gif",
    final: true
  }
];

/* ---------- State & DOM ---------- */
let index = 0;
let responses = {};
const sceneState = {};

const sceneEl = document.getElementById("scene");
const titleEl = document.getElementById("title");
const sceneTitle = document.getElementById("sceneTitle");
const textEl = document.getElementById("text");
const quoteEl = document.getElementById("quote");
const gifImg = document.getElementById("gifImg");
const gifVideo = document.getElementById("gifVideo");
const peopleBg = document.getElementById("peopleBg");
const nextBtn = document.getElementById("nextBtn");
const scenePlayAudio = document.getElementById("scenePlayAudio");
const mediaStatus = document.getElementById("mediaStatus");

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

const enableMediaBtn = document.getElementById("enableMediaBtn");
const autoplayHint = document.getElementById("autoplayHint");
const autoplayPlay = document.getElementById("autoplayPlay");

const bgAudio = document.getElementById("bgAudio");
const sfxAudio = document.getElementById("sfxAudio");
const voiceAudio = document.getElementById("voiceAudio");

const muteBtn = document.getElementById("muteBtn");
const gifPauseBtn = document.getElementById("gifPauseBtn");

/* ---------- Helpers ---------- */

function safeLog(...args) { try { console.log(...args); } catch(e) {} }

function setBackground(url) {
  if (!url) {
    sceneEl.style.backgroundImage = "";
    return;
  }
  const img = new Image();
  img.onload = () => {
    sceneEl.style.backgroundImage = `url("${url}")`;
    sceneEl.style.backgroundSize = "cover";
    sceneEl.style.backgroundPosition = "center";
  };
  img.onerror = () => {
    sceneEl.style.backgroundImage = `linear-gradient(135deg,#222,#111)`;
  };
  img.src = url;
}

function renderPeople(list = []) {
  peopleBg.innerHTML = "";
  if (!list || list.length === 0) return;
  list.slice(0,4).forEach((src, i) => {
    const img = document.createElement("img");
    img.className = "person";
    img.src = src;
    img.alt = "";
    img.style.zIndex = 20 + i;
    img.addEventListener("error", () => img.style.display = "none");
    peopleBg.appendChild(img);
  });
}

function setCornerThumbs(obj = {}) {
  const mapping = [
    [thumbTL, obj.tl],
    [thumbTR, obj.tr],
    [thumbBL, obj.bl],
    [thumbBR, obj.br]
  ];
  mapping.forEach(([el, src]) => {
    if (src) {
      el.src = src;
      el.style.display = "block";
      el.addEventListener("error", () => el.style.display = "none");
    } else {
      el.style.display = "none";
      el.src = "";
    }
  });
}

/* showMedia: prefer video (mp4/webm) if available, otherwise show gif image.
   We attempt to test video by setting src and listening for loadedmetadata/onerror.
*/
function showMedia(gifPath, videoPath, fallbackImage) {
  gifImg.style.display = "none";
  gifVideo.style.display = "none";
  gifVideo.pause();
  gifVideo.removeAttribute("src");

  const tryVideo = (path) => new Promise((resolve, reject) => {
    if (!path) return reject();
    // Create temporary video to test
    const testVideo = document.createElement("video");
    testVideo.src = path;
    testVideo.preload = "metadata";
    testVideo.muted = true;
    const ok = () => {
      testVideo.removeEventListener("loadedmetadata", ok);
      testVideo.removeEventListener("error", fail);
      resolve(path);
    };
    const fail = () => {
      testVideo.removeEventListener("loadedmetadata", ok);
      testVideo.removeEventListener("error", fail);
      reject();
    };
    testVideo.addEventListener("loadedmetadata", ok);
    testVideo.addEventListener("error", fail);
    // try load
    testVideo.load();
  });

  // try explicit videoPath first, else try replacing .gif -> .mp4/.webm
  const candidates = [];
  if (videoPath) candidates.push(videoPath);
  if (gifPath) {
    candidates.push(gifPath.replace(/\.gif$/i, ".mp4"));
    candidates.push(gifPath.replace(/\.gif$/i, ".webm"));
  }

  // attempt videos in order; if none, fallback to img gif or fallbackImage
  (async () => {
    for (const c of candidates) {
      try {
        await tryVideo(c);
        gifVideo.src = c;
        gifVideo.style.display = "block";
        if (mediaEnabled) {
          gifVideo.play().catch(()=>{});
        }
        return;
      } catch (e) {
        continue;
      }
    }
    // no video candidate worked — try gif image
    if (gifPath) {
      const test = new Image();
      test.onload = () => {
        gifImg.src = gifPath;
        gifImg.style.display = "block";
      };
      test.onerror = () => {
        if (fallbackImage) {
          gifImg.src = fallbackImage;
          gifImg.style.display = "block";
        } else {
          gifImg.style.display = "none";
        }
      };
      test.src = gifPath;
      return;
    }
    // fallback image only
    if (fallbackImage) {
      const test = new Image();
      test.onload = () => {
        gifImg.src = fallbackImage;
        gifImg.style.display = "block";
      };
      test.onerror = () => gifImg.style.display = "none";
      test.src = fallbackImage;
    }
  })();
}

/* audio helpers */
function stopAllAudio() {
  try { bgAudio.pause(); bgAudio.currentTime = 0; } catch(e) {}
  try { voiceAudio.pause(); voiceAudio.currentTime = 0; } catch(e) {}
  try { sfxAudio.pause(); sfxAudio.currentTime = 0; } catch(e) {}
}

function setMute(v) {
  muted = v;
  bgAudio.muted = v;
  sfxAudio.muted = v;
  voiceAudio.muted = v;
  muteBtn.innerText = v ? "🔇" : "🔈";
}

function playBg(src) {
  if (!src) {
    fadeOut(bgAudio);
    return;
  }
  if (!mediaEnabled) {
    mediaStatus.innerText = "Scene audio ready; tap Enable media to play.";
    return;
  }
  if (bgAudio.src && bgAudio.src.includes(src)) {
    // already loaded
    try { bgAudio.play().catch(()=>{}); } catch(e){}
    return;
  }
  fadeOut(bgAudio, 200);
  bgAudio.src = src;
  bgAudio.volume = muted ? 0 : 0.36;
  bgAudio.play().catch(() => {
    mediaStatus.innerText = "Browser blocked autoplay; press Enable media.";
  });
}

function fadeOut(audioEl, ms = 300) {
  try {
    if (!audioEl.src || audioEl.paused) { audioEl.pause(); return; }
    const start = audioEl.volume;
    const step = 50;
    const steps = Math.max(1, Math.floor(ms / step));
    let i = 0;
    const t = setInterval(() => {
      i++;
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

/* Play SFX robustly from candidate paths */
function playSfxCandidates() {
  let idx = 0;
  const sfx = sfxAudio;
  function tryNext() {
    if (idx >= ANSWER_SFX_CANDIDATES.length) return;
    const candidate = ANSWER_SFX_CANDIDATES[idx++];
    sfx.src = candidate;
    sfx.volume = muted ? 0 : 0.95;
    sfx.play().then(()=>{}).catch(() => {
      setTimeout(tryNext, 200);
    });
  }
  if (!mediaEnabled) {
    mediaStatus.innerText = "SFX ready — click Enable media to hear it.";
    return;
  }
  tryNext();
}

/* Typing effect */
function typeText(el, text, speed = 30) {
  return new Promise(resolve => {
    el.innerText = "";
    let i = 0;
    function step() {
      if (i <= text.length) {
        el.innerText = text.slice(0, i);
        i++;
        setTimeout(step, speed + Math.random() * 20);
      } else {
        resolve();
      }
    }
    step();
  });
}

/* Question overlay */
function showQuestion(q) {
  if (!q) return;
  questionPrompt.innerText = q.prompt;
  questionInput.value = "";
  questionOverlay.dataset.key = q.key;
  mcqContainer.innerHTML = "";
  questionInput.style.display = q.type === "short" ? "block" : "none";
  if (q.type === "mcq") {
    mcqContainer.style.display = "flex";
    q.choices.forEach(c => {
      const b = document.createElement("button");
      b.className = "mcqBtn";
      b.innerText = c;
      b.addEventListener("click", () => {
        playSfxCandidates();
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

function hideQuestion() { questionOverlay.style.display = "none"; }

/* ---------- Scene load & navigation ---------- */

function loadScene() {
  const current = scenes[index];
  if (!current) return;
  // reset UI
  setBackground(current.bg || "");
  sceneTitle.innerText = current.title || "";
  quoteEl.innerText = current.quote || "";
  renderPeople(current.people || []);
  setCornerThumbs(current.thumbs || {});
  showMedia(current.gif || "", current.video || "", current.bg || "");
  textEl.innerText = "";
  mediaStatus.innerText = "";

  // set next button text
  nextBtn.disabled = true;
  nextBtn.innerText = "Continue";

  // handle different scene types
  if (current.id === "intro") {
    typeText(textEl, current.text || "", 36).then(() => {
      nextBtn.disabled = false;
      sceneState.introStep = 0;
    });
    return;
  }

  // normal scene: type text then enable button
  typeText(textEl, current.text || "", 28).then(() => {
    nextBtn.disabled = false;
    nextBtn.innerText = current.final ? "FINISH" : "NEXT";
    // scene audio indicator
    if (current.audio) {
      scenePlayAudio.style.display = "inline-block";
      scenePlayAudio.dataset.src = current.audio;
      mediaStatus.innerText = "Scene audio available (press Play)";
    } else {
      scenePlayAudio.style.display = "none";
    }
    // show question if present
    if (current.question) {
      setTimeout(() => showQuestion(current.question), 700);
    } else {
      hideQuestion();
    }
  });
}

/* proceedAfterAnswer: default next scene */
function proceedAfterAnswer() {
  nextScene();
}

function nextScene() {
  index++;
  if (index >= scenes.length) {
    showFinal();
    return;
  }
  loadScene();
}

/* ---------- Intro special flow: small SFX and voice clip sequence ---------- */
function handleIntroClick() {
  const current = scenes[index];
  if (!current || current.id !== "intro") return;
  sceneState.introStep = sceneState.introStep || 0;

  if (sceneState.introStep === 0) {
    nextBtn.disabled = true;
    // play that's what she said SFX
    playSfxCandidates();
    setTimeout(() => {
      quoteEl.innerText = "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing. — Dwight Schrute";
      nextBtn.innerText = "You wanna listen ... that's what she said";
      nextBtn.disabled = false;
      sceneState.introStep = 1;
    }, 900);
    return;
  }

  if (sceneState.introStep === 1) {
    nextBtn.disabled = true;
    // voice clip
    voiceAudio.src = "audio/Michael_scott_thank_you.mp3";
    voiceAudio.volume = muted ? 0 : 0.95;
    if (!mediaEnabled) {
      mediaStatus.innerText = "Voice clip ready — press Enable media to hear it.";
    } else {
      voiceAudio.play().catch(() => {
        mediaStatus.innerText = "Browser blocked voice playback.";
      });
    }
    setTimeout(() => {
      if (current.question) showQuestion(current.question);
      nextBtn.innerText = "let's gooooooo";
      nextBtn.disabled = false;
      sceneState.introStep = 2;
    }, 1400);
    return;
  }

  // step 2 -> if question visible, collect answer then next scene
  if (sceneState.introStep === 2) {
    if (questionOverlay.style.display === "flex") {
      const val = questionInput.value.trim();
      if (val && val.toLowerCase() !== "skip") {
        playSfxCandidates();
        responses[current.question.key] = val;
      }
      hideQuestion();
      nextScene();
      return;
    } else {
      nextScene();
      return;
    }
  }
}

/* ---------- Question submit/skip ---------- */
function submitQuestion() {
  const key = questionOverlay.dataset.key;
  if (!key) { hideQuestion(); return; }
  const val = questionInput.value.trim();
  if (val && val.toLowerCase() !== "skip") {
    playSfxCandidates();
    responses[key] = val;
  } else {
    responses[key] = "skipped";
  }
  hideQuestion();
  proceedAfterAnswer();
}

function handleMCQClick(choice, key) {
  playSfxCandidates();
  responses[key] = choice;
  hideQuestion();
  proceedAfterAnswer();
}

/* ---------- Final message ---------- */
function showFinal() {
  const ep = responses.favorite_office_episode || "our favourite silly episode";
  const smile = responses.how_are_you_feeling_today || "that tiny thing you smiled about";
  const mbaFix = responses.mba_chaiwala_fix || "let me make it up to you";
  const maggieFix = responses.maggie_place_fix || "I will calm things next time";
  const kashFix = responses.kashmir_fix || "plan a redo trip just for us";
  const sport = responses.football_interest || "your playful choices";

  const message = [
    "Hey love — I made this for you.",
    `I remember laughing with you at ${ep}.`,
    `You told me today: ${smile}. That made me smile too.`,
    `For MBA chaiwala: ${mbaFix}.`,
    `For Maggie's place: ${maggieFix}.`,
    `For Kashmir: ${kashFix}.`,
    `Even when you pretend not to care about football: ${sport}.`,
    "",
    "I'm sorry for the times I hurt you. I regret the bad things I've done.",
    "I hope you are doing fine. I love you, I care for you, and I want to keep making better memories with you.",
    "",
    "Will you give me one more chance to make new memories?"
  ].join("\n\n");

  finishMessage.innerText = message;
  finishOverlay.style.display = "flex";
}

/* ---------- Events ---------- */

nextBtn.addEventListener("click", () => {
  const current = scenes[index];
  if (!current) return;
  if (current.id === "intro") {
    handleIntroClick();
    return;
  }
  // if question visible, submit
  if (questionOverlay.style.display === "flex") {
    submitQuestion();
    return;
  }
  if (current.final) {
    showFinal();
    return;
  }
  nextScene();
});

/* scene audio play button */
scenePlayAudio.addEventListener("click", () => {
  const src = scenePlayAudio.dataset.src;
  if (!src) return;
  stopAllAudio();
  if (!mediaEnabled) {
    mediaStatus.innerText = "Enable media first to play scene audio.";
    return;
  }
  bgAudio.src = src;
  bgAudio.volume = muted ? 0 : 0.36;
  bgAudio.play().catch(() => { mediaStatus.innerText = "Browser blocked audio playback."; });
});

/* question overlay handlers */
questionSubmit.addEventListener("click", submitQuestion);
questionSkip.addEventListener("click", () => {
  const key = questionOverlay.dataset.key;
  if (key) responses[key] = "skipped";
  hideQuestion();
  proceedAfterAnswer();
});
questionClose.addEventListener("click", hideQuestion);

/* finish overlay */
finishClose.addEventListener("click", () => finishOverlay.style.display = "none");
finishSend.addEventListener("click", () => {
  navigator.clipboard.writeText(finishMessage.innerText).then(() => {
    alert("Message copied — you can paste it into a chat or save it.");
  }).catch(() => {
    alert("Could not copy automatically — please select and copy the message.");
  });
});

/* enable media button: this is the user's explicit interaction to allow audio/video */
enableMediaBtn.addEventListener("click", async () => {
  mediaEnabled = true;
  enableMediaBtn.style.display = "none";
  // try to play small silent sound to get permission
  try {
    sfxAudio.src = ANSWER_SFX_CANDIDATES[0];
    sfxAudio.volume = muted ? 0 : 0.0001;
    await sfxAudio.play().catch(()=>{});
    sfxAudio.pause();
  } catch(e) {}
  // try to autoplay any visible video
  try {
    if (gifVideo && gifVideo.src) {
      gifVideo.play().catch(()=>{});
    }
    mediaStatus.innerText = "Media enabled — audio & video allowed.";
  } catch(e){}
});

/* autoplay hint button */
autoplayPlay.addEventListener("click", () => {
  mediaEnabled = true;
  autoplayHint.style.display = "none";
});

/* mute & gif pause */
muteBtn.addEventListener("click", () => setMute(!muted));
gifPauseBtn.addEventListener("click", () => {
  if (gifVideo.style.display === "block" && !gifVideo.paused) {
    gifVideo.pause();
    gifPauseBtn.innerText = "▶ GIF";
  } else {
    try { gifVideo.play().catch(()=>{}); } catch(e){}
    gifPauseBtn.innerText = "⏸️ GIF";
  }
});

/* keyboard: Enter submits question */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionOverlay.style.display === "flex") submitQuestion();
});

/* ---------- Preload assets (images + audio hints) ---------- */
function preloadAssets() {
  const urls = new Set();
  scenes.forEach(s => {
    if (s.bg) urls.add(s.bg);
    if (s.gif) urls.add(s.gif);
    if (s.video) urls.add(s.video);
    if (s.people && Array.isArray(s.people)) s.people.forEach(p => urls.add(p));
    if (s.thumbs) Object.values(s.thumbs).forEach(t => t && urls.add(t));
    if (s.audio) urls.add(s.audio);
  });
  urls.forEach(u => { const i = new Image(); i.src = u; });
  ANSWER_SFX_CANDIDATES.forEach(a => { try { const ad = new Audio(); ad.src = a; } catch(e){} });
}
preloadAssets();

/* ---------- Init ---------- */
function init() {
  index = 0;
  responses = {};
  setMute(false);
  loadScene();
}
init();

/* safety: if scene contains voice/long audio and user hasn't enabled media, prompt them */
bgAudio.addEventListener("play", () => {
  if (!mediaEnabled) {
    autoplayHint.style.display = "block";
  } else {
    autoplayHint.style.display = "none";
  }
});
