<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { page, volumes } from '$lib/content/effects';
	import FxGrid from '../organisms/FxGrid.svelte';
	import LabHeader from '../organisms/LabHeader.svelte';
	import LabTemplate from './LabTemplate.svelte';

	type Args = { speed: number; autoReset: boolean; all: boolean };

	const { Story } = defineMeta({
		title: 'Templates/LabTemplate',
		args: { speed: 1, autoReset: true, all: false },
		argTypes: {
			speed: { control: { type: 'range', min: 0.25, max: 2, step: 0.05 } },
			autoReset: { control: 'boolean' },
			all: { control: 'boolean', description: 'All 81 cards rather than four per volume' }
		},
		parameters: { layout: 'fullscreen' }
	});
</script>

{#snippet template(args: Args)}
	<LabTemplate speed={args.speed} autoReset={args.autoReset} footer={page.footer}>
		{#snippet header()}
			<LabHeader
				eyebrow={page.eyebrow}
				title={page.title}
				lede={page.lede}
				action={page.playAll}
				repo={page.repo}
			/>
		{/snippet}
		{#each volumes as volume (volume.id)}
			<FxGrid volume={args.all ? volume : { ...volume, cards: volume.cards.slice(0, 4) }} />
		{/each}
	</LabTemplate>
{/snippet}

<Story name="Short" {template} />

<Story name="Full page" args={{ all: true }} {template} />
