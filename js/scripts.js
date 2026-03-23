const stacks = {
  leftTop: ['about', 'earthrise'],
  leftBottom: ['links', 'now', 'sunita'],
  right: ['colophon', 'curriculum', 'shrines', 'blog', 'splash']
};

const contentPositions = {
  'blog-content': { top: 0.191, left: 0.543, width: 0.19, height: 0.565 },
  'shrines-content': { top: 0.24, left: 0.55, width: 0.18, height: 0.50 },
  'curriculum-content': { top: 0.20, left: 0.54, width: 0.22, height: 0.54 },
  'colophon-content': { top: 0.12, left: 0.54, width: 0.22, height: 0.69 },
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

function revealLayer(layerName) {
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
  // Show all top layers (default state)
  revealLayer('earthrise');
  revealLayer('sunita');
  revealLayer('splash');
}

// Star navigation positions
// Adjust these ratios based on where you wrote the words on your folder
const starPositions = {
  'blog-star':       { top: 0.15, left: 0.82 },
  'shrines-star':    { top: 0.25, left: 0.82 },
  'curriculum-star': { top: 0.35, left: 0.82 },
  'colophon-star':   { top: 0.45, left: 0.82 },
  'now-star':        { top: 0.55, left: 0.15 },
  'about-star':      { top: 0.65, left: 0.15 },
  'links-star':      { top: 0.75, left: 0.15 }
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



// Toggle playlist visibility
function togglePlaylist() {
  const playlist = document.getElementById('player-playlist');
  playlist.classList.toggle('open');
}

// Mute toggle
let isMuted = false;
function toggleMute() {
  isMuted = !isMuted;
  Amplitude.setVolume(isMuted ? 0 : 80);
  document.querySelector('.mute-btn').textContent = isMuted ? '🔇' : '🔊';
}

// Basic visualizer using Web Audio API
function initVisualizer() {
  const canvas = document.getElementById('visualizer');
  const ctx = canvas.getContext('2d');
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 64;
  
  const audio = document.querySelector('audio');
  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;
      
      // Vaporwave gradient colors
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, '#01cdfe');
      gradient.addColorStop(0.5, '#ff71ce');
      gradient.addColorStop(1, '#05ffa1');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
      x += barWidth;
    }
  }
  
  draw();
}

window.addEventListener('DOMContentLoaded', () => {
  positionElements();
  
  document.querySelector('[data-layer="splash"]').style.display = 'block';
  document.querySelector('[data-layer="earthrise"]').style.display = 'block';
  document.querySelector('[data-layer="sunita"]').style.display = 'block';
  
  // Initialize Amplitude after page loads
  Amplitude.init({
    songs: [
      {
        name: "Song One",
        artist: "Artist Name",
        url: "/audio/song1.mp3"
      },
      {
        name: "Song Two",
        artist: "Artist Name",
        url: "/audio/song2.mp3"
      },
      {
        name: "Song Three",
        artist: "Artist Name",
        url: "/audio/song3.mp3"
      }
    ],
    callbacks: {
      song_change: function() {
        const meta = Amplitude.getActiveSongMetadata();
        document.querySelector('.now-playing').textContent = 
          meta.name + ' - ' + meta.artist;
      }
    }
  });
});

// Initialize visualizer on first play
let visualizerInitialized = false;

function initVisualizerOnce() {
  if (visualizerInitialized) return;
  visualizerInitialized = true;
  initVisualizer();
}

// Hook into Amplitude's play event
document.addEventListener('click', function(e) {
  if (e.target.closest('.player-btn')) {
    initVisualizerOnce();
  }
});

window.addEventListener('resize', positionElements);

// Show splash on top of everything
window.addEventListener('DOMContentLoaded', () => {
   document.querySelector('[data-layer="splash"]').style.display = 'block';
    document.querySelector('[data-layer="earthrise"]').style.display = 'block';
    document.querySelector('[data-layer="sunita"]').style.display = 'block';
});
