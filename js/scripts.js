const stacks = {
  leftTop: ['about', 'earthrise'],
  leftBottom: ['links', 'now', 'astronaut'],
  right: ['colophon', 'curriculum', 'shrines', 'blog', 'splash']
};

function revealLayer(layerName) {
  // Find which stack contains this layer and show/hide appropriately
  for (const [stackName, layers] of Object.entries(stacks)) {
    const layerIndex = layers.indexOf(layerName);
    if (layerIndex === -1) continue;
    
    // Show this layer and everything below it, hide everything above
    layers.forEach((layer, index) => {
      const el = document.querySelector(`[data-layer="${layer}"]`);
      if (el) {
        el.style.display = index <= layerIndex ? 'block' : 'none';
      }
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
  revealLayer('astronaut');
  revealLayer('blog');
}

// function passAgeGate() {
//   sessionStorage.setItem('ageVerified', 'true');
//   revealLayer('blog');
// }

// On page load
window.addEventListener('DOMContentLoaded', () => {
//   if (sessionStorage.getItem('ageVerified')) {
//     resetJournal();
//   } else {
//     // Show splash on top of everything
   document.querySelector('[data-layer="splash"]').style.display = 'block';
    document.querySelector('[data-layer="earthrise"]').style.display = 'block';
    document.querySelector('[data-layer="astronaut"]').style.display = 'block';
//   }
});
