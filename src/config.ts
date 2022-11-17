export const SITE = {
	title: 'Instellar',
	description: 'Documentation for instellar',
	defaultLanguage: 'en_US',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/withastro/astro/blob/main/assets/social/banner.jpg?raw=true',
		alt:
			'astro logo on a starry expanse of space,' +
			' with a purple saturn-like planet floating in the right foreground',
	},
	twitter: 'astrodotbuild',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/upmaru/instellar-docs/tree/master`;

export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	en: {
		'Start Here': [
			{ text: 'Introduction', link: 'en/introduction' },
			{ text: 'Object Storage', link: 'en/object-storage' },
			{ text: 'Compute', link: 'en/compute' },
			{ text: 'Setup an Organization', link: 'en/setup-an-organization' },
			{ text: 'LXD Cluster', link: 'en/lxd-cluster' }
		],
		'Object Storage': [
			{ text: 'Amazon S3', link: 'en/object-storage/amazon-s3' },
			{ text: 'Digital Ocean Spaces', link: 'en/object-storage/digital-ocean-spaces' },
			{ text: 'Cloudflare R2', link: 'en/object-storage/cloudflare-r2' }
		],
		'VPC': [
			{ text: 'Digital Ocean', link: 'en/vpc/digital-ocean' }
		],
		'Compute': [
			{ text: 'Digital Ocean', link: 'en/compute/digital-ocean' }
		],
		'Firewall': [
			{ text: 'Digital Ocean', link: 'en/firewall/digital-ocean' }
		],
		'LXD Cluster': [
			{ text: 'Initialization', link: 'en/lxd-cluster/initialization' },
			{ text: 'Adding Node', link: 'en/lxd-cluster/adding-node' }
		]
	},
};
