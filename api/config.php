<?php
// ---- Staff settings (change before any real use) ----
// Simple PIN for the demo. For a hashed PIN, run in a terminal:
//   php -r "echo password_hash('YOUR-PIN', PASSWORD_DEFAULT);"
// and paste the result into STAFF_PIN_HASH (then STAFF_PIN is ignored).
const STAFF_PIN = '1234';
const STAFF_PIN_HASH = '';
const SITE_SALT = '417fccbdf0673a4d33168134be2d9974f72ae9fcaa8920e6df42730dfd4aa966';
const MAX_REPORTS_PER_10_MIN = 15; // per device/network, to limit spam
