import type { StorageService } from '$lib/storage/StorageService';

/**
 * DeviceFingerPrint
 *  - A service to get the device fingerprint
 *  - It generates a device fingerprint and stores it in the storage
 *  - If the device fingerprint is already stored, it returns the stored one
 */
export class DeviceFingerPrint {
	private readonly DEVICE_ID_KEY = 'device_id';
	private deviceId: string = '';
	private storageService: StorageService;

	/**
	 * Constructor
	 * @param storageService - The storage service to use
	 * @public
	 */
	constructor(storageService: StorageService) {
		this.storageService = storageService;
	}

	/**
	 * Get the device fingerprint from the storage or generate a new one
	 * @returns The device fingerprint
	 * @public
	 */
	get(): string {
		if (!this.deviceId) {
			this.deviceId = this.storageService.read(this.DEVICE_ID_KEY) || this.generate();
			this.storageService.save(this.DEVICE_ID_KEY, this.deviceId);
		}
		return this.deviceId;
	}

	/**
	 * Generate a new device fingerprint
	 * @returns The generated device fingerprint
	 * @private
	 */
	private generate(): string {
		return crypto.randomUUID();
	}

}
