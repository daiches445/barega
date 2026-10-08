<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Section from '$lib/Section.svelte';
	import AboutSection from '$lib/sections/AboutSection.svelte';
	import ContactUsSection from '$lib/sections/ContactUsSection.svelte';
	import Footer from '$lib/Footer.svelte';
	import GallerySection from '$lib/sections/GallerySection.svelte';
	import HeroSection from '$lib/sections/HeroSection.svelte';
	import OpinionsSection from '$lib/sections/OpinionsSection.svelte';
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
	<Section id="home">
		<HeroSection />
	</Section>

	<Section id="about">
		<AboutSection />
	</Section>

	<Section id="services">
		<SevicesSection />
	</Section>
	<Section id="gallery">
		<GallerySection />
	</Section>
	<Section id="opinions">
		<OpinionsSection />
	</Section>
	<Section id="contact">
		<ContactUsSection />
	</Section>
	<Footer />
</main>

<style>
	:global(#home) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: calc(100dvh - var(--main-top-offset));
		min-height: calc(100dvh - var(--main-top-offset));
		padding: 0 !important;
	}

	:global(#home > div) {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		min-height: 0;
	}

	:global(#home .section-divider) {
		display: none;
	}

	:global(#about) {
		/* Extra room so hero sticky text clears the about title */
		padding-top: 9rem;
		padding-bottom: 0 !important;
	}

	:global(#services) {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}

	:global(#gallery) {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}

	:global(#opinions) {
		padding-top: 0 !important;
		padding-bottom: 0 !important;
	}
</style>
