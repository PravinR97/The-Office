/* Main slideshow logic
   - No overlay about media (removed)
   - Audio playback will be started only after the user clicks "Yes" (user gesture)
   - "No" button evades clicks (you must click Yes)
   - After the last slide, a questionnaire appears. On submit, the final long dialogue is shown with substitutions.
*/

(() => {
  // Slide data: use images in images/ and audio files in root (as provided).
  // Adjust filenames if your repo has slightly different names.
  const slides = [
    {
      img: 'images/dwight_smile.jpg',
      audio: 'Dwight_about_smile_chimpanzee_begging.mp3',
      caption: 'Dwight smiles...'
    },
    {
      img: 'images/let_me_love_you_Michael.gif',
      audio: "That's_What_she_said.mp3",
      caption: 'Michael moment'
    },
    {
      img: 'images/Dance_1.gif',
      audio: 'theme.mp3',
      caption: 'A little dance'
    },
    {
      img: 'images/devuuu_5.png',
      audio: 'michael_scott_thank_you.mp3',
      caption: 'Devuuu memory'
    },
    {
      img: 'images/pam_1.jpg',
      audio: 'wild.mp3',
      caption: 'Pam'
    },
    {
      img: 'images/whole_1.jpg',
      audio: 'cage.mp3',
      caption: 'Whole squad'
    },
    {
      img: 'images/peaky.jpg',
      audio: 'daffyduck.mp3',
      caption: 'Peaky'
    },
    {
      img: 'images/Toby_1.jpg',
      audio: 'punish.mp3',
      caption: 'Toby'
    },
    {
      img: 'images/michael_6.jpg',
      audio: 'weapons.mp3',
      caption: 'Michael finale'
    }
  ];

  // DOM
  const intro = document.getElementById('intro');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const dwightQuote = document.getElementById('dwight-quote');

  const player = document.getElementById('player');
  const slideImage = document.getElementById('slideImage');
  const caption = document.getElementById('caption');
  const thumbnails = document.getElementById('thumbnails');
  const pauseBtn = document.getElementById('pauseBtn');
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const muteToggle = document.getElementById('muteToggle');

  const questionnaire = document.getElementById('questionnaire');
  const finalForm = document.getElementById('finalForm');
  const finalMessage = document.getElementById('finalMessage');
  const finalText = document.getElementById('finalText');

  let current = 0;
  let currentAudio = null;
  let isPaused = false;
  let advancing = false;

  // Prebuild thumbnails (visual feedback only)
  function buildThumbnails() {
    thumbnails.innerHTML = '';
    slides.forEach((s, i) => {
      const t = document.createElement('div');
      t.className = 'thumb';
      const img = document.createElement('img');
      img.src = s.img;
      img.alt = s.caption || `Slide ${i+1}`;
      t.appendChild(img);
      t.addEventListener('click', () => goTo(i));
      thumbnails.appendChild(t);
    });
  }

  // Play audio; returns a promise that resolves when audio ends or timeout
  function playAudio(src) {
    if (!src) return Promise.resolve();
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    const a = new Audio(src);
    a.preload = 'auto';
    a.muted = muteToggle.checked;
    currentAudio = a;

    // Use ended event to advance
    return new Promise((resolve) => {
      let resolved = false;
      // If user paused/advances we should resolve
      a.addEventListener('ended', () => {
        if (!resolved) { resolved = true; resolve(); }
      });
      // Fallback: if audio metadata isn't available, play for a default time
      a.addEventListener('loadedmetadata', () => {
        // Nothing required here — ended will handle it.
      });
      // Play audio (this must be called as a result of a user gesture initially, which we ensure)
      a.play().catch((e) => {
        // If playback blocked, still continue after a short delay
        console.warn('Playback prevented or failed:', e);
        if (!resolved) { resolved = true; setTimeout(resolve, 3500); }
      });
    });
  }

  function showSlide(i) {
    const s = slides[i];
    slideImage.src = s.img;
    caption.textContent = s.caption || '';
    // highlight thumb
    Array.from(thumbnails.children).forEach((t, idx) => {
      t.classList.toggle('active', idx === i);
    });

    // Play associated audio (returns promise)
    return playAudio(s.audio);
  }

  async function goTo(i) {
    if (i < 0 || i >= slides.length) return;
    current = i;
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    // show slide and wait for audio or fallback
    await showSlide(i);
    if (!isPaused) {
      // advance to next or end
      if (current < slides.length - 1) {
        current++;
        // small delay between slides
        setTimeout(() => { if (!isPaused) goTo(current); }, 350);
      } else {
        // finished: show questionnaire
        endEpisode();
      }
    }
  }

  function startEpisode() {
    intro.classList.add('hidden');
    dwightQuote.classList.remove('hidden');
    // Show the quote for 2.2s then start player
    setTimeout(() => {
      dwightQuote.classList.add('hidden');
      player.classList.remove('hidden');
      buildThumbnails();
      // Start at slide 0
      goTo(0);
    }, 2200);
  }

  function endEpisode() {
    // stop audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    player.classList.add('hidden');
    questionnaire.classList.remove('hidden');
  }

  // Controls
  pauseBtn.addEventListener('click', () => {
    if (isPaused) {
      // resume
      isPaused = false;
      pauseBtn.textContent = 'Pause';
      // resume audio where possible
      if (currentAudio) currentAudio.play().catch(()=>{});
      // continue auto-advance by calling goTo(current) if not already there
      goTo(current);
    } else {
      isPaused = true;
      pauseBtn.textContent = 'Resume';
      if (currentAudio) currentAudio.pause();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (current < slides.length - 1) goTo(current + 1);
    else endEpisode();
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) goTo(current - 1);
  });

  muteToggle.addEventListener('change', () => {
    if (currentAudio) currentAudio.muted = muteToggle.checked;
  });

  // NO button behaviour: it moves away and cannot be clicked meaningfully.
  function randomizeNoPosition() {
    const container = document.getElementById('intro');
    const rect = container.getBoundingClientRect();
    // place within container (keep it visible)
    const maxX = Math.max(0, rect.width - noBtn.offsetWidth - 20);
    const maxY = Math.max(0, rect.height - noBtn.offsetHeight - 20);
    const x = Math.floor(Math.random() * maxX) + 10;
    const y = Math.floor(Math.random() * maxY) + 10;
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  }

  noBtn.addEventListener('mouseenter', () => {
    randomizeNoPosition();
  });

  noBtn.addEventListener('click', (e) => {
    // prevent click action entirely
    e.preventDefault();
    e.stopPropagation();
    // give playful feedback
    noBtn.classList.add('blink');
    setTimeout(() => noBtn.classList.remove('blink'), 700);
    // move it again
    randomizeNoPosition();
  });

  // YES button starts everything (user gesture to allow audio)
  yesBtn.addEventListener('click', (e) => {
    // initial user gesture, now allowed to play audio
    startEpisode();
  });

  // Questionnaire submit -> final message
  finalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData(finalForm);
    const ep = form.get('ep') || '';
    const smile = form.get('smile') || '';
    const s1 = form.get('s1') || '';
    const s2 = form.get('s2') || '';
    const care = form.get('care') || '';

    // Final dialogues sequence
    const lines = [
      `Hey Devu...Devi..Devyaniii....Cutuuuu...Sexy and beautiful eyes  — I wanted to show this to you for so many dyas...just wanted to show you.`,
      `You had a lively, playful disposition that delighted in anything ridiculous.`,
      `In vain I have struggled. It will not do. My feelings will no longer be repressed. You must allow me to tell you how ardently I admire and love you.`,
      `A person who can write a long letter with ease, cannot write ill. - Jane Austen`,
      `I remember laughing with you at ${ep}.`,
      `You told me today: ${smile}. That made me smile too.`,
      `For the times I was not good and hurt you and for how many times you accepted it ...let go of me....: ${s1} / ${s2}.`,
      `One thing I promise: I'll keep ${care} close and never forget.`,
      ``,
      `I'm sorry for the times I hurt you. I regret the bad things I've done.........also I wish I had no heart, it aches so…`,
      `I hope you are doing fine.You are the gull, D, strong and wild, fond of the storm and the wind, flying far out to sea, and happy all alone`,
      `I jus wanted you tobe happy ...and Maybe someday we will meet and will become happy at last..`,
      `?`
    ];

    questionnaire.classList.add('hidden');
    finalMessage.classList.remove('hidden');
    finalText.innerHTML = lines.map(l => `<p>${escapeHtml(l)}</p>`).join('');
    // Optionally play a soft final sound if present
    const finalSound = new Audio('shesaid.mp3');
    finalSound.play().catch(()=>{});
  });

  // small helper to escape HTML in user input
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initialize: remove any pre-existing media "overlay" concept (we simply start with intro visible)
  function init() {
    // position the No button initially so it sits near the yes button
    setTimeout(() => {
      // try to position nicely
      const rect = yesBtn.getBoundingClientRect();
      noBtn.style.position = 'absolute';
      noBtn.style.left = `${rect.right + 20}px`;
      noBtn.style.top = `${rect.top}px`;
    }, 120);

    // Allow keyboard accessibility: Enter on Yes triggers start
    yesBtn.addEventListener('keyup', (ev) => {
      if (ev.key === 'Enter') startEpisode();
    });
  }

  init();

})();
