/* RAZA homepage runtime — reliable local hero + catalogue. */
(()=>{
  const SUPABASE_URL='https://iljmxsfcjuutppftsrrt.supabase.co';
  const SUPABASE_KEY=(document.documentElement.innerHTML.match(/sb_publishable_[A-Za-z0-9_-]+/)||[])[0]||'';
  const REF='/assets/raza-hero-reference.jpg?v=6';
  const css=document.createElement('style');
  css.textContent=`
  .hero{min-height:0!important;padding:0!important;display:block!important;overflow:hidden!important;background:#071426!important}
  .hero .hero-copy{display:none!important}
  .hero-art{position:relative!important;width:100%!important;height:auto!important;min-height:0!important;aspect-ratio:1200/614!important;margin:0!important;border-radius:0!important;display:block!important;overflow:hidden!important;background:#071426!important;z-index:2!important}
  .hero-art .hero-image-local{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;object-fit:cover!important;object-position:center!important;margin:0!important;padding:0!important;max-width:none!important;border:0!important;animation:none!important;filter:url(#hero-sharpen)!important;image-rendering:auto!important;backface-visibility:hidden!important;transform:translateZ(0)!important}
  .hero-art .hero-fallback{position:absolute!important;inset:0!important;display:none;align-items:center;justify-content:center;background:linear-gradient(135deg,#071426,#12345e 60%,#0a1730);color:#fff;font:800 28px Manrope,sans-serif;z-index:1!important}
  .hero-art .hero-fallback b{color:#f0c85c}
  .hero-art .hero-hotspot{position:absolute!important;z-index:5!important;background:transparent!important;border:0!important}
  .hero-art .hero-shop{left:4%!important;top:72%!important;width:18%!important;height:14%!important}
  .hero-art .hero-next{right:1.5%!important;top:53%!important;width:7%!important;height:13%!important}
  .hero-art.admin-mode .hero-image-local{object-fit:cover!important}
  @media(max-width:820px){.hero-art{min-height:430px!important}.hero-art .hero-shop{left:3%!important;top:70%!important;width:25%!important;height:15%!important}.hero-art .hero-next{right:1%!important;top:52%!important;width:10%!important;height:14%!important}}
  `;
  document.head.appendChild(css);
  const sharp=document.createElementNS('http://www.w3.org/2000/svg','svg');
  sharp.setAttribute('aria-hidden','true'); sharp.style.cssText='position:absolute;width:0;height:0;pointer-events:none';
  sharp.innerHTML='<defs><filter id="hero-sharpen" x="-8%" y="-8%" width="116%" height="116%"><feConvolveMatrix order="3" preserveAlpha="true" kernelMatrix="0 -0.35 0 -0.35 2.4 -0.35 0 -0.35 0"/></filter></defs>';
  document.body.appendChild(sharp);

  function renderReference(){
    const art=document.querySelector('.hero-art'); if(!art)return;
    art.className='hero-art';
    art.innerHTML=`<img class="hero-image-local" src="${REF}" alt="Raza Mobile & Electronics flagship hero"><div class="hero-fallback"><b>RAZA</b>&nbsp; MOBILE &amp; ELECTRONICS</div><a class="hero-hotspot hero-shop" href="#new" aria-label="Shop Now"></a><a class="hero-hotspot hero-next" href="#new" aria-label="Next"></a>`;
    const img=art.querySelector('.hero-image-local');
    img.addEventListener('error',()=>{img.style.display='none';art.querySelector('.hero-fallback').style.display='flex'});
  }
  function renderAdmin(url){
    const art=document.querySelector('.hero-art'); if(!art)return;
    art.className='hero-art admin-mode';
    art.innerHTML=`<img class="hero-image-local" src="${String(url).replace(/"/g,'&quot;')}" alt="Raza Mobile & Electronics hero"><a class="hero-hotspot hero-shop" href="#new" aria-label="Shop Now"></a>`;
  }
  renderReference();

  const money=v=>`₹${Number(v||0).toLocaleString('en-IN')}`;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const section=c=>{const s=`${c?.slug||''} ${c?.name||''}`.toLowerCase().replace(/[-_]+/g,' ');if(s.includes('new phone')||s.includes('new mobile'))return'new';if(s.includes('second hand')||s.includes('used phone')||s.includes('pre owned'))return'used';if(s.includes('accessor'))return'accessories';return'other'};
  const placeholder=p=>`<div class="product-placeholder"><strong>${esc((p.brand||p.name||'R').slice(0,1).toUpperCase())}</strong><span>${esc(p.brand||'RAZA')}</span></div>`;
  const whatsapp=p=>`https://wa.me/919534715178?text=${encodeURIComponent(`Hello Raza Mobile & Electronics, I want to buy ${p.name||'this product'}.`)}`;
  function card(p){const href=p.id?`product.html?id=${encodeURIComponent(p.id)}`:'#';const img=p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">${placeholder(p)}`:placeholder(p);return `<article class="product-card search-product" data-name="${esc(`${p.name||''} ${p.meta||''} ${p.brand||''}`.toLowerCase())}"><a class="product-card-link" href="${href}"><div class="product-image">${img}<span class="pill">${esc(p.tag||'AVAILABLE')}</span></div><div class="product-info"><small>${esc(p.meta||'')}</small><h3>${esc(p.name||'Product')}</h3><div class="price-row"><span class="price">${esc(p.price||'Price on request')}</span><span class="arrow">↗</span></div></div></a><a class="product-buy" href="${whatsapp(p)}" target="_blank" rel="noopener">Buy / Enquire</a></article>`}
  async function loadCatalogue(){
    if(!SUPABASE_KEY)return;
    try{
      const h={apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`};
      const [pr,cr]=await Promise.all([fetch(`${SUPABASE_URL}/rest/v1/products?select=*&is_active=eq.true&order=created_at.desc`,{headers:h}),fetch(`${SUPABASE_URL}/rest/v1/categories?select=id,name,slug&is_active=eq.true`,{headers:h})]);
      if(!pr.ok)return; const products=await pr.json(),cats=cr.ok?await cr.json():[]; const cm={};cats.forEach(c=>cm[c.id]=c);
      const ids=products.map(p=>p.id).filter(Boolean); let ims=[];
      if(ids.length){const r=await fetch(`${SUPABASE_URL}/rest/v1/product_images?select=product_id,image_url,sort_order&product_id=in.(${ids.join(',')})&order=sort_order.asc`,{headers:h});if(r.ok)ims=await r.json()}
      const im={};ims.forEach(x=>{if(!im[x.product_id])im[x.product_id]=x.image_url});
      const rows=products.map(p=>({...p,section:section(cm[p.category_id]||{}),image:im[p.id],meta:[p.storage,p.condition].filter(Boolean).join(' • ')||'Available',price:money(p.sale_price??p.price),tag:p.condition?'VERIFIED USED':p.is_featured?'FEATURED':'NEW'}));
      const put=(id,arr,msg)=>{const el=document.getElementById(id);if(el)el.innerHTML=arr.length?arr.map(card).join(''):`<div class="catalog-empty">${msg}</div>`};
      put('newProducts',rows.filter(p=>p.section==='new'),'No new phones listed yet.');put('usedProducts',rows.filter(p=>p.section==='used'),'No second-hand phones listed yet.');put('accessoryProducts',rows.filter(p=>p.section==='accessories'),'No accessories listed yet.');
    }catch(e){console.warn('Catalogue:',e)}
  }
  async function loadHeroSetting(){
    if(!SUPABASE_KEY)return;
    try{const h={apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`};const r=await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=key,value,image_url&key=in.(hero_image,hero_animation)&order=key.asc`,{headers:h,cache:'no-store'});if(!r.ok)return;const rows=await r.json(),map={};rows.forEach(x=>map[x.key]=x);const url=map.hero_image?.image_url||map.hero_image?.value||'';if(url)renderAdmin(url);else renderReference()}catch(e){renderReference()}
  }
  const s=document.getElementById('siteSearch');s?.addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();document.querySelectorAll('.search-product').forEach(x=>x.style.display=!q||x.dataset.name.includes(q)?'':'none')});
  const m=document.getElementById('menuBtn');m?.addEventListener('click',()=>{const n=document.querySelector('.header nav');if(n)n.style.display=n.style.display==='flex'?'none':'flex'});
  loadCatalogue();
  loadHeroSetting();
})();