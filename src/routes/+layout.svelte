<script lang="ts">
	import '@fontsource/instrument-sans/400.css';
	import '@fontsource/instrument-sans/500.css';
	import '@fontsource/instrument-sans/600.css';
	import '@fontsource/instrument-sans/700.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import '@fontsource/ibm-plex-mono/700.css';
	import '$lib/design/tokens.css';
	import '$lib/design/base.css';
	import '$lib/fx/fx.css';

	let { children } = $props();
</script>

{@render children()}
