
window.Store = (function(){
  const cache = new Map();
  const sources = ['characters','creatures','factions','locations','lore','magic','weapons','culture','timeline'];
  async function load(name){
    if(cache.has(name)) return cache.get(name);
    const local = localStorage.getItem('ww_overrides_'+name);
    let data;
    if(local){
      try{ data = JSON.parse(local); }catch(e){ console.warn('Bad local override for',name); }
    }
    if(!data){
      const res = await fetch('data/'+name+'.json');
      data = await res.json();
    }
    cache.set(name, data);
    return data;
  }
  function setLocal(name, data){
    localStorage.setItem('ww_overrides_'+name, JSON.stringify(data, null, 2));
    cache.delete(name);
    return true;
  }
  function clearLocal(name){
    localStorage.removeItem('ww_overrides_'+name);
    cache.delete(name);
  }
  async function all(){
    const out = {};
    for(const s of sources){ out[s] = await load(s); }
    return out;
  }
  return { load, setLocal, clearLocal, all };
})();
