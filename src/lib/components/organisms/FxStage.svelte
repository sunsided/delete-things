<!--
	@component
	The 210px stage an effect plays on, with the dot grid. The page prerenders a plain delete
	button into it; once the script runs, the effect engine replaces it with its own (the same
	markup) and keeps rebuilding it after every deletion.
-->
<script lang="ts">
	import type { FxKey } from '$lib/fx/registry';
	import DeleteButton from '../molecules/DeleteButton.svelte';
	import { useLab } from '../lab-context.ts';

	let {
		fx,
		title,
		label
	}: {
		fx: FxKey;
		/** Prefixes the announcement, e.g. "Shredder: Shredded". */
		title?: string;
		/** The prerendered button's label, where it is not "Delete". */
		label?: string;
	} = $props();

	const lab = useLab();
</script>

<div class="stage" data-fx={fx} {@attach (node) => lab.mount(node, fx, title ?? fx)}>
	<DeleteButton {label} />
</div>

<style>
	.stage {
		position: relative;
		height: 210px;
		display: grid;
		place-items: center;
		/* Every effect throws things around; none of it may leave the card. */
		overflow: hidden;
		background-image: radial-gradient(var(--dot) 1px, transparent 1px);
		background-size: 14px 14px;
	}
</style>
