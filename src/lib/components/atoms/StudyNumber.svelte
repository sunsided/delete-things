<!--
	@component
	A made-up three-digit study number, drawn fresh on every visit: the digits flip through
	random values, like a shuffle, and settle left to right. The prerendered page shows "???"
	until the script draws one. Reduced motion settles at once; assistive technology only
	hears the result.
-->
<script lang="ts">
	import { onMount } from 'svelte';

	const DIGITS = 3;
	/** How long the first digit shuffles, ms; each next one settles STAGGER ms later. */
	const SHUFFLE = 600;
	const STAGGER = 180;
	/** A new face per digit every TICK ms: fast enough to blur, slow enough to see. */
	const TICK = 50;

	let shown = $state(Array.from({ length: DIGITS }, () => '?'));
	let result = $state('');

	onMount(() => {
		// 001–999: a study zero would look like a placeholder again.
		const n = String(1 + Math.floor(Math.random() * (10 ** DIGITS - 1))).padStart(DIGITS, '0');
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shown = [...n];
			result = n;
			return;
		}
		const t0 = performance.now();
		let last = -TICK;
		let raf = requestAnimationFrame(function step(t) {
			const el = t - t0;
			const tick = t - last >= TICK;
			if (tick) last = t;
			let busy = false;
			shown = shown.map((c, i) => {
				if (el >= SHUFFLE + i * STAGGER) return n[i];
				busy = true;
				return tick ? String(Math.floor(Math.random() * 10)) : c;
			});
			if (busy) raf = requestAnimationFrame(step);
			else result = n;
		});
		return () => cancelAnimationFrame(raf);
	});
</script>

<span class="number"
	><span aria-hidden="true">{shown.join('')}</span><span class="visually-hidden">{result}</span
	></span
>

<style>
	.number {
		font-variant-numeric: tabular-nums;
	}

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
