import { afterEach, describe, expect, it } from 'vitest';
import { Lab } from './lab';
import { fxKeys } from './registry';
import './fx.css';

/**
 * Every effect, end to end, in a real browser: it plays, shows its badge (or its own
 * message), resets to a fresh idle state, and throws nothing along the way.
 */

const errors: string[] = [];
const onError = (e: ErrorEvent) => errors.push(e.message);
const onRejection = (e: PromiseRejectionEvent) => errors.push(String(e.reason));

function stage() {
	const main = document.createElement('main');
	const s = document.createElement('div');
	Object.assign(s.style, {
		position: 'relative',
		width: '320px',
		height: '210px',
		display: 'grid',
		placeItems: 'center',
		overflow: 'hidden',
		fontFamily: 'sans-serif'
	});
	main.append(s);
	document.body.append(main);
	return s;
}

const until = async (ok: () => boolean, ms: number) => {
	const t0 = performance.now();
	while (!ok()) {
		if (performance.now() - t0 > ms) return false;
		await new Promise((r) => setTimeout(r, 25));
	}
	return true;
};

afterEach(() => {
	document.body.replaceChildren();
	window.removeEventListener('error', onError);
	window.removeEventListener('unhandledrejection', onRejection);
	errors.length = 0;
});

describe('every effect', () => {
	// All eighty-one at once, the way "Delete everything" plays them: one shared page also
	// proves the stages do not reach into each other.
	it('plays, confirms and resets, without an error', { timeout: 30_000 }, async () => {
		window.addEventListener('error', onError);
		window.addEventListener('unhandledrejection', onRejection);
		const lab = new Lab({ speed: 2 });
		const said = new Map<string, string>();
		lab.announce = (m) => said.set(m.split(':')[0], m);
		const runs = fxKeys.map((key) => {
			const s = stage();
			lab.mount(s, key, key);
			return { key, s, first: s.firstElementChild };
		});
		for (const r of runs) expect(r.first, r.key).not.toBeNull();

		lab.playAll();
		await until(() => said.size === fxKeys.length, 20_000);
		expect([...said.keys()].sort()).toEqual([...fxKeys].sort());
		const reset = (r: (typeof runs)[number]) =>
			r.s.firstElementChild !== r.first && !r.s.querySelector('.dx-badge');
		await until(() => runs.every(reset), 6_000);
		expect(runs.filter((r) => !reset(r)).map((r) => r.key)).toEqual([]);
		expect(errors).toEqual([]);
	});
});

describe('a lab', () => {
	it('stops a stage cleanly when it unmounts mid-animation', async () => {
		window.addEventListener('unhandledrejection', onRejection);
		const s = stage();
		const lab = new Lab();
		const said: string[] = [];
		lab.announce = (m) => said.push(m);
		const stop = lab.mount(s, 'classic');
		lab.playAll();
		await new Promise((r) => setTimeout(r, 300));
		stop();
		await new Promise((r) => setTimeout(r, 3000));
		expect(said).toEqual([]);
		expect(errors).toEqual([]);
	});

	it('ignores a second trigger while busy', async () => {
		const s = stage();
		const lab = new Lab({ speed: 2 });
		const said: string[] = [];
		lab.announce = (m) => said.push(m);
		lab.mount(s, 'stamp');
		const b = s.querySelector('button')!;
		b.click();
		b.click();
		b.click();
		await until(() => said.length > 0, 5000);
		await new Promise((r) => setTimeout(r, 300));
		expect(said).toHaveLength(1);
	});
});
