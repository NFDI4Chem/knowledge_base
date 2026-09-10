# Local testing

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator. When you add or edit pages, you may conveniently preview them locally on your computer.

> **Disclaimer:** Parts of this documentation were generated with the assistance of AI and may contain errors or inaccuracies. Always verify commands and instructions against the current project configuration before using them.

## Requirements

* In order to clone the repository to your computer, you may simply [download](https://github.com/NFDI4Chem/knowledge_base/archive/refs/heads/main.zip) the repository from GitHub and extract it. If you want to work locally on changes in your fork, the installation of [Git](https://git-scm.com/) and [Visual Studio Code](https://code.visualstudio.com/) may be convenient.
* To create a local preview of the website, you need to install [Node.js](https://nodejs.org/) (we recommend using the LTS version; at least `>=18` is required).

## Installation

To install the required packages to the Docusaurus repository, change to the extracted repository directory on your shell and use the following command :

```console
npm install
```

## Start Local Testing

To (re-)build the KB files after a content update, run:

```console
npm run build
```

To run the default check (content validation), run:

```console
npm run test
```

To run the full check (formatting + content validation + ESLint + Stylelint), run:

```console
npm run test:all
```

For more detailed information about our internal testing routines, see the documentation on our [content, format, JS, and CSS checks](tests/lint.md) and [Playwright](tests/playwright.md) tests.

To run a local testing instance of the knowledge base, run:

```console
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server. Press `Ctrl + C` to stop.

For further details please refer to the [Docusaurus documentation](https://docusaurus.io/docs/).
