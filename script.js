let step = 0;

const steps = [
  {
    image: "images/michael_1.jpg",
    text: "Michael believes every story needs heart. Do you agree?"
  },
  {
    image: "images/dwight_1.jpg",
    text: "Dwight demands commitment. Are you serious?"
  },
  {
    image: "images/dwight_cry_1.jpg",
    text: "Dwight cries only once a year. Continue?"
  },
  {
    image: "images/jim_1.jpg",
    text: "Jim smirks. You made it this far."
  },
  {
    image: "images/pam_1.jpg",
    text: "Pam wonders… should this story continue someday?"
  }
];

function answerYes() {
  step++;
  if (step < steps.length) {
    updateContent();
  } else {
    endStory();
  }
}

function answerNo() {
  alert("No is not an option here 🙂");
}

function updateContent() {
  document.getElementById("storyImage").src = steps[step].image;
  document.getElementById("storyText").innerText = steps[step].text;
}

function endStory() {
  document.getElementById("storyText").innerText =
    "This story stays here… unless someday you choose to continue it 🤍";
}
