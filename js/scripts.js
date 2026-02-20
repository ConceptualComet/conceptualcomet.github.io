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
  
  // Update clip positions
  updateClips(layerName);
}

function updateClips(layerName) {
  const clipRight = document.getElementById('clip-right');
  const clipLeft = document.getElementById('clip-left');
  
  if (['blog', 'shrines', 'curriculum', 'colophon'].includes(layerName)) {
    clipRight.dataset.selected = layerName;
  }
  if (['now', 'about', 'links'].includes(layerName)) {
    clipLeft.dataset.selected = layerName;
  }
}

function resetJournal() {
  // Show all top layers (default state) except splash
  revealLayer('earthrise');
  revealLayer('sunita');
  revealLayer('blog');
}

// function passAgeGate() {
//   sessionStorage.setItem('ageVerified', 'true');
//   revealLayer('blog');
// }

function positionNav() {
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
  
  // Position right nav
  const navRight = document.querySelector('.folder-nav-right');
  if (navRight) {
    navRight.style.top = (offsetY + renderedHeight * 0.106) + 'px';
    navRight.style.right = (vw - offsetX - renderedWidth + renderedWidth * 0.184) + 'px';
    navRight.style.width = (renderedWidth * 0.018) + 'px';
    navRight.style.height = (renderedHeight * 0.504) + 'px';
  }
  
  // Position left nav
  const navLeft = document.querySelector('.folder-nav-left');
  if (navLeft) {
    navLeft.style.top = (offsetY + renderedHeight * 0.856) + 'px';
    navLeft.style.left = (offsetX + renderedWidth * 0.142) + 'px';
    navLeft.style.width = (renderedWidth * 0.018) + 'px';
    navLeft.style.height = (renderedHeight * 0.236) + 'px';
  }
}

// On page load

window.addEventListener('DOMContentLoaded', positionNav);
window.addEventListener('resize', positionNav);


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
