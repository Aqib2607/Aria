import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../backend/public',
    emptyOutDir: false, // Don't wipe index.php or .htaccess
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor';
            if (id.includes('recharts')) return 'charts';
            if (id.includes('framer-motion')) return 'motion';
            if (id.includes('lucide-react') || id.includes('sonner') || id.includes('react-hot-toast')) return 'ui';
          }
        }
      }
    }
  }
})
