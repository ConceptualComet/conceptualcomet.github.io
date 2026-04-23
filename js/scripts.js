// Page structure & initial positions

const stacks = {
  leftTop: ['about', 'earthrise'],
  leftBottom: ['contact', 'now', 'sunita'],
  right: ['colophon', 'curriculum', 'workshop', 'blog', 'splash']
};

const contentPositions = {
  'blog-content': { top: 0.191, left: 0.543, width: 0.19, height: 0.565 },
  'workshop-content': { top: 0.24, left: 0.55, width: 0.18, height: 0.5 },
  'curriculum-content': { top: 0.33, left: 0.54, width: 0.22, height: 0.4 },
  'colophon-content': { top: 0.12, left: 0.54, width: 0.22, height: 0.3 },
  'colophon-definition-content': { top: 0.54, left: 0.54, width: 0.10, height: 0.3 },
  'now-content': { top: 0.6, left: 0.225, width: 0.18, height: 0.185 },
  'about-content': { top: 0.19, left: 0.20, width: 0.10, height: 0.21 },
  'contact-content': { top: 0.54, left: 0.27, width: 0.10, height: 0.2 }
};

const rightContentAreas = ['blog', 'workshop', 'curriculum', 'colophon'];
const leftTopContentAreas = ['about'];
const leftBottomContentAreas = ['now', 'contact'];

let activeRight = 'splash';
let activeLeftTop = 'earthrise';
let activeLeftBottom = 'sunita';

const starPositions = {
  'blog-star':       { top: 0.13, left: 0.797 },
  'workshop-star':    { top: 0.18, left: 0.796 },
  'curriculum-star': { top: 0.22, left: 0.794 },
  'now-star':        { top: 0.27, left: 0.795 },
  'about-star':      { top: 0.32, left: 0.792 },
  'contact-star':      { top: 0.37, left: 0.793 },
  'colophon-star':   { top: 0.42, left: 0.791 },
  'reset-star':      { top: 0.53, left: 0.795 }
};

// Visual FX

let animEnabled = true;

function toggleAnimations() {
  animEnabled = !animEnabled;
  document.body.classList.toggle('reduce-motion', !animEnabled);
  const btn = document.querySelector('.anim-toggle');
  btn.classList.toggle('struck', !animEnabled);
  btn.setAttribute('aria-pressed', String(animEnabled));
}

// Sound FX
let sfxEnabled = true;

function toggleSFX() {
  sfxEnabled = !sfxEnabled;
  const btn = document.querySelector('.sfx-toggle');
  btn.classList.toggle('struck', !sfxEnabled);
  btn.setAttribute('aria-pressed', String(sfxEnabled));
}

const revealSounds = [
  new Audio('/audio/151220__owlstorm__page-turn-1.wav'),
  new Audio('/audio/531896__bepis__pickup3.wav'),
  new Audio('/audio/531898__bepis__pickup1.wav'),
  new Audio('/audio/531899__bepis__pickup7.wav'),
  new Audio('/audio/531908__bepis__wave4.wav'),
  new Audio('/audio/651514__1bob__paper.wav'),
  new Audio('/audio/676674__cameronpride__page-flip.wav'),
  new Audio('/audio/684078__geoff-bremner-audio__paper-handling-2.wav'),
  new Audio('/audio/82378__gynation__paper-flip-2.wav'),
  new Audio('/audio/828802__onlyoz__paper-page-flip.wav'),
  new Audio('/audio/842183__aardsreal__page-turn-free.wav'),
];
revealSounds.forEach(s => s.volume = 0.3);

const resetSounds = [
  new Audio('/audio/416179__inspectorj__book-flipping-through-pages-a.wav'),
  new Audio('/audio/63318__flag2__page-turn-please-turn-over-pto-paper_turn_over.wav'),
  new Audio('/audio/531892__bepis__crumple9.wav')
];
resetSounds.forEach(s => s.volume = 0.3);

function playRandom(sounds) {
  if (!sfxEnabled) return;
  const sound = sounds[Math.floor(Math.random() * sounds.length)];
  sound.currentTime = 0;
  sound.play();
}

