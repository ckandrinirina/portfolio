import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // User page (ckandrinirina.github.io) uses '/'.
  // Project page (e.g., /ck-portfolio/) uses '/<repo-name>/'.
  // Update asset references in public/ if changing this value.
  base: '/',
  plugins: [react()],
})
