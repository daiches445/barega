import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/**
 * GitHub **Project** pages need a base path: https://<user>.github.io/<repo>/
 * Set when building for that target only, e.g.:
 *   PUBLIC_BASE_PATH=/barega_bar npm run build
 * Use the exact repo name (case-sensitive path segment). Leave unset for root hosting
 * (custom domain, user/org site, local dev, vite preview).
 */
const base = process.env.PUBLIC_BASE_PATH?.trim() || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base
		}
	}
};

export default config;
