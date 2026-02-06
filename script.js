const title = document.getElementById("title");
const text = document.getElementById("text");
const img = document.getElementById("image");
const quote = document.getElementById("quote");
const controls = document.getElementById("controls");
const audio = document.getElementById("audio");
const bgGif = document.getElementById("bgGif");

let i = 0;

const scenes = [
  {
    mood:"chaos",
    bg:"Dwight_Dancing.gif",
    text:"Do you want to go forward here… not real life… or both?",
    buttons:true
  },
  {
    mood:"funny",
    bg:"Dwight_would_a_Idiot.gif",
    audio:"That's_What_she_said.mp3",
    text:`"Whenever I'm about to do something, I think:
Would an idiot do that?"
— Dwight Schrute`
  },
  {
    mood:"funny",
    bg:"Michael_Dancing.gif",
    audio:"Michael_scott_thank_you.mp3",
    image:"Michael_Scott_1.jpg",
    quote:`"Would I rather be feared or loved? Both."`
  },
  {
    mood:"awkward",
    bg:"Jim_as_Dwight.jpg",
    audio:"deranged.mp3",
    image:"Jim_as_Dwight.jpg",
    quote:`"Bears. Beets. Battlestar Galactica."`
  },
  {
    mood:"warm",
    bg:"Pam_happy.jpg",
    audio:"theme.mp3",
    image:"Pam_happy.jpg",
    quote:`"When you’re a kid, you assume your parents are soulmates."`
  },
  {
    mood:"romantic",
    bg:"Devu1.jpeg",
    audio:"wild.mp3",
    image:"Devu1.jpeg",
    text:"This part… wasn’t from The Office."
  },
  {
    mood:"quiet",
    bg:"Dwight_cry_2.jpg",
    audio:"nogod.mp3",
    text:
`Hey Devu… Devi… Devyani…

I wanted to show this to you for so many days.

In vain I have struggled.
It will not do.
You must allow me to tell you
how ardently I admire and love you.`
  }
];

function render(){
  const s = scenes[i];
  title.innerText = "";
  text.innerText = s.text || "";
  quote.innerText = s.quote || "";

  bgGif.style.backgroundImage = `url(${s.bg})`;

  if(s.image){
    img.src = s.image;
    img.style.display="block";
  } else img.style.display="none";

  if(s.audio){
    audio.src = s.audio;
    audio.play().catch(()=>{});
  }

  controls.innerHTML="";

  if(s.buttons){
    const yes=document.createElement("button");
    yes.innerText="YES";
    yes.onclick=()=>{ i++; render(); };

    const no=document.createElement("button");
    no.innerText="NO";
    no.onmouseover=()=>{
      no.style.transform=`translate(${Math.random()*200-100}px,${Math.random()*200-100}px) rotate(${Math.random()*360}deg)`;
    };

    controls.append(yes,no);
  } else {
    const next=document.createElement("button");
    next.innerText="Continue";
    next.onclick=()=>{
      i++;
      if(i<scenes.length) render();
      else document.getElementById("questionOverlay").style.display="flex";
    };
    controls.append(next);
  }
}

render();
