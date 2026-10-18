<!--
	@component
	The lab page: header, volumes, footer, on the paper ground, inside one LabScope.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import LabScope from '../LabScope.svelte';

	let {
		speed = 1,
		autoReset = true,
		header,
		children,
		footer
	}: {
		/** 0.25–2; divides every duration. */
		speed?: number;
		/** Reset 1.6s after each badge, or wait for a click on the stage. */
		autoReset?: boolean;
		header: Snippet;
		children: Snippet;
		footer?: string;
	} = $props();
</script>

<LabScope {speed} {autoReset}>
	<main class="lab">
		{@render header()}
		{@render children()}
		{#if footer}
			<footer>{footer}</footer>
		{/if}
	</main>
</LabScope>

<style>
	.lab {
		box-sizing: border-box;
		min-height: 100vh;
		padding: 56px clamp(20px, 4vw, 56px) 72px;
		background: var(--page);
		color: var(--ink);
		font-family: var(--font-sans);
	}

	footer {
		max-width: var(--page-max);
		margin: 40px auto 0;
		font: 400 12px/1.5 var(--font-mono);
		color: var(--mono);
	}
</style>
