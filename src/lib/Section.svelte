<script lang="ts">
	let { id, title, children, isFullBleed = false } = $props();
</script>

<section {id} class="section-wrapper" class:full-bleed={isFullBleed}>
	<div class="container">
		{#if title}
			<h2>{title}</h2>
		{/if}
		{@render children()}
	</div>
</section>

<style>
	.section-wrapper {
		min-height: 100vh;
		min-height: 100dvh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		/* Remove default padding if it's full-bleed */
	}

	.section-wrapper:not(.full-bleed) {
		padding: 4rem 2rem;
	}

	.container {
		max-width: 1200px;
		width: 90%;
		margin: 0 auto;
	}
</style>
