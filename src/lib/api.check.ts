// Run: node --experimental-strip-types src/lib/api.check.ts   (needs Node 22.6+)
import assert from "node:assert/strict"
import http from "node:http"
import { fallbackData, loadSiteData } from "./api.ts"

type Body = unknown
async function withServer(routes: Record<string, Body | number>, run: (env: object) => Promise<void>) {
  const srv = http.createServer((req, res) => {
    const hit = Object.entries(routes).find(([p]) => req.url!.startsWith(`/rest/v1/${p}`))?.[1]
    if (typeof hit === "number" || hit === undefined) return void res.writeHead((hit as number) ?? 404).end("{}")
    assert.equal(req.headers.apikey, "anon", "anon key sent")
    res.end(JSON.stringify(hit))
  })
  await new Promise<void>((r) => srv.listen(0, r))
  const url = `http://localhost:${(srv.address() as { port: number }).port}`
  try { await run({ VITE_SUPABASE_URL: url, VITE_SUPABASE_ANON_KEY: "anon" }) } finally { srv.close() }
}

async function main() {
  console.warn = () => {} // expected failures below are noisy

  // 1. Unconfigured: site still works on fallback links, no story, no support.
  assert.deepEqual(await loadSiteData({}), fallbackData)

  // 2. Healthy backend: overrides apply, blank values ignored, support_url appears only if set, empty resources stay empty.
  await withServer(
    {
      site_settings: [
        { key: "whatsapp_url", value: "https://wa.example/x" },
        { key: "instagram_url", value: "" },
        { key: "support_url", value: "https://pay.example/y" },
      ],
      stories: [{ slug: "sundaresan", title: "Meet Sundaresan." }],
      resources: [],
    },
    async (env) => {
      const d = await loadSiteData(env)
      assert.equal(d.settings.whatsapp_url, "https://wa.example/x")
      assert.equal(d.settings.instagram_url, fallbackData.settings.instagram_url)
      assert.equal(d.settings.support_url, "https://pay.example/y")
      assert.equal(d.stories[0].slug, "sundaresan")
      assert.deepEqual(d.resources, [])
    },
  )

  // 3. Backend down (500s): never rejects; links fall back; no support_url invented.
  await withServer({ site_settings: 500, stories: 500, resources: 500 }, async (env) => {
    const d = await loadSiteData(env)
    assert.deepEqual(d, fallbackData)
    assert.equal(d.settings.support_url, undefined)
  })
  console.log("api.check OK")
}
main()
