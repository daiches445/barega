<script lang="ts">
	import { base } from '$app/paths';

	type NavItem = { label: string; id: string };

	let { items } = $props<{ items: NavItem[] }>();

	let isScrolled = $state(false);
	let navHidden = $state(false);
	let menuOpen = $state(false);
	let activeId = $state('home');
	let navbarEl = $state<HTMLElement | undefined>();
	let logoEl = $state<HTMLElement | undefined>();

	const linksWithLabels = $derived(items.filter((item: NavItem) => item.label?.trim()));

	function updateLogoGap() {
		if (!navbarEl || !logoEl) return;
		const navRect = navbarEl.getBoundingClientRect();
		const logoRect = logoEl.getBoundingClientRect();
		const pad = 6;
		const start = Math.max(0, logoRect.left - navRect.left - pad);
		const end = Math.min(navRect.width, logoRect.right - navRect.left + pad);
		navbarEl.style.setProperty('--logo-gap-start', `${start}px`);
		navbarEl.style.setProperty('--logo-gap-end', `${end}px`);
	}

	function updateActiveSection() {
		if (typeof window === 'undefined') return;
		const probeY = Math.min(160, window.innerHeight * 0.28);
		// Must follow page order (not nav order) so later sections can become active
		const pageOrder = ['home', 'about', 'services', 'gallery', 'opinions', 'contact'];
		let current = 'home';
		for (const id of pageOrder) {
			const el = document.getElementById(id);
			if (!el) continue;
			if (el.getBoundingClientRect().top <= probeY) current = id;
		}
		activeId = current;
	}

	function scrollToSection(id: string) {
		const element = document.getElementById(id);
		if (element) {
			navHidden = false;
			const navbar = document.querySelector('.navbar') as HTMLElement | null;
			const navbarHeight = navbar?.offsetHeight ?? 0;
			const anchor = (element.querySelector('.section-inner') as HTMLElement | null) ?? element;
			const top = Math.max(0, window.scrollY + anchor.getBoundingClientRect().top - navbarHeight);

			window.scrollTo({
				top,
				behavior: 'smooth'
			});
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
		if (menuOpen) navHidden = false;
	}

	$effect(() => {
		if (typeof window === 'undefined') return;

		let lastY = window.scrollY;

		function onScroll() {
			const y = window.scrollY;
			isScrolled = y > 40;

			if (menuOpen) {
				navHidden = false;
			} else if (y > lastY + 4 && y > 72) {
				navHidden = true;
			} else if (y < lastY - 2) {
				navHidden = false;
			}

			lastY = y;
			updateActiveSection();
		}

		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') closeMenu();
		}

		function onResize() {
			if (window.innerWidth > 768) closeMenu();
			updateLogoGap();
			updateActiveSection();
		}

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize);
		document.addEventListener('keydown', onKey);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('keydown', onKey);
		};
	});

	$effect(() => {
		if (menuOpen) {
			document.body.style.overflow = 'hidden';
			navHidden = false;
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	$effect(() => {
		if (!navbarEl || !logoEl) return;
		updateLogoGap();
		const ro = new ResizeObserver(() => updateLogoGap());
		ro.observe(navbarEl);
		ro.observe(logoEl);
		return () => ro.disconnect();
	});
</script>

<nav
	class="navbar"
	class:scrolled={isScrolled}
	class:navbar--hidden={navHidden}
	class:navbar--menu-open={menuOpen}
	bind:this={navbarEl}
>
	<div class="navbar-bar">
		<button class="brand" type="button" aria-label="Barega home" onclick={() => navTo('home')}>
			<span
				class="logo-icon"
				bind:this={logoEl}
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
				<button
					type="button"
					class="nav-btn"
					class:nav-btn--highlight={item.id === 'contact'}
					class:nav-btn--active={item.id === activeId}
					aria-current={item.id === activeId ? 'true' : undefined}
					onclick={() => scrollToSection(item.id)}
				>
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
			<button
				type="button"
				class="nav-btn nav-btn--mobile"
				class:nav-btn--highlight={item.id === 'contact'}
				class:nav-btn--active={item.id === activeId}
				aria-current={item.id === activeId ? 'true' : undefined}
				onclick={() => navTo(item.id)}
			>
				{item.label}
			</button>
		{/each}
	</div>
</nav>

<style>
	.brand {
		display: flex;
		align-items: center;
		align-self: center;
		height: 100%;
		gap: 0;
		cursor: pointer;
		padding: 0.15rem 0;
		margin: 0;
		overflow: visible;
		position: relative;
	}

	.logo-icon {
		display: block;
		flex-shrink: 0;
		height: 2.6rem;
		width: auto;
		aspect-ratio: 960 / 1094;
		background-color: var(--pinecone-accent, #d65a7a);
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
		z-index: 1003;
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
		overflow: visible;
		transform: translateY(0);
		transition: transform 0.28s ease;
	}

	.navbar--hidden {
		transform: translateY(-110%);
	}

	.navbar-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.25rem 5%;
		min-height: var(--navbar-bar-h);
		height: var(--navbar-bar-h);
		box-sizing: border-box;
		position: relative;
		z-index: 1002;
	}

	.navbar::after {
		display: none;
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
		padding: 0.15rem 0 0.15rem 2vw;
		line-height: 1.2;
		transition:
			color 0.2s ease,
			background-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	/* Contact CTA always coral */
	button.nav-btn--highlight {
		background-color: var(--coral-red, var(--pinecone-accent, #d65a7a));
		color: #fff;
		padding: 0.35rem 0.85rem;
		margin-inline-start: 2vw;
		border-radius: 6px;
	}

	/* Section in view */
	button.nav-btn--active:not(.nav-btn--highlight) {
		color: var(--coral-red, var(--pinecone-accent, #d65a7a));
		box-shadow: inset 0 -2px 0 var(--coral-red, var(--pinecone-accent, #d65a7a));
	}

	button.nav-btn--highlight.nav-btn--active {
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--text-color) 45%, transparent);
	}

	button.nav-btn--highlight.nav-btn--mobile {
		margin-inline: 1rem;
		width: calc(100% - 2rem);
		text-align: center;
		border-bottom: none;
	}

	button.menu-toggle {
		padding: 0;
	}

	@media (max-width: 768px) {
		.logo-icon {
			height: 2.4rem;
		}

		.menu-toggle {
			display: flex;
			width: 36px;
			height: 36px;
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

		button.nav-btn--active:not(.nav-btn--highlight).nav-btn--mobile {
			box-shadow: inset -3px 0 0 var(--coral-red, var(--pinecone-accent, #d65a7a));
		}
	}
</style>
