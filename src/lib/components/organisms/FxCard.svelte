<!--
	@component
	One card of the lab: number and tag, the stage, title and description.
-->
<script lang="ts">
	import type { Card } from '$lib/content/effects';
	import CardCaption from '../atoms/CardCaption.svelte';
	import CardMeta from '../molecules/CardMeta.svelte';
	import FxStage from './FxStage.svelte';

	let { card }: { card: Card } = $props();
</script>

<article class="card">
	<CardMeta n={card.n} tag={card.tag} accent={card.accent} />
	<FxStage fx={card.key} title={card.title} label={card.label} />
	<CardCaption title={card.title} description={card.description} />
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: var(--card);
		border: 1px solid var(--card-border);
		border-radius: var(--radius-card);
	}
</style>
