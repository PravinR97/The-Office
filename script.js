/* script.js
   - Scenes: Intro, Episode 2 (That Look), Episode 3 (Fights: MBA chaiwala, Maggie, Kashmir), Final
   - GIF fallback handling (video/static), corner thumbnails, single bg audio, sfx audio, no overlaps
   - Typing effect, question overlays, and safe autoplay handling
*/

/* ---------- Configuration & assets ---------- */
const ANSWER_SFX_CANDIDATES = [
  "That's_what_she_said.mp3",
  "Thats_What_she_said.mp3",
   "Michael_scott_thank_you.mp3" ,
   "daffyduck.mp3 ", 
   "theme.mp3 ",
  "shesaid.mp3",
  "ThatsWhatSheSaid.mp3",
];

const scenes = [
   // 🔐 Office Gate Scene (Pre-Intro)
{
  id: "gate",
  title: "Before You Enter this…",
  text: "Do you want to go inside…?",
  bg:[ "images/office_bg1.jpg",   "images/ Creed_2.jpg ", "images/Kevin_1.jpg",      "images/ Michael_famous_meme.jpg",  "images/Micahel_face.jpg "],
  gif: "images/Dwight_would_a_Idiot.gif",
  quote: "“Whenever I’m about to do something, I think, ‘Would an idiot do that?’ And if they would, I do not do that thing.” — Dwight Schrute",
  gate: true
},

  // Intro
  {
    id: "intro",
    title: "Welcome to Dunder Mifflin — IIM Jammu Branch",
    text: "Welcome to IIM Jammu Branch of Dunder Mifflin Paper Company......\nThis little tour is for you... — tiny memories, big apologies, and a million 'that's what she said' moments.",
    bg: ["images/The_office_image.jpg",         " Images/ toby_1.jpg " ,         "images/Worlds_best_boss.jpg " ] ,
    gif: "images/Kelly_Italkalotsoilearnedtojusttumemyselfout.gif",
    people: ["images/jim_1.jpg", "images/kelly_1.jpg" , "images/Dddddd3.jpg"],
    thumbs: {
      tl: "images/devvvvv_5.jpg",
      tr: "images/devuuu_5.jpg",
      bl: "images/Devvvvv_2.jpg",
      br: "images/ddddduuuu_3.jpg"
    },
    quote: "Jim (devyani) is my enemy. But it turns out that Jim(Devyani) is also his own worst enemy. And the enemy of my enemy is my friend. So Jim(Devyani) is actually my friend. But, because he is his own worst enemy, the enemy of my friend is my enemy, so actually, Jim (devyani) is my enemy.",
    question: {
      type: "short",
      key: "You know , how we started watching THE OFFICE......because how come we chose this show...there should be a legend/Hilarious/ Intelligent among us ...IQ must be as good as ...your favourite Epsiode must be Diversity day..or The Dundies or worst ...Goodbye, Michael....Write here which one for My next algorithmic steps ",
      prompt: "You know , how we started watching THE OFFICE......because how come we chose this show...there should be a legend/Hilarious/ Intelligent among us ...IQ must be as good as ...your favourite Epsiode must be Diversity day..or The Dundies or worst ...Goodbye, Michael....Write here which one for My next algorithmic steps ",
    }
  },
  // Episode 2 -What I 
  {
    id: "that-look",
    title: "That Look — Missing You",
    text:
`All you need is love? False. The four basic human necessities are air, water, food and shelter (As per Mr.Dwight )...sooooo ..How am I feeling? Oh, absolutely fantastic.... Like unbelievably fine — not sad, not angry, just a perfectly normal human functioning at 150% and definitely not thinking about you.
(And okay fine, maybe I'm thinking about you a little. Like the way Jim hides a smile after Pam laughs.) I missss youuuuuuuuuu so muchhhhhh ...sorrrrrrryyyyyyyyy
also I am not dwight so i can't do it like him ...according to him .... “My perfect Valentine’s Day? I’m at home. Three cell phones in front of me. Fielding desperate calls from people who want to buy one of the 50 restaurant reservations I made over six months ago.”
Remember that quiet dramatic energy — "Are you watching closely?" — that's what I feel when I think about us.

`,
    bg: [ "images/office_bg2.jpg", "images/devvvvv_5.jpg" ,  "images/ Kelly_kapoor_Couple.jpg " ,"images/ddddduuuu_3.jpg" ]
    gif: "images/Michael_Dance_2.gif",
    people: ["images/kelly_1.jpg",      "images/Michael_1.jpg",            "images/Devu1.jpg" ,            "images/pam_1.jpg" ],
    thumbs: {
      tl: "images/devvvvv_5.jpg",
      tr: "images/Devuuu_2.jpg",
      br: "images/Devu1.jpg"
    },
    quote: "Sarcastic? Always. Missing you? Always more.",
    question: {
      type: "short",
      key: "how_are_you_feeling_today",
      prompt: "Tell me one tiny thing from the day that made you smile (even if tiny)."
    }
  },
  // Episode 3 -What I do without you for this many days ....
  {
    id: "that-look",
    title: "That Look — Missing You",
    text:
`All you need is love? False. The four basic human necessities are air, water, food and shelter (As per Mr.Dwight )...sooooo ..How am I feeling? Oh, absolutely fantastic.... Like unbelievably fine — not sad, not angry, just a perfectly normal human functioning at 150% and definitely not thinking about you.
(And okay fine, maybe I'm thinking about you a little. Like the way Jim hides a smile after Pam laughs.) I missss youuuuuuuuuu so muchhhhhh ...sorrrrrrryyyyyyyyy
also I am not dwight so i can't do it like him ...according to him .... “My perfect Valentine’s Day? I’m at home. Three cell phones in front of me. Fielding desperate calls from people who want to buy one of the 50 restaurant reservations I made over six months ago.”
Remember that quiet dramatic energy — "Are you watching closely?" — that's what I feel when I think about us.

`,
    bg:[ "images/office_bg2.jpg", "images/Michael_1.jpg",             "images/Devu1.jpg" ,            "images/ Kelly_kapoor_Couple.jpg "] ,
    gif: "images/Michael_Dance_2.gif",
    people: ["images/kelly_1.jpg",             "images/devvvvv_5.jpg" ,                 "images/pam_1.jpg" , "images/ddddduuuu_3.jpg"],
    thumbs: {
      tl: "images/devvvvv_5.jpg",
      tr: "images/Devuuu_2.jpg",
      br: "images/Devu1.jpg"
    },
    quote: "Sarcastic? Always. Missing you? Always more.",
    question: {
      type: "short",
      key: "how_are_you_feeling_today",
      prompt: "Tell me one tiny thing from the day that made you smile (even if tiny)."
    }
  },

  // Episode 4 - Fights (3 micro-scenes inside)
  {
    id: "important part of Life - fights",
    title: "Episode 3 — so fights are basically what love is revolve around...We didn't have actual fights ,it's just some things we didn't agree.....so but now....I am ready to face any challenges that might be foolish enough to face me.",
    // we'll show sections in order with their own images/quotes; text here is an intro
    text: "This part is important. I want to say sorry for many many moments I regret. I'll walk through each memory and ask one small question.",
    bg: ["images/whole_1.jpg",       " images/Dwight_pam_Cry.jpg ",       "images/Michael_Crying.jpg " ,         "images / dwight_cry_1.jpg"],
    gif: "images/heart_fireworks.gif",
    people: ["images/dwight_1.jpg", "images/jim_1.jpg"],
    thumbs: {
      tl: "images/devvvvv_5.jpg",
      tr: "images/Devuuu_2.jpg",
      bl: "images/ddddduuuu_3.jpg",
      br: "images/Devu1.jpg"
    },
    quote: "I wish there was a way to know you’re in the good old days before you’ve actually left them. — Andy (for the vibe)",
    fights: [
      {
        id: "mba-chaiwala",
        title: "MBA Chaiwala — I was wrong...I think positive side of this fights is that ....We can remember every unique place with its Unique Altercation between us...Like MBA Chaiwala , Maggie Place , pahalgam , Regarding going to Vaishnodevi....tell me a single memory of us ... I will tell you fight regarding around it",
        text: `At MBA chaiwala — not for once but many times .....toh manus aheech bhandan lavanyasathiii. Aapli kahi chuki nahi... Hot astaa.\nFight is part of life, but I handled it badly. I'm so sorry for what I said and how I acted. Maaf kar na. but Failure of any kind is failure. i have to accept that . also i will learn somethings from Schrute Family having said ----There are forty rules all Schrute boys must learn before the age of five. Learn your rules. You better learn your rules. If you don’t, you’ll be eaten in your sleep!“`,
        bg: ["images/office_bg2.jpg",  "images/Michael_Crying.jpg", "images/ddddduuuu_3.jpg" ]
        people: ["images/dwight_cry_1.jpg", "images/devvvvv_5.jpg"  ,     ],
        gif: "images/Dwight_let's_do_this.gif",
        quote: "Sometimes I'll start a sentence and I don't even know where it's going. — Michael Scott",
        thumbs: {
          tl: "images/devvvvv_5.jpg",
          br: "images/ddddduuuu_3.jpg"
        },
        question: {
          type: "short",
          key: "mba_chaiwala_fix",
          prompt: "What one small thing could I do to make this right?"
        }
      },
      {
        id: "maggie-place",
        title: "Fight at Maggie's place",
        text: `Fight at Maggie's place last to last year... I am very sorry for thattttttt also. `,
        bg: ["images/Devuuu_2.jpg",  "images/jim_1.jpg" , "images/pam_1.jpg" ] ,
        gif: "images/Michael_Dance_2.gif",
        quote: `I am running away from my responsibilities. And it feels good. — (but not this time)`,
        thumbs: {
          tl: "images/devvvvv_5.jpg",
          br: "images/Devu1.jpg"
        },
        question: {
          type: "short",
          key: "maggie_place_fix",
          prompt: "What helped you calm down that day?"
        }
      },
      {
        id: "Pahalgam-fight ...This has to be th worst thing i did in my entire lifeeeeeeee......I am sorrry",
        title: "Pahalgam — Night was magic, morning I ruined it....This has to be th worst thing i did in my entire lifeeeeeeee",
        text: `That night in Kashmir was magic. The morning turned bad because of me. I am so sorry — my mistake and my regrets. Sorrrrryyyyyyy.\nI will never forget the stars. Let me fix this memory for us.`,
        bg:[ "images/Devu1.jpg", "images/devvvvv_5.jpg" , "images/ddddddd_1.jpg" ] ,
        people: ["images/michael_1.jpg"],
        gif: "images/heart_fireworks.gif",
        quote: "I wish there was a way to know you’re in the good old days before you’ve actually left them.",
        thumbs: {
          tl: "images/devvvvv_5.jpg",
          br: "images/ddddddd_1.jpg"
        },
        question: {
          type: "short",
          key: "kashmir_fix",
          prompt: "If I could change one thing from that trip, what should I do first?"
        }
      }
    ]
  },

  // Final
  {
    id: "final",
    title: "To You — My Little message, A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "images/final_bg.jpg",
    gif: "images/heart_fireworks.gif",
    final: true
  }
];

