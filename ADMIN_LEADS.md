# MindWave Admin Leads

The current MindWave site exposes a read-only protected dashboard at `/admin/leads`.

Authentication uses Better Auth backed by the dedicated `mindwave_admin` Postgres database. Access is restricted by the comma-separated `MW_ADMIN_EMAILS` environment variable; the initial value is `ovandobrown@gmail.com`.

The MindWave server proxies lead reads to `RAAS_API_URL` using the server-only `RAAS_ADMIN_KEY` header. The browser never receives the RAAS key and never connects directly to Postgres. CSV export uses the same protected server route.

Required production setup:

1. Create database `mindwave_admin` inside `mw-postgres`.
2. Create a dedicated database user and grant it only access to `mindwave_admin`.
3. Set `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `MW_ADMIN_EMAILS`, `RAAS_API_URL`, and `RAAS_ADMIN_KEY` in the MindWave runtime.
4. Set the same `RAAS_ADMIN_KEY` in the RAAS API runtime.
5. Apply the Better Auth schema before first login.
6. Register the allowlisted admin account at `/login`, then verify `/admin/leads` and CSV export.

This version intentionally has no lead edit/delete controls. A future management phase may add an analytics section showing visitors from the approved analytics service alongside lead records.

