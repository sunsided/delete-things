<!--
	@component
	The page header: eyebrow, title, lede, and the button that plays every card at once.
-->
<script lang="ts">
	import Button from '../atoms/Button.svelte';
	import MonoLabel from '../atoms/MonoLabel.svelte';
	import { useLab } from '../lab-context.ts';

	let {
		eyebrow,
		title,
		lede,
		action
	}: { eyebrow: string; title: string; lede: string; action: string } = $props();

	const lab = useLab();
</script>

<header class="header">
	<div class="intro">
		<MonoLabel>{eyebrow}</MonoLabel>
		<h1>{title}</h1>
		<p>{lede}</p>
	</div>
	<Button onclick={() => lab.playAll()}>{action}</Button>
</header>

<style>
	.header {
		max-width: var(--page-max);
		margin: 0 auto 40px;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 14px;
		max-width: 720px;
	}

	h1 {
		margin: 0;
		font: 600 clamp(36px, 5vw, 64px) / 1 var(--font-sans);
		letter-spacing: -0.03em;
		text-wrap: balance;
	}

	p {
		margin: 0;
		font: 400 17px/1.5 var(--font-sans);
		color: var(--body);
		text-wrap: pretty;
	}
</style>
