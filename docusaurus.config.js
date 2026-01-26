/** @type {import('@docusaurus/types').Config} */

import { themes as prismThemes } from "prism-react-renderer";

const announcementBarActive = false; // set to true to activate the announcement bar
const announcementBar = announcementBarActive
	? require("./announcementBar.json")
	: {};

let title = "NFDI4Chem Knowledge Base";

const copyright = require("./copyright.js");

// Uncomment for staging:
// title += " (STAGING)";

const description =
	"Supporting scientists to digitalise all steps of chemical research: to collect, store, process, analyse, publish, and reuse research data";
const url = "https://knowledgebase.nfdi4chem.de/";

let baseUrl = "/knowledge_base/";

// Uncomment for stagging:
// baseUrl = "/staging" + baseUrl;

const navbar = require("./navbar.json");
const footerLinks = require("./footer.json");

const config = {
	title: title,
	url: url,
	baseUrl: baseUrl,
	customFields: {
		description: description,
	},
	onBrokenLinks: "warn",
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: "warn",
			onBrokenMarkdownImages: "warn",
		},
	},
	favicon: "img/favicon.png",
	organizationName: "NFDI4Chem", // Usually your GitHub org/user name.
	projectName: "knowledge_base", // Usually your repo name.
	trailingSlash: "true",
	i18n: {
		defaultLocale: "en",
		locales: ["en", "de"],
		localeConfigs: {
			en: {
				htmlLang: "en-GB",
			},
		},
	},
	plugins: ["docusaurus-plugin-matomo"],
	themeConfig: {
		...(Object.keys(announcementBar).length > 0 && {
			announcementBar: announcementBar,
		}),
		metadata: [
			{
				name: "google-site-verification",
				content: "wgYVjYSe_T6v6BPPM6fPo1ffl7MYYnuVw-h9RoAYfM0",
			},
		],
		matomo: {
			matomoUrl: "https://knowledgebase.nfdi4chem.de/matomo/",
			siteId: "1",
			phpLoader: "matomo.php",
			jsLoader: "matomo.js",
		},
		navbar: navbar,
		footer: {
			style: "dark",
			links: [
				{
					items: [
						{
							html:
								`
								<a href="https://www.dfg.de" target="_blank" alt="DFG Logo">
									<img src="` +
								baseUrl +
								`img/dfg_logo_schriftzug_weiss_foerderung_en.png" />
								</a>
								<p>NFDI4Chem is funded by DFG<br>Project Number 441958208</p>
							`,
						},
					],
				},
				...footerLinks,
			],
			copyright: copyright,
		},
		algolia: {
			appId: "K32QMEOD1G",
			apiKey: "6ba494183b866a52e3dfd54388379f77",
			indexName: "nfdi4chem_knowledge_base",
			contextualSearch: true,
			// replaceSearchResultPathname: {
			//     from: "/knowledge_base/",
			//     to: "/",
			// },
			// Optional: whether you want to use the new Ask AI feature (undefined by default)
			// askAi: "YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID",
		},
		colorMode: { disableSwitch: true },
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	},
	presets: [
		[
			"classic",
			/** @type {import('@docusaurus/preset-classic').Options} */
			{
				docs: {
					sidebarPath: "./sidebars.js",
					editUrl:
						"https://github.com/NFDI4Chem/knowledge_base/tree/main/",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
				sitemap: {
					lastmod: "datetime",
					ignorePatterns: ["/tags/**"],
					createSitemapItems: async (params) => {
						const { defaultCreateSitemapItems, ...rest } = params;
						const items = await defaultCreateSitemapItems(rest);
						return items.filter(
							(item) => !item.url.includes("/page/"),
						);
					},
				},
			},
		],
	],
	// themes: [
	//     [
	//         require.resolve("@easyops-cn/docusaurus-search-local"),
	//         {
	//             hashed: true,
	//             highlightSearchTermsOnTargetPage: true,
	//         },
	//     ],
	// ],
	future: {
		experimental_faster: {
			rspackBundler: true,
			rspackPersistentCache: true,
		},
	},
};

export default config;
