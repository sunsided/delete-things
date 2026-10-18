<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import TrashIcon from './TrashIcon.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/TrashIcon',
		component: TrashIcon,
		argTypes: { color: { control: 'color' } },
		parameters: {
			docs: {
				description: {
					component:
						'14×17, three CSS boxes, no image. Draws in currentColor; the lid rotates about ' +
						'its bottom-left corner, which is how #01 opens the bin.'
				}
			}
		}
	});
</script>

<Story name="Default" />

<Story name="Red" args={{ color: '#d4462f' }} />

<Story name="Lid open">
	{#snippet template()}
		<span class="open"><TrashIcon /></span>
		<style>
			.open :global(.dx-trash__lid) {
				transform: rotate(-40deg);
			}
		</style>
	{/snippet}
</Story>

<Story name="Scaled">
	{#snippet template()}
		<span style:display="inline-block" style:transform="scale(2.6)" style:margin="24px">
			<TrashIcon />
		</span>
	{/snippet}
</Story>
