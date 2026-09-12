(()=>{
  const fix=()=>{
    const img=document.querySelector('.raza-hero-photo img');
    if(img){
      img.src='/assets/raza-hero-uploaded.jpg?v=20260912';
      img.style.visibility='visible';
      img.style.display='block';
    }
  };
  const style=document.createElement('style');
  style.textContent=`
    .hero{padding:0!important;margin:0!important;min-height:0!important;overflow:hidden!important}
    .hero-art{position:relative!important;width:100%!important;overflow:hidden!important}
    .hero-reference-image{display:none!important}
    .raza-hero-photo{position:relative!important;z-index:5!important}
    .raza-hero-photo img{visibility:visible!important;display:block!important}
  `;
  document.head.appendChild(style);
  fix();
  setTimeout(fix,100);
  setTimeout(fix,500);
})();
