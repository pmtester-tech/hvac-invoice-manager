# HVAC Invoice Manager

Free, mobile-first, single-file HVAC and refrigeration invoice web app. No accounts, backend, subscriptions, paid APIs, or third-party JavaScript dependencies.

## Features
- Customer records with phone, email and service address
- Service history with equipment, repairs, parts and labor hours
- Invoice line items, tax, sequential invoice numbers, due dates
- Print / Save as PDF using your browser's native printing
- Prepare customer email in the device's mail app (`mailto:`)
- Paid/unpaid tracking and outstanding balance dashboard
- JSON export/import backups

## Run locally
Open `index.html` in a browser. For reliable browser storage, prefer hosting it using GitHub Pages instead of opening it as a `file://` URL.

## Publish free with GitHub Pages
1. Create a **public** GitHub repository, e.g. `hvac-invoice-manager`.
2. Upload `index.html` and `README.md` to the repository root.
3. In repository **Settings > Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)` and save.
4. Open the Pages URL GitHub gives you on your phone, then use the browser's **Add to Home Screen** feature if desired.
5. In **Settings / Backup**, enter your business details and export regular backups.

**Privacy and limitations:** The application code is public on GitHub Pages, but customer records remain in that browser's local storage and are not committed to GitHub. This is **not** encrypted storage or a cloud database. Anyone with access to the device/browser profile may access records. Browser resets, private browsing, or storage eviction can destroy records. Back up after every workday. There is no automatic synchronization between devices, authentication, payment processing, automatic email sending, or automatic PDF attachment. The email button opens a draft only. The print button uses the device's native PDF printing. Invoice totals are calculated using JavaScript floating-point arithmetic; check invoices before sending. Tax rules vary by jurisdiction. This is a starter app, not accounting software.

## Mobile service-call screen (v1.1)
Open **New Service Call** to select a customer, record job type, equipment, work and materials, enter labor hours/rate, materials cost and service fee, then choose **Save & create invoice**. The service record is saved and the invoice form is prefilled with charges and notes; review the invoice and select **Save invoice** to finalize. The **Service History** screen also has an **Invoice** shortcut for previously saved jobs.

## v1.2 Data protection upgrades (November 2026)
- IndexedDB primary record copy with original `hvac_invoice_manager_v1` localStorage mirror preserved for compatibility. On startup, the newer timestamped copy is loaded; existing legacy records migrate automatically.
- Manual dated IndexedDB snapshots (last 15) and restore confirmation. **Local snapshots are not off-device backups.**
- Daily on-screen backup reminder and complete JSON download / restore.
- CSV exports for customers, service history and invoices.
- Manual private Google Drive backup and phone/computer transfer workflow. **No Google OAuth, background upload, automatic cloud sync or multi-device merge is implemented.**
- Use only one device for edits until a true authenticated sync backend is implemented. Always export a JSON backup *before* replacing the app and after a workday.

### Upgrade safely
1. On the original app URL and browser, open Settings / Backup and export JSON. Verify that the file exists and keep it outside the phone.
2. Replace `index.html` in GitHub, leaving the GitHub Pages URL unchanged.
3. Reopen the URL in the **same browser/profile**. The app will migrate its original localStorage records to IndexedDB. Check customer and invoice counts.
4. If records are missing, restore the JSON file from Settings / Backup. Do not delete the old browser data before verifying.
5. Download a new JSON backup daily and privately upload it to Google Drive or another off-device location. Never commit customer backups to GitHub.

### Notes
IndexedDB writes are asynchronous and device/browser storage can be evicted. The app is not a substitute for a dedicated, audited accounting system. Restoring a backup replaces the current dataset; it does not merge changes. Exporting to a file does not guarantee the file was saved; check your Downloads/Files app. The reminder runs when the dashboard is opened, not as a background notification.

## v1.3 Encrypted backup files
Settings / Backup now offers **Download encrypted backup**. Enter and confirm a unique password of at least 12 characters. The app encrypts the complete JSON dataset in your browser using Web Crypto AES-256-GCM with PBKDF2-HMAC-SHA256 (310,000 iterations), random 16-byte salt and random 12-byte IV. The exported `.hvacbackup` file contains ciphertext and encryption parameters, not the password. No external APIs or subscriptions.

To restore, select the `.hvacbackup` file under Restore, enter its password, and confirm replacement of current records. Previous unencrypted `.json` backups can still be restored. **Never lose the password**: there is no reset or recovery. Verify downloaded files and test restore on a spare browser/profile before depending on them. Encryption requires HTTPS (GitHub Pages works) or localhost. The original localStorage/IndexedDB data, local snapshots, CSV exports and legacy JSON export are **not encrypted**. This is backup-file encryption, not full app/device encryption. Do not put any backups in a public GitHub repository.

## v1.4 App lock + encrypted local records
- In **Settings / Backup**, first download and verify a password-encrypted `.hvacbackup` file and keep it off-device.
- Enter and confirm a **new app password (12+ characters)** under **App lock and encrypted local records**, then select **Enable encrypted local storage**.
- The current dataset is encrypted with Web Crypto AES-256-GCM and stored in IndexedDB. The old `hvac_invoice_manager_v1` localStorage mirror is deleted after encryption succeeds. Old plaintext local snapshots are cleared and the snapshot feature is disabled in encrypted mode.
- On the next page load, enter the app password to unlock; **Lock app now** locks the current session. The app password is not stored. There is **no password reset**. An independently saved encrypted backup is essential.
- Encryption is optional and requires HTTPS (GitHub Pages) or localhost and browser IndexedDB support. The app lock protects against casual access to the open web app, not against malware or someone with control of your unlocked device.
- **Important limitations:** browser/device caches, previously downloaded unencrypted backups, CSV files, printouts, other browser profiles, and storage remnants are not erased or encrypted by this upgrade. The app stays unlocked until you press Lock or reload/close it; there is no inactivity timeout. The backup password and app password may differ. Encryption does not replace off-device backups.
- When upgrading from v1.3, retain the same GitHub Pages URL and browser. Export a backup **before** updating, then enable encryption only after confirming that your existing records are present.