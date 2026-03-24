<script>
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
		<div class="text-wrapper">
			<h2 class="section-title" in:fly={{ y: 20, duration: 800, delay: 1000 }}>
				.בואו לחיות את הרגע
			</h2>

			<p class="section-text" in:fly={{ y: 20, duration: 800, delay: 1200 }}>
				בשמחה! הנה תרגום ששומר על האווירה המזמינה והיוקרתית של הבר: Barega הוא בר יין וקוקטיילים
				אינטימי השוכן בלב העיר. אנו מתגאים בתפריט יינות שנאצר בקפידה מרחבי העולם, לצד קוקטיילים
				הנרקחים במיומנות מרכיבים מקומיים וטריים. האווירה אצלנו חמה ומזמינה, מה שהופך את המקום לנקודה
				המושלמת לערב רומנטי, לבילוי עם חברים או למשקה שקט אחרי יום עבודה. בין אם אתם מביני עניין
				ביין ובין אם אתם פשוט מחפשים מקום נהדר להירגע בו – ב-Barega כל אחד ימצא את המקום שלו.
			</p>
		</div>
		<img
			src="/about_side_pic.jpg"
			alt="Pinecone Logo"
			class="about-logo"
			in:fly={{ y: 20, duration: 2000, delay: 600 }}
		/>
	{/if}
</div>

<style>
	.about-container {
		min-height: 400px; /* Helps avoid layout shift before the elements load */
		display: flex;
		flex-direction: row;
		align-items: right;
		text-align: right;
		justify-content: flex-end;
	}

	.about-logo {
		width: 400px;
		height: auto;
		margin-bottom: 10px;
		margin: 0px 40px;
		box-shadow: 2px 2px black;
		border-radius: 12px;
	}

	.text-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* max-width: 600px; */
		margin-right: 40px;
	}
	.section-title {
		color: #333;
		font-size: clamp(2rem, 4vw, 4rem);
		font-family: var(--font-heading);
		margin: 0;
	}

	.section-text {
		color: #150202;
		font-size: clamp(1rem, 2vw, 2rem);
		line-height: 1.5;
		max-width: 800px;
	}
</style>
