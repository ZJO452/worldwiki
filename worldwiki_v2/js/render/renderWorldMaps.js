// เวอร์ชันเดิม (revert) — ไม่มีโค้ดจัดกึ่งกลาง/ปรับขนาดเวที
async function RenderWorldMaps(){
  const role     = Auth.role();
  const img      = document.getElementById('worldMapImage');
  const canvas   = document.getElementById('mapCanvas');
  const list     = document.getElementById('poiList');
  const addBtn   = document.getElementById('addPoiBtn');
  const saveBtn  = document.getElementById('savePoiBtn');
  const exportBtn= document.getElementById('exportLocationsBtn');

  let data = await Store.load('locations');
  let editing = false;

  function refresh(){
    canvas.querySelectorAll('.pin').forEach(p => p.remove());
    if (list) list.innerHTML = '';

    data.forEach(p => {
      const pin = document.createElement('div');
      pin.className = 'pin';
      pin.style.left = p.center.x + 'px';
      pin.style.top  = p.center.y + 'px';
      pin.title = p.region + ' (' + p.continent + ')';
      pin.addEventListener('click', () => {
        alert(p.region + "\n" + (p.lore || ''));
      });
      canvas.appendChild(pin);

      if (list){
        const li = document.createElement('li');
        // 🔧 แก้ให้เป็น template literal ที่ถูกต้อง
        li.textContent = `${p.id} — ${p.region} [${p.continent}]`;
        list.appendChild(li);
      }
    });
  }

  function toLocalCoords(e){
    const r = img.getBoundingClientRect();
    const x = e.clientX - r.left + canvas.scrollLeft;
    const y = e.clientY - r.top  + canvas.scrollTop;
    return { x: Math.round(x), y: Math.round(y) };
  }

  if (role !== 'admin'){
    addBtn?.setAttribute('data-hidden','');
    saveBtn?.setAttribute('data-hidden','');
    exportBtn?.setAttribute('data-hidden','');
  } else {
    addBtn?.addEventListener('click', () => {
      editing = !editing;
      addBtn.textContent = editing
        ? 'กำลังปักหมุด (คลิกบนแผนที่เพื่อเพิ่ม) — ปิด'
        : '+ ปักหมุด';
    });

    canvas.addEventListener('click', e => {
      if (!editing) return;
      const pt = toLocalCoords(e);
      const id = prompt('ID เช่น AUR-99');
      const region = prompt('ชื่อพื้นที่/เมือง/ป้อม:');
      if (!id || !region) return;

      const item = {
        id, continent:'Unknown', region, type:'Landmark',
        biome:'', climate:'', danger:1, recommendedLevel:[1,5],
        lore:'',
        bbox:   { x1: pt.x-10, y1: pt.y-10, x2: pt.x+10, y2: pt.y+10 },
        center: { x: pt.x,     y: pt.y }
      };
      data.push(item);
      refresh();
    });

    saveBtn?.addEventListener('click', () => {
      Store.setLocal('locations', data);
      alert('บันทึกลง localStorage แล้ว');
    });

    exportBtn?.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'locations.json';
      a.click();
    });
  }

  refresh();
}
