
async function RenderMagic(){
  const el = document.getElementById('magicView');
  const data = await Store.load('magic');
  el.innerHTML = data.map(sec=>`
    <div class="card">
      <h3>${sec.group}</h3>
      <h4>เวท/คาถา</h4>
      <ul>${sec.spells.map(x=>`<li><b>${x.name}</b> — ${x.desc}</li>`).join('')}</ul>
      <h4>ไอเท็ม/อุปกรณ์</h4>
      <ul>${sec.items.map(x=>`<li><b>${x.name}</b> — ${x.desc}</li>`).join('')}</ul>
      <h4>เทคโนโลยี/MagiTech</h4>
      <ul>${sec.tech.map(x=>`<li><b>${x.name}</b> — ${x.desc}</li>`).join('')}</ul>
    </div>
  `).join('');
}
