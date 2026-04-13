<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="site-footer" dir="rtl">
	<div class="footer-inner">
		<div class="footer-brand">
			<strong>BAREGA</strong>
			<p>בר יין וקוקטיילים | חוויה אינטימית בלב העיר</p>
		</div>

		<div class="footer-links">
			<a href="tel:+972501234567">050-123-4567</a>
			<a href="mailto:hello@barega.co.il">hello@barega.co.il</a>
			<a href="https://www.instagram.com/barega_bar/" target="_blank" rel="noopener noreferrer"
				>@barega_bar</a
			>
		</div>
	</div>
	<p class="footer-copy">© {year} Barega. כל הזכויות שמורות.</p>
</footer>

<style>
	.site-footer {
		margin-top: 1rem;
		padding: 2rem 5% 1.2rem;
		background: color-mix(in srgb, var(--page-bg) 80%, #000 20%);
		color: #f5f5f5;
		border-top: 1px solid color-mix(in srgb, var(--accent-color) 40%, transparent);
	}

	.footer-inner {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.2rem;
		flex-wrap: wrap;
	}

	.footer-brand p {
		margin: 0.4rem 0 0;
		opacity: 0.9;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		text-align: right;
	}

	.footer-links a {
		color: #ffffff;
		text-decoration: none;
	}

	.footer-links a:hover {
		text-decoration: underline;
	}

	.footer-copy {
		margin: 1rem 0 0;
		font-size: 0.9rem;
		opacity: 0.8;
	}
</style>
