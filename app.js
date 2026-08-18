const products=[
 {name:'iPhone 15 Pro',cat:'Smartphones',price:'₹64,999',tag:'New arrival',type:'device'},
 {name:'Samsung Galaxy S23',cat:'Smartphones',price:'₹39,999',tag:'Popular',type:'alt'},
 {name:'iPhone 13 128GB',cat:'Second-hand',price:'₹31,999',tag:'Verified used',type:'device'},
 {name:'Premium TWS Buds',cat:'Audio',price:'₹1,499',tag:'Best seller',type:'audio'},
 {name:'Smart Watch Pro',cat:'Wearables',price:'₹2,999',tag:'New',type:'watch'},
 {name:'OnePlus 12R',cat:'Smartphones',price:'₹34,999',tag:'Hot pick',type:'alt'},
 {name:'AirPods Style Buds',cat:'Audio',price:'₹2,499',tag:'Trending',type:'audio'},
 {name:'AMOLED Smartwatch',cat:'Wearables',price:'₹3,499',tag:'Featured',type:'watch'}
];
const grid=document.getElementById('productGrid');
function render(filter='All'){
 grid.innerHTML=products.filter(p=>filter==='All'||p.cat===filter).map(p=>`<article class="product-card"><div class="product-image"><span class="pill">${p.tag}</span><div class="device ${p.type}"></div></div><div class="product-info"><small>${p.cat}</small><h3>${p.name}</h3><div class="price-row"><span class="price">${p.price}</span><span class="arrow">↗</span></div></div></article>`).join('');
}
render();
document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();const f=el.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===f));render(f);document.getElementById('shop').scrollIntoView({behavior:'smooth'});}));
document.getElementById('menuBtn').addEventListener('click',()=>{const nav=document.querySelector('nav');nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='68px';nav.style.right='6vw';nav.style.background='#fff';nav.style.padding='18px';nav.style.border='1px solid #ddd';nav.style.borderRadius='14px';nav.style.flexDirection='column';nav.style.gap='18px';});