import { browser } from '$app/environment';

export class Fingerprint {
	private static getBrowserInfo(): string {
		const userAgent = navigator.userAgent;
		const appVersion = navigator.appVersion;
		const languages = navigator.languages.join(',');

		return `${userAgent}-${appVersion}-${languages}`;
	}

	private static getScreenInfo(): string {
		const colorDepth = screen.colorDepth;
		const pixelDepth = screen.pixelDepth;
		const screenWidth = screen.width;
		const screenHeight = screen.height;

		return `${colorDepth}-${pixelDepth}-${screenWidth}x${screenHeight}`;
	}

	private static getRandomValue(): string {
		return Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
	}

	private static async isPrivateBrowsing(): Promise<boolean> {
		return new Promise((resolve) => {
			const on = () => resolve(true);
			const off = () => resolve(false);

			const testLocalStorage = () => {
				try {
					if (localStorage.length) off();
					else {
						localStorage.setItem('test', '1');
						localStorage.removeItem('test');
						off();
					}
				} catch (e) {
					navigator.storage && navigator.storage.estimate ?
						navigator.storage.estimate().then(estimate => {
							if (estimate.quota !== undefined && estimate.quota < 120000000) {
								on();
							} else {
								off();
							}
						}) :
						on();
				}
			};

			testLocalStorage();
		});
	}

	public static async generate(): Promise<string> {
		if (browser) {
			// code here runs only on the server
		const browserInfo = this.getBrowserInfo();
		const screenInfo = this.getScreenInfo();
		const randomValue = this.getRandomValue();
		const isPrivate = await this.isPrivateBrowsing();

		const data = `${browserInfo}-${screenInfo}-${randomValue}-${isPrivate}`;
		return this.hash(data);
		}
		return '0';
	}

	private static hash(input: string): string {
		let hash = 0, i, chr;
		if (input.length === 0) return hash.toString();
		for (i = 0; i < input.length; i++) {
			chr = input.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash.toString();
	}
}