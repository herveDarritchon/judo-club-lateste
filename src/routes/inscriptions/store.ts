import { type Writable, writable } from 'svelte/store';
import type { Inscription } from '$lib/data/models/Inscription';

export const subscriptions: Writable<Inscription[]> = writable([]);

/*export const create = (subscription: Inscription) => {
	subscription.id = Math.floor(Math.random() * 9999)
	subscriptions.update((store) => {
		return [subscription, ...store]
	})
}*/

export const destroy = (subscription: Inscription) => {
	subscriptions.update((store) => {
		return store.filter((item) => item.id !== subscription.id);
	});
};

export const update = (subscription: Inscription) => {
	subscriptions.update((store) => {
		const index = store.findIndex((item) => item.id === subscription.id);
		if (index !== -1) {
			// Create a new object by merging the existing subscription with the new values
			store[index] = { ...store[index], ...subscription };
		}
		return store;
	});
};