// Reveal Layer Function
function revealLayer(layerName) {
  playRandom(revealSounds);
  for (const [stackName, layers] of Object.entries(stacks)) {
    const layerIndex = layers.indexOf(layerName);
    if (layerIndex === -1) continue;
    
    layers.forEach((layer, index) => {
      const elements = document.querySelectorAll(`[data-layer="${layer}"]`);
      elements.forEach(el => {
        el.style.display = index <= layerIndex ? 'block' : 'none';
      });
    });


    // Track which layer is active per stack
    if (stackName === 'right') {
      activeRight = layerName;
    } else if (stackName === 'leftTop') {
      activeLeftTop = layerName;
    } else if (stackName === 'leftBottom') {
      activeLeftBottom = layerName;
    }
  }

  // Show content for active layer on right side
rightContentAreas.forEach(area => {
  const content = document.querySelector('.' + area + '-content');
  if (content) {
    if (area === activeRight) {
      content.style.display = area === 'curriculum' ? 'flex' : 'block';
    } else {
      content.style.display = 'none';
    }
  }
});

  const colophonDef = document.querySelector('.colophon-definition-content');
    if (colophonDef) {
    colophonDef.style.display = activeRight === 'colophon' ? 'block' : 'none';
    }

  // Show content for active layer on left top
  leftTopContentAreas.forEach(area => {
    const content = document.querySelector('.' + area + '-content');
    if (content) {
      content.style.display = area === activeLeftTop ? 'block' : 'none';
    }
  });

  // Show content for active layer on left bottom
  leftBottomContentAreas.forEach(area => {
    const content = document.querySelector('.' + area + '-content');
    if (content) {
      content.style.display = area === activeLeftBottom ? (area === 'contact' ? 'flex' : 'block') : 'none';
    }
  });

  // Animate bookpress and express-yourself only when workshop is active
  const bookpress = document.querySelector('.bookpress');
  const expressYourself = document.querySelector('.express-yourself');
  
  if (bookpress) {
    if (activeRight === 'workshop') {
      bookpress.classList.add('animate');
    } else {
      bookpress.classList.remove('animate');
    }
  }
  
  if (expressYourself) {
    if (activeRight === 'workshop') {
      expressYourself.classList.add('animate');
    } else {
      expressYourself.classList.remove('animate');
    }
  }
}

// Reset journal function
function resetJournal() {
  playRandom(resetSounds);
  const wasAnimEnabled = animEnabled;
  animEnabled = false;
  revealLayer('earthrise');
  revealLayer('sunita');
  revealLayer('splash');
  animEnabled = wasAnimEnabled;
}


// Position elements function
function positionElements() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  
  const folderWidth = 1366;
  const folderHeight = 768;
  const folderRatio = folderWidth / folderHeight;
  const viewportRatio = vw / vh;
  
  let renderedWidth, renderedHeight, offsetX, offsetY;
  
  if (viewportRatio > folderRatio) {
    renderedHeight = vh;
    renderedWidth = vh * folderRatio;
    offsetX = (vw - renderedWidth) / 2;
    offsetY = 0;
  } else {
    renderedWidth = vw;
    renderedHeight = vw / folderRatio;
    offsetX = 0;
    offsetY = (vh - renderedHeight) / 2;
  }

// Position content blocks
for (const [className, pos] of Object.entries(contentPositions)) {
  const el = document.querySelector('.' + className);
  if (el) {
    el.style.top = (offsetY + renderedHeight * pos.top) + 'px';
    el.style.left = (offsetX + renderedWidth * pos.left) + 'px';
    el.style.width = (renderedWidth * pos.width) + 'px';
    el.style.height = (renderedHeight * pos.height) + 'px';
  }
}

 // Position star navigation
  for (const [className, pos] of Object.entries(starPositions)) {
    const el = document.querySelector('.' + className);
    if (el) {
      el.style.top = (offsetY + renderedHeight * pos.top) + 'px';
      el.style.left = (offsetX + renderedWidth * pos.left) + 'px';
    }
  }

 // Position music player
   const musicPlayer = document.querySelector('.music-player');
     if (musicPlayer) {
      musicPlayer.style.top = (offsetY + renderedHeight * 0.845) + 'px';
      musicPlayer.style.left = (offsetX + renderedWidth * 0.145) + 'px';
     }
}

// Mobile navigation focus trap
function getFocusable(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  ));
}

var mobileNavTrapHandler = function(e) {
  var nav = document.getElementById('mobile-nav');
  if (!nav) return;
  var focusable = getFocusable(nav);
  var first = focusable[0];
  var last = focusable[focusable.length - 1];
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  if (e.key === 'Escape') {
    closeMobileNav();
  }
};

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.mobile-menu-btn');
  if (!nav) return;
  const isOpening = !nav.classList.contains('open');
  nav.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpening));
  if (isOpening) {
    nav.addEventListener('keydown', mobileNavTrapHandler);
    const focusable = getFocusable(nav);
    if (focusable.length) focusable[0].focus();
  } else {
    nav.removeEventListener('keydown', mobileNavTrapHandler);
    if (btn) btn.focus();
  }
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.mobile-menu-btn');
  if (nav) {
    nav.classList.remove('open');
    nav.removeEventListener('keydown', mobileNavTrapHandler);
  }
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  }
}

