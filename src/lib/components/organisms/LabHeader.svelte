<!--
	@component
	The page header: eyebrow with a shuffled study number, title, lede, the button that plays
	every card at once, and the GitHub mark top right when there is a repository to link.
-->
<script lang="ts">
	import Button from '../atoms/Button.svelte';
	import GitHubLink from '../atoms/GitHubLink.svelte';
	import MonoLabel from '../atoms/MonoLabel.svelte';
	import StudyNumber from '../atoms/StudyNumber.svelte';
	import { useLab } from '../lab-context.ts';

	let {
		eyebrow,
		title,
		lede,
		action,
		repo
	}: { eyebrow: string; title: string; lede: string; action: string; repo?: string } = $props();

	const lab = useLab();
</script>

<header class="header">
	<div class="intro">
		<MonoLabel>{eyebrow} <StudyNumber /></MonoLabel>
		<h1>{title}</h1>
		<p>{lede}</p>
	</div>
	<Button onclick={() => lab.playAll()}>{action}</Button>
	{#if repo}
		<div class="repo"><GitHubLink href={repo} /></div>
	{/if}
</header>

<style>
	.header {
		position: relative;
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

	/* The mark's own top-right corner on the column's; the 44px target overhangs by 10px. */
	.repo {
		position: absolute;
		top: -10px;
		right: -10px;
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

	/* Tablets: the lede takes the full width, and the button goes under it. */
	@media (width < 1024px) {
		.intro {
			max-width: none;
		}

		/* Keeps the title clear of the mark; the eyebrow is short, and the lede sits below it. */
		h1 {
			padding-right: 40px;
		}
	}

	@media (width < 760px) {
		.header {
			margin-bottom: 28px;
			gap: 20px;
		}

		.intro {
			gap: 12px;
		}

		p {
			font-size: 16px;
		}

		/* Full width on a phone: a thumb-sized target, and no orphaned button on the left. */
		.header > :global(button) {
			width: 100%;
		}
	}
</style>
