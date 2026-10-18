<!--
	@component
	Uppercase IBM Plex Mono: the page eyebrow (md, 12px) and the card meta (sm, 11px).
	Accent turns it red, for the actually good ones.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		size = 'md',
		accent = false,
		children
	}: { size?: 'sm' | 'md'; accent?: boolean; children: Snippet } = $props();
</script>

<span class="label {size}" class:accent>{@render children()}</span>

<style>
	.label {
		font-family: var(--font-mono);
		font-weight: 500;
		line-height: 1;
		text-transform: uppercase;
		color: var(--mono);
	}

	.md {
		font-size: 12px;
		letter-spacing: 0.08em;
	}

	.sm {
		font-size: 11px;
		letter-spacing: 0.06em;
	}

	.accent {
		color: var(--red-text);
	}
</style>
