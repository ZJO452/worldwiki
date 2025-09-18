
window.Search = (function(){
  function filterByText(items, key='name', q=''){
    q = (q||'').toLowerCase().trim();
    if(!q) return items;
    return items.filter(x => (x[key]||'').toLowerCase().includes(q) || JSON.stringify(x).toLowerCase().includes(q));
  }
  return { filterByText };
})();
