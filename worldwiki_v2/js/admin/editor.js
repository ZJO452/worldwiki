
function AdminPanel(){
  const st = document.getElementById('adminStatus');
  const sel = document.getElementById('jsonSelect');
  const ta = document.getElementById('jsonEditor');
  const apply = document.getElementById('applyChanges');
  const exportBtn = document.getElementById('exportJson');
  const revert = document.getElementById('revertLocal');
  const toAdmin = document.getElementById('switchToAdmin');
  const toEditor = document.getElementById('switchToEditor');
  const logout = document.getElementById('logoutRole');

  st.textContent = Auth.role();

  async function loadCurrent(){
    const name = sel.value;
    const data = await Store.load(name);
    ta.value = JSON.stringify(data, null, 2);
  }
  sel.addEventListener('change', loadCurrent);
  apply.addEventListener('click', ()=>{
    const name = sel.value;
    try{
      const data = JSON.parse(ta.value);
      Store.setLocal(name, data);
      alert('Apply สำเร็จ (localStorage)');
    }catch(e){
      alert('JSON ไม่ถูกต้อง: '+e.message);
    }
  });
  exportBtn.addEventListener('click', ()=>{
    const name = sel.value;
    const blob = new Blob([ta.value], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name+'.json';
    a.click();
  });
  revert.addEventListener('click', ()=>{
    const name = sel.value;
    Store.clearLocal(name);
    loadCurrent();
  });

  toAdmin.addEventListener('click', ()=>{ Auth.set('admin'); st.textContent=Auth.role(); });
  toEditor.addEventListener('click', ()=>{ Auth.set('editor'); st.textContent=Auth.role(); });
  logout.addEventListener('click', ()=>{ Auth.set('viewer'); st.textContent=Auth.role(); });

  loadCurrent();
}

window.addEventListener('load', ()=>{
  const btn = document.getElementById('btnLogin');
  if(btn){
    btn.addEventListener('click', ()=>{
      Auth.loginDialog();
      Auth.updateUI();
    });
  }
});
