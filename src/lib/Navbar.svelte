<script lang="ts">
	import { base } from '$app/paths';

	type NavItem = { label: string; id: string };

	let { items } = $props<{ items: NavItem[] }>();

	let isScrolled = $state(false);
	let menuOpen = $state(false);

	const linksWithLabels = $derived(items.filter((item: NavItem) => item.label?.trim()));

	if (typeof window !== 'undefined') {
		window.onscroll = () => {
			isScrolled = window.scrollY > 50;
		};
	}

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function closeMenu() {
		menuOpen = false;
	}

	function navTo(id: string) {
		scrollToSection(id);
		closeMenu();
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') closeMenu();
		}
		function onResize() {
			if (window.innerWidth > 768) closeMenu();
		}
		window.addEventListener('resize', onResize);
		if (menuOpen) {
			document.addEventListener('keydown', onKey);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
			window.removeEventListener('resize', onResize);
		};
	});
</script>

<nav class="navbar" class:scrolled={isScrolled} class:navbar--menu-open={menuOpen}>
	<div class="navbar-bar">
		<button class="brand" type="button" aria-label="Barega home" onclick={() => navTo('home')}>
			<span
				class="logo-icon"
				role="img"
				aria-label="Barega"
				style:--mask-url="url({base}/pinecone-martini-icon.png)"
			></span>
		</button>

		<button
			type="button"
			class="menu-toggle"
			class:menu-toggle--open={menuOpen}
			aria-expanded={menuOpen}
			aria-controls="nav-menu-mobile"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			onclick={toggleMenu}
		>
			<span class="menu-toggle-bars" aria-hidden="true">
				<span class="menu-bar"></span>
				<span class="menu-bar"></span>
				<span class="menu-bar"></span>
			</span>
		</button>

		<div class="nav-links nav-links--desktop">
			{#each linksWithLabels as item (item.id)}
				<button type="button" class="nav-btn" onclick={() => scrollToSection(item.id)}>
					{item.label}
				</button>
			{/each}
		</div>
	</div>

	{#if menuOpen}
		<button type="button" class="menu-backdrop" aria-label="Close menu" onclick={closeMenu}
		></button>
	{/if}

	<div
		id="nav-menu-mobile"
		class="nav-links nav-links--mobile"
		class:nav-links--mobile-open={menuOpen}
		aria-hidden={!menuOpen}
	>
		{#each linksWithLabels as item (item.id)}
			<button type="button" class="nav-btn nav-btn--mobile" onclick={() => navTo(item.id)}>
				{item.label}
			</button>
		{/each}
	</div>
</nav>

<style>
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		padding: 0;
		margin: 0;
	}

	.logo-icon {
		display: inline-block;
		flex-shrink: 0;
		height: 56px;
		width: auto;
		aspect-ratio: 960 / 1094;
		background-color: var(--acct-color);
		-webkit-mask-image: var(--mask-url);
		mask-image: var(--mask-url);
		-webkit-mask-size: contain;
		mask-size: contain;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-mode: luminance;
		mask-mode: luminance;
	}

	.navbar {
		--navbar-bar-h: var(--navbar-bar-height);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 1000;
		direction: ltr;
		background-color: var(--page-bg);
		border-radius: 0;
	}

	.navbar-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		/* Match hero card: 90% width centered → (100% − 90%) / 2 = 5% inset each side */
		padding: 1rem 5%;
		position: relative;
		z-index: 1002;
	}

	.navbar::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 100vw;
		transform: translateX(-50%);
		border-bottom: 2px solid var(--text-muted);
		z-index: 1;
		pointer-events: none;
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 44px;
		height: 44px;
		padding: 0;
		flex-shrink: 0;
		border-radius: 8px;
	}

	.menu-toggle-bars {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		width: 24px;
	}

	.menu-bar {
		display: block;
		height: 2px;
		width: 100%;
		background-color: var(--text-color);
		border-radius: 1px;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease;
	}

	.menu-toggle--open .menu-bar:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.menu-toggle--open .menu-bar:nth-child(2) {
		opacity: 0;
	}

	.menu-toggle--open .menu-bar:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	.nav-links {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 0.25rem;
	}

	.nav-links--desktop {
		flex: 1;
		justify-content: flex-end;
	}

	.nav-links--mobile {
		display: none;
	}

	.menu-backdrop {
		display: none;
	}

	button.nav-btn,
	button.brand,
	button.menu-toggle {
		background: none;
		border: none;
		cursor: pointer;
		font-weight: bold;
	}

	button.nav-btn {
		padding-left: 2vw;
	}

	button.menu-toggle {
		padding: 0;
	}

	@media (max-width: 768px) {
		.logo-icon {
			height: 44px;
		}

		.menu-toggle {
			display: flex;
		}

		.nav-links--desktop {
			display: none;
		}

		.menu-backdrop {
			display: block;
			position: fixed;
			top: var(--navbar-bar-h);
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 1000;
			margin: 0;
			padding: 0;
			border: none;
			background: rgba(0, 0, 0, 0.35);
			cursor: pointer;
		}

		.nav-links--mobile {
			display: flex;
			flex-direction: column;
			align-items: stretch;
			gap: 0;
			position: fixed;
			top: 0;
			right: 0;
			width: min(20rem, 88vw);
			max-height: min(100dvh, 100vh);
			margin: 0;
			padding: calc(var(--navbar-bar-h) + env(safe-area-inset-top, 0px)) 0 1.5rem;
			background: var(--page-bg);
			box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
			z-index: 1001;
			overflow-y: auto;
			transform: translateX(100%);
			transition: transform 0.25s ease;
			pointer-events: none;
		}

		.nav-links--mobile-open {
			transform: translateX(0);
			pointer-events: auto;
		}

		.nav-btn--mobile {
			width: 100%;
			text-align: right;
			padding: 1rem 1.25rem;
			padding-left: 1.25rem;
			border-bottom: 1px solid color-mix(in srgb, var(--text-color) 12%, transparent);
			font-size: 1rem;
		}

		.nav-btn--mobile:last-child {
			border-bottom: none;
		}
	}
</style>
