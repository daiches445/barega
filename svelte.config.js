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
      // Replace 'your-repo-name' with your actual GitHub repository name
      base: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
    }
  }
};

export default config;