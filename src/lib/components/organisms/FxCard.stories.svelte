<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { cards } from '$lib/content/effects';
	import LabScope from '../LabScope.svelte';
	import FxCard from './FxCard.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/FxCard',
		component: FxCard,
		args: { card: cards[0] },
		parameters: { layout: 'centered' }
	});
</script>

{#snippet template(args: { card: (typeof cards)[number] })}
	<LabScope>
		<div style:width="320px"><FxCard card={args.card} /></div>
	</LabScope>
{/snippet}

<Story name="Default" {template} />

<Story name="Actually good UX" args={{ card: cards[1] }} {template} />

<Story name="Long description" args={{ card: cards[21] }} {template} />
