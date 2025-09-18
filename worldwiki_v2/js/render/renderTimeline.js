
async function RenderTimeline(){
  const el = document.getElementById('timelineView');
  const data = await Store.load('timeline');
  el.innerHTML = data.map(t=>`<div class="card"><b>${t.when}</b><p>${t.event}</p></div>`).join('');
}
