/* RAZA homepage runtime: preserve the catalogue runtime, then lock the hero to the approved reference layout. */
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
    /* Approved hero reference: exact 1200:614 composition, no fake 3D/CSS phone rendering. */
    .hero.reference-hero-mode{
      display:block!important;
      padding:0!important;
      margin:0!important;
      min-height:unset!important;
    }
    .hero.reference-hero-mode .hero-copy{display:none!important}
    .hero.reference-hero-mode .hero-art{
      display:block!important;
      position:relative!important;
      width:100%!important;
      min-height:unset!important;
      height:auto!important;
      aspect-ratio:1200/614!important;
      margin:0!important;
      border-radius:0!important;
      overflow:hidden!important;
      background:#071426!important;
      box-shadow:none!important;
    }
    .hero.reference-hero-mode .reference-hero-image{
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      display:block!important;
      object-fit:cover!important;
      object-position:center center!important;
      max-width:none!important;
      filter:none!important;
      transform:none!important;
      animation:none!important;
    }
    .hero.reference-hero-mode .reference-shop-link{
      position:absolute!important;
      left:4.1%!important;
      top:72.8%!important;
      width:10.5%!important;
      height:9.2%!important;
      display:block!important;
      z-index:20!important;
      border-radius:999px!important;
      background:transparent!important;
      text-indent:-9999px!important;
      overflow:hidden!important;
      cursor:pointer!important;
    }
    .hero.reference-hero-mode .reference-next-link{
      position:absolute!important;
      right:2.5%!important;
      top:56.5%!important;
      width:3.2%!important;
      height:7.4%!important;
      display:block!important;
      z-index:20!important;
      border-radius:50%!important;
      background:transparent!important;
      text-indent:-9999px!important;
      overflow:hidden!important;
      cursor:pointer!important;
    }
    .hero.reference-hero-mode .marquee{margin-top:0!important}
    @media(max-width:820px){
      .hero.reference-hero-mode .hero-art{aspect-ratio:1200/614!important}
      .hero.reference-hero-mode .reference-shop-link{left:4.1%!important;top:72.8%!important;width:16%!important;height:9.2%!important}
      .hero.reference-hero-mode .reference-next-link{right:2.5%!important;top:56.5%!important;width:5%!important;height:7.4%!important}
    }
  `;
  document.head.appendChild(css);

  const apply=()=>{
    const hero=document.querySelector('.hero');
    const art=document.querySelector('.hero-art');
    if(!hero||!art) return false;
    hero.classList.add('reference-hero-mode');
    art.className='hero-art reference-hero-mode';
    art.innerHTML=`
      <img class="reference-hero-image" src="/assets/raza-hero-reference.svg" alt="Raza Mobile & Electronics — Latest iPhone and Samsung Flagships">
      <a class="reference-shop-link" href="#new" aria-label="Shop new phones">Shop Now</a>
      <a class="reference-next-link" href="#new" aria-label="Explore new phones">Next</a>
    `;
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    if(apply()||++tries>30) clearInterval(timer);
  },250);
})();