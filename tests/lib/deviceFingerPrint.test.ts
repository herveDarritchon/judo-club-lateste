import { beforeEach, describe, expect, test, vi } from 'vitest';
import { StorageService } from '$lib/storage/StorageService';
import { DeviceFingerPrint } from '$lib/security/DeviceFingerPrint';
import { MockStorage } from './storage/MockStorage';

let storageService: StorageService;
let deviceFingerPrint: DeviceFingerPrint;
let storage: MockStorage;
const generatedDeviceId = 'generated-device-random-uuid-id';

describe('DeviceFingerPrint', () => {
	beforeEach(() => {
		storage = new MockStorage();
		storageService = new StorageService(storage);
		deviceFingerPrint = new DeviceFingerPrint(storageService);
	});

	test('should return the stored device fingerprint if it exists', () => {
		const storedDeviceId = 'stored-device-id';
		storageService.save('device_id', storedDeviceId);

		const deviceId = deviceFingerPrint.get();
		expect(deviceId).toBe(storedDeviceId);
	});

	test('should generate and store a new device fingerprint if none exists', () => {
		vi.spyOn(global.crypto, 'randomUUID').mockReturnValue(generatedDeviceId);

		const deviceId = deviceFingerPrint.get();
		expect(deviceId).toBe(generatedDeviceId);
		expect(storageService.read('device_id')).toBe(generatedDeviceId);
	});

	test('should not regenerate the device fingerprint once it is set', () => {
		vi.spyOn(global.crypto, 'randomUUID').mockReturnValue(generatedDeviceId);

		let deviceId = deviceFingerPrint.get();
		expect(deviceId).toBe(generatedDeviceId);

		// Simulate storage already having the generated deviceId
		vi.spyOn(storageService, 'read').mockReturnValue(generatedDeviceId);

		deviceId = deviceFingerPrint.get();
		expect(deviceId).toBe(generatedDeviceId);
		expect(storageService.read('device_id')).toBe(generatedDeviceId);
	});
});
