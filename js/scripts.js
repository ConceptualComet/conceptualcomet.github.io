const stacks = {
  leftTop: ['about', 'earthrise'],
  leftBottom: ['links', 'now', 'sunita'],
  right: ['colophon', 'curriculum', 'shrines', 'blog', 'splash']
};

const contentPositions = {
  'blog-content': { top: 0.191, left: 0.543, width: 0.217, height: 0.569 },
  'shrines-content': { top: 0.191, left: 0.543, width: 0.20, height: 0.50 },
  'curriculum-content': { top: 0.20, left: 0.54, width: 0.22, height: 0.55 },
  'colophon-content': { top: 0.30, left: 0.55, width: 0.25, height: 0.45 },
  'now-content': { top: 0.15, left: 0.08, width: 0.25, height: 0.50 },
  'about-content': { top: 0.12, left: 0.10, width: 0.22, height: 0.45 },
  'links-content': { top: 0.55, left: 0.08, width: 0.20, height: 0.30 }
};

function revealLayer(layerName) {
  // Find which stack contains this layer and show/hide appropriately
  for (const [stackName, layers] of Object.entries(stacks)) {
    const layerIndex = layers.indexOf(layerName);
    if (layerIndex === -1) continue;
    
    // Show this layer and everything below it, hide everything above
    layers.forEach((layer, index) => {
      const elements = document.querySelectorAll(`[data-layer="${layer}"]`);
      elements.forEach(el => {
        el.style.display = index <= layerIndex ? 'block' : 'none';
      });
    });
  }

 // Show only the matching content area
  const contentAreas = ['blog', 'shrines', 'curriculum', 'colophon', 'now', 'about', 'links'];
  contentAreas.forEach(area => {
    const content = document.querySelector('.' + area + '-content');
    if (content) {
      content.style.display = area === layerName ? 'block' : 'none';
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
const binderClip = document.querySelector('.binder-clip-nav');
if (binderClip) {
  binderClip.style.top = (offsetY + renderedHeight * 0.106) + 'px';
  binderClip.style.left = (offsetX + renderedWidth * 0.798) + 'px';
  binderClip.style.width = (renderedWidth * 0.092) + 'px';
  binderClip.style.height = 'auto';
}
}

//Control pop-up nav menu
function openPopup(event) {
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

// On page load

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
