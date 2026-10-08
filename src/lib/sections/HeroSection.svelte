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
		const gapBeforeAbout = 32;
		// Match .hero-bg-card::after inset (1.25rem desktop / 0.85rem mobile)
		const frameInset = window.matchMedia('(max-width: 768px)').matches ? 13.6 : 20;
		const frameBottom = rect.bottom - frameInset;
		const desiredTopInViewport = window.innerHeight * 0.5 - th / 2;
		const minTopInViewport = rect.top + pad;
		// Rest BAREGA on the pink outline (straddle the bottom edge)
		let maxTopInViewport = frameBottom - h1Height * 0.5;
		// Never collide with the about section title
		const aboutTitle = document.querySelector('#about .section-title') as HTMLElement | null;
		if (aboutTitle) {
			const aboutTop = aboutTitle.getBoundingClientRect().top;
			maxTopInViewport = Math.min(maxTopInViewport, aboutTop - th - gapBeforeAbout);
		}
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

	const subtitleIndex = $derived(
		Math.min(subtitles.length - 1, Math.floor(progress * 1.25 * subtitles.length))
	);

	const useDarkInk = $derived(progress > 0.56);
</script>

<div class="hero-shell">
	<div
		class="hero-bg-card"
		bind:this={cardEl}
		style:background-image="url({base}/home_background.jpg)"
	>
		<div class="hero-overlay"></div>
		<!-- Frame underneath — BAREGA sits on top of the line -->
		<div class="hero-frame" aria-hidden="true"></div>
		<div class="hero-content">
			<div
				class="hero-text-track"
				class:hero-text-track--ink-dark={useDarkInk}
				bind:this={textEl}
				style:top="{textTop}px"
			>
				<h1 class="hero-title" bind:this={titleEl}>barega</h1>
				<p
					class="hero-subtitle"
					class:hero-subtitle--pine={subtitleIndex === 2}
				>
					{subtitles[subtitleIndex]}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-shell {
		flex: 1 1 auto;
		min-height: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: stretch;
		justify-content: stretch;
		padding: 0;
		box-sizing: border-box;
	}

	.hero-bg-card {
		position: relative;
		flex: 1 1 auto;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 0;
		border: none;
		box-shadow: none;
		/* Must stay visible so the title can flow past the image bottom */
		overflow: visible;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		border-radius: 0;
		z-index: 0;
	}

	/* Frame under the title */
	.hero-frame {
		position: absolute;
		inset: 1.25rem;
		border: 2px solid var(--pinecone-accent, #d65a7a);
		border-radius: 16px;
		pointer-events: none;
		z-index: 1;
		box-sizing: border-box;
	}

	/* BAREGA on top of the outline */
	.hero-content {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		z-index: 2;
		border-radius: 0;
	}

	.hero-text-track {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: min(92%, 900px);
		display: flex;
		flex-direction: column;
		align-items: center;
		will-change: top;
		transition:
			color 0.35s ease,
			text-shadow 0.35s ease;
	}

	.hero-text-track .hero-title {
		margin: 0;
		font-family: 'Copperplate Gothic', serif;
		font-size: clamp(2.75rem, 12vw, 7rem);
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
		font-size: clamp(1.35rem, 2.8vw, 2.15rem);
		font-style: italic;
		margin-top: 12px;
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

	/* 3rd phase: pinecone accent */
	.hero-text-track .hero-subtitle--pine,
	.hero-text-track--ink-dark .hero-subtitle--pine {
		color: var(--pinecone-accent, #d65a7a);
		text-shadow: 0 1px 0 var(--page-bg);
	}

	@media (max-width: 768px) {
		.hero-frame {
			inset: 0.85rem;
		}
	}
</style>
