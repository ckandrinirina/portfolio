#!/usr/bin/env node
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const ASSETS = [
  'public/cv/erick-andrinirina-cv.pdf',
  'public/favicon.svg',
  'public/profile.jpg',
  'public/og-image.png',
]

const missing = ASSETS.filter((rel) => !existsSync(resolve(repoRoot, rel)))

if (missing.length > 0) {
  for (const rel of missing) {
    console.error(`ERROR: Missing required asset: ${rel}`)
  }
  process.exit(1)
}

console.log(`check-assets: OK (${ASSETS.length} asset${ASSETS.length === 1 ? '' : 's'} verified)`)
