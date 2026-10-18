<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CardCaption from './CardCaption.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/CardCaption',
		component: CardCaption,
		args: {
			title: 'Into the bin',
			description: 'The one that started the beef, now without emoji or hard-coded pixel offsets.'
		},
		parameters: { layout: 'padded' }
	});
</script>

<Story name="Default" />

<Story
	name="Long description"
	args={{
		title: 'Are you sure?',
		description:
			'The button splits into Cancel and Yes, delete. A confirmation that stays in place instead of opening a modal.'
	}}
/>
