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
import runaway from './effects/runaway.ts';
import cookies from './effects/cookies.ts';
import loading from './effects/loading.ts';
import robot from './effects/robot.ts';
import sneeze from './effects/sneeze.ts';
import nope from './effects/nope.ts';
import approval from './effects/approval.ts';
import reverse from './effects/reverse.ts';
import shrink from './effects/shrink.ts';
import snail from './effects/snail.ts';
import oops from './effects/oops.ts';
import bonk from './effects/bonk.ts';
import hydra from './effects/hydra.ts';
import ship from './effects/ship.ts';
import sleep from './effects/sleep.ts';
import party from './effects/party.ts';
import onhold from './effects/onhold.ts';
import screensaver from './effects/screensaver.ts';
import paywall from './effects/paywall.ts';
import binfull from './effects/binfull.ts';
import crt from './effects/crt.ts';
import cat from './effects/cat.ts';
import sudo from './effects/sudo.ts';
import assistant from './effects/assistant.ts';
import slot from './effects/slot.ts';
import zipper from './effects/zipper.ts';
import ufo from './effects/ufo.ts';
import countdown from './effects/countdown.ts';
import survey from './effects/survey.ts';
import terms from './effects/terms.ts';
import jenga from './effects/jenga.ts';
import pinata from './effects/pinata.ts';
import magnet from './effects/magnet.ts';
import elevator from './effects/elevator.ts';
import ticket from './effects/ticket.ts';
import inflate from './effects/inflate.ts';
import magic from './effects/magic.ts';
import origami from './effects/origami.ts';
import clipboard from './effects/clipboard.ts';
import recycle from './effects/recycle.ts';

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
	page,
	runaway,
	cookies,
	loading,
	robot,
	sneeze,
	nope,
	approval,
	reverse,
	shrink,
	snail,
	oops,
	bonk,
	hydra,
	ship,
	sleep,
	party,
	onhold,
	screensaver,
	paywall,
	binfull,
	crt,
	cat,
	sudo,
	assistant,
	slot,
	zipper,
	ufo,
	countdown,
	survey,
	terms,
	jenga,
	pinata,
	magnet,
	elevator,
	ticket,
	inflate,
	magic,
	origami,
	clipboard,
	recycle
} satisfies Record<string, Effect>;

export type FxKey = keyof typeof effects;

export const fxKeys = Object.keys(effects) as FxKey[];
