import { beforeEach, describe, expect, type Test, test } from 'vitest';
import { StorageService } from '$lib/storage/StorageService';
import { MockStorage } from './MockStorage';

let storageService: StorageService;
let storage: MockStorage = new MockStorage();


describe('StorageService', () => {
	beforeEach(() => {
		storageService = new StorageService(storage);
	});
	test('should save and retrieve data', () => {
		storageService.save('1', 'TestValue1');
		expect(storageService.read('1')).toBe('TestValue1');
	});

	test('should return null for non-existent key', () => {
		expect(storageService.read('non-existent')).toBeNull();
	});

	test('should delete data', () => {
		storageService.save('1', 'TestValue1');
		storageService.remove('1');
		expect(storageService.read('1')).toBeNull();
	});
});