<!--
	@component
	A card's title and its one-line description.
-->
<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<div class="caption">
	<h3>{title}</h3>
	<p>{description}</p>
</div>

<style>
	.caption {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 0 16px 16px;
	}

	h3 {
		margin: 0;
		font: 600 16px/1.2 var(--font-sans);
	}

	p {
		margin: 0;
		font: 400 13px/1.45 var(--font-sans);
		color: var(--muted);
		text-wrap: pretty;
	}
</style>
