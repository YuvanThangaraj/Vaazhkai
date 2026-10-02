# Vaazhkai backend setup (Supabase)

Read-only public backend: 3 tables, RLS, seed data. No admin UI, no auth, no forms (the site has none).

## 1. Create the project
Supabase dashboard -> New project (free tier is fine). Nothing else to enable: no Auth providers, no Storage bucket.

## 2. Run the database setup (in order)
SQL Editor -> paste and run:
1. `supabase/migrations/20261002000000_init.sql`
2. `supabase/migrations/20261002000100_story_image_alt.sql`
3. `supabase/seed.sql` (safe to re-run; never overwrites existing rows)

Or with the Supabase CLI: `supabase link --project-ref <ref> && supabase db push`, then run `seed.sql` in the SQL editor.
For a local stack, `supabase start` / `supabase db reset` applies both automatically.

## 3. Environment variables
Copy `.env.example` to `.env.local` and fill in (Project Settings -> API):

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | Project URL |
| `VITE_SUPABASE_ANON_KEY` | `anon` public key |

Vite bakes these in at build time, so set the same two variables in your hosting/build environment. The anon key is public by design; RLS is what protects the data. Never use or expose the `service_role` key.

## What the public can do
- Read every row of `site_settings` (so never store secrets there), plus `stories`/`resources` where `published = true`.
- Write nothing. No insert/update/delete policies or grants exist.
- Edit content via the Supabase Table Editor (that is the "admin" for now).

## Settings keys
`site_name`, `tagline`, `whatsapp_url`, `instagram_url`, `linkedin_url`.
`support_url` is deliberately **not** seeded: no real support/donation URL exists. When one does, insert a `support_url` row and the Support CTA can appear (wired in Phase 2).
The community-animals link lives in `resources`.

## How the site uses it (Phase 2)
- **Links:** every WhatsApp / Instagram / LinkedIn link reads `site_settings`. Change a URL in the Table Editor and the whole site follows.
- **Stories:** the Sundaresan section renders the newest published story and its nav/footer "Stories" links exist only when one exists. `image_key` must match a file name in `src/assets/` (without `.jpg`); `image_alt` is its alt text.
- **Resources:** every published resource becomes a link in the "Understanding changes fear" section.
- **Support:** shown (involved grid + footer) only when a `support_url` row exists.
- **Resilience:** if Supabase is unconfigured or down, the site still loads. The three social links and the community-animals link fall back to the same verified URLs as `seed.sql` (`fallbackData` in `src/lib/api.ts`; keep the two in sync). Stories are not mirrored, so the Sundaresan section is hidden until the backend responds. Support never has a fallback.

## Check
`node --experimental-strip-types src/lib/api.check.ts` exercises the loader (unconfigured / healthy / backend-down) against a local mock. No Supabase needed.
