<script lang="ts">
	import { base } from '$app/paths';
	import favicon from '$lib/assets/favicon.svg';
	import FloatingContactBar from '$lib/FloatingContactBar.svelte';
	import '../app.css';
	let { children } = $props();

	const fontFaceCss = [
		`@font-face{font-family:'Copperplate Gothic';src:url('${base}/fonts/OPTICopperplate-Heavy.otf') format('opentype');font-weight:700;font-style:normal}`,
		`@font-face{font-family:'Copperplate Gothic';src:url('${base}/fonts/OPTICopperplate-Light.otf') format('opentype');font-weight:400;font-style:normal}`,
		`@font-face{font-family:'Migdal Haemeq';src:url('${base}/fonts/migdal-haemeq/migdalfontwin-webfont.woff') format('woff'),url('${base}/fonts/migdal-haemeq/migdalfontwin-webfont.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}`
	].join('');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Gveret+Levin&display=swap"
		rel="stylesheet"
	/>
	{@html `<style>${fontFaceCss}</style>`}
</svelte:head>
<FloatingContactBar />
{@render children()}
