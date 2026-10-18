<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fxKeys, type FxKey } from '$lib/fx/registry';
	import LabScope from '../LabScope.svelte';
	import FxStage from './FxStage.svelte';

	type Args = { fx: FxKey; speed: number; autoReset: boolean };

	const { Story } = defineMeta({
		title: 'Organisms/FxStage',
		args: { fx: 'classic', speed: 1, autoReset: true },
		argTypes: {
			fx: { control: 'select', options: fxKeys },
			speed: { control: { type: 'range', min: 0.25, max: 2, step: 0.05 } },
			autoReset: { control: 'boolean' }
		},
		parameters: {
			layout: 'centered',
			docs: {
				description: {
					component:
						'The 210px dot-grid stage one effect plays on. Pick any of the 61 with the fx ' +
						'control; speed divides every duration, and with auto-reset off the stage waits ' +
						'for a click after the badge.'
				}
			}
		}
	});
</script>

{#snippet template(args: Args)}
	<LabScope speed={args.speed} autoReset={args.autoReset}>
		<div style:width="320px">
			<FxStage fx={args.fx} />
		</div>
	</LabScope>
{/snippet}

<Story name="Playground" {template} />

<Story name="Slow motion" args={{ fx: 'shredder', speed: 0.25 }} {template} />

<Story name="Manual reset" args={{ fx: 'stamp', autoReset: false }} {template} />
