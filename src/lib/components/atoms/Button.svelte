<!--
	@component
	The solid ink button of the page header ("Delete everything"). Hover turns it red.
	The delete button the effects play with is DeleteButton, not this.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let { children, ...rest }: HTMLButtonAttributes & { children: Snippet } = $props();
</script>

<button type="button" {...rest}>{@render children()}</button>

<style>
	button {
		box-sizing: border-box;
		height: 48px;
		padding: 0 22px;
		border: 1.5px solid var(--ink);
		border-radius: var(--radius-button);
		background: var(--ink);
		color: var(--card);
		font: 500 15px/1 var(--font-sans);
		cursor: pointer;
		white-space: nowrap;
	}

	button:hover {
		background: var(--red);
		border-color: var(--red);
	}

	button:focus-visible {
		outline: 2px solid var(--ink);
		outline-offset: 3px;
	}
</style>
