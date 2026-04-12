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
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100dvh;
		padding: 0;
		background-color: var(--root-bg-color);
	}

	/* Section.svelte wraps content in an inner div (transition wrapper). */
	:global(#home > div) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
