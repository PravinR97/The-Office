/* Updated script.js
   - Scenes include quotes, bg, gif, audio, and optional quiz question.
   - Plays short audio clips per scene.
   - Shows quiz inputs on specified scenes and collects answers.
   - Final scene shows a personalized message assembled from answers.
   - Uses canvas-confetti CDN if available (script tag in index.html).
*/

const scenes = [
  {
    id: "intro-office",
    title: "Another Normal Day at Dunder Mifflin",
    text: "We laughed, we paused, we rewatched.\nThis is our little world.",
    bg: "assets/images/office_bg1.jpg",
    gif: "assets/gifs/jim_look.gif",
    audio: "assets/audio/office_theme_loop.mp3",
    quote: "Sometimes I'll start a sentence and I don't even know where it's going."
  },
  {
    id: "jim-knows",
    title: "That Look",
    text: "Remember the look Jim gave Pam?\nI have that feeling with you.",
    bg: "assets/images/office_bg2.jpg",
    gif: "assets/gifs/pam_smile.gif",
    audio: "assets/audio/jim_look_sfx.mp3",
    quote: "You miss 100% of the shots you don't take. - Michael Scott",
    question: {
      type: "short",
      key: "favorite_office_episode",
      prompt: "Which episode of The Office do you remember laughing at the most?"
    }
  },
  {
    id: "michael-energy",
    title: "Michael Energy",
    text: "Confidence and nonsense in equal measure.\nThat's the fun part.",
    bg: "assets/images/office_bg3.jpg",
    gif: "assets/gifs/michael_laugh.gif",
    audio: "assets/audio/michael_laugh.mp3",
    quote: "I am Beyonce, always."
  },
  {
    id: "peaky",
    title: "Peaky Vibes",
    text: "We binge Peaky Blinders together — so intense, so dramatic.",
    bg: "assets/images/peaky_bg.jpg",
    gif: "assets/gifs/peaky.gif",
    audio: "assets/audio/peaky_theme_loop.mp3",
    quote: "Good taste is for people who can't afford sapphires. — (teasing)",
    question: {
      type: "mcq",
      key: "peaky_character",
      prompt: "Who's the most dangerous-looking? (pick one)",
      choices: ["Tommy", "Arthur", "Polly", "I don’t know — they’re all dark!"]
    }
  },
  {
    id: "mummy-ishaan",
    title: "Mummy & Ishaan",
    text: "You love Mummy & Ishaan quietly. You act chidchidi but your heart is full.",
    bg: "assets/images/family_bg.jpg",
    gif: "assets/gifs/family.gif",
    audio: "assets/audio/soft_note.mp3",
    quote: "I know you protect those you love — even when you won't admit it.",
    question: {
      type: "short",
      key: "what_she_loves_most",
      prompt: "What's one thing you love about Mummy or Ishaan (a small thing)?"
    }
  },
  {
    id: "himachal-dream",
    title: "Himachal Dreams",
    text: "You said you'd leave everything and live in Himachal.\nI think I could follow you anywhere.",
    bg: "assets/images/himachal_bg.jpg",
    gif: "assets/gifs/trek.gif",
    audio: "assets/audio/wind_chime.mp3",
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
    text: "You went 3 times. I wish I had gone with you.\nForgive me for the trips I missed.",
    bg: "assets/images/vaishno_bg.jpg",
    gif: "assets/gifs/temple.gif",
    audio: "assets/audio/bells_short.mp3",
    quote: "A promise to be there for you — starting now.",
    question: {
      type: "short",
      key: "vaishno_memory",
      prompt: "What do you remember about your favorite trip to Vaishno Devi?"
    }
  },
  {
    id: "kashmir",
    title: "Kashmir Nights",
    text: "BurgerKing, dosa, midnight walks, cold water on temple steps.\nMy favorite days were with you.",
    bg: "assets/images/kashmir_bg.jpg",
    gif: "assets/gifs/srinagar_night.gif",
    audio: "assets/audio/kashmir_breeze.mp3",
    quote: "We walked and talked until the stars seemed close enough to touch.",
    question: {
      type: "short",
      key: "best_food_memory",
      prompt: "Which food from our Kashmir days should we go back to first?"
    }
  },
  {
    id: "football-tease",
    title: "Football Tease",
    text: "I love Arsenal, Barca and Messi. You pretend not to care — but you smile.",
    bg: "assets/images/football_bg.jpg",
    gif: "assets/gifs/football_reaction.gif",
    audio: "assets/audio/goal_cheer.mp3",
    quote: "If loving football is wrong, I don't want to be right.",
    question: {
      type: "mcq",
      key: "football_interest",
      prompt: "Are you Team Arsenal, Team Barca, or 'I just enjoy snacks'?",
      choices: ["Arsenal", "Barcelona", "Snacks > Football", "Messi is magic"]
    }
  },
  {
    id: "final",
    title: "To You — A Little Quiz, A Lot of Love",
    text: "Click FINISH to reveal something I want you to keep just between us.",
    bg: "assets/images/final_bg.jpg",
    gif: "assets/gifs/heart_fireworks.gif",
    audio: "assets/audio/final_note.mp3",
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

function preloadAssets() {
  scenes.forEach(s => {
    if (s.bg) { const i = new Image(); i.src = s.bg; }
    if (s.gif) { const g = new Image(); g.src = s.gif; }
    if (s.audio) {
      const a = new Audio();
      a.src = s.audio;
    }
  });
}

function setBackground(url) {
  sceneDiv.style.backgroundImage = `url('${url}')`;
}

function playAudio(src) {
  if (!src) {
    audioEl.pause();
    audioEl.src = "";
    return;
  }
  audioEl.src = src;
  audioEl.currentTime = 0;
  audioEl.play().catch(e => {
    // Autoplay may be blocked; that's okay — user can click to play
    console.log("Audio play prevented or error:", e);
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
    mcqContainer.style.display = "block";
    q.choices.forEach((c, idx) => {
      const btn = document.createElement("button");
      btn.className = "mcqBtn";
      btn.innerText = c;
      btn.addEventListener("click", () => {
        responses[q.key] = c;
        hideQuestion();
        nextScene();
      });
      mcqContainer.appendChild(btn);
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
  const ep = responses.favorite_office_episode || "our favorite silly episode";
  const food = responses.best_food_memory || "that delicious dosa/burger";
  const vaish = responses.vaishno_memory || "your Vaishno Devi stories";
  const hima = responses.live_in_himachal || "a mountain getaway";
  const familyThing = responses.what_she_loves_most || "the small ways she loves";
  const sport = responses.football_interest || responses.peaky_character || "your playful choices";

  const message = `
    Hey love — I made this for you.
    I remember laughing with you at ${ep}. 
    I want to try ${food} again with you.
    I hear your Vaishno memories in your voice: "${vaish}".
    If you want Himachal, I will come.
    I love the ways you love: ${familyThing}.
    Even when you pretend not to care about football: ${sport}.
    These things are mine to keep — just ours.
    Will you give me one more chance to make new memories?
  `;

  finishMessage.innerText = message.trim();
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
  setBackground(current.bg);
  titleEl.innerText = current.title;
  textEl.innerText = current.text;
  quoteEl.innerText = current.quote || "";

  gifEl.style.display = current.gif ? "block" : "none";
  gifEl.src = current.gif || "";

  playAudio(current.audio || "");

  // If scene has a question, show it and pause auto-advance
  if (current.question) {
    // show after small delay so audio/visual registers
    setTimeout(() => {
      showQuestion(current.question);
    }, 700);
  } else {
    hideQuestion();
  }

  // update button text for final
  if (current.final) {
    btn.innerText = "FINISH";
  } else {
    btn.innerText = "NEXT";
  }
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

btn.addEventListener("click", () => {
  const current = scenes[index];
  // If current scene had a short-answer question visible, collect answer
  if (current.question && current.question.type === "short" && questionOverlay.style.display === "flex") {
    const val = questionInput.value.trim();
    if (val) {
      responses[current.question.key] = val;
      hideQuestion();
      nextScene();
      return;
    } else {
      // encourage answer or allow skip
      questionPrompt.innerText = current.question.prompt + "  (or type 'skip')";
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
  // optionally copy final message to clipboard or prepare a downloadable note
  navigator.clipboard.writeText(finishMessage.innerText).then(() => {
    alert("Message copied — you can paste it into a chat or save it.");
  });
});

preloadAssets();
loadScene();
