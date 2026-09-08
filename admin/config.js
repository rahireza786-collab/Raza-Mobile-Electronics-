window.RAZA_SUPABASE_ANON_KEY=['sb_publishable_','g4l-OO-1x1X4LMM-','c5cnXA_DItmM14F'].join('');

(function(){
  function initStoreSettings(){
    if(!window.supabase)return setTimeout(initStoreSettings,50);
    const S='https://iljmxsfcjuutppftsrrt.supabase.co', K=window.RAZA_SUPABASE_ANON_KEY;
    const sb=window.supabase.createClient(S,K);
    const panel=document.getElementById('settings');
    if(!panel)return setTimeout(initStoreSettings,100);
    const grid=panel.querySelector('.setting-grid');
    if(!grid)return setTimeout(initStoreSettings,100);
    if(document.getElementById('announcementText'))return;
    const css=document.createElement('style');css.textContent=`
      .hero-control{grid-column:1/-1;margin-top:12px;padding:22px;border:1px solid #e3dfd4;border-radius:18px;background:linear-gradient(135deg,#fffdf8,#f6f1e5);box-shadow:0 14px 40px #1111110d}
      .hero-control-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:14px;flex-wrap:wrap}.hero-control-head b{font:900 15px Manrope}.hero-control-head span{font-size:10px;color:#777;letter-spacing:1.2px}.hero-control-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(220px,.6fr);gap:14px;align-items:end}.hero-drop{border:1.5px dashed #c9b77a;border-radius:14px;padding:18px;background:#fff;cursor:pointer;transition:.2s}.hero-drop:hover{border-color:#111;transform:translateY(-1px)}.hero-drop input{display:none}.hero-drop strong{display:block;font:900 12px Manrope}.hero-drop small{display:block;color:#777;margin-top:6px}.hero-preview{position:relative;min-height:170px;border-radius:14px;overflow:hidden;background:#071426;display:grid;place-items:center}.hero-preview img{width:100%;height:170px;object-fit:contain;display:block}.hero-preview.empty:before{content:'No custom hero image yet';color:#ffffff66;font:700 11px Manrope;letter-spacing:1px}.hero-actions{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:12px}.hero-actions button{border:0;border-radius:10px;padding:11px 14px;font:900 10px Manrope;cursor:pointer}.hero-save{background:#111;color:#fff}.hero-remove{background:#f0dede;color:#9d2525}.hero-status{font-size:10px;color:#777}.hero-select{width:100%;padding:12px;border:1px solid #ddd9ce;border-radius:10px;background:#fff;font:700 12px Manrope}.hero-mini{font-size:10px;color:#777;line-height:1.5;margin-top:7px}
      @media(max-width:700px){.hero-control-grid{grid-template-columns:1fr}.hero-preview{min-height:150px}.hero-preview img{height:150px}}
    `;document.head.appendChild(css);

    const announcement=document.createElement('label');
    announcement.style.gridColumn='1/-1';
    announcement.innerHTML='TOP RUNNING ANNOUNCEMENT<input id="announcementText" maxlength="240" placeholder="Welcome to Raza Mobile & Electronics · New phones · Repairing · Accessories"><small style="display:block;margin-top:6px;color:#777">Whatever you save here will run across the top of the customer website. The website ticker is intentionally slow and pauses on hover.</small>';
    grid.appendChild(announcement);
    const active=document.createElement('label');
    active.innerHTML='ANNOUNCEMENT STATUS<select id="announcementActive"><option value="true">Running / Live</option><option value="false">Hidden</option></select>';
    grid.appendChild(active);

    const hero=document.createElement('div');
    hero.className='hero-control';
    hero.innerHTML=`<div class="hero-control-head"><div><b>HERO IMAGE CONTROL</b><div class="hero-mini">Customer website ke hero section ki main image yahin se change karein. Image upload hote hi website par automatically show hogi.</div></div><span>LIVE WEBSITE VISUAL</span></div><div class="hero-control-grid"><label class="hero-drop" for="heroImageFile"><strong>＋ CHOOSE HERO IMAGE</strong><small>JPG, PNG ya WebP · recommended 1600×1000 or larger · max 8MB</small><input id="heroImageFile" type="file" accept="image/jpeg,image/png,image/webp"></label><div><label>ANIMATION EFFECT<select class="hero-select" id="heroAnimation"><option value="float">Soft Float — Recommended</option><option value="zoom">Slow Premium Zoom</option><option value="drift">Gentle Drift</option><option value="none">No Animation</option></select></label><div class="hero-preview empty" id="heroPreview"></div></div></div><div class="hero-actions"><button type="button" class="hero-save" id="saveHeroSettings">Save Hero Image →</button><button type="button" class="hero-remove" id="removeHeroSettings">Remove Custom Image</button><span class="hero-status" id="heroStatus"></span></div>`;
    panel.appendChild(hero);

    const actions=document.createElement('div');
    actions.style='grid-column:1/-1;display:flex;align-items:center;gap:12px;margin-top:4px;flex-wrap:wrap';
    actions.innerHTML='<button type="button" class="primary" id="saveStoreSettings">Save Store Settings →</button><span id="settingsStatus" style="font-size:12px;color:#777"></span>';
    panel.appendChild(actions);

    async function load(){
      const r=await sb.from('store_settings').select('id,announcement_text,announcement_active').eq('id',1).maybeSingle();
      if(r.data){document.getElementById('announcementText').value=r.data.announcement_text||'';document.getElementById('announcementActive').value=String(r.data.announcement_active!==false)}
      else if(r.error)document.getElementById('settingsStatus').textContent='Could not load store settings: '+r.error.message;
      const hr=await sb.from('site_settings').select('key,value,image_url').in('key',['hero_image','hero_animation']);
      const hm={};(hr.data||[]).forEach(x=>hm[x.key]=x);
      const heroUrl=hm.hero_image?.image_url||hm.hero_image?.value||'';
      const preview=document.getElementById('heroPreview');
      if(heroUrl){preview.classList.remove('empty');preview.innerHTML='<img src="'+heroUrl.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'" alt="Current hero">'}
      document.getElementById('heroAnimation').value=hm.hero_animation?.value||'float';
    }

    document.getElementById('saveStoreSettings').onclick=async()=>{
      const status=document.getElementById('settingsStatus'), text=document.getElementById('announcementText').value.trim();
      status.textContent='Saving…';
      const ses=(await sb.auth.getSession()).data.session;
      if(!ses){status.textContent='Session expired. Login again.';return}
      const payload={id:1,announcement_text:text||'Welcome to Raza Mobile & Electronics',announcement_active:document.getElementById('announcementActive').value==='true',updated_at:new Date().toISOString()};
      const r=await sb.from('store_settings').upsert(payload,{onConflict:'id'}).select().maybeSingle();
      status.textContent=r.error?'Could not save: '+r.error.message:'✓ Saved successfully. Refresh the customer website to see the latest announcement.';
    };

    const heroFile=document.getElementById('heroImageFile'), heroPreview=document.getElementById('heroPreview'), heroStatus=document.getElementById('heroStatus');
    heroFile.onchange=()=>{const f=heroFile.files?.[0];if(!f)return;if(f.size>8*1024*1024){heroFile.value='';heroStatus.textContent='Image 8MB se chhoti honi chahiye.';return}heroPreview.classList.remove('empty');heroPreview.innerHTML='';const img=document.createElement('img');img.src=URL.createObjectURL(f);img.alt='New hero preview';heroPreview.appendChild(img);heroStatus.textContent=f.name+' selected — Save Hero Image dabayein.'};

    document.getElementById('saveHeroSettings').onclick=async()=>{
      heroStatus.textContent='Saving hero image…';
      const ses=(await sb.auth.getSession()).data.session;if(!ses){heroStatus.textContent='Session expired. Login again.';return}
      const file=heroFile.files?.[0];
      let url='';
      const old=await sb.from('site_settings').select('id,value,image_url').eq('key','hero_image').maybeSingle();
      url=old.data?.image_url||old.data?.value||'';
      if(file){
        const safe=file.name.toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/-+/g,'-');
        const path='hero/'+Date.now()+'-'+safe;
        const up=await sb.storage.from('product-images').upload(path,file,{cacheControl:'31536000',upsert:false,contentType:file.type});
        if(up.error){heroStatus.textContent='Upload failed: '+up.error.message;return}
        url=S+'/storage/v1/object/public/product-images/'+path;
      }
      if(!url){heroStatus.textContent='Pehle hero image choose karein.';return}
      const imageRow=await sb.from('site_settings').upsert({key:'hero_image',value:url,image_url:url,updated_at:new Date().toISOString()},{onConflict:'key'}).select().maybeSingle();
      if(imageRow.error){heroStatus.textContent='Could not save image setting: '+imageRow.error.message;return}
      const anim=document.getElementById('heroAnimation').value;
      const animRow=await sb.from('site_settings').upsert({key:'hero_animation',value:anim,image_url:null,updated_at:new Date().toISOString()},{onConflict:'key'}).select().maybeSingle();
      if(animRow.error){heroStatus.textContent='Image saved, animation setting failed: '+animRow.error.message;return}
      heroStatus.textContent='✓ Hero image saved. Website par latest image + animation live ho gaya.';
      if(file)heroFile.value='';
    };

    document.getElementById('removeHeroSettings').onclick=async()=>{
      if(!confirm('Custom hero image remove karke default flagship hero lagana hai?'))return;
      heroStatus.textContent='Removing custom hero…';
      const ses=(await sb.auth.getSession()).data.session;if(!ses){heroStatus.textContent='Session expired. Login again.';return}
      const r=await sb.from('site_settings').delete().eq('key','hero_image');
      if(r.error){heroStatus.textContent='Could not remove: '+r.error.message;return}
      heroPreview.classList.add('empty');heroPreview.innerHTML='';heroStatus.textContent='✓ Custom hero removed. Website default flagship hero use karegi.';
    };
    load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initStoreSettings);else initStoreSettings();
})();