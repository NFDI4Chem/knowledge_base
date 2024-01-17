# Getting started

## How to contribute

Just follow these simple steps:

1. Create a [fork](https://github.com/NFDI4Chem/knowledge_base/fork) of the repository.
2. Make additions/changes as required.
3. Create a pull-request to [`NFDI4Chem/knowledge_base:localisation`](https://github.com/NFDI4Chem/knowledge_base/tree/localisation).  
   _(If you don't know how change the base of your pull request, don't worry - we will re-route your pull request if it is not pointed at that branch.)_

Your changes will then be reviewed by editors of this page. In case of any problems, or if you are unable to contribute via github contact [helpdesk@nfdi4chem.de](mailto:helpdesk@nfdi4chem.de).

After approval, the changed sources will be forwarded for [localisation](./localisation.md) and finally merged into the `main` branch.

## Conventions

-   Use british english
-   headings with: # (primary), ## (secondary), ### (tertiary etc)

## Source information

-   Citations (e.g. for journal articles): only cite the name of the article and doi (if available) and add link to doi - as opposed to a citation standard such as Angewandte, RSC etc. To cite to a footnote which contains a citation, use a superscripted number.
-   For references, sources and/or further information/reading, please always use the heading "Sources and further information".
-   Use bullet points
-   Indicate if a source is written in German (e.g. - German: Article about ...)

## Adding images

Please place your image files in the suitable subfolder for the topic of your article:

```
/static/img/domains
/static/img/role
/static/img/problems
/static/img/topics
```

You can then reference to them by leaving out the `/static` part of the path. Preferably add images using the Markdown syntax like this:

```
![FAIR Data](/img/topics/FAIR_data_principles.png)
```

Using the `img` HTML tag will require additional prerequisites and is discouraged unless specifically needed for the page layout. If you have special formatting matters, please contact [us](mailto:helpdesk@nfdi4chem.de).
