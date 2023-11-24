// vite.config.singlefile.js
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
    build: {},
    css: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        }
    },
    plugins: [viteSingleFile()],
})