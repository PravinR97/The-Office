/* script.js (updated)
   - Explicit media-enable overlay (required gesture) and AudioContext resume
   - Added two "sadness" episodes and a caring episode that uses your personal photos
   - Ensures audio won't overlap; GIF/video only plays after media enabled
   - Uses the exact personal photo filenames you requested as thumbs/people
*/

/* SFX candidates (try several filenames) */
const ANSWER_SFX_CANDIDATES = [
  "audio/Thats_What_she_said.mp3",
  "audio/ThatsWhatSheSaid.mp3",
  "audio/shesaid.mp3",
  "images/That's_what_she_said.mp3",
  "images/shesaid.mp3"
];

/* Scenes: includes previous scenes plus two sadness episodes and one care/gallery episode.
   I've added the personal photo filenames you provided in the "care" episode:
   "Ddddddd_1", "DDDDDD2", "Dddddd3", "Devyani_3", "devuuu_5", "dddduuuu_3", "Devuuuu_2"
   (assumed to be in the images/ folder with .jpg extension — adjust if extensions differ)
*/
const scenes = [
  {
    id: "intro",
    title: "Welcome — I made this for you",
    text: "Welcome to IIM Jammu Branch of Dunder Mifflin Paper Company......\nThis little tour is for you — tiny memories, big apologies, and a million 'that's what she said' moments.",
    bg: "images/The_office_image.jpg",
    gif: "images/Michael_Im_dead_Inside.gif",
    people: ["images/jim_1.jpg", "images/kelly_1.jpg" , "images/Ddddddd_1.jpg", "images/DDDDDD2.jpg"],
    thumbs: { bl: "images/Dddddd3.jpg", br: "images/Devyani_3.jpg" },
    quote: "Would I rather be feared or loved? Easy. Both. — Michael Scott",
    question: { type: "short", key: "favorite_office_episode", prompt: "Which episode of The Office made you laugh the hardest .... You saw it 2-3 timesss so and with me ..you must not be knoww...we were watching it from distance?" }
  },

  {
    id: "that-look",
    title: "That Look — Missing You",
    text: `How am I feeling? Oh, absolutely fantastic. Like unbelievably fine — but maybe thinking about you a little.
Tell me one tiny thing from the day that made you smile.`,
    bg: "images/office_bg2.jpg",
    gif: "images/Michael_Dance_2.gif",
    people: ["images/kelly_1.jpg", "images/Michael_Crying.jpg", "images/pam_1.jpg"],
    thumbs: { tl: "images/devuuu_5.jpg", tr: "images/devvvvv_5.jpg", bl: "images/ddddduuuu_3.jpg", br: "images/Devuuuu_2.jpg" },
    quote: "Sarcastic? Always. Missing you? Always more.",
    question: { type: "short", key: "how_are_you_feeling_today", prompt: "Tell me one tiny thing from the day that made you smile (even if tiny)." }
  },

  // Sadness episode 1
  {
    id: "sadness-1",
    title: "I'm so sorry — I was sad",
    text: `I am very sad and sorry for not acting properly. I want you to live happily. I should have shown I cared more. I'm sorry.`,
    bg: "images/kelly_1.jpg",
    gif: "images/dwight_cry_1.gif",
    people: ["images/kelly_1.jpg", "images/dwight_cry_1.jpg"],
    thumbs: { tl: "images/Ddddddd_1.jpg", tr: "images/devuuu_5.jpg" },
    quote: "Sometimes the worst thing is when you know you messed up — and you only want to fix it.",
    audio: "soft_piano_loop.mp3",
    question: { type: "short", key: "sadness1_repair", prompt: "One thing I can do right now to show I'm sorry?" }
  },

  // Sadness episode 2
  {
    id: "sadness-2",
    title: "I didn't show it — but I care",
    text: `I care always, even when I didn't show it. I'm sorry I made you feel alone. Please know I'm here. Also I don't smile properly `,
    bg: "images/Dddddd3.jpg",
    gif: "images/Michael_Crying.gif",
    people: ["images/dwight_cry_2.jpg", "images/dwight_cry_2.jpg"],
    thumbs: { tl: "images/Devuuuu_2.jpg", br: "images/ddddduuuu_3.jpg" },
    quote: "I wish I had been better at showing what matters.",
    audio: "Dwight_about_smile_chimpanzee_begging.mp3",
    question: { type: "short", key: "sadness2_repair", prompt: "What would make you feel safer with me again?" }
  },

  // Care / gallery episode (use all the personal photos you listed)
  {
    id: "care-gallery",
    title: "I love you — my everything",
    text: `You are beautiful, cute, funny, loving, and everything I want to protect. These are moments I keep with me.\nThank you for being you.`,
    bg: "images/ddddduuuu_3.jpg",
    gif: "images/heart_fireworks.gif",
    // include all the personal photos user asked for (assumes .jpg)
    people: [
      "images/Ddddddd_1.jpg",
      "images/DDDDDD2.jpg",
      "images/Dddddd3.jpg",
      "images/Devyani_3.jpg",
      "images/devuuu_5.jpg",
      "images/dddduuuu_3.jpg",
      "images/Devuuuu_2.jpg"
    ],
    // set corners to ensure they show
    thumbs: {
      tl: "images/Ddddddd_1.jpg",
      tr: "images/DDDDDD2.jpg",
      bl: "images/Dddddd3.jpg",
      br: "images/Devyani_3.jpg"
    },
    quote: "Will you let me show up better? I love your smile, your small laugh, the way you are.",
    audio: "theme.mp3",
    question: { type: "short", key: "care_gallery_what", prompt: "Tell me one little thing about you I should never forget." }
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

let mediaEnabled = false;
let audioCtx = null;
let muted = false;

/* DOM */
const sceneEl = document.getElementById("scene");
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

const questionOverlay = document.getElementById("questionOverlay");
const questionPrompt = document.getElementById("questionPrompt");
const mcqContainer = document.getElementById("mcqContainer");
const questionInput = document.getElementById("questionInput");
const questionSubmit = document.getElementById("questionSubmit");
const questionSkip = document.getElementById("questionSkip");
const questionClose = document.getElementById("questionClose");

const mediaEnableOverlay = document.getElementById("mediaEnableOverlay");
const enableMediaOverlayBtn = document.getElementById("enableMediaOverlayBtn");
const enableMediaLaterBtn = document.getElementById("enableMediaLaterBtn");
const enableMediaBtn = document.getElementById("enableMediaBtn");
const autoplayHint = document.getElementById("autoplayHint");
const autoplayPlay = document.getElementById("autoplayPlay");

const finishOverlay = document.getElementById("finishOverlay");
const finishMessage = document.getElementById("finishMessage");
const finishClose = document.getElementById("finishClose");
const finishSend = document.getElementById("finishSend");

const bgAudio = document.getElementById("bgAudio");
const sfxAudio = document.getElementById("sfxAudio");
const voiceAudio = document.getElementById("voiceAudio");

const muteBtn = document.getElementById("muteBtn");
const gifPauseBtn = document.getElementById("gifPauseBtn");

/* ---------- Helpers ---------- */

function setBackground(url) {
  if (!url) { sceneEl.style.backgroundImage = ""; return; }
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
  list.slice(0, 6).forEach((src, i) => {
    const img = document.createElement("img");
    img.className = "person";
    img.src = src;
    img.alt = "";
    img.style.zIndex = 20 + i;
    img.style.left = `${6 + i * 9}%`;
    img.style.bottom = `${-6 + (i % 3) * 4}%`;
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

/* showMedia: prefer mp4/webm if present for reliability; otherwise gif image */
function showMedia(gifPath, videoPath, fallbackImage) {
  gifImg.style.display = "none";
  gifVideo.style.display = "none";
  gifVideo.pause();
  gifVideo.removeAttribute("src");

  const tryVideo = (path) => new Promise((resolve, reject) => {
    if (!path) return reject();
    const testVideo = document.createElement("video");
    testVideo.src = path;
    testVideo.preload = "metadata";
    testVideo.muted = true;
    const ok = () => { testVideo.removeEventListener("loadedmetadata", ok); testVideo.removeEventListener("error", fail); resolve(path); };
    const fail = () => { testVideo.removeEventListener("loadedmetadata", ok); testVideo.removeEventListener("error", fail); reject(); };
    testVideo.addEventListener("loadedmetadata", ok);
    testVideo.addEventListener("error", fail);
    testVideo.load();
  });

  (async () => {
    const candidates = [];
    if (videoPath) candidates.push(videoPath);
    if (gifPath) {
      candidates.push(gifPath.replace(/\.gif$/i, ".mp4"));
      candidates.push(gifPath.replace(/\.gif$/i, ".webm"));
    }
    for (const c of candidates) {
      try {
        await tryVideo(c);
        gifVideo.src = c;
        gifVideo.style.display = "block";
        if (mediaEnabled) gifVideo.play().catch(()=>{});
        return;
      } catch (e) { continue; }
    }
    // fallback to gif image
    if (gifPath) {
      const test = new Image();
      test.onload = () => { gifImg.src = gifPath; gifImg.style.display = "block"; };
      test.onerror = () => {
        if (fallbackImage) { gifImg.src = fallbackImage; gifImg.style.display = "block"; } else { gifImg.style.display = "none"; }
      };
      test.src = gifPath;
      return;
    }
    if (fallbackImage) {
      const test = new Image();
      test.onload = () => { gifImg.src = fallbackImage; gifImg.style.display = "block"; };
      test.onerror = () => gifImg.style.display = "none";
      test.src = fallbackImage;
    }
  })();
}

/* Audio helpers */
function stopAllAudio() {
  try { bgAudio.pause(); bgAudio.currentTime = 0; } catch(e) {}
  try { sfxAudio.pause(); sfxAudio.currentTime = 0; } catch(e) {}
  try { voiceAudio.pause(); voiceAudio.currentTime = 0; } catch(e) {}
}

function setMute(v) {
  muted = v;
  bgAudio.muted = v;
  sfxAudio.muted = v;
  voiceAudio.muted = v;
  muteBtn.innerText = v ? "🔇" : "🔈";
}

function playBg(src) {
  if (!src) { fadeOut(bgAudio); return; }
  stopAllAudio();
  if (!mediaEnabled) {
    mediaStatus.innerText = "Scene audio ready — press Enable media to play.";
    bgAudio.src = src; // set so ready when enabled
    return;
  }
  bgAudio.src = src;
  bgAudio.volume = muted ? 0 : 0.36;
  bgAudio.play().catch(() => { mediaStatus.innerText = "Browser blocked audio playback."; });
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
      if (i >= steps) { clearInterval(t); audioEl.pause(); audioEl.volume = start; }
    }, step);
  } catch (e) { audioEl.pause(); }
}

/* play sfx candidates (tries multiple filenames) */
function playSfxCandidates() {
  let idx = 0;
  function tryNext() {
    if (idx >= ANSWER_SFX_CANDIDATES.length) return;
    const candidate = ANSWER_SFX_CANDIDATES[idx++];
    sfxAudio.src = candidate;
    sfxAudio.volume = muted ? 0 : 0.95;
    sfxAudio.play().catch(() => {
      setTimeout(tryNext, 200);
    });
  }
  if (!mediaEnabled) {
    mediaStatus.innerText = "SFX ready — press Enable media to hear it.";
    return;
  }
  tryNext();
}

/* typing effect */
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
  setBackground(current.bg || "");
  sceneTitle.innerText = current.title || "";
  quoteEl.innerText = current.quote || "";
  renderPeople(current.people || []);
  setCornerThumbs(current.thumbs || {});
  showMedia(current.gif || "", current.video || "", current.bg || "");
  textEl.innerText = "";
  mediaStatus.innerText = "";

  nextBtn.disabled = true;
  nextBtn.innerText = "Continue";

  typeText(textEl, current.text || "", 28).then(() => {
    nextBtn.disabled = false;
    nextBtn.innerText = current.final ? "FINISH" : "NEXT";
    if (current.audio) {
      scenePlayAudio.style.display = "inline-block";
      scenePlayAudio.dataset.src = current.audio;
      mediaStatus.innerText = "Scene audio available (press Play)";
    } else {
      scenePlayAudio.style.display = "none";
    }
    if (current.question) {
      setTimeout(() => showQuestion(current.question), 700);
    } else {
      hideQuestion();
    }
  });

  // if current has audio and mediaEnabled, play it automatically (gentle)
  if (current.audio && mediaEnabled) {
    playBg(current.audio);
  } else if (current.audio) {
    bgAudio.src = current.audio; // cache for later
  } else {
    fadeOut(bgAudio);
  }
}

function proceedAfterAnswer() { nextScene(); }

function nextScene() {
  index++;
  if (index >= scenes.length) { showFinal(); return; }
  loadScene();
}

/* Intro special flow (sfx + voice) */
function handleIntroClick() {
  const current = scenes[index];
  if (!current || current.id !== "intro") return;
  sceneState.introStep = sceneState.introStep || 0;

  if (sceneState.introStep === 0) {
    nextBtn.disabled = true;
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
    voiceAudio.src = "audio/Michael_scott_thank_you.mp3";
    voiceAudio.volume = muted ? 0 : 0.95;
    if (mediaEnabled) voiceAudio.play().catch(()=>{ mediaStatus.innerText = "Voice blocked."; });
    setTimeout(() => {
      if (current.question) showQuestion(current.question);
      nextBtn.innerText = "let's gooooooo";
      nextBtn.disabled = false;
      sceneState.introStep = 2;
    }, 1400);
    return;
  }

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

/* ---------- Final ---------- */
function showFinal() {
  const ep = responses.favorite_office_episode || "our favourite silly episode";
  const smile = responses.how_are_you_feeling_today || "that tiny thing you smiled about";
  const s1 = responses.sadness1_repair || "let me try to make it right";
  const s2 = responses.sadness2_repair || "I'll work to be better";
  const care = responses.care_gallery_what || "the way you laugh";

  const message = [
    "Hey Devu...Devi..Devyaniii....Cutuuuu...Sexy and beautiful eyes  — I wanted to show this to you for so many dyas...just wanted to show you.",
   "You had a lively, playful disposition that delighted in anything ridiculous." ,
   "In vain I have struggled. It will not do. My feelings will no longer be repressed. You must allow me to tell you how ardently I admire and love you."
     " A person who can write a long letter with ease, cannot write ill.- Jane Austen "
    `I remember laughing with you at ${ep}.`,
    `You told me today: ${smile}. That made me smile too.`,
    `For the times I was not good and hurt you and for how many times you accepted it ...let go of me....: ${s1} / ${s2}.`,
    `One thing I promise: I'll keep ${care} close and never forget.`,
    "",
    "I'm sorry for the times I hurt you. I regret the bad things I've done.........also I wish I had no heart, it aches so…",
    "I hope you are doing fine.You are the gull, D, strong and wild, fond of the storm and the wind, flying far out to sea, and happy all alone",
    "I jus wanted you tobe happy ...and Maybe someday we will meet and will become happy at last..",
    "?"
  ].join("\n\n");

  finishMessage.innerText = message;
  finishOverlay.style.display = "flex";
}

/* ---------- Events ---------- */

nextBtn.addEventListener("click", () => {
  const current = scenes[index];
  if (!current) return;
  if (current.id === "intro") { handleIntroClick(); return; }
  if (questionOverlay.style.display === "flex") { submitQuestion(); return; }
  if (current.final) { showFinal(); return; }
  nextScene();
});

/* scene audio play button */
scenePlayAudio.addEventListener("click", () => {
  const src = scenePlayAudio.dataset.src;
  if (!src) return;
  if (!mediaEnabled) {
    mediaStatus.innerText = "Please enable media to play audio.";
    return;
  }
  stopAllAudio();
  playBg(src);
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

/* enable media: user gesture required for audio/video */
async function enableMedia() {
  if (mediaEnabled) return;
  mediaEnabled = true;
  // resume AudioContext if needed
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }
  } catch (e) {
    // ignored
  }

  // try play a very short silent buffer or tiny sfx to get permission
  try {
    sfxAudio.src = ANSWER_SFX_CANDIDATES[0] || "";
    sfxAudio.volume = 0.01;
    await sfxAudio.play().catch(()=>{});
    sfxAudio.pause();
  } catch (e) {}

  // play any visible gif video
  try { if (gifVideo && gifVideo.src) gifVideo.play().catch(()=>{}); } catch(e){}

  // hide overlays if present
  if (mediaEnableOverlay) mediaEnableOverlay.style.display = "none";
  if (autoplayHint) autoplayHint.style.display = "none";

  // if current scene had bgAudio set, try to play it
  try {
    const current = scenes[index];
    if (current && current.audio) { playBg(current.audio); }
    if (bgAudio.src && !bgAudio.paused) { /* playing */ }
  } catch (e) {}
}

/* Enable media buttons */
enableMediaOverlayBtn.addEventListener("click", async () => { await enableMedia(); });
enableMediaLaterBtn.addEventListener("click", () => { mediaEnableOverlay.style.display = "none"; });
enableMediaBtn.addEventListener("click", async () => { await enableMedia(); autoplayHint.style.display = "none"; });

autoplayPlay.addEventListener("click", async () => { await enableMedia(); autoplayHint.style.display = "none"; });

/* mute & gif pause */
muteBtn.addEventListener("click", () => setMute(!muted));
gifPauseBtn.addEventListener("click", () => {
  if (gifVideo.style.display === "block" && !gifVideo.paused) { gifVideo.pause(); gifPauseBtn.innerText = "▶ GIF"; }
  else { try { gifVideo.play().catch(()=>{}); } catch(e){} gifPauseBtn.innerText = "⏸️ GIF"; }
});

/* keyboard: Enter submits question */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionOverlay.style.display === "flex") submitQuestion();
});

/* ---------- Preload assets ---------- */
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
  // show media enable overlay initially (you can hide it if you prefer)
  mediaEnableOverlay.style.display = "flex";
}
init();
