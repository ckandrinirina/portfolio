// Import defineConfig from vitest/config so the `test` block is typed; it
// re-exports Vite's defineConfig, so plugins and base behave identically.
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Base path: '/' for user page (ckandrinirina.github.io)
// For project page deployment, change to '/<repo-name>/'
export default defineConfig({
  // User page (ckandrinirina.github.io) uses '/'.
  // Project page (e.g., /ck-portfolio/) uses '/<repo-name>/'.
  // Update asset references in public/ if changing this value.
  base: '/',
  plugins: [react(), tailwindcss()],
  // Vitest config — ignored by `vite build`.
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
