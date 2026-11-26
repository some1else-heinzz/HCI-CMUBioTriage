# CMUBioTriage (XAMPP / PHP version)

## Run locally (XAMPP)
1. Put the project folder inside XAMPP's `htdocs` directory.
2. Start **Apache** in XAMPP (MySQL is not needed).
3. Open `http://localhost/<folder-name>/`, replacing `<folder-name>` with the project folder's name. Use Apache rather than a static preview server so PHP-backed staff features work.
4. Staff login PIN is `1234` (change it in `api/config.php`).

## Open it on a phone
- **Same Wi-Fi:** find the computer's local IP address and open `http://YOUR-PC-IP/<folder-name>/` on the phone. Allow Apache in the computer's firewall. Over plain HTTP, some phone features such as GPS and app installation may be restricted.
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
- Edit `assets/data/data.json` to update guide wording, contacts, and facility details. Have clinical guidance and emergency contacts reviewed by CMU/UH before public use.
- Change `STAFF_PIN` and `SITE_SALT` in `api/config.php` before real use.
- After changing cached app files, bump the `CACHE` version in `sw.js` (currently `cmubiotrage-v56`) so returning users receive the update; then reload the guide online.
- Netlify cannot run PHP; `netlify.toml` blocks `/api/*` there so PHP source is never exposed.
- This is a pitch prototype. Reports and location data are stored as plain JSON on disk; do not enter real patient information or use this storage for a live service.

## QR and printed materials
- Set poster and pocket-card QR codes to the **deployed HTTPS URL for this guide's public homepage**. There is no production URL or QR image in this project yet, so do not print a QR code made from localhost or a temporary tunnel address.
- Put a short, human-readable fallback URL beside each QR code. Label it clearly, for example: “Scan to open the snakebite response guide. Save it while online for offline use.”
- Test the final printed QR and fallback URL on several phones. A QR scan opens the homepage; it does not send a report or share location.
- First aid text, hospital contacts, and emergency numbers are still demo content and must be confirmed by the local medical and facility reviewers before public distribution.
