// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            manualChunks(id) {
                if (id.includes('pdfjs-dist'))
                    return 'vendor.pdfjs';
                if (id.includes('node_modules'))
                    return 'vendor';
            }
        }
    }
})