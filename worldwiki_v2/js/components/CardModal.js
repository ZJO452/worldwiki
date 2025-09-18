// CardModal.js — ใช้ได้กับทั้ง Characters และ Creatures
window.CardModal = (function(){
  let host, escHandler;

  function tpl(item){
    const tags = (item.tags||[]).map(t=>`<span class="tag">#${t}</span>`).join('');
    const meta = [
      item.title && `<p class="muted">${item.title}</p>`,
      (item.race || item.type) && `<p><b>Race/Type:</b> ${item.race || item.type}</p>`,
      item.role && `<p><b>Role:</b> ${item.role}</p>`,
      item.affiliation && `<p><b>Affiliation:</b> ${item.affiliation}</p>`,
      item.power && `<p><b>Power/Ability:</b> ${item.power}</p>`,
      item.weapons && `<p><b>Weapons:</b> ${item.weapons}</p>`
    ].filter(Boolean).join('');

    const gallery = (item.gallery||[])
      .map(src=>`<img src="${src}" class="modal-thumb" onclick="Lightbox.show('${src}')">`)
      .join('');

    return `
      <div class="modal-backdrop" onclick="CardModal.hide()">
        <div class="modal-card" onclick="event.stopPropagation()">
          <div class="modal-media">
            <img src="${item.image || ''}" alt="${item.name || ''}">
          </div>
          <h2>${item.name || ''}</h2>
          ${meta}
          ${item.lore ? `<p class="mt">${item.lore}</p>` : (item.preview?`<p class="mt">${item.preview}</p>`:'')}
          ${tags ? `<div class="mt">${tags}</div>` : ''}
          ${gallery ? `<div class="modal-gallery mt">${gallery}</div>` : ''}
          <div class="mt right"><button class="btn" onclick="CardModal.hide()">ปิด</button></div>
        </div>
      </div>
    `;
  }

  function show(item){
    hide();
    host = document.createElement('div');
    host.innerHTML = tpl(item);
    document.body.appendChild(host);
    escHandler = (e)=>{ if(e.key==='Escape') hide(); };
    window.addEventListener('keydown', escHandler);
  }

  function showFromAttr(cardEl){
    try {
      const raw = cardEl.getAttribute('data-item');
      const obj = JSON.parse(raw.replace(/&quot;/g,'"'));
      show(obj);
    } catch(e){ /* ignore */ }
  }

  function hide(){
    if(host){ host.remove(); host=null; }
    if(escHandler){ window.removeEventListener('keydown', escHandler); escHandler=null; }
  }

  return { show, hide, showFromAttr };
})();
