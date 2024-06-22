export class MockStorage implements Storage {
	private storage: Map<string, string> = new Map();

	// Getter pour la propriété length
	get length(): number {
		return this.storage.size;
	}

	clear(): void {
		this.storage.clear();
	}

	getItem(key: string): string | null {
		const value = this.storage.get(key);
		return value !== undefined ? value : null;
	}

	key(index: number): string | null {
		const keys = Array.from(this.storage.keys());
		return keys[index] !== undefined ? keys[index] : null;
	}

	removeItem(key: string): void {
		this.storage.delete(key);
	}

	setItem(key: string, value: string): void {
		this.storage.set(key, value);
	}

}