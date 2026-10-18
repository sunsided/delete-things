<!--
	@component
	Provides a Lab to the stages inside it: one config, one "Delete everything", and the
	polite live region that announces each deletion. Draws nothing of its own. The lab
	template wraps the page in it; stories wrap single cards in it to get the speed and
	auto-reset controls.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { provideLab } from './lab-context.ts';

	let {
		speed = 1,
		autoReset = true,
		children
	}: {
		/** 0.25–2; divides every duration. */
		speed?: number;
		/** Reset 1.6s after each badge, or wait for a click on the stage. */
		autoReset?: boolean;
		children: Snippet;
	} = $props();

	const lab = provideLab();
	let announcement = $state('');
	lab.announce = (m) => (announcement = m);

	$effect.pre(() => {
		lab.config.speed = speed;
		lab.config.autoReset = autoReset;
	});
</script>

{@render children()}
<p class="visually-hidden" aria-live="polite">{announcement}</p>

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
</style>
