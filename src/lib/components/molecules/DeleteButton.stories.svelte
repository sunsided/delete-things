<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DeleteButton from './DeleteButton.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/DeleteButton',
		component: DeleteButton,
		args: { label: 'Delete' },
		parameters: {
			docs: {
				description: {
					component:
						'The base button every effect starts from: 48px, ink outline, trash icon and ' +
						'label. This one is static; the effects build the same markup and play with it.'
				}
			}
		}
	});
</script>

<Story name="Default" />

<Story name="Hold" args={{ label: 'Hold to delete' }} />

<Story name="Disabled" args={{ disabled: true }} />

<Story
	name="Focus"
	play={async ({ canvasElement }) => {
		canvasElement.querySelector('button')?.focus();
	}}
/>
