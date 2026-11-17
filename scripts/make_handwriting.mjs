// Génère src/data/handwritingGlyphs.ts à partir de la police Hershey "Script 1-stroke" (tracés à un seul trait).
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
const require = createRequire(import.meta.url)
const hershey = require('hersheytext')
const font = hershey.getFontData('scripts')
const out = {}
for (let c = 33; c <= 126; c++) {
  const ch = String.fromCharCode(c)
  const g = font.getChar(ch)
  if (g && g.d) out[ch] = { d: g.d, w: g.width }
}
const sp = font.getChar(' ')
const body = `// Fichier généré par scripts/make_handwriting.mjs — ne pas modifier à la main.\nexport const SPACE_WIDTH = ${sp ? sp.width : 10}\nexport const glyphs: Record<string, { d: string; w: number }> = ${JSON.stringify(out)}\n`
writeFileSync('src/data/handwritingGlyphs.ts', body)
console.log(Object.keys(out).length, 'glyphes')
