// renderFactions.js — แสดง Factions/Races แบบ "ลิสต์" และแสดงรายละเอียดครบจาก JSON
async function RenderFactions(){
  const el = document.getElementById('factionsView');
  if (!el) return;

  let data = await Store.load('factions');

  // กันชื่อซ้ำ (กรณีมีรายการชื่อซ้ำในไฟล์/override)
  const seen = new Set();
  data = data.filter(it => (seen.has(it.name) ? false : (seen.add(it.name), true)));

  // -------- helpers --------
  const toText = (v) => {
    if (v == null) return '';
    if (Array.isArray(v)) return v.join(', ');
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  };

  const toTags = (arr=[]) =>
    (Array.isArray(arr) ? arr : String(arr||'').split(',').map(s=>s.trim()))
      .filter(Boolean).map(s => `<span class="tag">#${s}</span>`).join('');

  // ทำให้อยู่ในรูปแบบเดียวกัน
  const norm = (it) => ({
    ...it,
    kind: it.type || 'เผ่าพันธุ์',                              // ถ้าไม่มี type ถือเป็น "เผ่าพันธุ์"
    traitsText: toText(it.traits),                               // traits อาจเป็น string/array
    relatedArr: Array.isArray(it.related_characters) ? it.related_characters
             :  Array.isArray(it.related) ? it.related : []      // เผื่อบางชุดใช้ related
  });

  // แยกกลุ่มเพื่อโชว์หัวข้อ (จะไม่กระทบข้อมูล)
  const races    = data.filter(x => !x.type).map(norm);
  const factions = data.filter(x =>  x.type).map(norm);

  const list = (items) => `
    <ul class="fx-list">
      ${items.map(it => `
        <li class="fx-row">
          <div class="fx-title">${it.name}</div>
          <div class="fx-sub">${it.kind}</div>
          ${it.description ? `<div class="fx-line">${it.description}</div>` : ''}
          ${it.traitsText ? `<div class="fx-line"><b>Traits:</b> ${it.traitsText}</div>` : ''}
          ${it.symbol ? `<div class="fx-line"><b>Symbol:</b> ${toText(it.symbol)}</div>` : ''}
          ${it.relatedArr.length ? `<div class="fx-tags">${toTags(it.relatedArr)}</div>` : ''}
        </li>
      `).join('')}
    </ul>
  `;

  // เรนเดอร์ (ไม่มีภาพ, ไม่ใช้ .card)
  el.innerHTML = `
    ${races.length    ? `<h2>Races</h2>${list(races)}`       : ''}
    ${factions.length ? `<h2>Factions</h2>${list(factions)}` : ''}
  `;
}
