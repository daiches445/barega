<script lang="ts">
	const subtitles = [
		'WINE & COCKTAIL BAR',
		'Fine wines & crafted cocktails',
		'Step inside — your evening starts here'
	];

	let cardEl = $state<HTMLDivElement | undefined>();
	let textEl = $state<HTMLDivElement | undefined>();
	let progress = $state(0);
	let maxTranslate = $state(0);

	function clamp01(n: number) {
		return Math.min(1, Math.max(0, n));
	}

	function updateProgress() {
		if (typeof window === 'undefined') return;
		const range = window.innerHeight * 0.72;
		progress = clamp01(window.scrollY / range);
	}

	function updateMaxTranslate() {
		if (!cardEl || !textEl) return;
		const ch = cardEl.clientHeight;
		const th = textEl.offsetHeight;
		const pad = 28;
		maxTranslate = Math.max(0, ch / 2 - th / 2 - pad);
	}

	function onResize() {
		updateProgress();
		updateMaxTranslate();
	}

	$effect(() => {
		updateProgress();
		window.addEventListener('scroll', updateProgress, { passive: true });
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('scroll', updateProgress);
			window.removeEventListener('resize', onResize);
		};
	});

	$effect(() => {
		if (!cardEl || !textEl) return;
		updateMaxTranslate();
		const ro = new ResizeObserver(() => updateMaxTranslate());
		ro.observe(cardEl);
		ro.observe(textEl);
		return () => ro.disconnect();
	});

	const subtitleIndex = $derived(
		Math.min(subtitles.length - 1, Math.floor(progress * subtitles.length))
	);

	/** When text sits lower on the image, bias toward light-on-dark; later scroll → dark for page bg contrast */
	const useDarkInk = $derived(progress > 0.78);

	const translateY = $derived(progress * maxTranslate);
</script>

<div class="hero-shell">
	<div class="hero-bg-card" bind:this={cardEl}>
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<div
				class="hero-text-track"
				class:hero-text-track--ink-dark={useDarkInk}
				bind:this={textEl}
				style:transform="translate3d(0, {translateY}px, 0)"
			>
				<h1 class="hero-title">barega</h1>
				<p class="hero-subtitle">{subtitles[subtitleIndex]}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-shell {
		flex: 1 1 auto;
		min-height: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 0;
		box-sizing: border-box;
	}

	.hero-bg-card {
		position: relative;
		width: 90%;
		height: calc(90% - 36px);
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
		z-index: 1;
	}

	.hero-text-track {
		display: flex;
		flex-direction: column;
		align-items: center;
		will-change: transform;
		transition:
			color 0.35s ease,
			text-shadow 0.35s ease;
	}

	.hero-text-track .hero-title {
		margin: 0;
		font-family: 'Copperplate Gothic', serif;
		font-size: clamp(2rem, 8vw, 4rem);
		text-transform: uppercase;
		letter-spacing: 4px;
		color: var(--text-on-dark);
		text-shadow: var(--text-shadow) 4px 4px;
		transition:
			color 0.35s ease,
			text-shadow 0.35s ease;
	}

	.hero-text-track .hero-subtitle {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.5rem;
		font-style: italic;
		margin-top: 10px;
		margin-bottom: 0;
		color: var(--text-on-dark);
		opacity: 0.95;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
		transition:
			color 0.35s ease,
			text-shadow 0.35s ease,
			opacity 0.35s ease;
	}

	.hero-text-track--ink-dark .hero-title,
	.hero-text-track--ink-dark .hero-subtitle {
		color: var(--text-color);
		text-shadow: 0 1px 0 var(--page-bg);
	}

	@media (max-width: 768px) {
		.hero-bg-card {
			width: 95%;
			height: calc(95% - 32px);
			border-radius: 24px;
		}
	}
</style>
