import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind sert uniquement au composant "convoyeur" (src/components/ui) : le reste du site reste en CSS Modules.
  plugins: [react(), tailwindcss()],
})
