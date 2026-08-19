const newPhones=[
{name:'iPhone 15 Pro',meta:'256GB • New',price:'₹64,999',tag:'NEW',image:'https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=900&q=85'},
{name:'Samsung Galaxy S23',meta:'128GB • New',price:'₹39,999',tag:'NEW',image:'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85'},
{name:'OnePlus 12R',meta:'256GB • New',price:'₹34,999',tag:'POPULAR',image:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85'},
{name:'Redmi Note Series',meta:'8GB / 128GB • New',price:'₹18,999',tag:'VALUE',image:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85'}];
const usedPhones=[
{name:'iPhone 13',meta:'128GB • Good condition',price:'₹31,999',tag:'VERIFIED USED',image:'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=85'},
{name:'Samsung S22',meta:'128GB • Excellent',price:'₹27,999',tag:'CHECKED',image:'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b5?auto=format&fit=crop&w=900&q=85'},
{name:'OnePlus 11',meta:'256GB • Good condition',price:'₹29,999',tag:'VERIFIED USED',image:'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85'},
{name:'iPhone 12',meta:'128GB • Good condition',price:'₹25,999',tag:'CHECKED',image:'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?auto=format&fit=crop&w=900&q=85'}];
const accessories=[
{name:'Premium TWS Earbuds',meta:'Wireless • New',price:'₹1,499',tag:'POPULAR',image:'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85'},
{name:'Smart Watch',meta:'Smart • New',price:'₹2,499',tag:'SMART',image:'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=85'},
{name:'Wireless Headphones',meta:'Bluetooth • New',price:'₹2,999',tag:'AUDIO',image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'},
{name:'Fast Charger',meta:'Type-C • New',price:'₹799',tag:'ESSENTIAL',image:'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85'}];
const allProducts=[...newPhones.map(p=>({...p,section:'new'})),...usedPhones.map(p=>({...p,section:'used'})),...accessories.map(p=>({...p,section:'accessories'}))];
function card(p){return `<article class="product-card search-product" data-name="${p.name.toLowerCase()} ${p.meta.toLowerCase()}" data-section="${p.section}"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="pill">${p.tag}</span><span class="image-shine"></span></div><div class="product-info"><small>${p.meta}</small><h3>${p.name}</h3><div class="price-row"><span class="price">${p.price}</span><a class="arrow" href="https://wa.me/919534715178?text=Hello%20Raza%20Mobile%2C%20I%20want%20to%20know%20about%20${encodeURIComponent(p.name)}" target="_blank">↗</a></div></div></article>`}
document.getElementById('newProducts').innerHTML=newPhones.map(card).join('');
document.getElementById('usedProducts').innerHTML=usedPhones.map(card).join('');
document.getElementById('accessoryProducts').innerHTML=accessories.map(card).join('');
const search=document.getElementById('siteSearch');
search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();document.querySelectorAll('.search-product').forEach(card=>{card.style.display=!q||card.dataset.name.includes(q)?'':'none'});if(q){const first=[...document.querySelectorAll('.search-product')].find(c=>c.style.display!=='none');first?.scrollIntoView({behavior:'smooth',block:'center'})}});
const menu=document.getElementById('menuBtn');
menu?.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='72px';nav.style.right='5vw';nav.style.background='#fff';nav.style.padding='16px';nav.style.border='1px solid #ddd';nav.style.borderRadius='16px';nav.style.flexDirection='column';nav.style.gap='6px';nav.style.boxShadow='0 20px 45px #0002'});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in-view')}),{threshold:.12});
document.querySelectorAll('.section,.repair-wrap,.about-strip,.product-card').forEach(el=>{el.classList.add('reveal');observer.observe(el)});