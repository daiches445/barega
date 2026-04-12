<div class="hero-shell">
	<div class="hero-bg-card">
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<!-- <img src="/pinecorn_blk.png" alt="Brand Logo" class="hero-logo" /> -->
			<h1 class="hero-title">barega</h1>
			<p class="hero-subtitle">WINE & COCKTAIL BAR</p>
		</div>
	</div>
</div>

<style>
	.hero-shell {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 72px;
		box-sizing: border-box;
	}

	.hero-bg-card {
		position: relative;
		width: 80%;
		height: calc(80% - 36px);
		background-image: url('/home_background.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 32px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		box-shadow: 0 18px 34px rgba(0, 0, 0, 0.32);
		overflow: hidden;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
	}

	.hero-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		text-align: center;
		color: white;
		z-index: 1;
	}

	.hero-logo {
		height: 120px; /* Larger than the navbar icon */
		margin-bottom: 1.5rem;
		filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
	}

	.hero-title {
		margin: 0;
		font-family: 'Copperplate Gothic', serif;
		font-size: clamp(2rem, 8vw, 4rem);
		text-transform: uppercase;
		letter-spacing: 4px;
		text-shadow: var(--root-bg-color-light) 4px 4px;
	}

	.hero-subtitle {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		font-style: italic;
		margin-top: 10px;
		opacity: 0.9;
	}

	@media (max-width: 768px) {
		.hero-shell {
			padding-top: 64px;
		}

		.hero-bg-card {
			width: 95%;
			height: calc(95% - 32px);
			border-radius: 24px;
		}
	}
</style>
