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
	title: 'Eighty ways to delete a file.',
	/** The header adds a random study number, shuffled in on load. */
	eyebrow: 'Lab / Interaction study',
	lede: 'A rebuttal, in eighty parts (plus a bonus). Every button below is real: click it, hold it, swipe it, or regret it. Five of them are actually good UX. The rest range from fun to deeply stupid.',
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
	},
	{
		n: '42',
		key: 'runaway',
		tag: 'Idiotic',
		title: 'Catch me if you can',
		description: 'It dodges the cursor three times, then gives up.'
	},
	{
		n: '43',
		key: 'cookies',
		tag: 'Dark pattern',
		title: 'Cookie consent',
		description: 'Accept the cookies to continue. The button becomes a cookie and crumbles.'
	},
	{
		n: '44',
		key: 'loading',
		tag: 'Passive-aggressive',
		title: '99% forever',
		description: 'It races to 99%, stalls, drops back to 12%, then finishes anyway.'
	},
	{
		n: '45',
		key: 'robot',
		tag: 'Dark pattern',
		title: 'Prove you’re human',
		description: 'Tick the box. You clicked too fast, which is suspicious. Fine, you can go.'
	},
	{
		n: '46',
		key: 'sneeze',
		tag: 'Idiotic',
		title: 'Achoo',
		description: 'Ah… ah… AH… it sneezes itself clean out of the frame.'
	},
	{
		n: '47',
		key: 'nope',
		tag: 'Petty',
		title: 'Refuses to leave',
		description: 'It shakes its head twice, then shuffles off with a sigh.'
	},
	{
		n: '48',
		key: 'approval',
		tag: 'Bureaucratic',
		title: 'Pending approval',
		description: 'Five rounds of sign-off, a stamp, and finally permission to delete.'
	},
	{
		n: '49',
		key: 'reverse',
		tag: 'Dark pattern',
		title: 'Don’t delete',
		label: 'Don’t delete',
		description: 'Clicking “Don’t delete” makes it promise it won’t. Then it does.'
	},
	{
		n: '50',
		key: 'shrink',
		tag: 'Petty',
		title: 'Technically deleted',
		description: 'It shrinks to the size of a speck. Still there, technically.'
	},
	{
		n: '51',
		key: 'snail',
		tag: 'Passive-aggressive',
		title: 'Very slow delete',
		description:
			'0.004% done, ETA three to five business days. Then it decides that’s close enough.'
	},
	{
		n: '52',
		key: 'oops',
		tag: 'Idiotic',
		title: 'Wrong one',
		description: 'It deletes the card’s description first, apologises, and puts it back.'
	},
	{
		n: '53',
		key: 'bonk',
		tag: 'Idiotic',
		title: 'Delete²',
		description: 'A second Delete button falls on the first one. It sees stars.'
	},
	{
		n: '54',
		key: 'hydra',
		tag: 'Idiotic',
		title: 'Hydra',
		description: 'Delete one and two grow back. Keep going until there are eight.'
	},
	{
		n: '55',
		key: 'ship',
		tag: 'Bureaucratic',
		title: 'Shipped to /dev/null',
		description: 'Packed into a box, taped shut, and sent off to nowhere.'
	},
	{
		n: '56',
		key: 'sleep',
		tag: 'Petty',
		title: 'Five more minutes',
		description: 'It dozes off. The alarm goes off. It leaves, grumbling.'
	},
	{
		n: '57',
		key: 'party',
		tag: 'Idiotic',
		title: 'Congratulations!',
		description: 'Party hat, confetti, the works. You deleted one file.'
	},
	{
		n: '58',
		key: 'onhold',
		tag: 'Passive-aggressive',
		title: 'On hold',
		description: 'Your deletion is important to us. Please hold while the music plays.'
	},
	{
		n: '59',
		key: 'screensaver',
		tag: 'Idiotic',
		title: 'Screensaver corner',
		description: 'It bounces around the edges, changing colour, until it finally lands in a corner.'
	},
	{
		n: '60',
		key: 'paywall',
		tag: 'Dark pattern',
		title: 'Premium deletion',
		description: 'Deleting is a Pro feature. You get one free trial.'
	},
	{
		n: '61',
		key: 'binfull',
		tag: 'Idiotic',
		title: 'Bin is full',
		description: 'The first throw bounces off the full bin. Compact it, then throw again.'
	},
	{
		n: '62',
		key: 'crt',
		tag: 'Mechanical',
		title: 'Power off',
		description: 'It collapses into a bright line, then a dot, like an old telly switching off.'
	},
	{
		n: '63',
		key: 'cat',
		tag: 'Chaos',
		title: 'Off the table',
		description: 'A paw taps it once, then again, then pushes it over the edge while you watch.'
	},
	{
		n: '64',
		key: 'sudo',
		tag: 'Bureaucratic',
		title: 'Permission denied',
		description: 'rm says no. sudo says yes, once it has your password.'
	},
	{
		n: '65',
		key: 'assistant',
		tag: 'Passive-aggressive',
		title: 'Helpful assistant',
		description: 'Great question! It explains, declines, and then deletes it anyway.'
	},
	{
		n: '66',
		key: 'slot',
		tag: 'Petty',
		title: 'Spin for it',
		description: 'The label turns into a slot reel. It lands on Keep, then clicks one further.'
	},
	{
		n: '67',
		key: 'zipper',
		tag: 'Mechanical',
		title: 'Zipped',
		description: 'A zip runs through the middle, and the slider pulls it shut.'
	},
	{
		n: '68',
		key: 'ufo',
		tag: 'Cosmic',
		title: 'Abducted',
		description: 'A saucer switches on its beam and takes the button with it.'
	},
	{
		n: '69',
		key: 'sunset',
		tag: 'Theatrical',
		title: 'The end',
		description: 'It walks off into the sunset. Letterbox, credits, roll.'
	},
	{
		n: '70',
		key: 'survey',
		tag: 'Dark pattern',
		title: 'Exit survey',
		description: 'Before it goes, it wants to know why. Your answer is deleted too.'
	},
	{
		n: '71',
		key: 'terms',
		tag: 'Dark pattern',
		title: 'Terms of deletion',
		description:
			'The terms scroll past faster than anyone could read them, and the box ticks itself.'
	},
	{
		n: '72',
		key: 'jenga',
		tag: 'Physics',
		title: 'Load-bearing',
		description: 'It was the middle block of a stack. Pull it out and see what happens.'
	},
	{
		n: '73',
		key: 'pinata',
		tag: 'Idiotic',
		title: 'Piñata',
		description: 'Strung up and whacked until it bursts. The third hit does it.'
	},
	{
		n: '74',
		key: 'magnet',
		tag: 'Physics',
		title: 'Magnetised',
		description: 'A magnet pulls the label off letter by letter and leaves with all of it.'
	},
	{
		n: '75',
		key: 'elevator',
		tag: 'Idiotic',
		title: 'Going down',
		description: 'The doors close, the display counts past the basement, and they open on nothing.'
	},
	{
		n: '76',
		key: 'ticket',
		tag: 'Bureaucratic',
		title: 'Won’t fix',
		description: 'Filed, triaged, blocked, closed as won’t fix. A cleanup job deletes it anyway.'
	},
	{
		n: '77',
		key: 'inflate',
		tag: 'Material',
		title: 'Overinflated',
		description: 'Three strokes of a pump, each rounder and pinker than the last. Then it pops.'
	},
	{
		n: '78',
		key: 'magic',
		tag: 'Theatrical',
		title: 'Now you see it',
		description: 'A cloth, a wand, two taps, and nothing underneath.'
	},
	{
		n: '79',
		key: 'origami',
		tag: 'Material',
		title: 'Folded away',
		description: 'In half, in half again, and once more, then tucked out of sight.'
	},
	{
		n: '80',
		key: 'clipboard',
		tag: 'Petty',
		title: 'Cut, not deleted',
		description: '⌘X. It isn’t gone, it’s on your clipboard, waiting for a paste.'
	},
	{
		n: '81',
		key: 'recycle',
		tag: 'Bureaucratic',
		title: 'Sorted',
		description: 'Not glass, not plastic. It was paper all along.'
	}
];

export const volumes: Volume[] = [
	{ id: 'volume-1', eyebrow: 'Volume I', cards: cards.slice(0, 20) },
	{
		id: 'volume-2',
		eyebrow: 'Volume II',
		heading: 'Twenty more, because twenty wasn’t enough.',
		cards: cards.slice(20, 41)
	},
	{
		id: 'volume-3',
		eyebrow: 'Volume III',
		heading: 'Twenty idiotic ones. No notes.',
		cards: cards.slice(41, 61)
	},
	{
		id: 'volume-4',
		eyebrow: 'Volume IV',
		heading: 'Twenty more, because sixty wasn’t enough either.',
		cards: cards.slice(61)
	}
];
