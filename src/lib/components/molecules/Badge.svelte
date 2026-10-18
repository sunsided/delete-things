<!--
	@component
	The confirmation an effect leaves behind: a green check and a word. Inline here; the
	engine centres the same markup on the stage.
-->
<script lang="ts">
	import CheckMark from '../atoms/CheckMark.svelte';

	let { label = 'Deleted' }: { label?: string } = $props();
</script>

<div class="dx-badge" style:position="static" style:transform="none">
	<CheckMark />
	{label}
</div>
