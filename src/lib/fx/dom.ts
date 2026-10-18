/**
 * DOM helpers for the effects. Every effect builds its props (confetti, bins, hooks, drips)
 * from plain elements positioned inside the stage; these keep that terse.
 */

export type Style = Partial<Record<keyof CSSStyleDeclaration, string | number>>;
export type Child = Node | string | null | undefined;

/** Assigns inline styles and returns the element. */
export function S<E extends HTMLElement>(e: E, s: Style): E {
	Object.assign(e.style, s);
	return e;
}

/**
 * Creates an element with inline styles and children. `<i>` is the tag for decorative
 * particles throughout, so every `<i>` is hidden from assistive technology here, once.
 */
export function h<K extends keyof HTMLElementTagNameMap>(
	tag: K,
	style?: Style | null,
	children?: Child | Child[]
): HTMLElementTagNameMap[K] {
	const e = document.createElement(tag);
	if (style) S(e, style);
	if (tag === 'i') e.setAttribute('aria-hidden', 'true');
	if (children != null)
		for (const c of ([] as Child[]).concat(children)) if (c != null) e.append(c);
	return e;
}

export const rnd = (a: number, b: number) => a + Math.random() * (b - a);

export type Rect = {
	x: number;
	y: number;
	w: number;
	h: number;
	/** Centre x. */
	cx: number;
	/** Centre y. */
	cy: number;
	/** Bottom edge. */
	b: number;
	/** Right edge. */
	r: number;
};

/** An element's box relative to the stage. */
export function rel(stage: HTMLElement, el: Element): Rect {
	const s = stage.getBoundingClientRect();
	const r = el.getBoundingClientRect();
	const x = r.left - s.left;
	const y = r.top - s.top;
	return {
		x,
		y,
		w: r.width,
		h: r.height,
		cx: x + r.width / 2,
		cy: y + r.height / 2,
		b: y + r.height,
		r: x + r.width
	};
}

/** Absolutely positions an element at (x, y) within its containing stage. */
export function place<E extends HTMLElement>(e: E, x: number, y: number, s?: Style): E {
	return S(e, { position: 'absolute', left: x + 'px', top: y + 'px', ...s });
}

/** Appends an element to the stage, centred on (cx, cy) by its own measured size. */
export function at<E extends HTMLElement>(stage: HTMLElement, e: E, cx: number, cy: number): E {
	place(e, 0, 0);
	stage.append(e);
	const b = e.getBoundingClientRect();
	return S(e, { left: cx - b.width / 2 + 'px', top: cy - b.height / 2 + 'px' });
}

/** Keyframes of random ±amp px translations; the first and last frames are at rest. */
export function jit(n: number, amp: number, base = ''): Keyframe[] {
	return Array.from({ length: n }, (_, i) => {
		const z = i === 0 || i === n - 1;
		const dx = z ? 0 : rnd(-amp, amp);
		const dy = z ? 0 : rnd(-amp, amp);
		return { transform: `${base} translate(${dx}px,${dy}px)` };
	});
}

/** Splits a span's text into one inline-block span per character, for per-letter motion. */
export function split(span: HTMLElement): HTMLSpanElement[] {
	const t = span.textContent ?? '';
	span.textContent = '';
	return [...t].map((c) => {
		const s = h('span', { display: 'inline-block', whiteSpace: 'pre' }, c);
		span.append(s);
		return s;
	});
}
