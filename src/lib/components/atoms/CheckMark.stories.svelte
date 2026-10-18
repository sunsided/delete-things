<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CheckMark from './CheckMark.svelte';

	const { Story } = defineMeta({ title: 'Atoms/CheckMark', component: CheckMark });
</script>

<Story name="Default" />
