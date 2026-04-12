import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Yutu/', // GitHub Pages 仓库名（需与 GitHub 仓库名大小写一致）
})
