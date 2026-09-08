/* RAZA homepage runtime: preserve the previous app and replace only the hero presentation with the approved reference visual. */
(async()=>{
  const legacy='https://raw.githubusercontent.com/rahireza786-collab/Raza-Mobile-Electronics-/10bf9934717d31db89d6f464c41f25575705f762/app.js';
  try{
    const r=await fetch(legacy,{cache:'no-store'});
    if(!r.ok) throw new Error('legacy app unavailable');
    const code=await r.text();
    (0,eval)(code);
  }catch(e){console.error('Raza app bootstrap failed',e)}

  const css=document.createElement('style');
  css.textContent=`
    .hero.reference-hero-mode{display:block!important;padding:0!important;margin:0!important;min-height:unset!important}
    .hero.reference-hero-mode .hero-copy{display:none!important}
    .hero.reference-hero-mode .hero-art{display:block!important;position:relative!important;width:100%!important;min-height:unset!important;height:auto!important;aspect-ratio:1200/614!important;margin:0!important;border-radius:0!important;overflow:hidden!important;background:#071426!important;box-shadow:none!important}
    .hero.reference-hero-mode .reference-hero-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;object-fit:cover!important;object-position:center!important;max-width:none!important;filter:none!important;animation:referenceHeroBreath 10s ease-in-out infinite!important;transform-origin:center center!important}
    .hero.reference-hero-mode .marquee{margin-top:0!important}
    @keyframes referenceHeroBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.008)}}
    @media(max-width:820px){
      .hero.reference-hero-mode .hero-art{aspect-ratio:1200/614!important}
      .hero.reference-hero-mode .reference-hero-image{object-position:center center!important}
    }
    @media(prefers-reduced-motion:reduce){.hero.reference-hero-mode .reference-hero-image{animation:none!important}}
  `;
  document.head.appendChild(css);

  const apply=()=>{
    const hero=document.querySelector('.hero');
    const art=document.querySelector('.hero-art');
    if(!hero||!art) return false;
    hero.classList.add('reference-hero-mode');
    art.className='hero-art reference-hero-mode';
    art.innerHTML='<img class="reference-hero-image" src="/assets/raza-hero-reference.svg" alt="Raza Mobile & Electronics premium flagship hero">';
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    if(apply()||++tries>30) clearInterval(timer);
  },250);
})();