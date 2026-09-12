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
      const r=await fetch('/assets/raza-hero-uploaded.jpg?v=20260912');
      const text=(await r.text()).replace(/\s/g,'');
      if(text.startsWith('/9j/')||text.startsWith('iVBOR')){
        const bin=atob(text);
        const bytes=new Uint8Array(bin.length);
        for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
        const type=text.startsWith('/9j/')?'image/jpeg':'image/png';
        img.src=URL.createObjectURL(new Blob([bytes],{type}));
      }else{
        img.src='/assets/raza-hero-reference.jpg?v=20260912-good';
      }
      img.style.visibility='visible';
      img.style.display='block';
    }catch(e){
      img.src='/assets/raza-hero-reference.jpg?v=20260912-good';
    }
  }
  fix();
  setTimeout(fix,300);
  setTimeout(fix,1000);
})();
