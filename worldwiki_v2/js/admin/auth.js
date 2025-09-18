
window.Auth = (function(){
  const key='ww_role';
  function role(){ return localStorage.getItem(key)||'viewer'; }
  function set(r){ localStorage.setItem(key, r); updateUI(); }
  function updateUI(){
    const badge = document.getElementById('currentRole');
    if(badge) badge.textContent = role();
    document.querySelectorAll('[data-require-role]').forEach(el=>{
      const req = el.getAttribute('data-require-role');
      if(role()!==req) el.setAttribute('data-hidden','');
      else el.removeAttribute('data-hidden');
    });
    const adminNav = document.getElementById('adminLinkNav');
    if(adminNav) adminNav.style.display = (role()==='admin')?'inline-block':'none';
  }
  function loginDialog(){
    const user = prompt('Username (admin/editor):','admin');
    const pass = prompt('Password:');
    if(user==='admin' && pass==='password') set('admin');
    else if(user==='editor' && pass==='1234') set('editor');
    else alert('บัญชีหรือรหัสผ่านไม่ถูกต้อง');
  }
  window.addEventListener('load', updateUI);
  return { role, set, loginDialog, updateUI };
})();
