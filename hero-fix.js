(()=>{
  const style=document.createElement('style');
  style.textContent=`
    .hero{padding:0!important;margin:0!important;min-height:0!important;overflow:hidden!important}
    .hero-art{position:relative!important;width:100%!important;overflow:hidden!important}
    .hero-reference-image{display:none!important}
    .raza-hero-photo{position:relative!important;z-index:5!important}
    .raza-hero-photo img{visibility:visible!important;display:block!important}
  `;
  document.head.appendChild(style);
  async function fix(){
    const img=document.querySelector('.raza-hero-photo img');
    if(!img)return;
    try{
      const r=await fetch('/assets/raza-hero-uploaded.jpg?v=20260912-data');
      const text=(await r.text()).replace(/\s/g,'');
      if(text.startsWith('/9j/')) img.src='data:image/jpeg;base64,'+text;
      else if(text.startsWith('iVBOR')) img.src='data:image/png;base64,'+text;
      img.style.visibility='visible';
      img.style.display='block';
    }catch(e){console.warn('Hero image:',e)}
  }
  fix();
  setTimeout(fix,300);
  setTimeout(fix,1000);
})();
