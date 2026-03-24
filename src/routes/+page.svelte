<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Section from '$lib/Section.svelte';
	import AboutSection from '$lib/sections/AboutSection.svelte';
	import ContactUsSection from '$lib/sections/ContactUsSection.svelte';
	import HeroSection from '$lib/sections/HeroSection.svelte';
	import SevicesSection from '$lib/sections/SevicesSection.svelte';
	const navItems = [
		{ label: '', id: 'home' },
		{ label: 'דברו איתנו', id: 'contact' },
		{ label: 'חוות דעת', id: 'opinions' },
		{ label: 'גלריה', id: 'gallery' },
		{ label: 'מה אנחנו מציעים', id: 'services' },
		{ label: 'אודות', id: 'about' }
	];
</script>

<Navbar items={navItems} />

<main>
	<Section id="home" title="">
		<HeroSection />
	</Section>

	<Section id="about" title="">
		<AboutSection />
	</Section>

	<Section id="services" title="Get in Touch">
		<SevicesSection />
	</Section>
	<Section id="contact" title="דברו איתנו">
		<ContactUsSection />
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
