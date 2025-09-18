// js/components/Card.js
// Card — คลิกเปิด Modal, hover แล้วเล่นวิดีโอ (ควบคุมด้วย class .playing)
function Card(item) {
  const tags = (item.tags || []).map(t => `<span class="tag">#${t}</span>`).join('');
  const payload = JSON.stringify(item).replace(/"/g, '&quot;');

  let media = '';
  if (item.video) {
    media = `
      <div class="card-media">
        <img src="${item.image}" alt="${item.name}" class="static-img"/>
        <video src="${item.video}" muted loop playsinline preload="none" class="hover-video"></video>
      </div>
    `;
  } else if (item.gif) {
    media = `
      <div class="card-media">
        <img src="${item.image}" alt="${item.name}"
             data-static="${item.image}"
             data-gif="${item.gif}"
             class="static-img"/>
      </div>
    `;
  } else {
    media = `
      <div class="card-media">
        <img src="${item.image}" alt="${item.name}" class="static-img"/>
      </div>
    `;
  }

  return `
    <div class="card tilt"
         data-item="${payload}"
         onclick="CardModal.showFromAttr(this)"
         onmouseenter="CardHover.enter(this)"
         onmouseleave="CardHover.leave(this)">
      ${media}
      <h4>${item.name}</h4>
      <p class="muted">${item.preview || item.title || ''}</p>
      <div>${tags}</div>
    </div>
  `;
}

// ====== Hover helpers (ใช้คลาส .playing แทนการสลับ display) ======
window.CardHover = {
  enter(cardEl) {
    const vid = cardEl.querySelector('video.hover-video');
    if (vid) {
      if (vid.readyState === 0) vid.load();
      vid.currentTime = 0;
      vid.play().catch(()=>{});
      cardEl.classList.add('playing');   // ให้ CSS จัด opacity
    } else {
      const img = cardEl.querySelector('img.static-img');
      if (img && img.dataset.gif) img.src = img.dataset.gif;
    }
  },
  leave(cardEl) {
    const vid = cardEl.querySelector('video.hover-video');
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      cardEl.classList.remove('playing');
    } else {
      const img = cardEl.querySelector('img.static-img');
      if (img && img.dataset.static) img.src = img.dataset.static;
    }
  }
};
