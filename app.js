/* RAZA homepage runtime — stable reference hero + live catalogue. */
(async()=>{
  const SUPABASE_URL='https://iljmxsfcjuutppftsrrt.supabase.co';
  const SUPABASE_KEY=['sb_publishable_','g4l-OO-1x1X4LMM-','c5cnXA_DItmM14F'].join('');
  const REF='/assets/raza-hero-reference.svg?v=3';
  const heroCSS=document.createElement('style');
  heroCSS.textContent=`
    .hero.reference-hero-mode{display:block!important;padding:0!important;margin:0!important;min-height:0!important}
    .hero.reference-hero-mode .hero-copy{display:none!important}
    .hero.reference-hero-mode .hero-art{display:block!important;position:relative!important;width:100%!important;min-height:0!important;height:auto!important;aspect-ratio:1200/614!important;margin:0!important;border-radius:0!important;overflow:hidden!important;background:#071426!important;box-shadow:none!important}
    .hero.reference-hero-mode .reference-hero-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;object-fit:cover!important;object-position:center!important;max-width:none!important;filter:none!important;transform:none!important;animation:none!important}
    .hero.reference-hero-mode .reference-hotspot{position:absolute!important;z-index:30!important;display:block!important;background:transparent!important;border:0!important;cursor:pointer!important}
    .hero.reference-hero-mode .shop-hotspot{left:4%!important;top:72%!important;width:11%!important;height:11%!important}
    .hero.reference-hero-mode .next-hotspot{right:2.2%!important;top:55%!important;width:5%!important;height:9%!important}
    .hero.reference-hero-mode .hero-art .hero-brand-lockup,.hero.reference-hero-mode .hero-art .phone,.hero.reference-hero-mode .hero-art .luxury-halo,.hero.reference-hero-mode .hero-art .hero-ring,.hero.reference-hero-mode .hero-art .hero-orbit{display:none!important}
    .hero.admin-hero-mode{display:block!important;padding:0!important;margin:0!important;min-height:0!important}
    .hero.admin-hero-mode .hero-copy{display:none!important}
    .hero.admin-hero-mode .hero-art{display:block!important;position:relative!important;width:100%!important;aspect-ratio:1200/614!important;min-height:0!important;height:auto!important;margin:0!important;border-radius:0!important;overflow:hidden!important;background:#071426!important}
    .hero.admin-hero-mode .admin-hero-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;display:block!important}
    .hero.admin-hero-mode .admin-hotspot{position:absolute!important;z-index:30!important;inset:0!important}
    @media(max-width:820px){.hero.reference-hero-mode .shop-hotspot{left:4%!important;top:72%!important;width:17%!important;height:11%!important}.hero.reference-hero-mode .next-hotspot{right:2%!important;top:54%!important;width:7%!important;height:10%!important}}
  `;
  document.head.appendChild(heroCSS);
  const animCSS=document.createElement('style');
  animCSS.textContent=`@keyframes heroAdminFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes heroAdminZoom{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}@keyframes heroAdminDrift{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(8px,-6px,0)}}`;
  document.head.appendChild(animCSS);
  let desiredMode='reference',desiredUrl=REF,observer=null,applying=false;
  function watchHero(){const art=document.querySelector('.hero-art');if(!art)return;if(observer)observer.disconnect();observer=new MutationObserver(()=>{if(applying)return;clearTimeout(watchHero._t);watchHero._t=setTimeout(()=>{if(desiredMode==='admin'&&desiredUrl)renderAdminHero(desiredUrl,window.__razaHeroAnimation||'float');else renderReferenceHero()},0)});observer.observe(art,{childList:true,subtree:false})}
  function renderReferenceHero(){const hero=document.querySelector('.hero'),art=document.querySelector('.hero-art');if(!hero||!art)return;applying=true;if(observer)observer.disconnect();hero.className='hero reference-hero-mode';art.className='hero-art';art.innerHTML=`<img class="reference-hero-image" src="${REF}" alt="Raza Mobile & Electronics — Latest iPhone and Samsung Flagships" decoding="async"><a class="reference-hotspot shop-hotspot" href="#new" aria-label="Shop Now"></a><a class="reference-hotspot next-hotspot" href="#new" aria-label="Explore new phones"></a>`;applying=false;watchHero()}
  function renderAdminHero(url,animation='float'){const hero=document.querySelector('.hero'),art=document.querySelector('.hero-art');if(!hero||!art)return;applying=true;if(observer)observer.disconnect();hero.className='hero admin-hero-mode';art.className='hero-art';art.innerHTML=`<img class="admin-hero-image" src="${String(url).replace(/"/g,'&quot;')}" alt="Raza Mobile & Electronics hero" decoding="async"><a class="admin-hotspot" href="#new" aria-label="Explore products"></a>`;const img=art.querySelector('.admin-hero-image');if(img)img.style.animation=animation==='none'?'none':animation==='zoom'?'heroAdminZoom 8s ease-in-out infinite':animation==='drift'?'heroAdminDrift 8s ease-in-out infinite':'heroAdminFloat 7s ease-in-out infinite';applying=false;watchHero()}
  // Render the approved hero immediately. Never wait for the catalogue or Supabase request.
  renderReferenceHero();

  // Load the older catalogue runtime in the background so a slow/broken raw GitHub request cannot block the hero.
  fetch('https://raw.githubusercontent.com/rahireza786-collab/Raza-Mobile-Electronics-/10bf9934717d31db89d6f464c41f25575705f762/app.js',{cache:'no-store'})
    .then(r=>r.ok?r.text():Promise.reject(new Error('catalogue runtime unavailable')))
    .then(code=>{try{(0,eval)(code)}catch(e){console.warn('Catalogue runtime eval:',e)}})
    .catch(e=>console.warn('Catalogue runtime bootstrap:',e));

  async function loadHeroSetting(){try{const h={apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`};const r=await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=key,value,image_url&key=in.(hero_image,hero_animation)&order=key.asc`,{headers:h,cache:'no-store'});if(!r.ok)throw Error('Hero settings unavailable');const rows=await r.json(),map={};rows.forEach(x=>map[x.key]=x);const url=map.hero_image?.image_url||map.hero_image?.value||'',animation=map.hero_animation?.value||'float';window.__razaHeroAnimation=animation;if(url){desiredMode='admin';desiredUrl=url;renderAdminHero(url,animation)}else{desiredMode='reference';desiredUrl=REF;renderReferenceHero()}}catch(e){desiredMode='reference';desiredUrl=REF;renderReferenceHero()}}
  await loadHeroSetting();
  setTimeout(loadHeroSetting,700);setTimeout(loadHeroSetting,1600);
})();