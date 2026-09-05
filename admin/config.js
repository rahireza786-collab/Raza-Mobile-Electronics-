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
    const labels=[...grid.querySelectorAll('label')];
    const announcement=document.createElement('label');
    announcement.style.gridColumn='1/-1';
    announcement.innerHTML='TOP RUNNING ANNOUNCEMENT<input id="announcementText" placeholder="Welcome to Raza Mobile & Electronics · New phones · Repairing · Accessories"><small style="display:block;margin-top:6px;color:#777">This message will continuously run across the top of the customer website.</small>';
    grid.appendChild(announcement);
    const active=document.createElement('label');
    active.innerHTML='ANNOUNCEMENT STATUS<select id="announcementActive"><option value="true">Running / Live</option><option value="false">Hidden</option></select>';
    grid.appendChild(active);
    const actions=document.createElement('div');
    actions.style='grid-column:1/-1;display:flex;align-items:center;gap:12px;margin-top:4px';
    actions.innerHTML='<button type="button" class="primary" id="saveStoreSettings">Save Store Settings →</button><span id="settingsStatus" style="font-size:12px;color:#777"></span>';
    panel.appendChild(actions);
    async function load(){
      const r=await sb.from('store_settings').select('id,announcement_text,announcement_active').order('id').limit(1).maybeSingle();
      if(r.data){document.getElementById('announcementText').value=r.data.announcement_text||'';document.getElementById('announcementActive').value=String(r.data.announcement_active!==false)}
    }
    document.getElementById('saveStoreSettings').onclick=async()=>{
      const status=document.getElementById('settingsStatus'), text=document.getElementById('announcementText').value.trim();
      status.textContent='Saving…';
      const ses=(await sb.auth.getSession()).data.session;
      if(!ses){status.textContent='Session expired. Login again.';return}
      const r=await sb.from('store_settings').update({announcement_text:text||'Welcome to Raza Mobile & Electronics',announcement_active:document.getElementById('announcementActive').value==='true',updated_at:new Date().toISOString()}).eq('id',1).select().maybeSingle();
      status.textContent=r.error?'Could not save: '+r.error.message:'✓ Saved. Website announcement will update automatically.';
    };
    load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initStoreSettings);else initStoreSettings();
})();