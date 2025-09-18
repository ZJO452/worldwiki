
window.Wikilink = (function(){
  let tooltipEl;
  async function bind(container=document){
    const chars = await Store.load('characters');
    container.querySelectorAll('[data-wiki]').forEach(a=>{
      a.addEventListener('mouseenter', e=>{
        const key = a.getAttribute('data-wiki');
        const hit = chars.find(c=>c.name===key);
        const text = hit ? (hit.preview || hit.title || key) : key;
        Tooltip.show(text, a);
      });
      a.addEventListener('mouseleave', ()=>Tooltip.hide());
      a.addEventListener('click', e=>{
        e.preventDefault();
        location.hash = '#/characters';
      });
    });
  }
  return { bind };
})();
