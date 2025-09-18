
async function RenderWeapons(){
  const el = document.getElementById('weaponsView');
  const data = await Store.load('weapons');
  el.innerHTML = data.map(entry=>`
    <div class="card">
      <h3>🧍 ${entry.character}</h3>
      ${(entry.weapons||[]).map(w=>`
        <div class="card">
          <h4>⚔️ ${w.name}</h4>
          <p>${w.description}</p>
          <p class="muted"><b>Ability:</b> ${w.ability}</p>
        </div>
      `).join('')}
    </div>
  `).join('');
}
