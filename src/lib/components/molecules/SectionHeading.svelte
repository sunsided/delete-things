<!--
	@component
	A volume's heading: eyebrow and h2 above a rule.
-->
<script lang="ts">
	import MonoLabel from '../atoms/MonoLabel.svelte';

	let { eyebrow, heading, id }: { eyebrow: string; heading: string; id?: string } = $props();
</script>

<div class="heading">
	<MonoLabel>{eyebrow}</MonoLabel>
	<h2 {id}>{heading}</h2>
</div>

<style>
	.heading {
		max-width: var(--page-max);
		margin: 56px auto 20px;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 8px 16px;
		border-top: 1px solid var(--card-border);
		padding-top: 28px;
	}

	h2 {
		margin: 0;
		font: 600 clamp(26px, 3vw, 36px) / 1.1 var(--font-sans);
		letter-spacing: -0.02em;
	}
</style>
