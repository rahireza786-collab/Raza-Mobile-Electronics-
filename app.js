const SUPABASE_URL='https://iljmxsfcjuutppftsrrt.supabase.co';
const SUPABASE_KEY='sb_publishable_g4l-OO-1x1X4LMM-c5cnXA_DItmM14F';
const FALLBACK={
 newPhones:[
  {name:'iPhone 15 Pro',meta:'256GB • New',price:'₹64,999',tag:'NEW',image:'https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=900&q=85'},
  {name:'Samsung Galaxy S23',meta:'128GB • New',price:'₹39,999',tag:'NEW',image:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85'},
  {name:'OnePlus 12R',meta:'256GB • New',price:'₹34,999',tag:'POPULAR',image:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85'},
  {name:'Redmi Note Series',meta:'8GB / 128GB • New',price:'₹18,999',tag:'VALUE',image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85'}],
 usedPhones:[
  {name:'iPhone 13',meta:'128GB • Good condition',price:'₹31,999',tag:'VERIFIED USED',image:'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=85'},
  {name:'Samsung S22',meta:'128GB • Excellent',price:'₹27,999',tag:'CHECKED',image:'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b5?auto=format&fit=crop&w=900&q=85'},
  {name:'OnePlus 11',meta:'256GB • Good condition',price:'₹29,999',tag:'VERIFIED USED',image:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85'},
  {name:'iPhone 12',meta:'128GB • Good condition',price:'₹25,999',tag:'CHECKED',image:'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=85'}],
 accessories:[
  {name:'Premium TWS Earbuds',meta:'Wireless • New',price:'₹1,499',tag:'POPULAR',image:'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85'},
  {name:'Smart Watch',meta:'Smart • New',price:'₹2,499',tag:'SMART',image:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=85'},
  {name:'Wireless Headphones',meta:'Bluetooth • New',price:'₹2,999',tag:'AUDIO',image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'},
  {name:'Fast Charger',meta:'Type-C • New',price:'₹799',tag:'ESSENTIAL',image:'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85'}]
};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=v=>`₹${Number(v||0).toLocaleString('en-IN')}`;
const whatsapp=p=>`https://wa.me/919534715178?text=${encodeURIComponent(`Hello Raza Mobile & Electronics, I want to know about ${p.name}`)}`;
function card(p){return `<article class="product-card search-product" data-name="${esc(`${p.name} ${p.meta||''}`).toLowerCase()}" data-section="${esc(p.section||'')}"><div class="product-image"><img src="${esc(p.image||'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85')}" alt="${esc(p.name)}" loading="lazy"><span class="pill">${esc(p.tag||'AVAILABLE')}</span><span class="image-shine"></span></div><div class="product-info"><small>${esc(p.meta||'')}</small><h3>${esc(p.name)}</h3><div class="price-row"><span class="price">${esc(p.price||'Price on request')}</span><a class="arrow" href="${whatsapp(p)}" target="_blank" rel="noopener">↗</a></div></div></article>`}
function renderFallback(){
 document.getElementById('newProducts').innerHTML=FALLBACK.newPhones.map(p=>card({...p,section:'new'})).join('');
 document.getElementById('usedProducts').innerHTML=FALLBACK.usedPhones.map(p=>card({...p,section:'used'})).join('');
 document.getElementById('accessoryProducts').innerHTML=FALLBACK.accessories.map(p=>card({...p,section:'accessories'})).join('');
}
async function loadLiveCatalogue(){
 try{
  const headers={apikey:SUPABASE_KEY,Authorization:`Bearer ${SUPABASE_KEY}`};
  const pUrl=`${SUPABASE_URL}/rest/v1/products?select=*,categories(name,slug)&is_active=eq.true&order=created_at.desc`;
  const pr=await fetch(pUrl,{headers});
  if(!pr.ok) throw new Error('products '+pr.status);
  const products=await pr.json();
  if(!Array.isArray(products)) throw new Error('invalid catalogue');
  const ids=products.map(p=>p.id).filter(Boolean);
  let images=[];
  if(ids.length){
   const ir=await fetch(`${SUPABASE_URL}/rest/v1/product_images?select=product_id,image_url,sort_order&product_id=in.(${ids.join(',')})&order=sort_order.asc`,{headers});
   if(ir.ok) images=await ir.json();
  }
  const imageMap={};
  images.forEach(i=>{if(!imageMap[i.product_id])imageMap[i.product_id]=i.image_url});
  const rows=products.map(p=>{
   const slug=p.categories?.slug||'';
   const section=slug.includes('new-phone')?'new':slug.includes('second-hand')?'used':slug.includes('accessor')?'accessories':slug.includes('repair')?'repair':'other';
   return {...p,section,image:imageMap[p.id],meta:[p.storage,p.condition].filter(Boolean).join(' • ')||'Available',price:money(p.sale_price??p.price),tag:p.condition?'VERIFIED USED':p.is_featured?'FEATURED':section==='new'?'NEW':'AVAILABLE'};
  });
  const groups={new:rows.filter(p=>p.section==='new'),used:rows.filter(p=>p.section==='used'),accessories:rows.filter(p=>p.section==='accessories'),repair:rows.filter(p=>p.section==='repair')};
  document.getElementById('newProducts').innerHTML=groups.new.length?groups.new.map(card).join(''):'';
  document.getElementById('usedProducts').innerHTML=groups.used.length?groups.used.map(card).join(''):'';
  document.getElementById('accessoryProducts').innerHTML=groups.accessories.length?groups.accessories.map(card).join(''):'';
  if(groups.repair.length){
   const section=document.createElement('section');section.className='section product-section repair-products';section.innerHTML=`<div class="section-head"><div><span class="kicker">REPAIR PRODUCTS & SERVICES</span><h2>Repairing.<br><em>With clear pricing.</em></h2></div><p class="section-intro">Services and repair items added from the admin panel.</p></div><div class="product-grid">${groups.repair.map(card).join('')}</div>`;
   const used=document.getElementById('used');used.parentNode.insertBefore(section,used);
  }
  return true;
 }catch(e){console.warn('Live catalogue unavailable; using fallback.',e);renderFallback();return false}
}
function initSearch(){const search=document.getElementById('siteSearch');search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.search-product').forEach(c=>{c.style.display=!q||c.dataset.name.includes(q)?'':'none'});if(q){const first=[...document.querySelectorAll('.search-product')].find(c=>c.style.display!=='none');first?.scrollIntoView({behavior:'smooth',block:'center'})}})}
const menu=document.getElementById('menuBtn');menu?.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='72px';nav.style.right='5vw';nav.style.background='#fff';nav.style.padding='16px';nav.style.border='1px solid #ddd';nav.style.borderRadius='16px';nav.style.flexDirection='column';nav.style.gap='6px';nav.style.boxShadow='0 20px 45px #0002'});
(async()=>{await loadLiveCatalogue();initSearch();const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.12});document.querySelectorAll('.section,.repair-wrap,.about-strip,.product-card').forEach(el=>{el.classList.add('reveal');observer.observe(el)})})();