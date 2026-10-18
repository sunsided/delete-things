<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Button from './Button.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/Button',
		component: Button,
		parameters: {
			docs: {
				description: {
					component: 'The solid ink button of the header. Hover turns it red.'
				}
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<Button>Delete everything</Button>
	{/snippet}
</Story>

<Story
	name="Focus"
	play={async ({ canvasElement }) => {
		canvasElement.querySelector('button')?.focus();
	}}
>
	{#snippet template()}
		<Button>Delete everything</Button>
	{/snippet}
</Story>
