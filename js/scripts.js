const stacks = {
  leftTop: ['about', 'earthrise'],
  leftBottom: ['links', 'now', 'sunita'],
  right: ['colophon', 'curriculum', 'shrines', 'blog', 'splash']
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

  // Show blog-content only when blog is the top layer
  const blogContent = document.querySelector('.blog-content');
  if (blogContent) {
    blogContent.style.display = layerName === 'blog' ? 'block' : 'none';
  }
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

// Position blog content
const blogContent = document.querySelector('.blog-content');
if (blogContent) {
  blogContent.style.top = (offsetY + renderedHeight * 0.191) + 'px';
  blogContent.style.left = (offsetX + renderedWidth * 0.543) + 'px';
  blogContent.style.width = (renderedWidth * 0.217) + 'px';
  blogContent.style.height = (renderedHeight * 0.569) + 'px';
}

// Position binder clip nav
const binderClip = document.querySelector('.binder-clip-nav');
if (binderClip) {
  binderClip.style.top = (offsetY + renderedHeight * 0.106) + 'px';
  binderClip.style.left = (offsetX + renderedWidth * 0.798) + 'px';
  binderClip.style.width = (renderedWidth * 0.092) + 'px';
  binderClip.style.height = 'auto';
}
  
  // If the popup is already open, keep it anchored correctly.
  const navPopup = document.getElementById('nav-popup');
  if (navPopup && navPopup.classList.contains('open')) {
    requestAnimationFrame(positionNavPopup);
  }
}

// Navigation Popup Functions
function positionNavPopup() {
  const binderClip = document.querySelector('.binder-clip-nav');
  const navPopup = document.getElementById('nav-popup');
  if (!binderClip || !navPopup) return;

  // The popup is `display: block` only when `.open` is set,
  // so this should run after opening (or it will measure 0x0).
  const clipRect = binderClip.getBoundingClientRect();
  const popupRect = navPopup.getBoundingClientRect();

  const margin = 8;
  const gap = 6;

  // Adjustment offsets (tweak these)
  const adjustLeft = 100;  // negative moves left, positive moves right
  const adjustTop = 100;    // negative moves up, positive moves down

  // Try to place it to the bottom of the clip (old Mac-ish dropdown).
  let left = clipRect.bottom + gap + adjustTop;
  let top = clipRect.top + adjustLeft;

 // If it would overflow to the right, shift it left
  if (left + popupRect.width > window.innerWidth - margin) {
    left = window.innerWidth - popupRect.width - margin;
  }

  // If it would overflow the bottom, flip it above the clip
  if (top + popupRect.height > window.innerHeight - margin) {
    top = clipRect.top - gap - popupRect.height;
  }

  navPopup.style.left = left + 'px';
  navPopup.style.top = top + 'px';
}

function openPopup() {
  const navPopup = document.getElementById('nav-popup');
  if (!navPopup) return;
  navPopup.classList.add('open');
  // Wait one frame so the element is measurable.
  requestAnimationFrame(positionNavPopup);
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
