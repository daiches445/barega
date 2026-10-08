<script lang="ts">
	import { fly } from 'svelte/transition';

	let { isVisible = true } = $props();

	const opinions = [
		{
			quote: 'מקום עם אווירה מושלמת. הקוקטיילים מדויקים והצוות פשוט מקסים. חזרנו כבר פעמיים.',
			name: 'נועה ויואב',
			detail: 'ערב זוגי'
		},
		{
			quote: 'הבר לאירוע שלנו היה מדויק — שירות חלק, משקאות מדהימים, והאורחים עדיין מדברים על זה.',
			name: 'מיכל',
			detail: 'חתונת שטח'
		},
		{
			quote: 'יינות בוטיק, יחס אישי, ופינה שקטה בלב העיר. בדיוק מה שחיפשנו אחרי יום עמוס.',
			name: 'איתי',
			detail: 'לקוח קבוע'
		}
	];
</script>

<div class="opinions-section" dir="rtl">
	<h2 class="opinions-heading">הם אמרו, לא אנחנו</h2>

	{#if isVisible}
		<div class="opinions-list">
			{#each opinions as item, i (i)}
				<blockquote class="opinion" in:fly={{ y: 36, duration: 700, delay: i * 160 }}>
					<p class="opinion__quote">“{item.quote}”</p>
					<footer class="opinion__meta">
						<span class="opinion__name">{item.name}</span>
						<span class="opinion__detail">{item.detail}</span>
					</footer>
				</blockquote>
			{/each}
		</div>
	{/if}
</div>

<style>
	.opinions-section {
		width: 100%;
		max-width: 56rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.opinions-heading {
		margin: 3rem 0;
		font-family: var(--font-gveret-levin);
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		font-weight: 400;
		line-height: 1.15;
		text-align: center;
		color: var(--text-color);
		letter-spacing: 0;
		text-transform: none;
		text-shadow: 0 4px 0 var(--text-shadow);
	}

	.opinions-list {
		display: flex;
		flex-direction: column;
		gap: 2.75rem;
		margin: 0 0 2rem;
	}

	.opinion {
		margin: 0;
		padding: 0 0 0 1.25rem;
		border: none;
		border-inline-start: 3px solid var(--coral-red, var(--pinecone-accent, #d65a7a));
	}

	.opinion__quote {
		margin: 0;
		font-family: var(--font-body);
		font-size: clamp(1.2rem, 2.2vw, 1.55rem);
		font-style: italic;
		line-height: 1.75;
		color: var(--text-color);
		text-align: right;
	}

	.opinion__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: flex-start;
		gap: 0.5rem 1rem;
		margin-top: 1rem;
	}

	.opinion__name {
		font-family: var(--font-migdal);
		font-size: 1.15rem;
		color: var(--coral-red, var(--pinecone-accent, #d65a7a));
	}

	.opinion__detail {
		font-size: 0.95rem;
		color: var(--text-muted);
		opacity: 0.85;
	}
</style>
