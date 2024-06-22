class FetcherData {
	private readonly response: () => Promise<Response>;
	private init?: ResponseInit;

	constructor(response: () => Promise<Response>, init?: ResponseInit) {
		this.init = init;
		this.response = response;
	}

	public getResponse(): Promise<Response> {
		return this.response();
	}

	public getInit(): ResponseInit | undefined {
		return this.init;
	}

	setInit(init: RequestInit | undefined) {
		this.init = init;
	}
}

export class MockFetch {
	private routes: Map<string, FetcherData>;

	constructor() {
		this.routes = new Map();
	}

	public addRoute(url: string, handler: () => Promise<Response>): void {
		this.routes.set(url, new FetcherData(handler));
	}

	public fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
		const url = typeof input === 'string' ? input : input.url;

		if (this.routes.has(url)) {
			const handler = this.routes.get(url);
			if (handler) {
				handler.setInit(init);
			}
			return handler ? handler.getResponse() : Promise.reject(new Error('No handler found'));
		} else {
			return Promise.reject(new Error(`No mock handler for URL: ${url}`));
		}
	}

	public static createMockResponse<T>(body: T, statusData: { status: number, statusText: string }, init?: ResponseInit): Response {
		const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
		const responseInit = Object.assign(statusData, init);
		return new Response(JSON.stringify(body), responseInit);
	}

	public static buildMockResponse<T>(body: T, statusData: { status: number, statusText: string, headers: Headers }, init?: ResponseInit): Response {
		// Create custom body
		const responseBody = JSON.stringify(body);

		// Create custom response options
		const responseInit: ResponseInit = statusData;

		// Create the response and Return the response
		return new Response(responseBody, responseInit);
	}

	getInitFromRoute(route: string): RequestInit {
		const handler = this.routes.get(route);
		if (!handler) {
			throw new Error(`No handler for mock route: ${route}`);
		}
		const init = handler.getInit();
		if (!init) {
			throw new Error(`No init for mock route: ${route}`);
		}
		return init;
	}
}