const title = document.getElementById("title");
const text = document.getElementById("text");
const quote = document.getElementById("quote");
const controls = document.getElementById("controls");
const img = document.getElementById("mediaImage");
const audio = document.getElementById("sceneAudio");

const questionOverlay = document.getElementById("questionOverlay");
const submitAnswer = document.getElementById("submitAnswer");

let slide = 0;

const slides = [
  {
    title: "Before We Begin",
    text: "Do you wanna go forward here… not in real life… or in both?",
    buttons: true
  },
  {
    title: "Dwight Schrute",
    text: `"Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing."`,
    quote: "— Dwight K. Schrute"
  },
  {
    title: "The Office",
    text: "Identity theft is not a joke, Jim.",
    quote: "Millions of families suffer every year."
  },
  {
    title: "Michael Scott",
    text: "I am Beyoncé, always.",
    img: "img1.jpg",
    audio: "audio1.mp3"
  },
  {
    title: "Jim Halpert",
    text: "Everything I have I owe to this job… this stupid, wonderful job.",
    img: "gif1.gif",
    audio: "audio2.mp3"
  },
  {
    title: "Pam Beesly",
    text: "I feel God in this Chili’s tonight.",
    img: "img2.jpg",
    audio: "audio3.mp3"
  },
  {
    title: "Andy Bernard",
    text: "I wish there was a way to know you're in the good old days before you've actually left them.",
    img: "gif2.gif",
    audio: "audio4.mp3"
  },
  {
    title: "Silence",
    text: "Sometimes the smallest moments stay the longest.",
    img: "img3.jpg",
    audio: "audio5.mp3"
  },
  {
    title: "For You",
    text:
`Hey Devu...Devi..Devyaniii....Cutuuuu...Sexy and beautiful eyes —
I wanted to show this to you for so many days...just wanted to show you.

"You had a lively, playful disposition that delighted in anything ridiculous."

"In vain I have struggled. It will not do. My feelings will no longer be repressed.
You must allow me to tell you how ardently I admire and love you."

"A person who can write a long letter with ease, cannot write ill." – Jane Austen

I remember laughing with you at \${ep}.
You told me today: \${smile}. That made me smile too.

For the times I was not good and hurt you…
let go of me… \${s1} / \${s2}.

One thing I promise: I'll keep \${care} close and never forget.

I'm sorry for the times I hurt you.
I wish I had no heart, it aches so…

You are the gull — strong and wild,
fond of the storm and the wind.

I just wanted you to be happy…
Maybe someday we will meet
and be happy at last.

?`
  }
];

function renderSlide() {
  const s = slides[slide];
  title.innerText = s.title || "";
  text.innerText = s.text || "";
  quote.innerText = s.quote || "";

  img.style.display = s.img ? "block" : "none";
  img.src = s.img || "";

  if (s.audio) {
    audio.src = s.audio;
    audio.play().catch(()=>{});
  }

  controls.innerHTML = "";

  if (s.buttons) {
    const yes = document.createElement("button");
    yes.innerText = "Yes";
    yes.className = "btn";
    yes.onclick = () => {
      audio.src = "audio1.mp3";
      audio.play().catch(()=>{});
      slide++;
      renderSlide();
    };

    const no = document.createElement("button");
    no.innerText = "No";
    no.className = "btn";
    no.onmouseover = () => {
      no.style.position = "absolute";
      no.style.left = Math.random()*80 + "%";
      no.style.top = Math.random()*80 + "%";
    };

    controls.append(yes,no);
  } else if (slide < slides.length - 1) {
    const next = document.createElement("button");
    next.innerText = "Continue";
    next.className = "btn";
    next.onclick = () => {
      slide++;
      renderSlide();
    };
    controls.appendChild(next);
  } else {
    questionOverlay.style.display = "flex";
  }
}

submitAnswer.onclick = () => {
  questionOverlay.innerHTML = "<div class='overlay-card'>Thank you for answering ❤️</div>";
};

renderSlide();
