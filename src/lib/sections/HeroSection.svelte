<div class="hero-content">
	<!-- <img src="/pinecorn_blk.png" alt="Brand Logo" class="hero-logo" /> -->
	<h1 class="hero-title">barega</h1>
	<p class="hero-subtitle">Innovative Solutions for Modern Brands</p>
</div>

<style>
	.hero-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		color: white;
		z-index: 10; /* Ensures it stays above the background pseudo-element */
	}

	.hero-logo {
		height: 120px; /* Larger than the navbar icon */
		margin-bottom: 1.5rem;
		filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
	}

	.hero-title {
		font-family: 'Copperplate Gothic', serif;
		font-size: clamp(2rem, 8vw, 4rem);
		text-transform: uppercase;
		letter-spacing: 4px;
		margin: 0;
		text-shadow: var(--root-bg-color) 4px 4px;
	}

	.hero-subtitle {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		font-style: italic;
		margin-top: 10px;
		opacity: 0.9;
	}
</style>
