(()=>{
  const style=document.createElement('style');
  style.textContent=`
  .hero{padding:0!important;margin:0!important;min-height:0!important;overflow:hidden!important}
  .hero-art{position:relative!important;width:100%!important;overflow:hidden!important}
  .hero-reference-image{display:none!important}
  .raza-hero-photo{background-image:url('/assets/raza-hero-reference.jpg?v=20260912-good')!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important}
  .raza-hero-photo img{visibility:hidden!important;width:100%!important;height:100%!important}
  @media(max-width:900px){.hero-art{min-height:0!important}.raza-hero-photo{background-size:contain!important}}
  `;
  document.head.appendChild(style);
})();
