<script lang="ts">
	import { page, volumes } from '$lib/content/effects';
	import FxGrid from '$lib/components/organisms/FxGrid.svelte';
	import LabHeader from '$lib/components/organisms/LabHeader.svelte';
	import LabTemplate from '$lib/components/templates/LabTemplate.svelte';
</script>

<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content={page.lede} />
</svelte:head>

<LabTemplate footer={page.footer}>
	{#snippet header()}
		<LabHeader eyebrow={page.eyebrow} title={page.title} lede={page.lede} action={page.playAll} />
	{/snippet}
	{#each volumes as volume (volume.id)}
		<FxGrid {volume} />
	{/each}
</LabTemplate>
