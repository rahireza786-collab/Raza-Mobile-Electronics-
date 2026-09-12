(()=>{
  const style=document.createElement('style');
  style.textContent=`
  .hero{padding:0!important;margin:0!important;min-height:0!important;overflow:hidden!important}
  .hero-art{position:relative!important;width:100%!important;overflow:hidden!important}
  .hero-reference-image{display:none!important}
  @media(max-width:900px){.hero-art{min-height:0!important}}
  `;
  document.head.appendChild(style);
})();
