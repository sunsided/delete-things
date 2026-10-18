<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { volumes } from '$lib/content/effects';
	import LabScope from '../LabScope.svelte';
	import FxGrid from './FxGrid.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/FxGrid',
		component: FxGrid,
		parameters: {
			layout: 'padded',
			docs: {
				description: {
					component:
						'A volume: optional heading, then the auto-filling grid of 290px-minimum cards. ' +
						'Narrower than 290px, one column fills the width.'
				}
			}
		}
	});
</script>

<Story name="Volume I" args={{ volume: { ...volumes[0], cards: volumes[0].cards.slice(0, 4) } }}>
	{#snippet template(args)}
		<LabScope><FxGrid volume={args.volume} /></LabScope>
	{/snippet}
</Story>

<Story name="Volume II" args={{ volume: { ...volumes[1], cards: volumes[1].cards.slice(0, 4) } }}>
	{#snippet template(args)}
		<LabScope><FxGrid volume={args.volume} /></LabScope>
	{/snippet}
</Story>
