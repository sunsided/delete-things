<!--
	@component
	A volume: its heading, if it has one, and the card grid.

	The heading and the grid are siblings rather than wrapped together. #41 "Delete the page"
	drops every child of <main> and every card of every <section>, as the prototype's DOM
	had them; a wrapper would make a volume fall as one block.
-->
<script lang="ts">
	import type { Volume } from '$lib/content/effects';
	import SectionHeading from '../molecules/SectionHeading.svelte';
	import FxCard from './FxCard.svelte';

	let { volume }: { volume: Volume } = $props();
	const headingId = $derived(`${volume.id}-heading`);
</script>

{#if volume.heading}
	<SectionHeading eyebrow={volume.eyebrow} heading={volume.heading} id={headingId} />
{/if}
<section class="grid" id={volume.id} aria-labelledby={headingId}>
	{#if !volume.heading}
		<!-- Without it the cards' h3 would follow the page's h1 directly. -->
		<h2 class="visually-hidden" id={headingId}>{volume.eyebrow}</h2>
	{/if}
	{#each volume.cards as card (card.key)}
		<FxCard {card} />
	{/each}
</section>

<style>
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.grid {
		max-width: var(--page-max);
		margin: 0 auto;
		display: grid;
		/* min(): the handoff's 290px column would overflow a phone narrower than 330px. */
		grid-template-columns: repeat(auto-fill, minmax(min(290px, 100%), 1fr));
		gap: 16px;
	}

	@media (width < 760px) {
		.grid {
			gap: 12px;
		}
	}
</style>
