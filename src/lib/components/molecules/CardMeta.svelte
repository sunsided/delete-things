<!--
	@component
	The meta row of a card: its number on the left, its tag on the right.
-->
<script lang="ts">
	import MonoLabel from '../atoms/MonoLabel.svelte';

	let { n, tag, accent = false }: { n: string; tag: string; accent?: boolean } = $props();
</script>

<div class="meta">
	<MonoLabel size="sm" {accent}>{n}</MonoLabel>
	<MonoLabel size="sm" {accent}>{tag}</MonoLabel>
</div>

<style>
	.meta {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 14px 16px 0;
	}
</style>
