let animEnabled = true;

function toggleAnimations() {
  animEnabled = !animEnabled;
  document.body.classList.toggle('reduce-motion', !animEnabled);
  document.querySelector('.anim-toggle').classList.toggle('struck', !animEnabled);
}

const stacks = {
  leftTop: ['about', 'earthrise'],
  leftBottom: ['links', 'now', 'sunita'],
  right: ['colophon', 'curriculum', 'shrines', 'blog', 'splash']
};

const contentPositions = {
  'blog-content': { top: 0.191, left: 0.543, width: 0.19, height: 0.565 },
  'shrines-content': { top: 0.24, left: 0.55, width: 0.18, height: 0.50 },
  'curriculum-content': { top: 0.20, left: 0.54, width: 0.22, height: 0.54 },
  'colophon-content': { top: 0.12, left: 0.54, width: 0.22, height: 0.30 },
  'now-content': { top: 0.6, left: 0.225, width: 0.18, height: 0.185 },
  'about-content': { top: 0.20, left: 0.20, width: 0.10, height: 0.20 },
  'links-content': { top: 0.54, left: 0.27, width: 0.10, height: 0.20 }
};

const rightContentAreas = ['blog', 'shrines', 'curriculum', 'colophon'];
const leftTopContentAreas = ['about'];
const leftBottomContentAreas = ['now', 'links'];

let activeRight = 'splash';
let activeLeftTop = 'earthrise';
let activeLeftBottom = 'sunita';

// Sound FX
let sfxEnabled = true;

function toggleSFX() {
  sfxEnabled = !sfxEnabled;
  document.querySelector('.sfx-toggle').classList.toggle('struck', !sfxEnabled);
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

// Reveals & Resets
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

//    const elements = document.querySelectorAll(`[data-layer="${layerName}"]`);
//    elements.forEach(el => {
//      if (!animEnabled || layerName === 'colophon' || layerName === 'about') return;
//      el.classList.remove('flip-in');
//     void el.offsetWidth;
//      el.classList.add('flip-in');
//      el.addEventListener('animationend', () => {
//        el.classList.remove('flip-in');
//      }, { once: true });
//    });

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
      content.style.display = area === activeRight ? 'block' : 'none';
    }
  });

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
      content.style.display = area === activeLeftBottom ? 'block' : 'none';
    }
  });

  // Animate content block after display is set
//  const contentEl = document.querySelector('.' + layerName + '-content');
//  if (contentEl && animEnabled && layerName !== 'colophon') {
//    contentEl.classList.remove('flip-in');
//    void contentEl.offsetWidth;
//    contentEl.classList.add('flip-in');
//    contentEl.addEventListener('animationend', () => {
//      contentEl.classList.remove('flip-in');
//    }, { once: true });
//  }

  // Animate TV and express-yourself only when shrines is active
  const tv = document.querySelector('.tv');
  const expressYourself = document.querySelector('.express-yourself');
  
  if (tv) {
    if (activeRight === 'shrines') {
      tv.classList.add('animate');
    } else {
      tv.classList.remove('animate');
    }
  }
  
  if (expressYourself) {
    if (activeRight === 'shrines') {
      expressYourself.classList.add('animate');
    } else {
      expressYourself.classList.remove('animate');
    }
  }
}

function resetJournal() {
  playRandom(resetSounds);
  const wasAnimEnabled = animEnabled;
  animEnabled = false;
  revealLayer('earthrise');
  revealLayer('sunita');
  revealLayer('splash');
  animEnabled = wasAnimEnabled;
}

// Star navigation positions
const starPositions = {
  'blog-star':       { top: 0.13, left: 0.797 },
  'shrines-star':    { top: 0.18, left: 0.796 },
  'curriculum-star': { top: 0.22, left: 0.794 },
  'colophon-star':   { top: 0.27, left: 0.795 },
  'now-star':        { top: 0.32, left: 0.792 },
  'about-star':      { top: 0.37, left: 0.793 },
  'links-star':      { top: 0.42, left: 0.791 },
  'reset-star':      { top: 0.53, left: 0.795 }
};

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
  
