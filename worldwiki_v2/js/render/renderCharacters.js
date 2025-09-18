
async function RenderCharacters(){
  const el = document.getElementById('charactersView');
  const data = await Store.load('characters');
  const ui = [`<div class="search"><input id="q" placeholder="ค้นหา..." /></div>`,`<div class="grid">`];
  const renderList = (arr)=>{ el.querySelector('.grid').innerHTML = arr.map(Card).join(''); };
  el.innerHTML = ui.join('')+'</div>';
  renderList(data);
  el.querySelector('#q').addEventListener('input', e=>{
    const filtered = Search.filterByText(data, 'name', e.target.value);
    renderList(filtered);
  });
}
