/**
 * Every effect by key. The key is what a stage names in its data-fx attribute and what
 * the catalog in $lib/content/effects.ts refers to; effects.test.ts keeps the two in step.
 */
import type { Effect } from './engine.ts';
import classic from './effects/classic.ts';
import hold from './effects/hold.ts';
import shredder from './effects/shredder.ts';
import dust from './effects/dust.ts';
import crumple from './effects/crumple.ts';
import undo from './effects/undo.ts';
import blackhole from './effects/blackhole.ts';
import slice from './effects/slice.ts';
import backspace from './effects/backspace.ts';
import stamp from './effects/stamp.ts';
import gravity from './effects/gravity.ts';
import fuse from './effects/fuse.ts';
import eraser from './effects/eraser.ts';
import melt from './effects/melt.ts';
import glitch from './effects/glitch.ts';
import plane from './effects/plane.ts';
import burn from './effects/burn.ts';
import balloon from './effects/balloon.ts';
import trapdoor from './effects/trapdoor.ts';
import launch from './effects/launch.ts';
import swipe from './effects/swipe.ts';
import twostep from './effects/twostep.ts';
import vacuum from './effects/vacuum.ts';
import hourglass from './effects/hourglass.ts';
import tiles from './effects/tiles.ts';
import freeze from './effects/freeze.ts';
import peel from './effects/peel.ts';
import rain from './effects/rain.ts';
import teleport from './effects/teleport.ts';
import curtain from './effects/curtain.ts';
import ghost from './effects/ghost.ts';
import domino from './effects/domino.ts';
import flip from './effects/flip.ts';
import quicksand from './effects/quicksand.ts';
import zap from './effects/zap.ts';
import typeconfirm from './effects/typeconfirm.ts';
import weight from './effects/weight.ts';
import fullstop from './effects/fullstop.ts';
import redact from './effects/redact.ts';
import hook from './effects/hook.ts';
import page from './effects/page.ts';

export const effects = {
	classic,
	hold,
	shredder,
	dust,
	crumple,
	undo,
	blackhole,
	slice,
	backspace,
	stamp,
	gravity,
	fuse,
	eraser,
	melt,
	glitch,
	plane,
	burn,
	balloon,
	trapdoor,
	launch,
	swipe,
	twostep,
	vacuum,
	hourglass,
	tiles,
	freeze,
	peel,
	rain,
	teleport,
	curtain,
	ghost,
	domino,
	flip,
	quicksand,
	zap,
	typeconfirm,
	weight,
	fullstop,
	redact,
	hook,
	page
} satisfies Record<string, Effect>;

export type FxKey = keyof typeof effects;

export const fxKeys = Object.keys(effects) as FxKey[];
