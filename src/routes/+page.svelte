<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Section from '$lib/Section.svelte';
	import HeroSection from '$lib/sections/HeroSection.svelte';
	const navItems = [
		{ label: '', id: 'home' },
		{ label: 'מי אנחנו', id: 'features' },
		{ label: 'שירותים', id: 'contact' },
		{ label: 'צרו קשר', id: 'contact2' }
	];
</script>

<Navbar items={navItems} />

<main>
	<Section id="home" isFullBleed={true} title="">
		<HeroSection />
	</Section>

	<Section id="features" title="Powerful Features">
		<ul>
			<li>Fast Performance</li>
			<li>Declarative Runes</li>
			<li>Easy Scoping</li>
		</ul>
	</Section>

	<Section id="contact" title="Get in Touch">
		<form>
			<input type="email" placeholder="Email" />
			<button>Send</button>
		</form>
	</Section>
	<Section id="contact2" title="Get in Touch">
		<form>
			<input type="email" placeholder="Email" />
			<button>Send</button>
		</form>
	</Section>
</main>

<style>
	:global(#home) {
		position: relative;
		width: 100%;
		height: 100dvh;
		overflow: hidden; /* Clips the background to this section only */
		background-image:
			linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/home_background.jpg');
		background-size: cover;
		background-position: center;
	}

	:global(#home::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		/* Your Image */
		background-image: url('/home_background.jpg');
		background-size: cover;
		background-position: center;

		/* The "Fixed" Effect Fix */
		background-attachment: scroll; /* Change from fixed to scroll */

		/* This ensures the image stays behind the text */
		z-index: -1;

		/* Optional: If you still want the parallax look without the shake, 
       we can use a subtle transform instead of background-attachment */
	}
</style>
