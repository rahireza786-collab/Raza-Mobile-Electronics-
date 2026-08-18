const newPhones=[
 {name:'iPhone 15 Pro',meta:'256GB • New',price:'₹64,999',tag:'NEW',type:'device'},
 {name:'Samsung Galaxy S23',meta:'128GB • New',price:'₹39,999',tag:'NEW',type:'alt'},
 {name:'OnePlus 12R',meta:'256GB • New',price:'₹34,999',tag:'POPULAR',type:'device'},
 {name:'Redmi Note Series',meta:'8GB / 128GB • New',price:'₹18,999',tag:'VALUE',type:'alt'}
];
const usedPhones=[
 {name:'iPhone 13',meta:'128GB • Good condition',price:'₹31,999',tag:'VERIFIED USED',type:'device'},
 {name:'Samsung S22',meta:'128GB • Excellent',price:'₹27,999',tag:'CHECKED',type:'alt'},
 {name:'OnePlus 11',meta:'256GB • Good condition',price:'₹29,999',tag:'VERIFIED USED',type:'device'},
 {name:'iPhone 12',meta:'128GB • Good condition',price:'₹25,999',tag:'CHECKED',type:'alt'}
];
function card(p){return `<article class="product-card"><div class="product-image"><span class="pill">${p.tag}</span><div class="device ${p.type}"></div></div><div class="product-info"><small>${p.meta}</small><h3>${p.name}</h3><div class="price-row"><span class="price">${p.price}</span><a class="arrow" href="https://wa.me/919534715178?text=Hello%20Raza%20Mobile%2C%20I%20want%20to%20know%20about%20${encodeURIComponent(p.name)}" target="_blank">↗</a></div></div></article>`}
document.getElementById('newProducts').innerHTML=newPhones.map(card).join('');
document.getElementById('usedProducts').innerHTML=usedPhones.map(card).join('');
const menu=document.getElementById('menuBtn');
menu.addEventListener('click',()=>{const nav=document.querySelector('nav');nav.style.display=nav.style.display==='flex'?'none':'flex';nav.style.position='absolute';nav.style.top='68px';nav.style.right='6vw';nav.style.background='#fff';nav.style.padding='18px';nav.style.border='1px solid #ddd';nav.style.borderRadius='14px';nav.style.flexDirection='column';nav.style.gap='18px';});