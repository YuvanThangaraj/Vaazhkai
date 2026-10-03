// Read-only data layer over Supabase's REST API (plain fetch, no SDK).
// Only the PUBLISHABLE key is used, sent as the `apikey` header (never as a Bearer token). RLS is the access control.
type Env = { VITE_SUPABASE_URL?: string; VITE_SUPABASE_PUBLISHABLE_KEY?: string }

export type Story = {
  slug: string
  title: string
  eyebrow: string | null
  excerpt: string | null
  body: string | null
  image_key: string | null
  image_alt: string | null
  published_at: string | null
}

export type Resource = { title: string; url: string }

export type SiteData = {
  settings: Record<string, string>
  stories: Story[]
  resources: Resource[]
}

// ponytail: verified core CTAs must never be dead, even before Supabase is configured or if it is down.
// Duplicates the seed for links only (no story copy, never support_url); drift is possible, so keep in sync with seed.sql.
export const fallbackData: SiteData = {
  settings: {
    whatsapp_url: "https://chat.whatsapp.com/E2aDXu35tNoImBUu4VINGh",
    instagram_url: "https://www.instagram.com/vaazhkai.organization/",
    linkedin_url: "https://www.linkedin.com/company/vaazhkai",
  },
  stories: [],
  resources: [{ title: "Learn about community animals", url: "https://helpanimalsindia.org/about/faq" }],
}

async function select<T>(env: Env, table: string, query: string): Promise<T[]> {
  const { VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: key } = env

console.log("[Supabase config]", {
  urlPresent: Boolean(url),
  publishableKeyPresent: Boolean(key),
})

if (!url || !key) {
  throw new Error("Supabase is not configured (see supabase/README.md)")
}
  const res = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers: { apikey: key },
  })
  if (!res.ok) throw new Error(`Failed to load ${table} (${res.status})`)
  return res.json()
}

// Database text is rendered by React (escaped), but values that become an href must be https: so a bad row
// (e.g. `javascript:`) can never turn into a clickable script link.
const isHttps = (u: string) => {
  try {
    return new URL(u).protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Loads everything the public site shows. Never rejects: each source fails independently.
 * - settings: backend values override fallbacks; blank values and non-https *_url values are ignored; support_url has no fallback (absent = hide Support).
 * - stories: backend only (error or none = section hidden).
 * - resources: backend if reachable (even if empty; non-https links dropped), fallback link only when the request fails.
 */
export async function loadSiteData(
  // Read only the two named variables (never the whole `import.meta.env` object, which Vite would inline in full,
  // shipping every other VITE_* variable in the build environment to the browser).
  env: Env = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  },
): Promise<SiteData> {
  const [settings, stories, resources] = await Promise.allSettled([
    select<{ key: string; value: string }>(env, "site_settings", "select=key,value"),
    select<Story>(
      env,
      "stories",
      "select=slug,title,eyebrow,excerpt,body,image_key,image_alt,published_at&order=published_at.desc.nullslast,created_at.desc",
    ),
    select<Resource>(env, "resources", "select=title,url&order=created_at.asc"),
  ])
  for (const r of [settings, stories, resources]) if (r.status === "rejected") console.warn(r.reason)
  return {
    settings: {
      ...fallbackData.settings,
      ...(settings.status === "fulfilled"
        ? Object.fromEntries(
            settings.value
              .filter((r) => r.value && (!r.key.endsWith("_url") || isHttps(r.value)))
              .map((r) => [r.key, r.value]),
          )
        : {}),
    },
    stories: stories.status === "fulfilled" ? stories.value : [],
    resources: resources.status === "fulfilled" ? resources.value.filter((r) => isHttps(r.url)) : fallbackData.resources,
  }
}