/* ---------- State ---------- */
let index = 0;
let responses = {};
let sceneState = {}; // for multi-step flows (intro, fights)
let fightsIndex = 0; // for internal fights iteration

/* ---------- DOM ---------- */
const sceneEl = document.getElementById("scene");
const titleEl = document.getElementById("title");
const sceneTitle = document.getElementById("sceneTitle");
const textEl = document.getElementById("text");
const quoteEl = document.getElementById("quote");
const gifImg = document.getElementById("gif");
const gifVideo = null; // not used
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
const bgAudio = document.getElementById("sceneAudio");
const sfxAudio = new Audio();
const voiceAudio = new Audio();

/* control buttons */
const muteBtn = document.getElementById("muteBtn");
const gifPauseBtn = document.getElementById("gifPauseBtn");
const playAudioBtn = document.getElementById("playAudioBtn");
const autoplayHint = document.getElementById("autoplayHint");
const autoplayPlay = document.getElementById("autoplayPlay");

/* ---------- Helpers ---------- */

function setBackground(url) {
  if (!url) {
    sceneEl.style.backgroundImage = "";
    return;
  }
  // use cover background; try preload and fallback
  const img = new Image();
  img.onload = () => {
    sceneEl.style.backgroundImage = `url("${url}")`;
    sceneEl.style.backgroundSize = "cover";
    sceneEl.style.backgroundPosition = "center";
  };
  img.onerror = () => {
    sceneEl.style.backgroundImage = `linear-gradient(135deg,#222,#0b0b0b)`;
  };
  img.src = url;
}

