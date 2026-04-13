<script lang="ts">
	import { base } from '$app/paths';

	type ContactTab = 'email' | 'phone' | 'social';
	let activeTab = $state<ContactTab>('email');
</script>

<div class="main">
	<div class="contact-wrapper">
		<img class="contact-img" src="{base}/contact_pic.jpg" alt="Contact" />
		<div class="contact-info">
			<div class="chips" role="tablist" aria-label="Contact options">
				<button
					type="button"
					role="tab"
					class:chip-active={activeTab === 'email'}
					aria-selected={activeTab === 'email'}
					onclick={() => (activeTab = 'email')}>אימייל</button
				>
				<button
					type="button"
					role="tab"
					class:chip-active={activeTab === 'phone'}
					aria-selected={activeTab === 'phone'}
					onclick={() => (activeTab = 'phone')}>טלפון / וואטסאפ</button
				>
				<button
					type="button"
					role="tab"
					class:chip-active={activeTab === 'social'}
					aria-selected={activeTab === 'social'}
					onclick={() => (activeTab = 'social')}>סושיאל</button
				>
			</div>

			{#if activeTab === 'email'}
				<div class="contact-card" dir="rtl">
					<h3>שלחו לנו הודעה</h3>
					<form class="contact-form" action="mailto:hello@barega.co.il" method="post" enctype="text/plain">
						<input name="name" type="text" placeholder="שם מלא" required />
						<input name="email" type="email" placeholder="אימייל" required />
						<textarea name="message" rows="4" placeholder="איך אפשר לעזור?" required></textarea>
						<button type="submit">שליחה</button>
					</form>
				</div>
			{:else if activeTab === 'phone'}
				<div class="contact-card" dir="rtl">
					<h3>דברו איתנו</h3>
					<p><strong>טלפון:</strong> <a href="tel:+972501234567">050-123-4567</a></p>
					<p><strong>וואטסאפ:</strong> <a href="https://wa.me/972501234567">שליחת הודעה</a></p>
					<p class="small-note">זמינים בדרך כלל בין 10:00-22:00</p>
				</div>
			{:else}
				<div class="contact-card" dir="rtl">
					<h3>עקבו אחרינו באינסטגרם</h3>
					<p>תמונות חדשות, קוקטיילים מיוחדים ועדכונים לאירועים.</p>
					<a class="ig-card" href="https://www.instagram.com/barega_bar/" target="_blank" rel="noopener noreferrer">
						<span class="ig-icon">📸</span>
						<div>
							<strong>@barega_bar</strong>
							<p>מעבר לעמוד האינסטגרם</p>
						</div>
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- <style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 20px;
		padding: 40px 20px;
	}
	.contact-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: whitesmoke;
		border-radius: 20px;
		width: 70%;
		z-index: 2;
	}
	.contact-img {
		width: 400px;
		border-radius: 20px;
		z-index: 1;
	}
	.contact-info {
		margin-top: 20px;
		font-size: 1.2rem;
		width: 120%;
		height: 100%;
		background-color: tomato;
	}
</style> -->
<style>
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 20px;
		padding: 40px 20px;
	}

	.contact-wrapper {
		display: flex;
		flex-direction: row;
		/* Align items center so the overlap looks balanced vertically */
		align-items: center;
		width: 80%; /* Adjusted for better spacing */
		max-width: 1000px;
		margin: 0 auto;
		align-items: stretch; /* Ensures the contact info box stretches to match the image height */
	}

	.contact-img {
		width: 400px; /* Fixed width or percentage */
		height: auto;
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		z-index: 1;
	}

	.contact-info {
		/* This is the magic part */
		margin-left: -150px; /* Pulls the box over the image */
		padding: 40px;
		background-color: whitesmoke;
		border-radius: 15px;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);

		/* Ensures the info stays on top of the image */
		position: relative;
		z-index: 2;

		text-align: right; /* Since the text is in Hebrew */
		flex-grow: 1;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.chips button {
		border: 1px solid var(--accent-color);
		background: white;
		border-radius: 999px;
		padding: 0.4rem 0.85rem;
		cursor: pointer;
		font-family: var(--font-body);
	}

	.chips button.chip-active {
		background: var(--accent-color);
		color: #fff;
	}

	.contact-card h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	.contact-form {
		display: grid;
		gap: 0.6rem;
	}

	.contact-form input,
	.contact-form textarea {
		border: 1px solid #d5d5d5;
		border-radius: 10px;
		padding: 0.6rem 0.75rem;
		font-family: inherit;
		font-size: 0.95rem;
	}

	.contact-form button {
		border: none;
		border-radius: 10px;
		background: var(--accent-color);
		color: #fff;
		padding: 0.7rem;
		cursor: pointer;
		font-weight: 700;
	}

	.ig-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
		padding: 0.75rem;
		border-radius: 12px;
		border: 1px solid #ececec;
		background: #fff;
		color: inherit;
		text-decoration: none;
	}

	.ig-icon {
		font-size: 1.5rem;
	}

	.ig-card p,
	.small-note {
		margin: 0.2rem 0 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	/* Important: Mobile fix */
	@media (max-width: 768px) {
		.contact-wrapper {
			flex-direction: column;
			width: 100%;
		}
		.contact-img {
			width: 100%;
		}
		.contact-info {
			margin-left: 0;
			margin-top: -130px; /* Overlap vertically on mobile instead */
			width: 100%;
		}
	}
</style>
