(()=>{
  const style=document.createElement('style');
  style.textContent=`
  .hero{padding:0!important;margin:0!important;background:#061326!important;overflow:hidden!important;position:relative!important;min-height:clamp(560px,48vw,760px)!important}
  .hero-art{position:relative!important;width:100%!important;height:clamp(560px,48vw,760px)!important;min-height:560px!important;overflow:hidden!important;background:#061326 url('/assets/raza-hero-reference.jpg?v=20260910') center right/cover no-repeat!important}
  .hero-art .hero-reference-image{display:none!important}
  .hero-art:before{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(90deg,#050d19 0%,#071321 25%,#071321 34%,rgba(7,19,33,.92) 39%,rgba(7,19,33,.18) 50%,rgba(7,19,33,0) 64%);pointer-events:none}
  .hero-art:after{content:"";position:absolute;left:0;bottom:0;width:52%;height:28%;z-index:3;background:linear-gradient(180deg,transparent,#061326 88%);pointer-events:none}
  .raza-clean-name{position:absolute;left:5.2vw;top:50%;transform:translateY(-50%);z-index:8;color:#fff;font:800 clamp(54px,7vw,112px)/.88 Manrope,Arial,sans-serif;letter-spacing:-5px;text-shadow:0 14px 50px rgba(0,0,0,.38)}
  .raza-clean-name:after{content:"";display:block;width:82px;height:5px;margin-top:20px;border-radius:9px;background:#efc451;box-shadow:0 0 28px rgba(239,196,81,.35)}
  .raza-clean-cover{position:absolute;z-index:7;left:0;top:0;width:42%;height:100%;background:linear-gradient(90deg,#061326 0%,#061326 78%,rgba(6,19,38,.94) 100%);pointer-events:none}
  .raza-clean-bottom{position:absolute;left:0;bottom:0;width:43%;height:24%;z-index:7;background:linear-gradient(180deg,rgba(6,19,38,0),#061326 52%,#061326 100%);pointer-events:none}
  @media(max-width:900px){.hero-art{height:620px!important;min-height:620px!important;background-position:63% center!important;background-size:cover!important}.raza-clean-cover{width:50%}.raza-clean-name{left:6vw;font-size:64px}.raza-clean-bottom{width:54%}}
  @media(max-width:520px){.hero-art{height:610px!important;min-height:610px!important;background-position:62% center!important}.raza-clean-cover{width:62%}.raza-clean-name{left:7vw;font-size:48px;letter-spacing:-3px}.raza-clean-name:after{width:58px;height:4px;margin-top:14px}}
  `;
  document.head.appendChild(style);
  const art=document.querySelector('.hero-art');
  if(!art)return;
  art.innerHTML='<div class="raza-clean-cover"></div><div class="raza-clean-bottom"></div><div class="raza-clean-name">RAZA</div>';
})();
