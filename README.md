# Chemistry RDM Knowledge Base

This repo is the core of the [NFDI4Chem knowledge base](https://knowledgebase.nfdi4chem.de).

## How to contribute

Just follow these simple steps:

1. Create a fork of the repository.
2. Make additions/changes as required.
3. Create a pull-request.

Your changes will then be reviewed by editors of this page. In case of any problems, or if you are unable to contribute via github contact [helpdesk@nfdi4chem.de](mailto:helpdesk@nfdi4chem.de).

## Conventions

- Use british english
- headings with: # (primary), ## (secondary), ### (tertiary etc)

## Source information

- Citations (e.g. for journal articles): only cite the name of the article and doi (if available) and add link to doi - as opposed to a citation standard such as Angewandte, RSC etc. To cite to a footnote   which contains a citation, use a superscripted number.
- For references, sources and/or further information/reading, please always use the heading "Sources and further information".
- Use bullet points
- Indicate if a source is written in German (e.g. - German: Article about ...)

## Adding images

Please place your image files in the suitable subfolder for the topic of your article:

```
/static/img/domains
/static/img/role
/static/img/problems
/static/img/topics
```

You can then reference to them by leaving out the `/static` part of the path. Preferably add images using the Markdown syntax like this:

```![FAIR Data](/img/topics/FAIR_data_principles.png)```

Using the `img` HTML tag will require additional prerequisites and is discouraged unless specifically needed for the page layout. If you have special formatting matters, please contact [us](mailto:helpdesk@nfdi4chem.de).

## Downloadable files

Please place downloadable files, e.g. document templates, in the `assets` folder:
```
/static/assets/file.pdf
/static/assets/template.docx
```

Please [contact us](mailto:helpdesk@nfdi4chem.de) for assistance in placing the correct links.

# Local testing

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. When you add or edit pages, you may conveniently preview them locally on your computer.

## Requirements

- In order to clone the repository to your computer, you may simply [download](https://github.com/NFDI4Chem/knowledge_base/archive/refs/heads/main.zip) the repository from Github and extract it. If you want to work locally on changes in your fork, the installation of [Git](https://git-scm.com/) and [Visual Studio Code](https://code.visualstudio.com/) may be convenvient.
- To create a local preview of the website, you need to install [NodeJS](https://nodejs.org/) (we recommend using the LTS 16.x version (at least `>=16.14` is required).

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

To run a local testing instance of the knowledge base, run:

```console
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server. Press ```Ctrl + C``` to stop.

For further details please refer to the [Docusaurus documentation](https://docusaurus.io/docs/).
