/** @type {import('@docusaurus/types').DocusaurusConfig} */

const title = "NFDI4Chem Knowledge Base";
const url = "https://knowledgebase.nfdi4chem.de/";
const baseUrl = '/knowledge_base/';

// Use for stagging:
// const baseUrl = '/staging/knowledge_base_matomo/';
// const baseUrl = '/staging/knowledge_base/';

module.exports = {
	title: title,
	url: url,
	baseUrl: baseUrl,
	  onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
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
	plugins: [
		'docusaurus-plugin-matomo',
	],
	themeConfig: {
		//    announcementBar: {
		//      id: 'community_survey',
		//      content:
		//        '<strong>Find out what is already possible with chemistry data today.</strong> Join us in Mainz on 6/7 June 2023 at the <a href="https://www.nfdi4chem.de/index.php/event/chemistry-data-days-2023/" target="_blank">Chemistry Data Days</a>.',
		//      isCloseable: true,
		//    },
		matomo: {
			matomoUrl: 'https://knowledgebase.nfdi4chem.de/matomo/',
			siteId: '1',
			phpLoader: 'matomo.php',
			jsLoader: 'matomo.js',
		},	
		navbar: {
			logo: {
				alt: "NFDI4Chem Logo",
				src: "img/N4C_logo_navbar_large.svg",
			},
			items: [
				{
					type: "doc",
					docId: "intro/intro",
					position: "left",
					label: "Knowledge Base",
				},
				{
					label: "NFDI4Chem",
					href: "https://www.nfdi4chem.de",
				},
				{
					label: "Terminology Service",
					href: "https://terminology.nfdi4chem.de/",
				},
				{
					label: "Search Service",
					href: "https://search.nfdi4chem.de/",
				},
				{
					label: "FAQ",
					href: "https://www.nfdi4chem.de/index.php/frequently-asked-questions/",
				},
				{
					type: "localeDropdown",
					position: "left",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					items: [
						{
							html: `
								<a href="https://www.dfg.de" target="_blank">
									<img src="`+baseUrl+`img/dfg_logo_schriftzug_weiss_foerderung_en.png" />
								</a>
								<p>NFDI4Chem is funded by DFG<br>Project Number 441958208</p>
							`,
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "LinkedIn",
							href: "https://www.linkedin.com/company/nfdi4chem",
						},
						{
							label: "Twitter",
							href: "https://twitter.com/nfdi4chem",
						},
						{
							label: "GitHub",
							href: "https://github.com/NFDI4Chem",
						},
					],
				},
				{
					title: "Resources",
					items: [
						{
							label: "NFDI4Chem Website",
							href: "https://nfdi4chem.de",
						},
						{
							label: "NFDI4Chem FAQ",
							href: "https://www.nfdi4chem.de/index.php/frequently-asked-questions/",
						},
						{
							label: "NFDI4Chem Helpdesk",
							href: "https://nfdi4chem.de/index.php/helpdesk/",
						},
						{
							label: "NFDI4Chem Terminology Service",
							href: "https://terminology.nfdi4chem.de/",
						},
						{
							label: "NFDI4Chem Search Service",
							href: "https://search.nfdi4chem.de/",
						},
						{
							label: "NFDI4Chem Knowledge Base GitHub Repository",
							href: "https://github.com/NFDI4Chem/knowledge_base",
						},
					],
				},
				{
					title: "Legal information",
					items: [
						{
							label: "About",
							to: "about",
						},
						{
							label: "Legal Notice",
							href: "https://www.uni-mainz.de/eng/102.php",
						},
						{
							label: "Privacy",
							href: "https://www.uni-mainz.de/eng/144.php",
						},
					],
				},
			],
			copyright: `
				<div class="footer__copyright row" style="justify-content: center">
					<div class="cell" style="padding: 1rem;" >
						<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"></a>
					</div>
					<div class="cell" style="padding: 0.1rem; text-align: left;" >
						Licensed under a <a class="footer__link-item" rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons BY-SA 4.0 License</a>, if not stated otherwise.<br />
						Copyright © 2023 NFDI4Chem. Built with Docusaurus.
					</div>
				</div>
        	`,
		},

		colorMode: { disableSwitch: true },
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					editUrl: "https://github.com/NFDI4Chem/knowledge_base/tree/main/",
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			},
		],
	],
	themes: [
		[
			require.resolve("@easyops-cn/docusaurus-search-local"),
			{
				hashed: true,
				highlightSearchTermsOnTargetPage: true,
			},
		],
	],
};
