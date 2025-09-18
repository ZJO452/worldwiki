
async function RenderGallery(){
  const el = document.getElementById('galleryView');
  const chars = await Store.load('characters');
  const imgs = chars.map(c=>c.image).filter(Boolean);
  el.innerHTML = imgs.map(src=>`<img class="gallery-img" src="${src}" onclick="Lightbox.show('${src}')" />`).join('');
}
