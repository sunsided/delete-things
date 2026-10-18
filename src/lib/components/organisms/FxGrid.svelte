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

{#if volume.eyebrow && volume.heading}
	<SectionHeading eyebrow={volume.eyebrow} heading={volume.heading} id={headingId} />
{/if}
<section
	class="grid"
	id={volume.id}
	aria-labelledby={volume.heading ? headingId : undefined}
	aria-label={volume.heading ? undefined : 'Volume I'}
>
	{#each volume.cards as card (card.key)}
		<FxCard {card} />
	{/each}
</section>

<style>
	.grid {
		max-width: var(--page-max);
		margin: 0 auto;
		display: grid;
		/* min(): the handoff's 290px column would overflow a phone narrower than 330px. */
		grid-template-columns: repeat(auto-fill, minmax(min(290px, 100%), 1fr));
		gap: 16px;
	}
</style>
