
async function RenderCreatures(){
  const el = document.getElementById('creaturesView');
  const data = await Store.load('creatures');
  el.innerHTML = `<div class="grid">${data.map(Card).join('')}</div>`;
}
