<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import MonoLabel from './MonoLabel.svelte';

	type Args = { size?: 'sm' | 'md'; accent?: boolean };

	const { Story } = defineMeta({
		title: 'Atoms/MonoLabel',
		component: MonoLabel,
		args: { size: 'md', accent: false },
		argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } }
	});
</script>

{#snippet template(args: Args)}
	<MonoLabel {...args}>Lab / Interaction study</MonoLabel>
{/snippet}

<Story name="Eyebrow" {template} />

<Story name="Card meta" args={{ size: 'sm' }} {template} />

<Story name="Accent" args={{ size: 'sm', accent: true }}>
	{#snippet template(args: Args)}
		<MonoLabel {...args}>Actually good UX</MonoLabel>
	{/snippet}
</Story>
