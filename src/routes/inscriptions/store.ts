import { type Writable, writable } from 'svelte/store';
import type { Inscription } from '$lib/data/models/Inscription';

export const subscriptions: Writable<Inscription[]> = writable([])

/*export const create = (subscription: Inscription) => {
	subscription.id = Math.floor(Math.random() * 9999)
	subscriptions.update((store) => {
		return [subscription, ...store]
	})
}*/

export const destroy = (subscription: Inscription) => {
	subscriptions.update((store) => {
		return store.filter((item) => item.id !== subscription.id)
	})
}

/*
export const update = (subscription: Inscription) => {
	subscriptions.update((store) => {
		const result = store.find((item) => item.id === subscription.id)
		result.first_name = subscription.first_name
		result.last_name = subscription.last_name
		result.email = subscription.email
		return store
	})
}*/
