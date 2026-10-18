/**
 * A lab: a set of mounted stages that share one config and one "Delete everything".
 *
 * Framework-free on purpose. The Svelte components create one per page (or per story) and
 * hand stages to it; another site can do the same from a plain script.
 */
import { defaultConfig, mount, type Controller, type FxConfig } from './engine.ts';
import { effects, type FxKey } from './registry.ts';

export class Lab {
	config: FxConfig;
	/** Called with every confirmation, e.g. to fill an aria-live region. */
	announce?: (message: string) => void;
	#stages = new Map<HTMLElement, Controller>();

	constructor(config: Partial<FxConfig> = {}) {
		this.config = { ...defaultConfig, ...config };
	}

	/** Mounts an effect into a stage. Returns the teardown. */
	mount(stage: HTMLElement, key: FxKey, title: string = key): () => void {
		const ctrl = mount(stage, effects[key], {
			config: () => this.config,
			onDone: (label) => this.announce?.(`${title}: ${label}`)
		});
		this.#stages.set(stage, ctrl);
		return () => {
			ctrl.destroy();
			this.#stages.delete(stage);
		};
	}

	/** Triggers every stage in document order, 90ms apart. */
	playAll() {
		const stages = [...this.#stages.keys()].sort((a, b) =>
			a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
		);
		stages.forEach((s, i) => setTimeout(() => this.#stages.get(s)?.play(), i * 90));
	}
}
