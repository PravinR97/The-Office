/* Updated script.js — implements your requested changes:
   - typing effect for intro, layered background images for "people waiting"
   - custom intro flow (Continue -> "that's what she said" -> Dwight quote -> play Michael audio -> show question)
   - Episode 2 expanded text, images and new "Diversity Day" next label
   - improved image/gif fallbacks and background load check
   - "That's what she said" SFX plays every time a question is answered
   - Katakirr misal line with joking "that's what she said" after it
   - final message includes apology + affection
   - exported as a single script to copy into repo
*/

const ANSWER_SFX_CANDIDATES = [
  "Thats_What_she_said.mp3",
  "That's_What_she_said.mp3",
  "shesaid.mp3",
  "ThatsWhatSheSaid.mp3"
];

/* Scenes */
const scenes = [
  {
    id: "intro-office",
    title: "Welcome to Dunder Mifflin — IIM Jammu Branch",
    // The main intro line will be typed out slowly instead of appearing instantly.
    text: "Welcome to IIM Jammu Branch of Dunder Mifflin Paper Company......",
    // instead of a single background, we show multiple "people waiting" images stacked
    people: [
      "images/Stanley_angry_Look.jpg",
      "images/Jim_face.jpg",
      "images/Dwight_with_jimFace.jpg",
      "images/Jim_as_Dwight.jpg"
    ],
    gif: "Michael_Im_dead_Inside.gif",
    // After the first Continue press, we will play the 'that's what she said' sfx.
    // After that, show Dwight quote and a second button to play Michael's thank-you MP3,
    // then show a short question (same as the one you had).
    quote: "", // will be filled after the first interaction
    // provide an in-scene question (mirrors the earlier question)
    question: {
      type: "short",
      key: "favorite_office_episode",
      prompt: "Which episode of The Office made you laugh the hardest?"
    }
  },

  {
    id: "Jim / Devyaniiii-knows",
    title: "That Look when I do something wrong and very Unlikable",
    // updated to the user's requested style: sarcastic but obviously missing them; office & peaky references + The Prestige quote
    text: `How am I feeling? Oh, absolutely fantastic. Like unbelievably fine — not sad, not angry, just a perfectly normal human functioning at 150% *and* definitely not thinking about you. 
(And okay fine, maybe I'm thinking about you a little. Like the way Jim thinks when he hides a smile after Pam laughs.) 

Remember that Peaky silence when the Shelbys make plans? That's the energy: dramatic, slightly terrifying, and somehow romantic. And like The Prestige says: "Are you watching closely?" — I'm watching you, in my head, replaying small stupid things you do.

Also: I didn't want to write this. But... what can I do? What can I do...?`,
    // allow multiple people images here too, some used as background
    people: [
      "images/kelly_1.jpg",
      "images/Stanley_angry_Look.jpg",
      "images/Michael_Scott_1.jpg",
      "images/Dwight_Cry1.jpg",
      "images/Dwight_pam_Cry.jpg"
    ],
    bg: "images/office_bg2.jpg",
    gif: "Michael_Im_dead_Inside.gif",
    audio: "shesaid.mp3", // we'll also trigger the "that's what she said" SFX when appropriate
    quote: "Sarcastic? Always. Missing you? Always more.",
    question: {
      type: "short",
      key: "how_are_you_feeling",
      prompt: "Tell me one tiny thing from the day that made you smile (even if it was tiny)."
    },
    // label the next button specially for this scene
    nextLabel: "Diversity Day"
  },

  // keep the rest of your scenes mostly as before (I've preserved them but you can edit further)
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
    quote: "A promise to be there for you — starting now."
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
    text: "I love ___ ___ ___. Mi pan n kahi pan karat basto n madhech Football aanto madhech ... but you know Arsenal is 1st in league in Champions League , Premier League , Carabao Cup Final.......",
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

  {
    id: "katakirr",
    title: "Katakirr Misal (the truth)",
    text: "I haven't eaten Katakirr misal in a long time — the places I went with you mean more than the food. I will never go alone or with anyone else. (laugh)",
    bg: "images/misal_bg.jpg",
    gif: "images/misal_giggle.gif",
    // keep audio but we will also trigger the answer SFX after this line
    audio: "shesaid.mp3",
    quote: "And to be clear: I will not go alone — that's my promise."
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
const sceneState = {}; // per-scene ephemeral state (for multi-step scenes like intro)

// DOM elements
const sceneDiv = document.getElementById("scene");
const peopleBg = document.getElementById("peopleBg");
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

/* Helpers: set background (single) */
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
    sceneDiv.style.backgroundImage = `linear-gradient(135deg,#333,#111)`;
  };
  test.src = url;
}

/* Render layered people images (stacked) */
function renderPeople(people = []) {
  peopleBg.innerHTML = "";
  if (!people || people.length === 0) {
    peopleBg.style.display = "none";
    return;
  }
  peopleBg.style.display = "block";
  // show up to 4 images in a stacked row, last image on top
  people.slice(0, 4).forEach((src, i) => {
    const img = document.createElement("img");
    img.className = "person";
    img.src = src;
    img.alt = "";
    // stagger offsets for the stacked look
    img.style.zIndex = 10 + i;
    img.style.left = `${5 + i * 8}%`;
    img.style.bottom = `${-6 + i * 3}%`;
    img.addEventListener("error", () => img.style.display = "none");
    peopleBg.appendChild(img);
  });
}