// Position splash NSFW
const splashNSFW = document.querySelector('.splash-NSFW');
if (splashNSFW) {
  splashNSFW.style.top = (offsetY + renderedHeight * 0.25) + 'px';
  splashNSFW.style.left = (offsetX + renderedWidth * 0.56) + 'px';
  splashNSFW.style.width = (renderedWidth * 0.10) + 'px';
}

//Position content blocks
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

// Mobile navigation
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) {
    nav.classList.toggle('open');
  }
}

function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) {
    nav.classList.remove('open');
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
// Visualizer
let visualizerAudioContext = null;
let visualizerAnalyser = null;
let visualizerDataArray = null;
let visualizerDrawStarted = false;
let visualizerSourceNode = null;

function initVisualizer() {
  const canvas = document.getElementById('visualizer');
  if (!canvas) return false;

  // Keep canvas bitmap in sync with rendered size, or bars may not show.
  const displayWidth = Math.max(1, Math.floor(canvas.clientWidth || 150));
  const displayHeight = Math.max(1, Math.floor(canvas.clientHeight || 24));
  canvas.width = displayWidth;
  canvas.height = displayHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  const audioContext = visualizerAudioContext || new (window.AudioContext || window.webkitAudioContext)();
  visualizerAudioContext = audioContext;
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Get Amplitude's audio element
const audio = Amplitude.getAudio();
  if (!audio) {
    console.log('No audio element found');
    return false;
  }

  if (!visualizerAnalyser) {
    visualizerAnalyser = audioContext.createAnalyser();
    visualizerAnalyser.fftSize = 64;
  }

  if (!visualizerSourceNode) {
    try {
      visualizerSourceNode = audioContext.createMediaElementSource(audio);
      visualizerSourceNode.connect(visualizerAnalyser);
      visualizerAnalyser.connect(audioContext.destination);
    } catch (err) {
      console.log('Visualizer source error:', err);
      return false;
    }
  }

  const bufferLength = visualizerAnalyser.frequencyBinCount;
  if (!visualizerDataArray || visualizerDataArray.length !== bufferLength) {
    visualizerDataArray = new Uint8Array(bufferLength);
  }
  
  function draw() {
    requestAnimationFrame(draw);
    visualizerAnalyser.getByteFrequencyData(visualizerDataArray);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / bufferLength;
    let x = 0;

for (let i = 0; i < bufferLength; i++) {
  const barHeight = (visualizerDataArray[i] / 255) * canvas.height;
  
  const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
  gradient.addColorStop(0, '#01cdfe');  // cyan at bottom
  gradient.addColorStop(1, '#fc6a28');  // orange at top
  
  ctx.fillStyle = gradient;
  ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
  x += barWidth;
}
  }
  
  if (!visualizerDrawStarted) {
    visualizerDrawStarted = true;
    draw();
  }
  return true;
}

window.addEventListener('DOMContentLoaded', () => {
  positionElements();
  
  document.querySelector('[data-layer="splash"]').style.display = 'block';
  document.querySelector('[data-layer="earthrise"]').style.display = 'block';
  document.querySelector('[data-layer="sunita"]').style.display = 'block';

  
  // Initialize Amplitude after page loads
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

// Initialize visualizer on first play
let visualizerInitialized = false;

function initVisualizerOnce() {
  if (visualizerInitialized) return;
  visualizerInitialized = initVisualizer();
}

function initVisualizerWithRetry(attempt = 0) {
  if (visualizerInitialized) return;

  initVisualizerOnce();
  if (visualizerInitialized) return;

  if (attempt < 8) {
    setTimeout(() => initVisualizerWithRetry(attempt + 1), 120);
  }
}

// Hook into Amplitude's play event
document.addEventListener('click', function(e) {
  if (e.target.closest('.player-btn')) {
    // If no active song is selected yet, force first track on first play click.
    const playPauseBtn = e.target.closest('.amplitude-play-pause');
    if (playPauseBtn) {
      const meta = Amplitude.getActiveSongMetadata();
      if (!meta || !meta.url) {
        Amplitude.playSongAtIndex(0);
      }
    }
    if (!visualizerAudioContext) {
      visualizerAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (visualizerAudioContext.state === 'suspended') {
      visualizerAudioContext.resume();
    }
    initVisualizerWithRetry();
  }
});

window.addEventListener('resize', positionElements);
