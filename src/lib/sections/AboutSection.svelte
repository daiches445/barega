<script>
	// import { base } from '$app/paths';
	import { fly } from 'svelte/transition';

	let isVisible = $state(false);
	/**
	 * @type {Element}
	 */
	let container;

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					// Once it's visible, we stop observing to ensure it only happens once
					observer.unobserve(container);
				}
			},
			{ threshold: 0.2 }
		); // Trigger when 20% of the element is visible

		observer.observe(container);

		return () => observer.disconnect();
	});
</script>

<div bind:this={container} class="about-container">
	{#if isVisible}
		<div class="text-wrapper" dir="rtl">
			<h2 class="section-title m-plus-1p-bold" in:fly={{ y: 20, duration: 800, delay: 1000 }}>
				בואו לחוות את הרגע
			</h2>

			<p class="section-text m-plus-1p-bold" in:fly={{ y: 20, duration: 800, delay: 1200 }}>
				בשמחה! הנה תרגום ששומר על האווירה המזמינה והיוקרתית של הבר: Barega הוא בר יין וקוקטיילים
				אינטימי השוכן בלב העיר. אנו מתגאים בתפריט יינות שנאצר בקפידה מרחבי העולם, לצד קוקטיילים
				הנרקחים במיומנות מרכיבים מקומיים וטריים. האווירה אצלנו חמה ומזמינה, מה שהופך את המקום לנקודה
				המושלמת לערב רומנטי, לבילוי עם חברים או למשקה שקט אחרי יום עבודה. בין אם אתם מביני עניין
				ביין ובין אם אתם פשוט מחפשים מקום נהדר להירגע בו – ב-Barega כל אחד ימצא את המקום שלו.
			</p>
		</div>
		<!-- <img
			src="{base}/about_side_pic.jpg"
			alt="Barega interior"
			class="about-logo"
			in:fly={{ y: 20, duration: 2000, delay: 600 }}
		/> -->
	{/if}
</div>

<style>
	.about-container {
		min-height: 0;
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		flex-wrap: nowrap;
		gap: 1.5rem;
		text-align: right;
		justify-content: flex-end;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.about-logo {
		width: min(260px, 28vw);
		max-width: 100%;
		height: auto;
		flex-shrink: 0;
		display: block;
		margin: 0;
		box-shadow: 2px 2px black;
		border-radius: 12px;
	}

	.text-wrapper {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		flex: 1 1 auto;
		min-width: 0;
		margin: 0;
		text-align: right;
	}

	.section-title {
		width: 100%;
		font-size: clamp(3rem, 8vw, 6.5rem);
		font-family: var(--font-heading);
		font-weight: 900;
		margin: 0 0 1rem;
		padding: 0;
		line-height: 1.1;
		letter-spacing: 0;
		text-align: center;
		font-style: italic;
		transform: skewX(-16deg);
		/* Single large cast shadow stretching below the title */
		text-shadow: 0 4px 0 var(--text-shadow);
	}

	.section-text {
		width: 100%;
		font-size: clamp(1.25rem, 2.1vw, 1.55rem);
		font-weight: 700;
		line-height: 1.9;
		max-width: none;
		margin: 0;
		padding: 0;
		text-align: center;
		color: var(--text-color);
		position: relative;
		z-index: 1;
	}

	@media (max-width: 768px) {
		.about-container {
			flex-direction: column;
			flex-wrap: wrap;
			align-items: stretch;
			justify-content: flex-start;
			text-align: right;
		}

		.text-wrapper {
			margin: 0;
		}

		.about-logo {
			width: 100%;
			max-width: 100%;
			margin: 0 auto 1rem;
			box-sizing: border-box;
		}
	}
</style>
