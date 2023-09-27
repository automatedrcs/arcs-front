import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  renderers: ['@astrojs/renderer-react'],
  integrations: [react()],
  vite: {
    // Any Vite-specific configuration goes here
    define: {
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL)
    }
  }
});