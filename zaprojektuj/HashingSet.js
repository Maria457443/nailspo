export class HashingSet {
	constructor() {
		this.map = new Map();
	}
	add(value) {
		const existingEntries = this.map.get(value.hash());
		if (existingEntries === undefined) {
			this.map.set(value.hash(), [value]);
			return;
		} else {
			for (const existingEntry of existingEntries) {
				if (existingEntry.equals(value)) {
					return;
				} else {
					continue;
				}
			}
			existingEntries.push(value);
			return;
		}
	}
	has(value) {
		const existingEntries = this.map.get(value.hash());
		if (existingEntries === undefined) {
			return false;
		} else {
			for (const existingEntry of existingEntries) {
				if (existingEntry.equals(value)) {
					return true;
				} else {
					continue;
				}
			}
			return false;
		}
	}
	*[Symbol.iterator]() {
		for (const existingEntries of this.map.values()) {
			for (const existingEntry of existingEntries) {
				yield existingEntry;
				continue;
			}
			continue;
		}
		return;
	}
}
