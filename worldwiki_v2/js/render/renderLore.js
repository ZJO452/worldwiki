
async function RenderLore(){
  const el = document.getElementById('loreView');
  const data = await Store.load('lore');
  el.innerHTML = data.map(s=>`<h3>${s.title}</h3><p>${s.text}</p>`).join('');
}
