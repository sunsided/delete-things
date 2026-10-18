/**
 * The shared parts: the delete button, its trash icon, the document and the confirmation
 * badge. Their look lives in fx.css under `dx-` classes, which the Svelte atoms
 * (TrashIcon, DocIcon, DeleteButton, Badge) render too: the button the page prerenders and
 * the one an effect rebuilds after a reset are the same markup with the same stylesheet.
 */
import { h } from './dom.ts';

export type Trash = HTMLSpanElement & { lid: HTMLSpanElement };

export type Btn = HTMLButtonElement & {
	icon: Trash;
	text: HTMLSpanElement;
};

const cls = <E extends HTMLElement>(e: E, c: string) => ((e.className = c), e);

/**
 * The 14×17 trash can. It draws in `currentColor`, so recolouring the button (or the knob
 * that holds it) recolours the icon with it. Pass a colour to set one explicitly.
 */
export function trash(c?: string): Trash {
	const lid = cls(h('span', null, cls(h('span'), 'dx-trash__handle')), 'dx-trash__lid');
	const w = cls(
		h('span', c ? { color: c } : null, [cls(h('span'), 'dx-trash__body'), lid]),
		'dx-trash'
	);
	w.setAttribute('aria-hidden', 'true');
	return Object.assign(w, { lid });
}

/** The 22×28 document with three text lines. */
export function doc(): HTMLDivElement {
	const d = cls(h('div', null, [h('i'), h('i'), h('i')]), 'dx-doc');
	d.setAttribute('aria-hidden', 'true');
	return d;
}

/** The base delete button: trash icon, then the label. */
export function btn(label = 'Delete'): Btn {
	const icon = trash();
	const text = cls(h('span', null, label), 'dx-btn__label');
	const b = cls(h('button', null, [icon, text]), 'dx-btn');
	b.type = 'button';
	return Object.assign(b, { icon, text });
}

/** Marks a button as playing: no hover wash, default cursor. */
export function setBusy(b: HTMLElement, busy: boolean) {
	if (busy) b.dataset.busy = '';
	else delete b.dataset.busy;
}

/** The green circle with a white CSS check mark. */
export function check(): HTMLSpanElement {
	const c = cls(h('span', null, h('i')), 'dx-check');
	c.setAttribute('aria-hidden', 'true');
	return c;
}

/** The confirmation badge, centred on the stage. */
export function badge(label: string): HTMLDivElement {
	return cls(h('div', null, [check(), label]), 'dx-badge');
}
