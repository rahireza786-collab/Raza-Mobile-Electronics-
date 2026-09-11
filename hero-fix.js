(()=>{
  const style=document.createElement('style');
  style.textContent=`
  .hero{padding:0!important;margin:0!important;position:relative!important;overflow:hidden!important;background:linear-gradient(90deg,#18130e,#f4eee4 18%,#f4eee4 82%,#18130e)!important;min-height:0!important}
  .hero-art{position:relative!important;width:100%!important;height:clamp(700px,calc(100vh - 72px),900px)!important;min-height:700px!important;overflow:hidden!important;background:linear-gradient(90deg,#18130e,#f4eee4 18%,#f4eee4 82%,#18130e)!important;display:flex!important;align-items:center!important;justify-content:center!important}
  .hero-art .hero-reference-image{display:block!important;position:relative!important;inset:auto!important;width:auto!important;height:100%!important;max-width:100%!important;object-fit:contain!important;object-position:center center!important;filter:none!important;transform:none!important;image-rendering:auto!important}
  .hero-art:before,.hero-art:after{display:none!important;content:none!important}
  .raza-clean-name,.raza-clean-cover,.raza-clean-bottom{display:none!important}
  @media(max-width:900px){
    .hero-art{height:calc(100svh - 68px)!important;min-height:560px!important;background:#f4eee4!important}
    .hero-art .hero-reference-image{width:100%!important;height:100%!important;object-fit:contain!important}
  }
  @media(max-width:520px){
    .hero-art{height:calc(100svh - 62px)!important;min-height:540px!important}
  }
  `;
  document.head.appendChild(style);
})();
