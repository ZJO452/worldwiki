
window.Tooltip=(function(){
  let el;
  function show(text, anchor){
    if(!el){
      el = document.createElement('div');
      el.className = 'tooltip';
      document.body.appendChild(el);
    }
    el.textContent = text;
    const r = anchor.getBoundingClientRect();
    el.style.left = (r.left + r.width/2) + 'px';
    el.style.top = (r.top - 10) + 'px';
    el.style.display = 'block';
  }
  function hide(){ if(el) el.style.display='none'; }
  return { show, hide };
})();
