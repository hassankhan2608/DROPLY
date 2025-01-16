import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DROPLY/' // Replace 'DROPLY' with your repository name
});
