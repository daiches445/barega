<script lang="ts">
	let { items } = $props(); // Pass nav items as props
	let isScrolled = $state(false);

	// Update navbar background on scroll
	if (typeof window !== 'undefined') {
		window.onscroll = () => {
			isScrolled = window.scrollY > 50;
		};
	}

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<nav class="navbar" class:scrolled={isScrolled}>
	<!-- <button class="brand" onclick={() => scrollToSection('home')}>
		<img src="/pinecorn_blk.png" alt="Logo" class="logo-icon" />
		<h3 class="brand-title">BAREGA</h3>
	</button> -->
	<div>
		{#each items as item (item.id)}
			<button onclick={() => scrollToSection(item.id)}>
				{item.label}
			</button>
		{/each}
	</div>
</nav>

<!-- <style>
	.navbar {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		z-index: 1000;

		/* Glassmorphism background */
		background: rgba(255, 255, 255, 0.1); /* Very transparent */
		backdrop-filter: blur(12px); /* The blurry effect */
		-webkit-backdrop-filter: blur(12px);

		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-links button,
	.logo {
		background: none;
		border: none;
		cursor: pointer;
		font-weight: bold;

		/* THE CONTRAST TRICK */
		color: white;
		mix-blend-mode: difference;

		/* Difference mode can sometimes look 'neon'. 
       Using an isolation layer on the parent or 
       keeping the color white usually yields the best results. */
	}
</style> -->

<style>
	.brand {
		display: flex;
		align-items: center; /* Vertically centers the icon and text */
		gap: 12px; /* Space between icon and title */
		cursor: pointer;
	}

	.logo-icon {
		height: 40px; /* Adjust size as needed */
		width: auto; /* Maintains aspect ratio */
		object-fit: contain;

		/* Apply the blend mode if you want it to change color like the text */
		mix-blend-mode: difference;
	}

	.brand-title {
		font-family: var(--font-heading); /* Using your Copperplate font */
		font-size: 1.2rem;
		margin: 0; /* Removes default h3 spacing */
		mix-blend-mode: difference;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: rgb(208, 126, 38);
		text-shadow: whitesmoke 1px 1px;
		white-space: nowrap; /* Prevents the title from wrapping on small screens */
	}
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%); /* Pull back by half its width to center */
		width: 90%;
		gap: 2rem;
		padding: 1rem;
		transition: background 0.3s;
		z-index: 1000;
		direction: rtl;
		/* background-color: bisque; */
		border-radius: 10px;
	}
	/* .scrolled {
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	} */

	.navbar.scrolled {
		background: rgba(255, 255, 255, 0.95); /* Turns solid white (or nearly solid) */
		color: #1a1a1a; /* Buttons and Title turn dark gray/black */
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		top: 10px; /* Optional: snaps closer to top when scrolling */
	}
	/* If your logo needs to change color too, you can use a filter */
	.navbar.scrolled .logo-icon {
		filter: invert(1); /* Inverts a white logo to black */
	}
	.nav-links button,
	.brand-title {
		color: inherit; /* They take the color from .navbar */
		background: none;
		border: none;
		font-family: 'Copperplate Gothic', serif;
		cursor: pointer;
		transition: color 0.4s ease;
	}
</style>
