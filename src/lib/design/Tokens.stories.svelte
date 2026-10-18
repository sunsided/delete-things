<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { color, font, radius } from './tokens';

	const { Story } = defineMeta({
		title: 'Design/Tokens',
		parameters: {
			layout: 'padded',
			docs: {
				description: {
					component:
						'Every value from tokens.ts, which is the single source for tokens.css and for ' +
						'the colours the effect engine animates.'
				}
			}
		}
	});
</script>

<Story name="Colours">
	{#snippet template()}
		<div class="swatches">
			{#each Object.entries(color) as [name, value] (name)}
				<figure>
					<div class="chip" style:background={value}></div>
					<figcaption><b>{name}</b> {value}</figcaption>
				</figure>
			{/each}
		</div>
	{/snippet}
</Story>

<Story name="Type">
	{#snippet template()}
		<div class="type">
			<p style:font="600 64px/1 {font.sans}" style:letter-spacing="-.03em">Instrument Sans 600</p>
			<p style:font="400 17px/1.5 {font.sans}">Instrument Sans 400, 17/1.5, for the lede.</p>
			<p style:font="500 12px/1 {font.mono}" style:letter-spacing=".08em">
				IBM PLEX MONO 500 · EYEBROW
			</p>
			<p style:font="700 22px/1 {font.mono}" style:letter-spacing=".14em">DELETED</p>
		</div>
	{/snippet}
</Story>

<Story name="Radii">
	{#snippet template()}
		<div class="swatches">
			{#each Object.entries(radius) as [name, value] (name)}
				<figure>
					<div class="chip outlined" style:border-radius={value}></div>
					<figcaption><b>{name}</b> {value}</figcaption>
				</figure>
			{/each}
		</div>
	{/snippet}
</Story>

<style>
	.swatches {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 16px;
	}

	figure {
		margin: 0;
	}

	.chip {
		height: 56px;
		border-radius: 10px;
		border: 1px solid var(--card-border);
	}

	.outlined {
		background: var(--card);
		border: 1.5px solid var(--ink);
	}

	figcaption {
		margin-top: 6px;
		font: 400 12px/1.4 var(--font-mono);
		color: var(--muted);
	}

	figcaption b {
		display: block;
		color: var(--ink);
		font-weight: 500;
	}

	.type p {
		margin: 0 0 16px;
	}
</style>
