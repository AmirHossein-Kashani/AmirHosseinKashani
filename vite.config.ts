import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` is set so assets resolve correctly when deployed to
// https://<user>.github.io/AmirHosseinKashani/. The `asset()` helper
// in src/utils/asset.ts prepends BASE_URL to public/ assets referenced
// from data files at runtime so they keep working under that prefix.
export default defineConfig({
    base: '/AmirHosseinKashani/',
    plugins: [react(), tailwindcss()],
    server: {
          port: 3000,
          host: '127.0.0.1',
    },
})
