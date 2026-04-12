<script>
	import { fly } from 'svelte/transition';

	// Accept isVisible from the Parent (Section component)
	let { isVisible = true } = $props();

	const services = [
		{
			title: 'בר קוקטיילים',
			logo: '🍷', // You can replace these with <img> tags
			text: 'Explore our rotating selection of organic and boutique wines guided by our sommelier. Perfect for both novices and connoisseurs.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
		},
		{
			title: 'בר משקאות',
			logo: '🍸',
			text: 'Signature drinks inspired by seasonal local ingredients and classic mixology techniques.'
		},
		{
			title: 'אירועים פרטיים',
			logo: '✨',
			text: 'Host your next celebration in our warm, intimate space. Custom menus available for groups.'
		}
	];
</script>

<div class="services-grid">
	{#if isVisible}
		{#each services as service, i (i)}
			<div class="service-card" in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
				<div class="card-top">
					<span class="service-icon">{service.logo}</span>
					<h3 class="service-title">{service.title}</h3>
				</div>
				<div class="card-bottom">
					<p class="service-text">{service.text}</p>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.service-card {
		background: #fff;
		border-radius: 12px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		transition: transform 0.3s ease;
	}

	.service-card:hover {
		transform: translateY(-10px);
	}

	.card-top {
		background: #fdfbf7; /* Slightly different background for the top half */
		padding: 2rem;
		text-align: center;
		border-bottom: 1px solid #eee;
		flex: 1; /* Ensures top halves align even if text length varies */
	}

	.service-icon {
		font-size: 3rem;
		display: block;
		margin-bottom: 1rem;
	}

	.service-title {
		font-size: 1.5rem;
		margin: 0;
	}

	.card-bottom {
		padding: 2rem;
		background: white;
		flex: 1;
	}

	.service-text {
		line-height: 1.6;
		margin: 0;
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
