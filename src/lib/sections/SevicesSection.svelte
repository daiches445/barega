<script>
	import { base } from '$app/paths';
	import { env } from '$env/dynamic/public';
	import { fly } from 'svelte/transition';

	// Accept isVisible from the Parent (Section component)
	let { isVisible = true } = $props();

	const cloudName = (env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? '').trim();
	const cloudinaryBg = (publicId) =>
		cloudName
			? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_900,c_fill,g_auto/${publicId}`
			: '';

	const services = [
		{
			title: 'בר קוקטיילים',
			logo: '🍷',
			text: 'מבחר מתחלף של יינות אורגניים ובוטיק, בליווי ייעוץ מקצועי. מושלם גם לחובבים וגם למביני עניין.',
			bgImage: `${base}/about_side_pic.jpg`
		},
		{
			title: 'בר משקאות',
			logo: '🍸',
			text: 'קוקטיילים חתימה בהשראת מרכיבים מקומיים עונתיים וטכניקות מיקסולוגיה קלאסיות.',
			bgImage: cloudinaryBg('IMG_4095_mxwkmz')
		},
		{
			title: 'אירועים פרטיים',
			logo: '✨',
			text: 'חגגו אצלנו בחלל חם ואינטימי. תפריטים מותאמים אישית לאירועים ולקבוצות.',
			bgImage: cloudinaryBg('IMG_4130_o1gwot')
		},
		{
			title: 'חתונות שטח',
			logo: '💍',
			text: 'בר נייד לחתונות בטבע — קוקטיילים ויינות איכותיים, שירות מקצועי ואווירה בלתי נשכחת.',
			bgImage: cloudinaryBg('dm_50_of_86_dvfsvh')
		},
		{
			title: 'צוות מקצועי',
			logo: '👥',
			text: 'ברמנים מנוסים ומסבירי פנים, עם יחס אישי, דיוק בהכנה ושירות ברמה גבוהה לכל אירוע.',
			bgImage: cloudinaryBg('IMG_0807_lyojwx')
		},
		{
			title: 'בר קפה',
			logo: '☕',
			text: 'קפה איכותי, משקאות חמים ומאפים נבחרים — פינה חמה ומזמינה לכל שעה ביום.'
		}
	];
</script>

<div class="services-section" dir="rtl">
	<h2 class="services-heading">מה אנחנו מציעים</h2>
	<div class="services-grid">
		{#if isVisible}
			{#each services as service, i (i)}
				<div class="service-card" in:fly={{ y: 50, duration: 800, delay: i * 200 }}>
					<div
						class="card-top"
						class:card-top--photo={!!service.bgImage}
						style:background-image={service.bgImage ? `url(${service.bgImage})` : undefined}
					>
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
</div>

<style>
	.services-section {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
	}

	.services-heading {
		/* Equal space above & below so title sits centered between divider & cards */
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
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 2px 10px rgba(15, 76, 129, 0.12);
		transition: transform 0.3s ease;
	}

	.service-card:hover {
		transform: translateY(-10px);
	}

	.card-top {
		position: relative;
		isolation: isolate;
		background-color: #fdfbf7;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		padding: 0;
		text-align: right;
		border-bottom: 2px solid var(--text-color, #0f4c81);
		flex: 1;
		min-height: 14rem;
	}

	.card-top--photo::before {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.35);
		z-index: 0;
	}

	.service-icon {
		display: none;
	}

	.service-title {
		position: absolute;
		right: 0;
		bottom: 0;
		left: auto;
		z-index: 1;
		margin: 0;
		padding: 0;
		font-family: var(--font-migdal);
		font-size: clamp(1.85rem, 2.8vw, 2.4rem);
		line-height: 1.15;
		letter-spacing: 0;
		text-transform: none;
		text-align: right;
		color: #fb8728;
		text-shadow: 2px 2px 0 var(--text-color, #0f4c81);
		filter: none;
	}

	.card-top--photo .service-title {
		color: #fb8728;
		text-shadow: 2px 2px 0 var(--text-color, #0f4c81);
	}

	.card-bottom {
		padding: 2rem;
		background: var(--coral-red, #90495b);
		flex: 1;
	}

	.service-text {
		line-height: 1.6;
		margin: 0;
		text-align: right;
		color: var(--text-color, #0f4c81);
	}

	/* Mobile adjustments */
	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
