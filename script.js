const scenes = [
  {
    title: "The Office Begins",
    text: "Another normal day at Dunder Mifflin.\nOr so they think.",
    bg: "images/office_bg1.jpg",
    gif: "images/jim_look.gif"
  },
  {
    title: "Jim Knows",
    text: "That look.\nThat silence.\nThat moment.",
    bg: "images/office_bg2.jpg",
    gif: "images/pam_smile.gif"
  },
  {
    title: "Michael Scott Energy",
    text: "Confidence.\nNo filter.\nNo awareness.",
    bg: "images/office_bg3.jpg",
    gif: "images/michael_laugh.gif"
  },
  {
    title: "For You ❤️",
    text: "Some episodes make you laugh.\nSome make you feel.\nThis one is for you.",
    bg: "images/office_bg2.jpg",
    gif: "images/pam_smile.gif"
  }
];

let index = 0;

const sceneDiv = document.getElementById("scene");
const titleEl = document.getElementById("title");
const textEl = document.getElementById("text");
const gifEl = document.getElementById("gif");
const btn = document.getElementById("nextBtn");

function loadScene() {
  const current = scenes[index];

  sceneDiv.style.backgroundImage = `url(${current.bg})`;
  titleEl.innerText = current.title;
  textEl.innerText = current.text;

  gifEl.style.display = current.gif ? "block" : "none";
  gifEl.src = current.gif || "";
}

btn.addEventListener("click", () => {
  index++;
  if (index >= scenes.length) {
    index = 0; // loop OR remove this line to stop
  }
  loadScene();
});

loadScene();
