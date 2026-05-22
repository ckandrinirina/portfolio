import { defineConfig } from 'vite'
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
})