/* Gif fallback: hide gif if not loaded */
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
  const sfx = new Audio();
  let tried = 0;
  function tryNext() {
    if (tried >= ANSWER_SFX_CANDIDATES.length) return;
    const candidate = ANSWER_SFX_CANDIDATES[tried++];
    sfx.src = candidate;
    sfx.currentTime = 0;
    const p = sfx.play();
    if (p !== undefined) {
      p.catch(() => {
        tryNext();
      });
    }
  }
  tryNext();
}

/* typing effect helper: types text into an element */
function typeText(element, text, speed = 40, cb) {
  element.innerText = "";
  let i = 0;
  function step() {
    if (i <= text.length) {
      element.innerText = text.slice(0, i);
      i++;
      setTimeout(step, speed + Math.random() * 30);
    } else {
      if (cb) cb();
    }
  }
  step();
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
  if (!current) return;

  // clear people bg unless scene provides people array
  renderPeople(current.people || []);

  setBackground(current.bg || "");
  titleEl.innerText = current.title || "";

  // For intro: use typing on the main text and a staged flow
  if (current.id === "intro-office") {
    // typing effect
    typeText(textEl, current.text || "", 45, () => {
      // after typing completes, make sure button shows "Continue"
      btn.innerText = "Continue";
      btn.disabled = false;
      quoteEl.innerText = "";
      gifEl.style.display = "block";
      gifEl.src = current.gif || "";
      // initialize intro scene state
      sceneState.introStep = sceneState.introStep || 0;
    });
    // hide question overlay until later step in intro flow
    hideQuestion();
    // do not auto-play intro audio here (we'll play SFX and michael clip as per flow)
    playAudio("");
    return;
  }

  // Non-intro scenes:
  textEl.innerText = current.text || "";
  quoteEl.innerText = current.quote || "";

  if (current.gif) {
    gifEl.style.display = "block";
    gifEl.src = current.gif;
  } else {
    gifEl.style.display = "none";
    gifEl.src = "";
  }

  playAudio(current.audio || "");

  // Katakirr: short delay and then cheeky sfx
  if (current.id === "katakirr") {
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

  btn.innerText = current.nextLabel || (current.final ? "FINISH" : "NEXT");
  btn.disabled = false;
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

/* Next button behavior: handle short answer submission + final + special intro flow */
btn.addEventListener("click", () => {
  const current = scenes[index];

  // Special multi-step intro flow
  if (current && current.id === "intro-office") {
    sceneState.introStep = sceneState.introStep || 0;

    // Step 0: first Continue pressed -> play that's what she said sfx, then show Dwight quote, change button label
    if (sceneState.introStep === 0) {
      btn.disabled = true;
      playAnswerSfx(); // That's what she said on pressing Continue
      // small dramatic pause then set Dwight quote
      setTimeout(() => {
        quoteEl.innerText = `Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing. — Dwight Schrute`;
        btn.innerText = "You wanna listen ...that's what she said";
        btn.disabled = false;
        sceneState.introStep = 1;
      }, 800);
      return;
    }

    // Step 1: user pressed the "you wanna listen..." -> play Michael_scott_thank_you.mp3, then show question & change button label
    if (sceneState.introStep === 1) {
      btn.disabled = true;
      // play Michael clip as requested
      playAudio("Michael_scott_thank_you.mp3");
      // after a short while, show the question overlay and set button to the requested "let's gooooooo"
      setTimeout(() => {
        // show the question that is stored in the scene
        if (current.question) {
          showQuestion(current.question);
        }
        btn.innerText = "let's gooooooo";
        btn.disabled = false;
        sceneState.introStep = 2;
      }, 1200);
      return;
    }

    // Step 2: if question overlay is visible, clicking NEXT should collect short answer (if any) or move forward
    if (sceneState.introStep === 2) {
      if (current.question && current.question.type === "short" && questionOverlay.style.display === "flex") {
        const val = questionInput.value.trim();
        if (val && val.toLowerCase() !== "skip") {
          playAnswerSfx();
          responses[current.question.key] = val;
        }
        hideQuestion();
        // move to next scene
        nextScene();
        return;
      } else {
        // if overlay is not visible, just move on
        nextScene();
        return;
      }
    }
  }

  // General case: If current scene had a short-answer question visible, collect answer
  if (current && current.question && current.question.type === "short" && questionOverlay.style.display === "flex") {
    const val = questionInput.value.trim();
    if (val && val.toLowerCase() !== "skip") {
      playAnswerSfx();
      responses[current.question.key] = val;
      hideQuestion();
      nextScene();
      return;
    } else {
      hideQuestion();
      nextScene();
      return;
    }
  }

  // final button
  if (current && current.final) {
    showFinal();
    return;
  }

  // default advance
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
    // preload people images if provided
    if (s.people && Array.isArray(s.people)) {
      s.people.forEach(p => { const pi = new Image(); pi.src = p; });
    }
    if (s.audio) {
      try { const a = new Audio(); a.src = s.audio; } catch(e) {}
    }
  });
}
preloadAssets();

/* start on load */
loadScene();
