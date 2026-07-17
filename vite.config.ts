import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: set base to '/' for username.github.io repos (root-level deploy)
// For project repos, use: base: '/repo-name/'
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/' : '/',
})
