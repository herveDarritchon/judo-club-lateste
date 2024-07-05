import type { StorageService } from '$lib/storage/StorageService';
import { Fingerprint } from '$lib/security/fingerPrint/FingerPrint';

/**
 * DeviceFingerPrint
 *  - A service to get the device fingerprint
 *  - It generates a device fingerprint and stores it in the storage
 *  - If the device fingerprint is already stored, it returns the stored one
 */
export class DeviceFingerPrint {
	private readonly DEVICE_ID_KEY = 'device_id';
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
	 async get(): Promise<string> {

		let deviceId: string | null = await this.storageService.read(this.DEVICE_ID_KEY);

		if (!deviceId) {
			deviceId = await Fingerprint.generate();
			this.storageService.save(this.DEVICE_ID_KEY, deviceId);
		}
		return deviceId;
	}

}