<!--
	@component
	The 14×17 trash can, built from three boxes. Draws in currentColor; the lid rotates
	about its bottom-left corner. Same markup as trash() in $lib/fx/parts.ts.
-->
<script lang="ts">
	let { color }: { color?: string } = $props();
</script>

<span class="dx-trash" style:color aria-hidden="true">
	<span class="dx-trash__body"></span>
	<span class="dx-trash__lid"><span class="dx-trash__handle"></span></span>
</span>
