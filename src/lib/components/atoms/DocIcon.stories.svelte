<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import DocIcon from './DocIcon.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/DocIcon',
		component: DocIcon,
		parameters: {
			docs: {
				description: {
					component:
						'The file being deleted: 22×28, white, three lines at 60%. #01 drops it into the ' +
						'bin and #03 feeds it to the shredder.'
				}
			}
		}
	});
</script>

<Story name="Default" />
