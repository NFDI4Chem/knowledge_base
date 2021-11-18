# Chemistry RDM Knowledge Base

This repo is the core of the NFDI4Chem knowledge base.

## How to contribute

Create a fork of the repository. Make additions/changes as you required. Create pull-request. Your changes will then be reviewed by editors of this page. In case of any problems, or if you are unable to contribute via github contact helpdesk@nfdi4chem.de.

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

Using the `img` HTML tag will require additional prerequisites and is discouraged unless specifically needed for the page layout.

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Installation
Instead of ```npm``` you can also use ```yarn```.

```console
npm install
```

## Local Development

```console
npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server. Press ```Ctrl + C``` to stop.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Clear Cache
```console
npm run clear
```
