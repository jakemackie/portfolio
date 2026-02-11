import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'main.js',
        assetFileNames: 'style[extname]',
      },
    },
  },
})
