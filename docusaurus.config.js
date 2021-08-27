/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'NFDI4Chem Knowledge Base',
  tagline: 'A place for all knowledge regarding Research Data Management (RDM) in general & in Chemistry - whether you are a novice or an expert - we have the answers to your questions',
  url: 'https://nfdi4chem.chemie.uni-mainz.de/',
  baseUrl: '/knowledge_base/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'NFDI4Chem', // Usually your GitHub org/user name.
  projectName: 'knowledge_base', // Usually your repo name.
  trailingSlash: 'true',
  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Site Logo',
        src: 'img/4Chem.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Knowledge Base',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        
        {
          title: 'Community',
          items: [
           
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/nfdi4chem',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/nfdi4chem',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'NFDI4Chem Website',
              to: 'https://nfdi4chem.de',
            },
            {
              label: 'NFDI4Chem Helpdesk',
              to: 'https://nfdi4chem.de/index.php/helpdesk/'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/NFDI4Chem/knowledge_base',
            },
          ],
        },
        {
          title: ' ',
          items: [
            {
              label: 'About',
              to: 'about',
            },
          
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NFDI4Chem. Built with Docusaurus.`,
    },
  
    colorMode: {disableSwitch: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/NFDI4Chem/knowledge_base/tree/main/',
       
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
