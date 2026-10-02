import { useEffect, useState } from "react"
import { fallbackData, loadSiteData, type SiteData } from "./api"

/** Starts on fallback links (so CTAs work instantly), then swaps in backend data. */
export function useSiteData(): SiteData {
  const [data, setData] = useState(fallbackData)
  useEffect(() => {
    loadSiteData().then(setData)
  }, [])
  return data
}
