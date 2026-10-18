<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { page } from '$lib/content/effects';
	import LabHeader from './LabHeader.svelte';

	const { Story } = defineMeta({
		title: 'Organisms/LabHeader',
		component: LabHeader,
		args: { eyebrow: page.eyebrow, title: page.title, lede: page.lede, action: page.playAll },
		parameters: {
			layout: 'padded',
			docs: {
				description: {
					component:
						'Eyebrow, title, lede and "Delete everything", which plays every stage of the ' +
						'surrounding lab 90ms apart. On its own here, it has none to play.'
				}
			}
		}
	});
</script>

<Story name="Default" />
