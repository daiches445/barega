<script>
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';

	// Using Svelte 5 snippets for children
	let { children, id } = $props();

	const isHome = id === 'home';
	/** Home must mount immediately so the hero image/title are never gated. */
	let isVisible = $state(isHome);
	let sectionRef = $state();

	const pineconeCount = 7;

	$effect(() => {
		if (isHome) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.unobserve(sectionRef);
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef) observer.observe(sectionRef);

		return () => observer.disconnect();
	});
</script>

<section {id} bind:this={sectionRef} class="base-section">
	{#if isVisible}
		<div class="section-inner" in:fly={{ y: isHome ? 0 : 30, duration: isHome ? 0 : 1000 }}>
			{@render children()}
			<div class="section-divider" aria-hidden="true">
				{#each Array(pineconeCount) as _, i (i)}
					<span class="section-divider__pinecone" style:--mask-url="url({base}/pinecone.svg)"
					></span>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.base-section {
		padding: 4rem 2rem;
		min-height: 200px; /* Ensures the observer has something to 'see' */
	}

	.section-inner {
		display: block;
	}

	.section-divider {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.85rem;
		width: 75%;
		max-width: 56rem;
		margin: 3rem auto 0;
		padding: 0;
	}

	.section-divider__pinecone {
		display: inline-block;
		width: 6rem;
		height: 6rem;
		flex-shrink: 0;
		background-color: var(--pinecone-accent, #D65A7A);
		-webkit-mask-image: var(--mask-url);
		mask-image: var(--mask-url);
		-webkit-mask-size: contain;
		mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
	}
</style>
