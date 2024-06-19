/**
 * StorageService
 *  - A service to read and write data to the storage
 *  - It can be used to read and write data to the local storage or session storage
 */
export class StorageService {

	private storage: Storage;

	/**
	 * Constructor
	 * @param storage - The storage to use (local storage or session storage)
	 * @public
	 */
	constructor(storage: Storage) {
		this.storage = storage;
	}

	/**
	 * Read data from the storage
	 * @param key - The key to read the data
	 * @returns The data read from the storage
	 * @public
	 */
	read<T>(key: string): T | null {
		const item = this.storage.getItem(key);
		if (!item) {
			return null;
		}

		try {
			return JSON.parse(item) as T;
		} catch (e) {
			console.error('Error parsing data from storage', e);
			return null;
		}
	}

	/**
	 * Save data to the storage
	 * @param key - The key to save the data
	 * @param value - The value to save
	 * @public
	 */
	save<T>(key: string, value: T): void {
		const item = JSON.stringify(value);
		this.storage.setItem(key, item);
	}

	/**
	 * Remove data from the storage
	 * @param key - The key of the data to remove
	 * @public
	 */
	remove(key: string): void {
		this.storage.removeItem(key);
	}
}