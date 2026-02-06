const bg=document.getElementById("bg");
const text=document.getElementById("text");
const img=document.getElementById("image");
const quote=document.getElementById("quote");
const controls=document.getElementById("controls");
const audio=document.getElementById("audio");

let idx=0;
let audioUnlocked=false;

document.body.addEventListener("click",()=>audioUnlocked=true,{once:true});

const scenes=[
/* INTRO */
{
 bg:"office_bg1.jpg",
 text:"Do you want to go forward here… not real life… or both?",
 buttons:true
},
{
 bg:"Dwight_would_a_Idiot.gif",
 audio:"That's_What_she_said.mp3",
 text:`"Whenever I'm about to do something, I think:
Would an idiot do that?
And if they would — I do not do that thing."`
},
{
 bg:"Michael_Dancing.gif",
 audio:"Michael_scott_thank_you.mp3",
 image:"Michael_Scott_1.jpg",
 quote:`“Would I rather be feared or loved? Both.”`
},

/* CHAOS ACT */
{bg:"Kevin_destroying_kitchen.gif",audio:"punish.mp3",quote:`"Me think, why waste time say lot word..."`},
{bg:"Jim_as_Dwight.jpg",audio:"deranged.mp3",quote:`"Bears. Beets. Battlestar Galactica."`},
{bg:"Kelly_youknowguyslikeimreallysmart.gif",audio:"shesaid.mp3",quote:`"I talk a lot, so I've learned to tune myself out."`},
{bg:"Stanley_gif_1.gif",audio:"gamble.mp3",quote:`"If I don't have some cake soon, I might die."`},
{bg:"Prison_Mike.jpg",audio:"weapons.mp3",quote:`"The worst thing about prison was the Dementors."`},

/* MEMORY ACT */
{bg:"Pam_happy.jpg",audio:"theme.mp3",quote:`"When you're a kid, you assume your parents are soulmates."`},
{bg:"Jim_Face_plushappy.jpg",quote:`"I am about to do something very bold. Try."`},
{bg:"Andy_1.jpg",quote:`"I wish there was a way to know you're in the good old days."`},

/* DEVU ACT */
{
 bg:"Devu1.jpeg",
 audio:"wild.mp3",
 text:"This part… wasn’t from The Office."
},
{
 bg:"Devuuuu_2.jpeg",
 text:"You had a lively, playful disposition that delighted in anything ridiculous."
},
{
 bg:"Devyani_3.jpeg",
 text:"Cutuuu… sexy and beautiful eyes… I wanted to show this to you."
},

/* QUIET */
{
 bg:"Dwight_cry_2.jpg",
 audio:"nogod.mp3",
 text:`I'm sorry for the times I hurt you.
I regret the bad things I've done.
Sometimes I wish I had no heart… it aches so.`
},
{
 bg:"Pam_sad_Look.jpg",
 audio:"cage.mp3",
 text:`You are the gull — strong and wild.
Fond of the storm and the wind.
Flying far out to sea, happy all alone.`
},

/* END */
{
 bg:"Whole_squad.jpg",
 audio:"daffyduck.mp3",
 text:`Maybe someday we will meet…
and be happy at last.`
}
];

function playAudio(src){
 if(audioUnlocked){
  audio.src=src;
  audio.play().catch(()=>{});
 }
}

function render(){
 const s=scenes[idx];
 bg.style.backgroundImage=`url(${s.bg})`;
 text.innerText=s.text||"";
 quote.innerText=s.quote||"";

 if(s.image){
  img.src=s.image;
  img.style.display="block";
 } else img.style.display="none";

 if(s.audio) playAudio(s.audio);

 controls.innerHTML="";

 if(s.buttons){
  const yes=document.createElement("button");
  yes.innerText="YES";
  yes.onclick=()=>{idx++;render();};

  const no=document.createElement("button");
  no.innerText="NO";
  no.onmouseover=()=>{
    no.style.transform=`translate(${Math.random()*300-150}px,${Math.random()*300-150}px) rotate(${Math.random()*360}deg)`;
  };

  controls.append(yes,no);
 } else {
  const next=document.createElement("button");
  next.innerText="Continue";
  next.onclick=()=>{
    idx++;
    if(idx<scenes.length) render();
    else document.getElementById("questionOverlay").style.display="flex";
  };
  controls.append(next);
 }
}

render();
