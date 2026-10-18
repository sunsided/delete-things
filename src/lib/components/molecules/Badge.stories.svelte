<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/Badge',
		component: Badge,
		args: { label: 'Deleted' },
		parameters: {
			docs: {
				description: {
					component:
						'What an effect leaves behind. The engine centres it on the stage and springs it ' +
						'in from below over 380ms.'
				}
			}
		}
	});
</script>

<Story name="Default" />

<Story name="Long" args={{ label: 'Nothing was harmed' }} />
