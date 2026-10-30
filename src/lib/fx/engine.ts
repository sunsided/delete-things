/**
 * The lifecycle every effect shares: idle → trigger → finish (badge) → reset.
 *
 * An effect is a setup function that builds its controls into the stage and arms them. It
 * gets a context with the timing helpers bound to the lab's speed and to an abort signal:
 * when the stage resets or unmounts, everything still pending from the old cycle simply
 * stops, rather than finishing onto a stage that has moved on.
 */
import { ease } from '../design/tokens.ts';
import { badge, btn, setBusy, type Btn } from './parts.ts';

export type FxConfig = {
	/** 0.25–2. Divides every duration and delay. */
	speed: number;
	/** Reset 1600ms after the badge, or wait for a click on the stage. */
	autoReset: boolean;
};

export const defaultConfig: FxConfig = { speed: 1, autoReset: true };

export type AnimOptions =
	number | (Omit<KeyframeAnimationOptions, 'duration'> & { duration: number });

export type FxContext = {
	stage: HTMLElement;
	/** Blocks re-triggering while an animation plays. */
	busy: boolean;
	/** The badge this effect shows when it is done; null when the effect is the message. */
	badge: string | null;
	/** prefers-reduced-motion, read when the stage was (re)built. */
	reduced: boolean;
	signal: AbortSignal;
	/** The current speed multiplier. */
	sp: () => number;
	/** Element.animate with fill: forwards, the default easing, and the speed applied. */
	A: (e: Element, k: Keyframe[], o: AnimOptions) => Promise<void>;
	/** setTimeout as a promise, speed applied. Never settles once the cycle is aborted. */
	wait: (ms: number) => Promise<void>;
	/** Shows the badge (undefined: the effect's own; null: none), then resets. */
	finish: (label?: string | null) => Promise<void>;
	/** What "Delete everything" calls. Set by the effect's setup. */
	play?: () => void;
};

export type Effect = {
	/** The confirmation badge, or null when the effect itself says it is done. */
	badge: string | null;
	setup: (ctx: FxContext) => void;
};

const never = new Promise<never>(() => {});

/**
 * The common case: a delete button whose click plays a timeline. The timeline returns the
 * badge label, null for no badge, or nothing for the effect's own.
 *
 * With reduced motion the timeline is skipped for a 150ms fade straight to the badge.
 */
export function simple(
	fn: (ctx: FxContext, b: Btn) => Promise<string | null | void>,
	opts: { label?: string; init?: (ctx: FxContext, b: Btn) => void } = {}
): Effect['setup'] {
	return (ctx) => {
		const b = btn(opts.label);
		ctx.stage.append(b);
		opts.init?.(ctx, b);
		const play = async () => {
			if (ctx.busy) return;
			ctx.busy = true;
			setBusy(b, true);
			if (ctx.reduced) {
				await b
					.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'forwards' })
					.finished.catch(() => {});
				return ctx.finish(ctx.badge ?? 'Deleted');
			}
			const r = await fn(ctx, b);
			ctx.finish(r === undefined ? ctx.badge : r);
		};
		b.addEventListener('click', play);
		ctx.play = play;
	};
}

export type Controller = {
	/** Triggers the effect, as a click on its button would. */
	play: () => void;
	/** Tears down the current cycle and rebuilds the idle state. */
	reset: () => void;
	destroy: () => void;
};

export type MountOptions = {
	/** Read live, so a speed change applies to the next animation that starts. */
	config: () => FxConfig;
	/** Called with the confirmation, for an aria-live region. */
	onDone?: (label: string) => void;
};

const focusable = 'button:not(:disabled), input:not(:disabled), [tabindex]';

/** Runs an effect in a stage element and keeps resetting it after each deletion. */
export function mount(stage: HTMLElement, effect: Effect, opts: MountOptions): Controller {
	let ac = new AbortController();
	let ctx: FxContext | undefined;
	// Whether keyboard focus was in the stage during this cycle. The focused button is
	// usually gone by the time the badge shows, so this is remembered rather than checked.
	let hadFocus = false;
	const onFocus = () => (hadFocus = true);
	stage.addEventListener('focusin', onFocus);

	const run = () => {
		ac.abort();
		ac = new AbortController();
		const signal = ac.signal;
		stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
		stage.replaceChildren();
		stage.style.cursor = '';

		const sp = () => opts.config().speed || 1;
		const A: FxContext['A'] = (e, k, o) => {
			if (signal.aborted) return never;
			const t = typeof o === 'number' ? { duration: o } : o;
			return e
				.animate(k, {
					fill: 'forwards',
					easing: ease,
					...t,
					duration: t.duration / sp(),
					delay: ((t.delay as number) || 0) / sp()
				})
				.finished.then(
					() => (signal.aborted ? never : undefined),
					() => (signal.aborted ? never : undefined)
				);
		};
		const wait = (ms: number) =>
			signal.aborted
				? never
				: new Promise<void>((ok) => {
						const t = setTimeout(ok, ms / sp());
						signal.addEventListener('abort', () => clearTimeout(t), { once: true });
					});

		const c: FxContext = {
			stage,
			busy: false,
			badge: effect.badge,
			reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
			signal,
			sp,
			A,
			wait,
			finish: async (label) => {
				if (signal.aborted) return;
				const shown = label === undefined ? effect.badge : label;
				if (shown) {
					const d = badge(shown);
					stage.append(d);
					await A(
						d,
						[
							{ opacity: 0, transform: 'translate(-50%,-30%) scale(.9)' },
							{ opacity: 1, transform: 'translate(-50%,-50%) scale(1)' }
						],
						{ duration: 380, easing: 'cubic-bezier(.3,1.5,.5,1)' }
					);
				}
				opts.onDone?.(shown ?? effect.badge ?? 'Deleted');
				if (opts.config().autoReset) await wait(1600);
				else {
					stage.style.cursor = 'pointer';
					await new Promise<void>((ok) => {
						stage.addEventListener('click', () => ok(), { once: true, signal });
					});
				}
				await A(stage, [{ opacity: 1 }, { opacity: 0 }], 220);
				const refocus = hadFocus;
				run();
				stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
				if (refocus) stage.querySelector<HTMLElement>(focusable)?.focus({ preventScroll: true });
			}
		};
		ctx = c;
		hadFocus = stage.contains(document.activeElement);
		effect.setup(c);
	};

	run();

	return {
		play: () => ctx?.play?.(),
		reset: run,
		destroy: () => {
			ac.abort();
			stage.removeEventListener('focusin', onFocus);
			stage.getAnimations({ subtree: true }).forEach((a) => a.cancel());
		}
	};
}
