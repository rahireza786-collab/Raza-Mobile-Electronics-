const form=document.querySelector('#productForm');
const type=document.querySelector('#productType');
const usedOnly=document.querySelectorAll('.used-only');
const autoOnly=document.querySelectorAll('.auto-only');
function syncType(){const used=type?.value==='second-hand';usedOnly.forEach(x=>x.hidden=!used);autoOnly.forEach(x=>x.hidden=false);document.querySelector('#typeHint').textContent=used?'Technical details are automatic. Add the phone’s real photos, condition and selling details.':'Technical details and product information are automatic. Add only your store-specific selling details.'}
type?.addEventListener('change',syncType);syncType();
function previewFiles(){const box=document.querySelector('#photoPreview');box.innerHTML='';[...document.querySelector('#actualPhotos').files].forEach((f,i)=>{const url=URL.createObjectURL(f);const item=document.createElement('div');item.className='photo-preview';item.innerHTML=`<img src="${url}" alt=""><span>${i===0?'MAIN PHOTO':'PHOTO '+(i+1)}</span>`;box.appendChild(item)})}
document.querySelector('#actualPhotos')?.addEventListener('change',previewFiles);
document.querySelector('#productForm')?.addEventListener('submit',e=>{e.preventDefault();alert('Editor तैयार है। अगला publish step Supabase Storage में photos upload करके product + specifications save करेगा।')});