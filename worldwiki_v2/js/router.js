
window.Router = (function(){
  const routes = {
    '': 'home',
    '#/': 'home',
    '#/home': 'home',
    '#/characters':'characters',
    '#/creatures':'creatures',
    '#/factions':'factions',
    '#/world-maps':'world-maps',
    '#/lore-history':'lore-history',
    '#/magic-tech':'magic-tech',
    '#/weapons':'weapons',
    '#/culture':'culture',
    '#/timeline':'timeline',
    '#/gallery':'gallery',
    '#/admin':'admin'
  };
  async function render(route){
    const role = Auth.role();
    const key = routes[route] || 'home';
    const restricted = {'admin':'admin'};
    if(restricted[key] && role !== restricted[key]){
      document.getElementById('app').innerHTML = `<div class="card"><h3>🔒 Restricted</h3><p>หน้านี้เปิดให้เฉพาะ <b>${restricted[key].toUpperCase()}</b> เท่านั้น</p></div>`;
      return;
    }
    const html = await fetch('pages/'+key+'.html').then(r=>r.text());
    document.getElementById('app').innerHTML = html;
    document.querySelectorAll('[data-require-role]').forEach(el=>{
      const req = el.getAttribute('data-require-role');
      if(Auth.role() !== req){ el.setAttribute('data-hidden',''); }
      else { el.removeAttribute('data-hidden'); }
    });
    const map = {
      'home': RenderHome,
      'characters': RenderCharacters,
      'creatures': RenderCreatures,
      'factions': RenderFactions,
      'world-maps': RenderWorldMaps,
      'lore-history': RenderLore,
      'magic-tech': RenderMagic,
      'weapons': RenderWeapons,
      'culture': RenderCulture,
      'timeline': RenderTimeline,
      'gallery': RenderGallery,
      'admin': AdminPanel
    };
    if(map[key]) map[key]();
  }
  window.addEventListener('hashchange', ()=>render(location.hash));
  return { render };
})();
