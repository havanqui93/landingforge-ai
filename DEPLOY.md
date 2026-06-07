# Deploying LandingForge to Vercel

The daily landing automation runs as a **Vercel Cron** job, so it only works on
a deployed Vercel project. This is a one-time setup.

## 1. Import the repo into Vercel

Go to **https://vercel.com/new** and import `havanqui93/landingforge-ai`.
Framework auto-detects as **Next.js** — keep the defaults and deploy.

> Use *Import* (not the "Deploy" clone button) since you already own this repo.

## 2. Add a Vercel KV store

Generated landings are stored in Vercel KV (serverless functions can't write
files into the deployed bundle).

- Vercel dashboard → your project → **Storage** → **Create Database** → **KV**
  (Upstash Redis) → connect it to this project.
- This injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
- Redeploy once after linking so the function picks up the new env vars.

## 3. (Optional) Lock down the cron endpoint

Add an env var **`CRON_SECRET`** (any random string) in Project → Settings →
Environment Variables. Vercel automatically sends it as a Bearer token to the
cron route; manual calls must then include it too.

## 4. Verify

The cron schedule lives in [`vercel.json`](./vercel.json):
`0 0 * * *` UTC = **07:00 ICT (UTC+7)**. Change the cron to shift the timezone.

You don't have to wait for the schedule — trigger it on demand:

```bash
curl https://<your-deployment>.vercel.app/api/cron/daily-landing
# with CRON_SECRET set:
curl -H "Authorization: Bearer <secret>" \
  https://<your-deployment>.vercel.app/api/cron/daily-landing
```

A successful run returns `{ "ok": true, "slug": "YYYY-MM-DD-...", ... }`, and the
new page is immediately live at `/l/<slug>` and on the home page `/`.

## Notes

- On the Vercel **Hobby** plan, crons run once per day at a best-effort minute
  (a daily schedule is fine). Exact timing needs the Pro plan.
- Without KV configured the cron route returns `503` and the app still serves
  the static, file-based landings — so local dev and builds never break.
