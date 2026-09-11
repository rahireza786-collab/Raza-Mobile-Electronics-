(()=>{
  const style=document.createElement('style');
  style.textContent=`
  .hero{padding:0!important;margin:0!important;position:relative!important;overflow:hidden!important;background:#f4eee4!important;min-height:0!important}
  .hero-art{position:relative!important;width:100%!important;height:clamp(620px,calc(100vh - 72px),900px)!important;min-height:620px!important;overflow:hidden!important;background:#f4eee4!important}
  .hero-art .hero-reference-image{display:block!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;object-fit:cover!important;object-position:center 48%!important;filter:none!important;transform:none!important;image-rendering:auto!important}
  .hero-art:before,.hero-art:after{display:none!important;content:none!important}
  .raza-clean-name,.raza-clean-cover,.raza-clean-bottom{display:none!important}
  @media(max-width:900px){
    .hero-art{height:calc(100svh - 68px)!important;min-height:560px!important;background:#f4eee4!important}
    .hero-art .hero-reference-image{object-fit:contain!important;object-position:center center!important}
  }
  @media(max-width:520px){
    .hero-art{height:calc(100svh - 62px)!important;min-height:540px!important}
  }
  `;
  document.head.appendChild(style);
})();
