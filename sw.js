const CACHE='cmubiotrage-v29', TILES='cmubiotrage-tiles';
const FILES=['./','index.html','manifest.json','assets/css/styles.css','assets/js/app.js','assets/data/data.json','assets/icons/icon.svg','assets/img/bg-scales.jpg','assets/img/bg-snake.jpg','assets/img/bg-python.jpg','assets/img/bg-hex.svg','assets/vendor/leaflet/leaflet.js','assets/vendor/leaflet/leaflet.css','assets/vendor/leaflet/images/marker-icon.png','assets/vendor/leaflet/images/marker-icon-2x.png','assets/vendor/leaflet/images/marker-shadow.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('cmubiotrage-')&&x!==CACHE&&x!==TILES).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request; if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.hostname==='tile.openstreetmap.org'){
  e.respondWith(caches.open(TILES).then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{c.put(r,res.clone());return res}).catch(()=>Response.error()))));return;}
 if(u.origin!==location.origin||u.pathname.includes('/api/'))return;
 e.respondWith(
  new Promise((resolve,reject)=>{const t=setTimeout(reject,3000);fetch(r).then(res=>{clearTimeout(t);resolve(res)},err=>{clearTimeout(t);reject(err)})})
   .then(res=>{if(res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(r,copy))}return res})
   .catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html')))
 );
});
