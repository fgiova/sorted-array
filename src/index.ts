export class SortedArray<T> extends Array<T> {

	//default sort function
	/* istanbul ignore next */
	readonly #comparatorFunction: (a: T, b: T) => number = (a, b) => {
		if (a < b) return -1;
		if (a >= b) return 1;
		return 0;
	}

	public constructor();
	public constructor(items: T[]);
	public constructor(comparatorFunction: (a: T, b: T) => number)
	public constructor(items: T[], comparatorFunction: (a: T, b: T) => number)
	constructor(...args: any[]) {
		// call Array constructor with length 0 to avoid Array constructor to create an array with the length of the first argument
		super(0);
		// if args is empty, return
		if (!args.length) return;
		// if args[0] is a function, set it as comparatorFunction
		if (typeof args[0] === "function") {
			this.#comparatorFunction = args[0];
			return;
		}
		// if args[1] is a function, set it as comparatorFunction
		if (args.length === 2 && typeof args[1] === "function") {
			this.#comparatorFunction = args[1];
		}
		// if args[0] is an array, set it as items
		if (Array.isArray(args[0])) {
			for (const item of args[0]) {
				this.insert(item);
			}
		}
	}

	private divideEtImpera(edge1: number, edge2: number, positions: Record<number, boolean>): number {
		let position = edge1 + Math.floor((edge2 - edge1) / 2);
		/* istanbul ignore next */
		if (positions[position]) position = edge1 + Math.ceil((edge2 - edge1) / 2);
		positions[position] = true;
		return position;
	}

	private binarySearch(search: T) {
		const positions: Record<number, boolean> = {}
		const meta = {
			currentPosition: 0,
			lowerPosition: 0,
			upperPosition: this.length - 1,
			foundPosition: 0,
			endOfArray: this.length
		}

		// Binary Search find the closest position
		while (meta.lowerPosition < meta.upperPosition) {
			meta.currentPosition = this.divideEtImpera(meta.lowerPosition, meta.upperPosition, positions);
			meta.foundPosition = this.#comparatorFunction(this[meta.currentPosition], search);
			if (meta.foundPosition < 0) {
				meta.lowerPosition = meta.currentPosition + 1;
			}
			else {
				meta.upperPosition = meta.currentPosition;
			}
			// End of Array circuit break
			/* istanbul ignore next */
			if (!--meta.endOfArray) break;
		}
		/* istanbul ignore next */
		if (meta.upperPosition === meta.lowerPosition && this.#comparatorFunction(this[meta.lowerPosition], search) === 0) {
			return meta.lowerPosition;
		}

		const match = this.#comparatorFunction(this[meta.lowerPosition], search);
		if (meta.lowerPosition === this.length - 1 && match < 0) {
			return meta.lowerPosition;
		}
		if (meta.lowerPosition === 0 && match > 0) {
			return 0;
		}
		return meta.lowerPosition - 1;
	}

	private findPosition(search: T) {
		// if array is empty, return -1
		/* istanbul ignore next */
		if (this.length === 0) return -1;
		// if array has only one element, return 0
		if (this.length === 1) return 0;
		// find the closest position
		const closestPosition = this.binarySearch(search);
		/* istanbul ignore next */
		if (closestPosition > this.length - 1) {
			return this.length - 1;
		}
		/* istanbul ignore next */
		else if (closestPosition < 0) {
			return 0;
		}
		return closestPosition;
	}

	public insert(item: T): number {
		if (!this.length) return super.push(item);
		let position = this.findPosition(item);
		// find the final position in case of equal values
		const finalSort = this.#comparatorFunction(this[position], item);
		/* istanbul ignore else */
		if (finalSort < 0) {
			super.splice(++position, 0, item);
		}
		else if (finalSort > 0) {
			super.splice(position, 0, item);
		}
		else {
			while (this.#comparatorFunction(this[position], item) === 0) {
				if (position >= this.length - 1) break;
				position++;
			}
			super.splice(position, 0, item);
		}
		return this.length;
	}

	public push(...items: T[]) {
		for (const item of items) {
			this.insert(item);
		}
		return items.length;
	}

	unshift(...items: T[]): number {
		return this.push(...items);
	}

	/**
	 * @deprecated This method is not implemented.
	 */
	splice(start: number, deleteCount?: number): T[] {
		throw new Error("not implemented");
	}

	/**
	 * @deprecated This method is not implemented.
	 */
	sort(compareFn?: (a: T, b: T) => number): this {
		throw new Error("not implemented");
	}

	/**
	 * @deprecated This method is not implemented.
	 */
	reverse(): T[] {
		throw new Error("not implemented");
	}

	/**
	 * @deprecated This method is not implemented.
	 */
	copyWithin(target: number, start: number, end?: number): this {
		throw new Error("not implemented");
	}

	/**
	 * @deprecated This method is not implemented.
	 */
	fill(value: T, start?: number, end?: number): this {
		throw new Error("not implemented");
	}
}
export default SortedArray;