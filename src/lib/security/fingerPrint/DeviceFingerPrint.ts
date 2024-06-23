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
	private deviceId: string = '';
	private storageService: StorageService;
	private static deviceId: Promise<string>;

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
	static async get(): Promise<string> {
		if (!DeviceFingerPrint.deviceId) {
			DeviceFingerPrint.deviceId = Fingerprint.generate();
			/*			this.deviceId = this.storageService.read(this.DEVICE_ID_KEY) || this.generate();
						this.storageService.save(this.DEVICE_ID_KEY, this.deviceId);*/
		}
		return DeviceFingerPrint.deviceId;
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