function handleGate() {
  // Disable Next button
  nextBtn.innerText = "";
  nextBtn.disabled = true;

  // YES button
  const yesBtn = document.createElement("button");
  yesBtn.innerText = "Yessssss 😁";
  yesBtn.className = "gateYes";

  // NO button
  const noBtn = document.createElement("button");
  noBtn.innerText = "Noooo 😢";
  noBtn.className = "gateNo";

  // YES works
 yesBtn.addEventListener("click", () => {
  removeGateButtons();   // 💥 instantly remove gate
  index++;               // move forward
  loadScene();
});

  // NO runs away
  noBtn.addEventListener("mouseenter", () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform =
      `translate(${x}px, ${y}px) rotate(${Math.random() * 20 - 10}deg)`;
  });

  // Add buttons to screen
  nextBtn.parentElement.appendChild(yesBtn);
  nextBtn.parentElement.appendChild(noBtn);
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
  // show/hide and set srcs; if missing, hide
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

/* GIF / video handling: prefer img gif, if not available and there's a .mp4 variant, use video.
   We'll accept either a gif path, or provide an optional video property on scene.
*/
function showMedia(gifPath, videoPath, fallbackImage) {
  // hide both first
  gifImg.style.display = "none";
  if (gifVideo) gifVideo.style.display = "none";
  gifVideo.pause();
  gifVideo.removeAttribute("src");

  if (!gifPath && !videoPath && !fallbackImage) return;

  if (gifPath) {
    const test = new Image();
    test.onload = () => {
      gifImg.src = gifPath;
      gifImg.style.display = "block";
      gifImg.alt = "";
    };
    test.onerror = () => {
      // try video fallback
      if (videoPath) {
        gifVideo.src = videoPath;
        gifVideo.style.display = "block";
        if (gifVideo) gifVideo.play();
.catch(()=>{});
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

  // if gif not provided but video present
  if (videoPath) {
    gifVideo.src = videoPath;
    gifVideo.style.display = "block";
    if (gifVideo) gifVideo.play();
.catch(()=>{});
    return;
  }

  if (fallbackImage) {
    gifImg.src = fallbackImage;
    gifImg.style.display = "block";
  }
}

/* Audio safety: single bgAudio for ambience/long clips, sfxAudio for short sounds; voiceAudio for voice clips.
   Always stop background audio before playing a non-looping voice clip unless voice is short.
*/
function playBg(src, { fade = false } = {}) {
  if (!src) {
    fadeOut(bgAudio);
    return;
  }
  if (bgAudio.src && bgAudio.src.includes(src)) {
    // already playing
    return;
  }
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

function stopAllAudio() {
  try { bgAudio.pause(); } catch (e) {}
  try { sfxAudio.pause(); } catch (e) {}
  try { voiceAudio.pause(); } catch (e) {}
}

let muted = false;
function setMute(v) {
  muted = v;
  bgAudio.muted = v;
  sfxAudio.muted = v;
  voiceAudio.muted = v;
  muteBtn.innerText = v ? "🔇" : "🔈";
}

/* Play SFX robustly by trying candidate filenames */
function playSfxCandidates() {
  let idx = 0;
  const sfx = sfxAudio;
  function tryOne() {
    if (idx >= ANSWER_SFX_CANDIDATES.length) return;
    const candidate = ANSWER_SFX_CANDIDATES[idx++];
    sfx.src = candidate;
    sfx.currentTime = 0;
    sfx.volume = muted ? 0 : 0.9;
    const p = sfx.play();
    if (p !== undefined) {
      p.then(() => {}).catch(() => {
        // try next after short delay
        setTimeout(tryOne, 200);
      });
    }
  }
  tryOne();
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

/* Show question overlay */
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

/* Hide question */
function hideQuestion() {
  questionOverlay.style.display = "none";
}

/* ---------- Scene loading / navigation ---------- */
function removeGateButtons() {
  const yes = document.querySelector(".gateYes");
  const no = document.querySelector(".gateNo");

  if (yes) yes.remove();
  if (no) no.remove();
}

function loadScene() {
   removeGateButtons();
  const current = scenes[index];
   // 🧠 Office Gate Logic
if (current.id === "gate") {
  setBackground(current.bg);
  sceneTitle.innerText = current.title || "";
  quoteEl.innerText = current.quote || "";
  textEl.innerText = current.text || "";

  renderPeople([]);
  setCornerThumbs({});
  showMedia(current.gif || "", "", current.bg || "");

  handleGate();
  playBg(""); // no background music here
  return;
}

  if (!current) return;
  // reset fightsIndex if entering fights scene
  if (current.id === "fights") {
    fightsIndex = 0;
    sceneState.fightsStep = 0;
  }

  // set backgrounds & media
  setBackground(current.bg || "");
  sceneTitle.innerText = current.title || "";
  quoteEl.innerText = current.quote || "";

  renderPeople(current.people || []);
  setCornerThumbs(current.thumbs || {});

  // media handling: we use gif path and optional video fallback
  showMedia(current.gif || "", current.video || "", current.bg || "");

  // reset content text
  textEl.innerText = "";

  // special-case intro: type text and multi-step
  if (current.id === "intro") {
    nextBtn.disabled = true;
    nextBtn.innerText = "Continue";
    typeText(textEl, current.text || "", 36).then(() => {
      nextBtn.disabled = false;
      sceneState.introStep = 0;
      // clear quote until button pressed (quote is already in quoteEl)
    });
    // don't autoplay background audio for intro (user may want to press)
    playBg("");
    return;
  }

  // special-case fights: show intro then start micro-scenes when Next pressed
  if (current.id === "fights") {
    // show the intro text typed quickly then set button to start micro-scenes
    nextBtn.disabled = true;
    nextBtn.innerText = "Start";
    typeText(textEl, current.text || "", 28).then(() => {
      nextBtn.disabled = false;
    });
    playBg(""); // no music until micro scene chooses one
    return;
  }

  // generic scenes:
  textEl.innerText = current.text || "";
  nextBtn.innerText = current.final ? "FINISH" : "NEXT";
  nextBtn.disabled = false;

  // play a gentle background if provided
  if (current.bgAudio) {
    playBg(current.bgAudio);
  } else {
    playBg(""); // ensure nothing else plays
  }

  // show question if scene has question (small delay)
  if (current.question) {
    setTimeout(() => showQuestion(current.question), 700);
  } else {
    hideQuestion();
  }
}

/* Proceed after answering a question (default: next scene) */
function proceedAfterAnswer() {
  const current = scenes[index];
  if (!current) return;
  if (current.id === "fights") {
    // If in fights micro-scene and we answered a fight question, advance fights index
    handleNextFight();
    return;
  }
  // otherwise next scene
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

/* ---------- Intro button flow ---------- */
async function handleIntroClick() {
  const current = scenes[index];
  if (!current || current.id !== "intro") return;
  sceneState.introStep = sceneState.introStep || 0;

  // Step 0: press Continue -> play SFX, show Dwight quote, change button
  if (sceneState.introStep === 0) {
    nextBtn.disabled = true;
    playSfxCandidates();
    setTimeout(() => {
      quoteEl.innerText = "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing. — Dwight Schrute";
      nextBtn.innerText = "You wanna listen ... that's what she said";
      nextBtn.disabled = false;
      sceneState.introStep = 1;
    }, 800);
    return;
  }

  // Step 1: user presses to play Michael clip -> play voice clip, then show question
  if (sceneState.introStep === 1) {
    nextBtn.disabled = true;
    voiceAudio.src = "images/Michael_scott_thank_you.mp3";
    voiceAudio.volume = muted ? 0 : 0.9;
    const p = voiceAudio.play();
    if (p !== undefined) p.catch(() => showAutoplayHint());
    setTimeout(() => {
      if (current.question) showQuestion(current.question);
      nextBtn.innerText = "let's gooooooo";
      nextBtn.disabled = false;
      sceneState.introStep = 2;
    }, 1400);
    return;
  }

  // Step 2: if question visible, collect and move on
  if (sceneState.introStep === 2) {
    if (questionOverlay.style.display === "flex" && current.question && current.question.type === "short") {
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

/* ---------- Fights micro-scene handling ---------- */

function startFightsSequence() {
  fightsIndex = 0;
  loadFight(fightsIndex);
}

function loadFight(i) {
  const fights = (scenes[index] && scenes[index].fights) || [];
  if (i < 0 || i >= fights.length) return;
  const f = fights[i];
  // set scene text and media
  sceneTitle.innerText = f.title;
  quoteEl.innerText = f.quote || "";
  setBackground(f.bg || scenes[index].bg || "");
  renderPeople(f.people || []);
  setCornerThumbs(f.thumbs || {});

  // show the fight-specific gif
  showMedia(f.gif || "", f.video || "", f.bg || "");

  // type the fight text
  nextBtn.disabled = true;
  nextBtn.innerText = "Continue";
  typeText(textEl, f.text || "", 28).then(() => {
    // after text typed, show the question overlay after slight pause
    setTimeout(() => {
      nextBtn.disabled = false;
      if (f.question) showQuestion(f.question);
    }, 700);
  });

  // play a gentle background ambience specific for fights if desired
  // we keep bgAudio muted unless user starts audio
  playBg(""); // don't auto-play long music; user can start audio
}

function handleNextFight() {
  const fights = (scenes[index] && scenes[index].fights) || [];
  // if current fight had a question, its answer is already stored via submit handler
  fightsIndex++;
  if (fightsIndex >= fights.length) {
    // done with fights, proceed to next scene
    nextScene();
    return;
  }
  loadFight(fightsIndex);
}

/* ---------- Final message ---------- */
function showFinal() {
  // assemble message using collected responses
  const ep = responses.favorite_office_episode || "our favourite silly episode";
  const smile = responses.how_are_you_feeling_today || "that tiny thing you smiled about";
  const mbaFix = responses.mba_chaiwala_fix || "let me make it up to you";
  const maggieFix = responses.maggie_place_fix || "I will calm things next time";
  const kashFix = responses.kashmir_fix || "plan a redo trip just for us";
  const usmem = responses.us_memory || "the little moment you smiled that I keep replaying";

  const message = [
    "Hey love — I made this for you.",
    `I remember laughing with you at ${ep}.`,
    `You told me today: ${smile}. That made me smile too.`,
    `For MBA chaiwala: ${mbaFix}.`,
    `For Maggie's place: ${maggieFix}.`,
    `For Kashmir: ${kashFix}.`,
    `One tiny moment of us I keep: ${usmem}.`,
    "",
    "I'm sorry for the times I hurt you. I regret the bad things I've done.",
    "I hope you are doing fine. I love you, I care for you, and I want to keep making better memories with you.",
    "",
    "Will you give me one more chance to make new memories?"
  ].join("\n\n");

  finishMessage.innerText = message;
  finishOverlay.style.display = "flex";
}

/* ---------- Event wiring ---------- */

nextBtn.addEventListener("click", (ev) => {
  const current = scenes[index];
   if (current && current.id === "gate") return;

  // special flows
  if (current && current.id === "intro") {
    handleIntroClick();
    return;
  }
  if (current && current.id === "fights") {
    // if we're on fights intro (sceneState.fightsStep 0), start sequence
    if (!sceneState.fightsStep || sceneState.fightsStep === 0) {
      sceneState.fightsStep = 1;
      startFightsSequence();
      return;
    } else {
      // Otherwise, if fights are already running but the user clicked Next (not during a question),
      // we should just advance to the next micro-step or show question if any
      // (To keep UX consistent, the question submit advances the sequence)
      // Try to advance to next fight when Next clicked and question not visible
      if (questionOverlay.style.display !== "flex") {
        handleNextFight();
      }
      return;
    }
  }

  // general case: if a short question is visible, submit it
  if (questionOverlay.style.display === "flex") {
    // emulate submit
    submitQuestion();
    return;
  }

  // final
  if (current && current.final) {
    showFinal();
    return;
  }

  // default advance
  nextScene();
});

/* Question submit/skip handlers */
function submitQuestion() {
  const key = questionOverlay.dataset.key;
  if (!key) { hideQuestion(); return; }
  const currentScene = scenes[index];

  // MCQ handled at creation; here handle short input
  const q = (currentScene && currentScene.question) || findFightQuestionByKey(key);
  if (q && q.type === "short") {
    const val = questionInput.value.trim();
    if (val && val.toLowerCase() !== "skip") {
      playSfxCandidates();
      responses[key] = val;
    }
    hideQuestion();
    // proceed appropriately
    if (currentScene.id === "fights") {
      // if we are inside fights, proceed to next fight
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
  // continue after skip
  const current = scenes[index];
  if (current && current.id === "fights") {
    handleNextFight();
  } else {
    nextScene();
  }
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

/* top controls */
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
playAudioBtn.addEventListener("click", () => {
  // if bgAudio has a source, try play it; else play a short voice to trigger autoplay permission
  try {
    if (bgAudio.src) {
      bgAudio.play().catch(()=>{});
    } else {
      // small safe click-trigger sound
      sfxAudio.src = ANSWER_SFX_CANDIDATES[0];
      sfxAudio.play().catch(()=>{});
    }
  } catch(e){}
});

/* autoplay hint */
function showAutoplayHint() {
  autoplayHint.style.display = "block";
}
autoplayPlay.addEventListener("click", () => {
  autoplayHint.style.display = "none";
  // attempt to play bg if set
  try { bgAudio.play().catch(()=>{}); } catch(e){}
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
    if (s.fights && Array.isArray(s.fights)) {
      s.fights.forEach(f => {
        if (f.bg) urls.add(f.bg);
        if (f.gif) urls.add(f.gif);
        if (f.people && Array.isArray(f.people)) f.people.forEach(p => urls.add(p));
        if (f.thumbs) Object.values(f.thumbs).forEach(t => t && urls.add(t));
      });
    }
  });
  // Preload images
  urls.forEach(u => {
    const im = new Image();
    im.src = u;
  });
  // preload sfx candidate URLs as audio elements (but don't play)
  ANSWER_SFX_CANDIDATES.forEach(src => {
    try { const a = new Audio(); a.src = src; } catch(e){}
  });
}
preloadAssets();

/* ---------- Initialize ---------- */
function init() {
  titleEl.innerText = "For You";
  // load first scene
  index = 0;
  responses = {};
  sceneState = {};
  loadScene();
  // default mute false
  setMute(false);
}

init();

/* Ensure safe behavior when user navigates via keyboard: allow Enter to submit question */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && questionOverlay.style.display === "flex") {
    submitQuestion();
  }
});
