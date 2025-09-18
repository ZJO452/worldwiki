
function Infobox(entity){
  const tags = (entity.tags||[]).map(t=>`<span class="tag">#${t}</span>`).join('');
  return `<aside class="infobox">
    <img src="${entity.image||''}" alt="${entity.name||''}" />
    <h3>${entity.name||''}</h3>
    <p class="muted">${entity.title||''}</p>
    <div>${tags}</div>
  </aside>`;
}
