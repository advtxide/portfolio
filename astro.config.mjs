import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  prefetch: {
    prefetchAll: true,
  },

  integrations: [tailwind({ applyBaseStyles: false }), react()],
  adapter: vercel({
    maxDuration: 30,
    webAnalytics: {
      enabled: true
    }
  })
});