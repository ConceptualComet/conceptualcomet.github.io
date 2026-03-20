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
}


function resetJournal() {
  // Show all top layers (default state)
  revealLayer('earthrise');
  revealLayer('sunita');
  revealLayer('splash');
}

// function passAgeGate() {
//   sessionStorage.setItem('ageVerified', 'true');
//   revealLayer('blog');
// }

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
  
// Position splash enter button
const splashEnter = document.querySelector('.splash-enter');
if (splashEnter) {
  splashEnter.style.top = (offsetY + renderedHeight * 0.25) + 'px';
  splashEnter.style.left = (offsetX + renderedWidth * 0.56) + 'px';
  splashEnter.style.width = (renderedWidth * 0.10) + 'px';
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

// Position binder clip
const binderWrapper = document.querySelector('.binder-clip-wrapper');
if (binderWrapper) {
  binderWrapper.style.top = (offsetY + renderedHeight * 0.106) + 'px';
  binderWrapper.style.left = (offsetX + renderedWidth * 0.798) + 'px';
  binderWrapper.style.width = (renderedWidth * 0.092) + 'px';
}
}

//Control pop-up nav menu
function openPopup(event) {
  event.stopPropagation(); // blocks click from reaching event listener and immediately closing popup
  
  const navPopup = document.getElementById('nav-popup');
  if (!navPopup) return;
  
  const margin = 8;
  
  // Position at cursor
  let left = event.clientX;
  let top = event.clientY;
  
  navPopup.classList.add('open');
  
  // Wait a frame so we can measure the popup
  requestAnimationFrame(() => {
    const popupRect = navPopup.getBoundingClientRect();
    
    // If it would overflow right, shift left
    if (left + popupRect.width > window.innerWidth - margin) {
      left = window.innerWidth - popupRect.width - margin;
    }
    
    // If it would overflow bottom, shift up
    if (top + popupRect.height > window.innerHeight - margin) {
      top = window.innerHeight - popupRect.height - margin;
    }
    
    navPopup.style.left = left + 'px';
    navPopup.style.top = top + 'px';
  });
}

function closePopup() {
  const navPopup = document.getElementById('nav-popup');
  if (!navPopup) return;
  navPopup.classList.remove('open');
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

// Cursor sparkle trail
document.addEventListener('mousemove', function(e) {
  // Create sparkle
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = (e.clientX - 4) + 'px';
  sparkle.style.top = (e.clientY - 4) + 'px';
  
  const container = document.getElementById('sparkle-container');
  if (container) {
    container.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
      sparkle.remove();
    }, 800);
  }
  
  // Check proximity to binder clip
  const clipWrapper = document.querySelector('.binder-clip-wrapper');
  if (clipWrapper) {
    const rect = clipWrapper.getBoundingClientRect();
    const clipCenterX = rect.left + rect.width / 2;
    const clipCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - clipCenterX, 2) + 
      Math.pow(e.clientY - clipCenterY, 2)
    );
    
    // If cursor is within 100px of clip center
    if (distance < 100) {
      clipWrapper.querySelector('.binder-clip-nav').classList.add('cursor-near');
    } else {
      clipWrapper.querySelector('.binder-clip-nav').classList.remove('cursor-near');
    }
  }
});

window.addEventListener('DOMContentLoaded', positionElements);
window.addEventListener('resize', positionElements);
window.addEventListener('DOMContentLoaded', () => {
//   if (sessionStorage.getItem('ageVerified')) {
//     resetJournal();
//   } else {
//     // Show splash on top of everything
   document.querySelector('[data-layer="splash"]').style.display = 'block';
    document.querySelector('[data-layer="earthrise"]').style.display = 'block';
    document.querySelector('[data-layer="sunita"]').style.display = 'block';
//   }
});
