// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { spawnSync } from 'node:child_process'
import { existsSync, renameSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const scriptPath = resolve(__dirname, 'check-assets.mjs')
const cvPath = resolve(repoRoot, 'public/cv/erick-andrinirina-cv.pdf')
const cvPathRelative = 'public/cv/erick-andrinirina-cv.pdf'
const tempCvPath = resolve(repoRoot, 'public/cv/.erick-andrinirina-cv.pdf.bak')

function runScript() {
  return spawnSync('node', [scriptPath], { cwd: repoRoot, encoding: 'utf8' })
}

describe('scripts/check-assets.mjs', () => {
  it('exits with code 0 when all required assets are present', () => {
    expect(existsSync(cvPath)).toBe(true)

    const result = runScript()

    expect(result.status).toBe(0)
  })

  describe('when the CV PDF is missing', () => {
    beforeEach(() => {
      if (existsSync(cvPath)) renameSync(cvPath, tempCvPath)
    })

    afterEach(() => {
      if (existsSync(tempCvPath)) renameSync(tempCvPath, cvPath)
    })

    it('exits with a non-zero code', () => {
      expect(existsSync(cvPath)).toBe(false)

      const result = runScript()

      expect(result.status).not.toBe(0)
    })

    it('prints a human-readable error naming the missing file path', () => {
      const result = runScript()

      const output = (result.stderr ?? '') + (result.stdout ?? '')
      expect(output).toMatch(/ERROR/i)
      expect(output).toContain(cvPathRelative)
    })
  })
})
