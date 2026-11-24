# CMUbiotrage (XAMPP / PHP version)

## Run on your PC (XAMPP)
1. Copy the `CMUBioTriage` folder into `C:\xampp\htdocs\`.
2. In XAMPP Control Panel start **Apache** only (no MySQL needed).
3. Open `http://localhost/CMUBioTriage/`.
4. Staff login PIN is `1234` (change it in `api/config.php`).

## Open it on a phone
- **Same Wi-Fi:** run `ipconfig`, then open `http://YOUR-PC-IP/CMUBioTriage/`. Allow Apache in Windows Firewall. Over plain http the phone blocks GPS, install and offline mode.
- **Full features (https):** keep XAMPP running and use a tunnel (`ngrok http 80` or Cloudflare Tunnel), then open the https address.

## Folder layout
```
CMUBioTriage/
├── index.html            page
├── manifest.json         PWA manifest
├── sw.js                 service worker (offline cache; must stay in root)
├── .htaccess, netlify.toml
├── assets/
│   ├── css/styles.css    all styles (dark, light, sunlight modes)
│   ├── js/app.js         app logic
│   ├── data/data.json    all guide content (numbers, hospitals, options)
│   ├── img/              background images
│   ├── icons/icon.svg
│   └── vendor/leaflet/   Leaflet map library (its own CSS stays separate)
└── api/                  PHP backend
    ├── config.php        PIN + settings (blocked from web)
    ├── _lib.php          shared helpers (blocked from web)
    ├── session.php       staff login / logout / check
    ├── reports.php       users POST reports; staff GET them
    ├── report.php        staff: mark handled / reopen / delete
    └── _data/            stored reports, audit log, throttle (blocked from web)
```

## Notes
- Edit `assets/data/data.json` and replace the `[... confirm with UH]` placeholders with real numbers.
- Change `STAFF_PIN` and `SITE_SALT` in `api/config.php` before real use.
- After changing any file, bump the cache name in `sw.js` and `assets/js/app.js` (now `cmubiotrage-v23`), then hard-refresh (Ctrl+Shift+R).
- Netlify cannot run PHP; `netlify.toml` blocks `/api/*` there so PHP source is never exposed.
- Reports are plain JSON on disk: fine for a class demo, not for real patient data.
