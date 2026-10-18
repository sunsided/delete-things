/**
 * The lab copy and the card catalog, verbatim from the handoff (design/Delete Lab.dc.html).
 * The key of each card names its effect in $lib/fx/registry.ts.
 */
import type { FxKey } from '$lib/fx/registry';

export type Card = {
	/** Two-digit number, as printed. */
	n: string;
	key: FxKey;
	/** The tag top right of the card. */
	tag: string;
	/** Tag in red: the actually good ones, and the bonus. */
	accent?: boolean;
	title: string;
	description: string;
	/** The button label, where it is not "Delete". The prerendered button shows it. */
	label?: string;
};

export type Volume = {
	id: string;
	eyebrow: string;
	/** Volume I sits under the page header and has no visible heading of its own. */
	heading?: string;
	cards: Card[];
};

export const page = {
	title: 'Forty ways to delete a file.',
	eyebrow: 'Lab / Interaction study 017',
	lede: 'A rebuttal, in forty parts. Every button below is real: click it, hold it, swipe it, or regret it. Five of them are actually good UX. The other thirty-five are just for fun.',
	playAll: 'Delete everything',
	footer: 'Inspired by a silly little delete button. It was right.'
};

export const cards: Card[] = [
	{
		n: '01',
		key: 'classic',
		tag: 'The original',
		title: 'Into the bin',
		description: 'The one that started the beef, now without emoji or hard-coded pixel offsets.'
	},
	{
		n: '02',
		key: 'hold',
		tag: 'Actually good UX',
		accent: true,
		title: 'Hold to confirm',
		label: 'Hold to delete',
		description:
			'Press and hold. Let go early and it backs off. Stops accidental taps without a modal.'
	},
	{
		n: '03',
		key: 'shredder',
		tag: 'Mechanical',
		title: 'Shredder',
		description: 'The button turns into a slot. The document goes in whole and comes out in strips.'
	},
	{
		n: '04',
		key: 'dust',
		tag: 'Cosmic',
		title: 'Turn to dust',
		description: 'A snap, and it breaks into about two hundred grains that blow away left to right.'
	},
	{
		n: '05',
		key: 'crumple',
		tag: 'Physics',
		title: 'Crumple & toss',
		description: 'Balled up and lobbed into the bin. Nothing but net.'
	},
	{
		n: '06',
		key: 'undo',
		tag: 'Actually good UX',
		accent: true,
		title: 'Undo window',
		description:
			'Deletes right away, then gives you four seconds to change your mind. Try clicking Undo.'
	},
	{
		n: '07',
		key: 'blackhole',
		tag: 'Cosmic',
		title: 'Event horizon',
		description: 'A singularity opens and pulls the label in, one letter at a time.'
	},
	{
		n: '08',
		key: 'slice',
		tag: 'Physics',
		title: 'Clean cut',
		description: 'One quick slash. Both halves slide apart along the cut and fall.'
	},
	{
		n: '09',
		key: 'backspace',
		tag: 'Meta',
		title: 'Backspace',
		description: 'The word "Delete" deletes itself one letter at a time.'
	},
	{
		n: '10',
		key: 'stamp',
		tag: 'Bureaucratic',
		title: 'Rubber stamp',
		description: 'Officially processed. Thud, a little shake, a little spatter.'
	},
	{
		n: '11',
		key: 'gravity',
		tag: 'Physics',
		title: 'Gravity off… then on',
		description: 'Every letter falls to the floor and bounces on its own.'
	},
	{
		n: '12',
		key: 'fuse',
		tag: 'Chaos',
		title: 'Short fuse',
		description: 'A lit fuse runs to the button. You know what happens next.'
	},
	{
		n: '13',
		key: 'eraser',
		tag: 'Material',
		title: 'Eraser',
		description: 'Scrubbed out by hand, crumbs and all.'
	},
	{
		n: '14',
		key: 'melt',
		tag: 'Material',
		title: 'Meltdown',
		description: 'The button fills with ink, sags, drips and spreads into a puddle.'
	},
	{
		n: '15',
		key: 'glitch',
		tag: 'Chaos',
		title: 'Glitch & CRT off',
		description:
			'The colour channels split and the picture tears, then it switches off like an old TV.'
	},
	{
		n: '16',
		key: 'plane',
		tag: 'Cosmic',
		title: 'Paper plane',
		description: 'It folds itself into a plane, takes one wobbly loop and flies off.'
	},
	{
		n: '17',
		key: 'burn',
		tag: 'Material',
		title: 'Burn after reading',
		description: 'A glowing edge burns up from the bottom, with embers and smoke.'
	},
	{
		n: '18',
		key: 'balloon',
		tag: 'Chaos',
		title: 'Overinflated',
		description: 'It puffs up, puffs up a bit more, trembles, and pops.'
	},
	{
		n: '19',
		key: 'trapdoor',
		tag: 'Physics',
		title: 'Trapdoor',
		description: 'The floor opens and it drops through. The doors swing shut behind it.'
	},
	{
		n: '20',
		key: 'launch',
		tag: 'Chaos',
		title: 'Launch into the sun',
		description: 'A countdown, a rumble, a burst of smoke, and off it goes.'
	},
	{
		n: '21',
		key: 'swipe',
		tag: 'Actually good UX',
		accent: true,
		title: 'Slide to delete',
		description: 'Drag the handle all the way across. If you let go early it springs back.'
	},
	{
		n: '22',
		key: 'twostep',
		tag: 'Actually good UX',
		accent: true,
		title: 'Are you sure?',
		description:
			'The button splits into Cancel and Yes, delete. A confirmation that stays in place instead of opening a modal.'
	},
	{
		n: '23',
		key: 'vacuum',
		tag: 'Mechanical',
		title: 'Robot vacuum',
		description: 'A little cleaning robot drives straight across and hoovers the whole button up.'
	},
	{
		n: '24',
		key: 'hourglass',
		tag: 'Material',
		title: 'Sands of time',
		description: 'The button turns to sand and drains through its own bottom edge into a pile.'
	},
	{
		n: '25',
		key: 'tiles',
		tag: 'Mechanical',
		title: 'Tile flip',
		description: 'Like a train-station departure board: the tiles flip away in a diagonal wave.'
	},
	{
		n: '26',
		key: 'freeze',
		tag: 'Material',
		title: 'Freeze & shatter',
		description: 'Frost creeps in, the button cracks into shards, and the shards fall.'
	},
	{
		n: '27',
		key: 'peel',
		tag: 'Material',
		title: 'Peel off',
		description: 'Lifted at one corner like a sticker and peeled away.'
	},
	{
		n: '28',
		key: 'rain',
		tag: 'Material',
		title: 'Washed away',
		description: 'It starts raining. The ink runs and slides off the page.'
	},
	{
		n: '29',
		key: 'teleport',
		tag: 'Cosmic',
		title: 'Teleport',
		description: 'A beam locks on, squeezes it into a thin line, and sends it straight up.'
	},
	{
		n: '30',
		key: 'curtain',
		tag: 'Theatrical',
		title: 'Magic trick',
		description: 'The curtains close and open again. The button is gone.'
	},
	{
		n: '31',
		key: 'ghost',
		tag: 'Cosmic',
		title: 'Ghosted',
		description: 'It turns into a little ghost and drifts off without a word.'
	},
	{
		n: '32',
		key: 'domino',
		tag: 'Physics',
		title: 'Domino',
		description: 'Each letter tips over and knocks down the next one.'
	},
	{
		n: '33',
		key: 'flip',
		tag: 'Meta',
		title: 'The other side',
		description: 'It flips over. The back already says it’s done.'
	},
	{
		n: '34',
		key: 'quicksand',
		tag: 'Physics',
		title: 'Quicksand',
		description: 'Sand appears underneath and it slowly sinks out of sight, wobbling.'
	},
	{
		n: '35',
		key: 'zap',
		tag: 'Chaos',
		title: 'Struck by lightning',
		description: 'A flash and a bolt leave it charred, and it crumbles into ash.'
	},
	{
		n: '36',
		key: 'typeconfirm',
		tag: 'Actually good UX',
		accent: true,
		title: 'Type to confirm',
		description:
			'The button only works after you type the word. Good for deletes you can’t take back.'
	},
	{
		n: '37',
		key: 'weight',
		tag: 'Physics',
		title: 'One-tonne weight',
		description: 'Dropped from above and flattened. Dust puffs out on both sides.'
	},
	{
		n: '38',
		key: 'fullstop',
		tag: 'Meta',
		title: 'Full stop',
		description: 'It shrinks to a dot, which becomes the full stop at the end of “Deleted”.'
	},
	{
		n: '39',
		key: 'redact',
		tag: 'Bureaucratic',
		title: 'Redacted',
		description: 'Blacked out with a marker, then filed away as a redaction bar.'
	},
	{
		n: '40',
		key: 'hook',
		tag: 'Mechanical',
		title: 'Reeled in',
		description: 'A hook comes down, catches the button, and yanks it out of the frame.'
	},
	{
		n: '41',
		key: 'page',
		tag: 'Bonus · nuclear',
		accent: true,
		title: 'Delete the page',
		label: 'Delete page',
		description:
			'Why stop at one file? Everything on the page falls off the screen. Then everything comes back.'
	}
];

export const volumes: Volume[] = [
	{ id: 'volume-1', eyebrow: 'Volume I', cards: cards.slice(0, 20) },
	{
		id: 'volume-2',
		eyebrow: 'Volume II',
		heading: 'Twenty more, because twenty wasn’t enough.',
		cards: cards.slice(20)
	}
];
