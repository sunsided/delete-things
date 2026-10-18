<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MonoLabel from './MonoLabel.svelte';
	import StudyNumber from './StudyNumber.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/StudyNumber',
		component: StudyNumber,
		parameters: {
			docs: {
				description: {
					component:
						'A random three-digit study number that shuffles in on load. Reload the story to draw another.'
				}
			}
		}
	});
</script>

<Story name="In the eyebrow">
	{#snippet template()}
		<MonoLabel>Lab / Interaction study <StudyNumber /></MonoLabel>
	{/snippet}
</Story>
