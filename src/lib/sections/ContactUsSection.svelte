<div class="main">
	<div class="contact-wrapper">
		<img class="contact-img" src="/contact_pic.jpg" alt="Contact Image" />
		<div class="contact-info">
			<p><strong>טלפון:</strong> 123-456-7890</p>
			<p><strong>אימייל:</strong></p>
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
		color: rgb(0, 0, 0); /* Contrast against the tomato background */
		border-radius: 15px;
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);

		/* Ensures the info stays on top of the image */
		position: relative;
		z-index: 2;

		text-align: right; /* Since the text is in Hebrew */
		flex-grow: 1;
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
