interface AvatarUrls {
	24: string;
	48: string;
	96: string;
}

interface Link {
	href: string;
}

interface Links {
	self: Link[];
	collection: Link[];
}

export class User {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: AvatarUrls;
	meta: any[];
	_links: Links;

	constructor(data: any) {
		this.id = data.id;
		this.name = data.name;
		this.url = data.url;
		this.description = data.description;
		this.link = data.link;
		this.slug = data.slug;
		this.avatar_urls = data.avatar_urls;
		this.meta = data.meta;
		this._links = data._links;
	}
}

export const Guest: User = new User({
	id: 0,
	name: 'Guest',
	url: '',
	description: 'Un utilisateur non connecté',
	link: '',
	slug: 'guest',
	avatar_urls: {
		24: '',
		48: '',
		96: ''
	},
	meta: [],
	_links: {
		self: [],
		collection: []
	}
});