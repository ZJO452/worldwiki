
async function RenderCulture(){
  const el = document.getElementById('cultureView');
  const data = await Store.load('culture');
  el.innerHTML = data.map(c=>`
    <div class="card">
      <h3>${c.name}</h3>
      <p>${c.description}</p>
      <p><b>Traits:</b> ${(c.traits||[]).join(', ')}</p>
      <p><b>Language:</b> ${c.culture.language}</p>
      <p><b>Beliefs:</b> ${c.culture.beliefs}</p>
      <p><b>Clothing:</b> ${c.culture.clothing}</p>
      <p><b>Arts:</b> ${c.culture.arts}</p>
      <p><b>Food:</b> ${(c.culture.food||[]).join(', ')}</p>
      <p><b>Architecture:</b> ${c.architecture}</p>
      <p><b>Traditions:</b> ${(c.traditions||[]).join(', ')}</p>
    </div>
  `).join('');
}
