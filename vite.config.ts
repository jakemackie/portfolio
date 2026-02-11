import { defineConfig, PluginOption } from 'vite'
import tailwindcss from '@tailwindcss/vite'

function fullReload(): PluginOption {
  return {
    name: 'full-reload',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.css') || file.endsWith('.php')) {
        server.ws.send({ type: 'full-reload' })
        return []
      }
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), fullReload()],
  server: {
    cors: true,
    origin: 'http://localhost:5173',
  },
  build: {
    outDir: 'dist',
    manifest: true,
    rollupOptions: {
      input: 'src/main.ts',
    },
  },
})
