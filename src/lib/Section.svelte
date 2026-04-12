<script>
	import { fly } from 'svelte/transition';

	// Using Svelte 5 snippets for children
	let { children, id } = $props();

	let isVisible = $state(false);
	let sectionRef = $state();

	$effect(() => {
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
		<div class="section-inner" in:fly={{ y: 30, duration: 1000 }}>
			{@render children()}
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

	.section-inner::after {
		content: '';
		display: block;
		flex-shrink: 0;
		align-self: center;
		width: 75%;
		max-width: 56rem;
		margin: 3rem auto 0;
		height: 1px;
		background: var(--accent-color);
	}
</style>
