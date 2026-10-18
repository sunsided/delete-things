<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SectionHeading from './SectionHeading.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/SectionHeading',
		component: SectionHeading,
		args: { eyebrow: 'Volume II', heading: 'Twenty more, because twenty wasn’t enough.' },
		parameters: { layout: 'padded' }
	});
</script>

<Story name="Default" />
