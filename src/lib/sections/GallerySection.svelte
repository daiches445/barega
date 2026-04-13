<script lang="ts">
	import { env } from '$env/dynamic/public';
	type GalleryPhoto = {
		publicId: string;
		alt: string;
	};

	// Fallback list (used if tag-based auto loading is not configured).
	const fallbackPhotos: GalleryPhoto[] = [
		{ publicId: 'IMG_4130_o1gwot', alt: 'Barega gallery photo' },
		{ publicId: 'IMG_4115_eyc5lx', alt: 'Barega gallery photo 2' }
	];

	const cloudName = (env.PUBLIC_CLOUDINARY_CLOUD_NAME ?? '').trim();
	const galleryTag = (env.PUBLIC_CLOUDINARY_GALLERY_TAG ?? '').trim();
	const hasCloudinaryConfig = cloudName.length > 0;
	const canAutoLoadByTag = hasCloudinaryConfig && galleryTag.length > 0;
	let photos = $state<GalleryPhoto[]>(fallbackPhotos);
	let isLoading = $state(false);
	let loadError = $state('');

	const buildCloudinaryUrl = (publicId: string, width: number) =>
		`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width},c_fill,g_auto/${publicId}`;

	let selectedPhoto: GalleryPhoto | null = $state(null);

	const openLightbox = (photo: GalleryPhoto) => {
		selectedPhoto = photo;
	};

	const closeLightbox = () => {
		selectedPhoto = null;
	};

	const handleBackdropKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			closeLightbox();
		}
	};

	$effect(() => {
		if (!canAutoLoadByTag) return;

		isLoading = true;
		loadError = '';
		const listUrl = `https://res.cloudinary.com/${cloudName}/image/list/${encodeURIComponent(galleryTag)}.json`;

		void fetch(listUrl)
			.then((response) => {
				if (!response.ok) {
					const cldError = response.headers.get('x-cld-error') ?? '';
					throw new Error(`Cloudinary list request failed (${response.status}) ${cldError}`.trim());
				}
				return response.json();
			})
			.then((data) => {
				const resources = Array.isArray(data?.resources) ? data.resources : [];
				if (resources.length === 0) {
					photos = fallbackPhotos;
					loadError = 'לא נמצאו תמונות תחת התג שהוגדר.';
					return;
				}
				photos = resources
					.map((resource: { public_id?: string; original_filename?: string }) => ({
						publicId: resource.public_id ?? '',
						alt: resource.original_filename || 'Barega gallery photo'
					}))
					.filter((photo: GalleryPhoto) => photo.publicId);
			})
			.catch((error: unknown) => {
				photos = fallbackPhotos;
				const message = error instanceof Error ? error.message : '';
				if (message.includes('Resources of type list are restricted')) {
					loadError =
						'Cloudinary חסם image/list. היכנסו להגדרות אבטחה והפעילו Resource list, או השתמשו ברשימת תמונות ידנית.';
				} else {
					loadError = 'לא ניתן היה לטעון תמונות אוטומטית מ-Cloudinary. מוצגות תמונות ברירת מחדל.';
				}
			})
			.finally(() => {
				isLoading = false;
			});
	});
</script>

<section class="gallery-wrapper" dir="rtl">
	<h2 class="gallery-title">גלריה</h2>
	<p class="gallery-subtitle">טעימה מהאווירה, הקוקטיילים והרגעים היפים בבארגה</p>

	{#if !hasCloudinaryConfig}
		<p class="gallery-hint">
			כדי להציג תמונות מ-Cloudinary, הוסיפו משתנה סביבה בשם
			<code>PUBLIC_CLOUDINARY_CLOUD_NAME</code>.
		</p>
	{:else if isLoading}
		<p class="gallery-hint">טוען תמונות מהגלריה...</p>
	{:else}
		{#if !canAutoLoadByTag}
			<p class="gallery-hint">
				לטעינה אוטומטית של כל התמונות, הוסיפו תג לתמונות ב-Cloudinary והגדירו
				<code>PUBLIC_CLOUDINARY_GALLERY_TAG</code>.
			</p>
		{/if}
		{#if loadError}
			<p class="gallery-hint">{loadError}</p>
		{/if}
		<div class="gallery-grid">
			{#each photos as photo (photo.publicId)}
				<button class="gallery-item" type="button" onclick={() => openLightbox(photo)}>
					<img
						src={buildCloudinaryUrl(photo.publicId, 720)}
						alt={photo.alt}
						loading="lazy"
						decoding="async"
					/>
				</button>
			{/each}
		</div>
	{/if}
</section>

{#if selectedPhoto}
	<div
		class="lightbox-backdrop"
		role="button"
		tabindex="0"
		aria-label="Close gallery image"
		onclick={closeLightbox}
		onkeydown={handleBackdropKeydown}
	>
		<button
			class="lightbox-close"
			type="button"
			onclick={closeLightbox}
			aria-label="Close gallery image"
		>
			×
		</button>
		<button
			class="lightbox-frame"
			type="button"
			tabindex="-1"
			onclick={(event) => event.stopPropagation()}
		>
			<img
				class="lightbox-image"
				src={buildCloudinaryUrl(selectedPhoto.publicId, 1800)}
				alt={selectedPhoto.alt}
			/>
		</button>
	</div>
{/if}

<style>
	.gallery-wrapper {
		width: min(1200px, 100%);
		margin: 0 auto;
		text-align: right;
	}

	.gallery-title {
		margin: 0;
		font-size: clamp(2rem, 4vw, 3rem);
		font-family: var(--font-heading);
	}

	.gallery-subtitle {
		margin: 0.5rem 0 1.5rem;
		color: var(--text-muted);
	}

	.gallery-hint {
		padding: 1rem;
		border-radius: 0.75rem;
		background: rgba(41, 182, 217, 0.08);
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 0.75rem;
	}

	.gallery-item {
		border: none;
		padding: 0;
		background: transparent;
		overflow: hidden;
		border-radius: 0.75rem;
		cursor: pointer;
	}

	.gallery-item img {
		width: 100%;
		aspect-ratio: 1 / 1;
		object-fit: cover;
		display: block;
		transition: transform 0.25s ease;
	}

	.gallery-item:hover img {
		transform: scale(1.03);
	}

	.lightbox-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1200;
		background: rgba(0, 0, 0, 0.72);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.lightbox-image {
		max-width: min(95vw, 1100px);
		max-height: 90vh;
		border-radius: 0.75rem;
	}

	.lightbox-frame {
		border: none;
		background: transparent;
		padding: 0;
	}

	.lightbox-close {
		position: fixed;
		top: 1rem;
		right: 1rem;
		width: 2.5rem;
		height: 2.5rem;
		font-size: 1.8rem;
		line-height: 1;
		border: none;
		border-radius: 999px;
		cursor: pointer;
		background: white;
		color: #111;
	}
</style>
