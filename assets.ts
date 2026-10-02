// Maps a DB `image_key` (e.g. "vaazhkai-cat") to the bundled file in src/assets/. Unknown key -> undefined.
const files = import.meta.glob<string>("../assets/*.jpg", { eager: true, import: "default" })
export const assetUrl = (key?: string | null) => (key ? files[`../assets/${key}.jpg`] : undefined)
