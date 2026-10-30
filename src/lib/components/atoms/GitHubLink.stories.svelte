<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { page } from '$lib/content/effects';
	import GitHubLink from './GitHubLink.svelte';

	const { Story } = defineMeta({
		title: 'Atoms/GitHubLink',
		component: GitHubLink,
		args: { href: page.repo }
	});
</script>

<Story name="Default" />
