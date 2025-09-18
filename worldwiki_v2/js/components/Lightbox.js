
window.Lightbox=(function(){
  let overlay;
  function show(src){
    if(!overlay){
      overlay=document.createElement('div');
      overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:9999';
      overlay.addEventListener('click', hide);
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `<img src="${src}" style="max-width:90%;max-height:90%;border-radius:1rem;border:2px solid #2a3240">`;
    overlay.style.display='flex';
  }
  function hide(){ if(overlay) overlay.style.display='none'; }
  return { show, hide };
})();
