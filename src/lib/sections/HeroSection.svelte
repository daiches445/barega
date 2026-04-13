<script lang="ts">
	import { base } from '$app/paths';

	const subtitles = [
		'WINE & COCKTAIL BAR',
		'Fine wines & crafted cocktails',
		'Step inside — your evening starts here'
	];

	let cardEl = $state<HTMLDivElement | undefined>();
	let textEl = $state<HTMLDivElement | undefined>();
	let titleEl = $state<HTMLHeadingElement | undefined>();
	let progress = $state(0);
	let textTop = $state(0);

	function clamp01(n: number) {
		return Math.min(1, Math.max(0, n));
	}

	function updateProgress() {
		if (typeof window === 'undefined') return;
		// Longer range = slower transitions over more scroll distance.
		const range = window.innerHeight * 0.7;
		progress = clamp01(window.scrollY / range);
	}

	function updateTextTop() {
		if (typeof window === 'undefined') return;
		if (!cardEl || !textEl) return;
		const rect = cardEl.getBoundingClientRect();
		const th = textEl.offsetHeight;
		const h1Height = titleEl?.offsetHeight ?? 0;
		const pad = 28;
		const desiredTopInViewport = window.innerHeight * 0.5 - th / 2;
		const minTopInViewport = rect.top + pad;
		// Allow the track to sit lower: stop when ~half of the h1 crosses the card's bottom edge.
		const maxTopInViewport = rect.bottom - h1Height * 0.5;
		const clampedTopInViewport = Math.max(
			minTopInViewport,
			Math.min(desiredTopInViewport, maxTopInViewport)
		);
		textTop = Math.max(0, clampedTopInViewport - rect.top);
	}

	function onResize() {
		updateProgress();
		updateTextTop();
	}

	$effect(() => {
		updateProgress();
		updateTextTop();
		const onScroll = () => {
			updateProgress();
			updateTextTop();
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
	});

	$effect(() => {
		if (!cardEl || !textEl) return;
		updateTextTop();
		const ro = new ResizeObserver(() => updateTextTop());
		ro.observe(cardEl);
		ro.observe(textEl);
		if (titleEl) ro.observe(titleEl);
		return () => ro.disconnect();
	});

	const subtitleIndex = $derived(Math.min(subtitles.length - 1, Math.floor(progress * 1.25 * subtitles.length)));

	/** Switch to dark ink earlier, while text is still mostly within image boundaries. */
	const useDarkInk = $derived(progress > 0.56);
</script>

<div class="hero-shell">
	<div
		class="hero-bg-card"
		bind:this={cardEl}
		style:background-image="url({base}/home_background.jpg)"
	>
		<div class="hero-overlay"></div>
		<div class="hero-content">
			<div
				class="hero-text-track"
				class:hero-text-track--ink-dark={useDarkInk}
				bind:this={textEl}
				style:top="{textTop}px"
			>
				<h1 class="hero-title" bind:this={titleEl}>barega</h1>
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
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 32px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		box-shadow: 0 18px 34px rgba(0, 0, 0, 0.32);
		overflow: visible;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		border-radius: inherit;
	}

	.hero-content {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		z-index: 1;
		border-radius: inherit;
	}

	.hero-text-track {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: min(92%, 900px);
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
