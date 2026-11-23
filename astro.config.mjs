import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hkalhl.org',
  output: 'static',
  build: {
    format: 'directory',
  },
});
