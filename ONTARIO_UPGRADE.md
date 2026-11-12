# Ontario multi-business Phase 1–2 (draft)

This release adds two independently configurable business profiles and a versioned, additive migration of legacy HVAC data. **It does not yet implement property rent invoices, expense accounting, separate financial dashboards, or automatic HST reporting.** Existing invoice totals and historical tax values are not recalculated.

## Before upgrading
1. In the existing app, download an encrypted backup and confirm the file exists off-device. Test restoration in a separate browser/profile. Do not share backups in GitHub.
2. Keep using the same GitHub Pages URL and browser profile. Do not deploy this branch directly to production until tested.
3. Confirm your HVAC customer, equipment, service, and invoice counts before and after upgrade.

## Migration
- Keeps the existing localStorage key and IndexedDB database; does not erase original arrays.
- Sets schemaVersion=2, adds businesses with stable IDs hvac/property, sets activeBusinessId=hvac, and creates empty property collections.
- Tags legacy customers, equipment, services and invoices with businessId=hvac only when missing.
- Leaves original settings, invoice numbers, tax calculations and payment flags intact.
- Subsequent loads skip the migration. Existing encrypted vault must be unlocked first.
- Existing backup import and restore paths continue to accept legacy datasets; migration runs on the next render.

## Manual verification before merge
- [ ] Backup and restore legacy plaintext dataset in a disposable browser profile.
- [ ] Backup and restore encrypted dataset in a disposable browser profile.
- [ ] Check customer, equipment, service and invoice counts and totals unchanged.
- [ ] Reload twice; confirm no duplicate business profiles and stable record IDs.
- [ ] Edit both business profiles; reload and confirm persistence.
- [ ] Confirm HST rate is 13 by default, can be edited, and is NOT applied to old invoices.
- [ ] Test mobile viewport, invoice print/PDF, email draft and app lock.
- [ ] Confirm no confidential customer records are present in repository.

## Limitations
This is a foundation, not full accounting software. Business profiles are separate metadata records, but the legacy HVAC screens still use legacy settings and do not yet filter by business ID. Do not use the property profile to issue invoices until a dedicated property module is added. HST registration and eligibility must be confirmed with a Canadian tax professional.
