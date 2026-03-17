<script lang="ts">
	let progress = $state(0);

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			const winScroll = document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			// Calculate percentage (0 to 100)
			progress = (winScroll / height) * 100;
		});
	}
</script>

<div class="progress-container">
	<div class="progress-bar" style="width: {progress}%"></div>
</div>

<style>
	.progress-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: transparent;
		z-index: 2000; /* Ensure it stays above the Navbar */
	}

	.progress-bar {
		height: 100%;
		background: #ff3e00; /* Svelte Orange */
		transition: width 0.1s ease-out;
	}
</style>
