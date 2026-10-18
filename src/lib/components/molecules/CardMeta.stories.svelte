<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CardMeta from './CardMeta.svelte';

	const { Story } = defineMeta({
		title: 'Molecules/CardMeta',
		component: CardMeta,
		args: { n: '03', tag: 'Mechanical' },
		parameters: { layout: 'padded' }
	});
</script>

<Story name="Default" />

<Story name="Actually good" args={{ n: '02', tag: 'Actually good UX', accent: true }} />
