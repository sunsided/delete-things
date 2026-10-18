<!--
	@component
	The base delete button: trash icon, then the label. This is the button the page
	prerenders into each stage before the effect engine takes over; it is the same markup
	btn() in $lib/fx/parts.ts builds, so the swap is invisible.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import TrashIcon from '../atoms/TrashIcon.svelte';

	let { label = 'Delete', ...rest }: HTMLButtonAttributes & { label?: string } = $props();
</script>

<button type="button" class="dx-btn" {...rest}>
	<TrashIcon />
	<span class="dx-btn__label">{label}</span>
</button>
