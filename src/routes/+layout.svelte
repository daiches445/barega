<script lang="ts">
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import FloatingContactBar from '$lib/FloatingContactBar.svelte';
	import ScrollProgress from '$lib/ScrollProgress.svelte';
	import '../app.css';
	let { children } = $props();

	const fontFaceCss = `@font-face{font-family:'Copperplate Gothic';src:url('${base}/fonts/OPTICopperplate-Heavy.otf') format('opentype');font-weight:700;font-style:normal}@font-face{font-family:'Copperplate Gothic';src:url('${base}/fonts/OPTICopperplate-Light.otf') format('opentype');font-weight:400;font-style:normal}`;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{@html `<style>${fontFaceCss}</style>`}
</svelte:head>
<ScrollProgress />
<FloatingContactBar />
{@render children()}