function scrollToSection(className) {
  const section = document.querySelector('.' + className);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
  closeMobileNav();
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.mobile-menu-btn');
  
  if (!nav || !nav.classList.contains('open')) return;
  
  if (!nav.contains(event.target) && event.target !== btn && !btn.contains(event.target)) {
    closeMobileNav();
  }
});

// Music Play/Pause
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.amplitude-play-pause');
  if (!btn) return;

   // On first play, pick a random song
  const meta = Amplitude.getActiveSongMetadata();
  if (!meta || !meta.url) {
    const songs = Amplitude.getSongs();
    const randomIndex = Math.floor(Math.random() * songs.length);
    Amplitude.playSongAtIndex(randomIndex);
  }
  
  // Small delay to let Amplitude update its state
  setTimeout(() => {
    const audio = Amplitude.getAudio();
    btn.textContent = audio && !audio.paused ? '♫ PLAYING...' : '♫ PAUSED';
  }, 50);
});


// DOM event listener to load everything

window.addEventListener('DOMContentLoaded', () => {

// Email obfuscation
  const user = 'comet';
  const domain = 'conceptualcomet.space';
  const link = document.getElementById('contact-link');
  if (link) {
    link.addEventListener('click', function () {
      window.location.href = 'mai' + 'lto:' + user + '@' + domain;
    });
  }
  
// Load elements with splash on top
  positionElements();
  document.querySelector('[data-layer="splash"]').style.display = 'block';
  document.querySelector('[data-layer="earthrise"]').style.display = 'block';
  document.querySelector('[data-layer="sunita"]').style.display = 'block';
  document.querySelector('.contact-content').style.display = 'none';
  document.querySelector('.colophon-definition-content').style.display = 'none';

// Initialize Amplitude
Amplitude.init({
  continue_next: true,
  shuffle_on: true,
  songs: [
    {
      name: "Beauty Flow",
      artist: "Kevin MacLeod",
      url: "/audio/Beauty-Flow.mp3"
    },
    {
      name: "Bleeping Demo",
      artist: "Kevin MacLeod",
      url: "/audio/Bleeping-Demo.mp3"
    },
    {
      name: "Blippy Trance",
      artist: "Kevin MacLeod",
      url: "/audio/Blippy-Trance.mp3"
    },
    {
      name: "Cipher",
      artist: "Kevin MacLeod",
      url: "/audio/Cipher2.mp3"
    },
    {
      name: "Cloud Dancer",
      artist: "Kevin MacLeod",
      url: "/audio/Cloud-Dancer.mp3"
    },
    {
      name: "Delightful D",
      artist: "Kevin MacLeod",
      url: "/audio/Delightful-D.mp3"
    },
    {
      name: "Equatorial Complex",
      artist: "Kevin MacLeod",
      url: "/audio/Equatorial-Complex.mp3"
    },
    {
      name: "Killing Time",
      artist: "Kevin MacLeod",
      url: "/audio/Killing-Time.mp3"
    },
    {
      name: "Laser Groove",
      artist: "Kevin MacLeod",
      url: "/audio/Laser-Groove.mp3"
    },
    {
      name: "Limit 70",
      artist: "Kevin MacLeod",
      url: "/audio/Limit-70.mp3"
    },
    {
      name: "Newer Wave",
      artist: "Kevin MacLeod",
      url: "/audio/Newer-Wave.mp3"
    },
    {
      name: "Show Your Moves",
      artist: "Kevin MacLeod",
      url: "/audio/Show-Your-Moves.mp3"
    },
    {
      name: "Voxel Revolution",
      artist: "Kevin MacLeod",
      url: "/audio/Voxel-Revolution.mp3"
    }
  ],
  callbacks: {
    song_change: function() {
      const meta = Amplitude.getActiveSongMetadata();
      const btn = document.querySelector('.amplitude-play-pause');
      if (btn) btn.textContent = '♫ PLAYING...';
    }
  }
});


// Loop the full playlist by wrapping last track -> first track.
const amplitudeAudio = Amplitude.getAudio();
if (amplitudeAudio) {
  amplitudeAudio.addEventListener('ended', () => {
    const songs = Amplitude.getSongs();
    if (!songs || !songs.length) return;
    Amplitude.playSongAtIndex(0);
  });
}

});


// Event listener to reposition elements if window is resized
window.addEventListener('resize', positionElements);
