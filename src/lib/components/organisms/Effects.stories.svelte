<!--
	One story per effect, in catalog order, each a full card in its own lab. Generated once
	from the catalog; a new effect needs its line here.
-->
<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { cards } from '$lib/content/effects';
	import LabScope from '../LabScope.svelte';
	import FxCard from './FxCard.svelte';

	type Args = { n: string; speed: number; autoReset: boolean };

	const { Story } = defineMeta({
		title: 'Effects',
		args: { n: '01', speed: 1, autoReset: true },
		argTypes: {
			n: { control: false },
			speed: { control: { type: 'range', min: 0.25, max: 2, step: 0.05 } },
			autoReset: { control: 'boolean' }
		},
		parameters: { layout: 'centered' }
	});

	const card = (n: string) => cards.find((c) => c.n === n) ?? cards[0];
</script>

{#snippet template(args: Args)}
	<LabScope speed={args.speed} autoReset={args.autoReset}>
		<div style:width="320px"><FxCard card={card(args.n)} /></div>
	</LabScope>
{/snippet}

<Story exportName="Effect01" name="01 Into the bin" args={{ n: '01' }} {template} />
<Story exportName="Effect02" name="02 Hold to confirm" args={{ n: '02' }} {template} />
<Story exportName="Effect03" name="03 Shredder" args={{ n: '03' }} {template} />
<Story exportName="Effect04" name="04 Turn to dust" args={{ n: '04' }} {template} />
<Story exportName="Effect05" name="05 Crumple & toss" args={{ n: '05' }} {template} />
<Story exportName="Effect06" name="06 Undo window" args={{ n: '06' }} {template} />
<Story exportName="Effect07" name="07 Event horizon" args={{ n: '07' }} {template} />
<Story exportName="Effect08" name="08 Clean cut" args={{ n: '08' }} {template} />
<Story exportName="Effect09" name="09 Backspace" args={{ n: '09' }} {template} />
<Story exportName="Effect10" name="10 Rubber stamp" args={{ n: '10' }} {template} />
<Story exportName="Effect11" name="11 Gravity off… then on" args={{ n: '11' }} {template} />
<Story exportName="Effect12" name="12 Short fuse" args={{ n: '12' }} {template} />
<Story exportName="Effect13" name="13 Eraser" args={{ n: '13' }} {template} />
<Story exportName="Effect14" name="14 Meltdown" args={{ n: '14' }} {template} />
<Story exportName="Effect15" name="15 Glitch & CRT off" args={{ n: '15' }} {template} />
<Story exportName="Effect16" name="16 Paper plane" args={{ n: '16' }} {template} />
<Story exportName="Effect17" name="17 Burn after reading" args={{ n: '17' }} {template} />
<Story exportName="Effect18" name="18 Overinflated" args={{ n: '18' }} {template} />
<Story exportName="Effect19" name="19 Trapdoor" args={{ n: '19' }} {template} />
<Story exportName="Effect20" name="20 Launch into the sun" args={{ n: '20' }} {template} />
<Story exportName="Effect21" name="21 Slide to delete" args={{ n: '21' }} {template} />
<Story exportName="Effect22" name="22 Are you sure?" args={{ n: '22' }} {template} />
<Story exportName="Effect23" name="23 Robot vacuum" args={{ n: '23' }} {template} />
<Story exportName="Effect24" name="24 Sands of time" args={{ n: '24' }} {template} />
<Story exportName="Effect25" name="25 Tile flip" args={{ n: '25' }} {template} />
<Story exportName="Effect26" name="26 Freeze & shatter" args={{ n: '26' }} {template} />
<Story exportName="Effect27" name="27 Peel off" args={{ n: '27' }} {template} />
<Story exportName="Effect28" name="28 Washed away" args={{ n: '28' }} {template} />
<Story exportName="Effect29" name="29 Teleport" args={{ n: '29' }} {template} />
<Story exportName="Effect30" name="30 Magic trick" args={{ n: '30' }} {template} />
<Story exportName="Effect31" name="31 Ghosted" args={{ n: '31' }} {template} />
<Story exportName="Effect32" name="32 Domino" args={{ n: '32' }} {template} />
<Story exportName="Effect33" name="33 The other side" args={{ n: '33' }} {template} />
<Story exportName="Effect34" name="34 Quicksand" args={{ n: '34' }} {template} />
<Story exportName="Effect35" name="35 Struck by lightning" args={{ n: '35' }} {template} />
<Story exportName="Effect36" name="36 Type to confirm" args={{ n: '36' }} {template} />
<Story exportName="Effect37" name="37 One-tonne weight" args={{ n: '37' }} {template} />
<Story exportName="Effect38" name="38 Full stop" args={{ n: '38' }} {template} />
<Story exportName="Effect39" name="39 Redacted" args={{ n: '39' }} {template} />
<Story exportName="Effect40" name="40 Reeled in" args={{ n: '40' }} {template} />
<Story exportName="Effect41" name="41 Delete the page" args={{ n: '41' }} {template} />
<Story exportName="Effect42" name="42 Catch me if you can" args={{ n: '42' }} {template} />
<Story exportName="Effect43" name="43 Cookie consent" args={{ n: '43' }} {template} />
<Story exportName="Effect44" name="44 99% forever" args={{ n: '44' }} {template} />
<Story exportName="Effect45" name="45 Prove you’re human" args={{ n: '45' }} {template} />
<Story exportName="Effect46" name="46 Achoo" args={{ n: '46' }} {template} />
<Story exportName="Effect47" name="47 Refuses to leave" args={{ n: '47' }} {template} />
<Story exportName="Effect48" name="48 Pending approval" args={{ n: '48' }} {template} />
<Story exportName="Effect49" name="49 Don’t delete" args={{ n: '49' }} {template} />
<Story exportName="Effect50" name="50 Technically deleted" args={{ n: '50' }} {template} />
<Story exportName="Effect51" name="51 Very slow delete" args={{ n: '51' }} {template} />
<Story exportName="Effect52" name="52 Wrong one" args={{ n: '52' }} {template} />
<Story exportName="Effect53" name="53 Delete²" args={{ n: '53' }} {template} />
<Story exportName="Effect54" name="54 Hydra" args={{ n: '54' }} {template} />
<Story exportName="Effect55" name="55 Shipped to /dev/null" args={{ n: '55' }} {template} />
<Story exportName="Effect56" name="56 Five more minutes" args={{ n: '56' }} {template} />
<Story exportName="Effect57" name="57 Congratulations!" args={{ n: '57' }} {template} />
<Story exportName="Effect58" name="58 On hold" args={{ n: '58' }} {template} />
<Story exportName="Effect59" name="59 Screensaver corner" args={{ n: '59' }} {template} />
<Story exportName="Effect60" name="60 Premium deletion" args={{ n: '60' }} {template} />
<Story exportName="Effect61" name="61 Bin is full" args={{ n: '61' }} {template} />
