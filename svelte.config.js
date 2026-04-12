import adapter from '@sveltejs/adapter-static'; // Change this line
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: '404.html' // Best for Single Page Apps (SPA)
    }),
    paths: {
      // Must match the repo segment: https://<user>.github.io/<this>/
      // If your GitHub repo path differs, change this string (e.g. '/barega_bar').
      base: process.env.NODE_ENV === 'production' ? '/barega-bar' : '',
    }
  }
};

export default config;