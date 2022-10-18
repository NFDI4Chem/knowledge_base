# Advanced stuff

## Downloadable files

Please place downloadable files, e.g. document templates, in the `assets` folder:
```
/static/assets/file.pdf
/static/assets/template.docx
```

In order to link the file in your document, use the following Markdown:

```
[Link text](pathname://../../../assets/file.pdf)
```

The example assumes that your Markdown file is located on the third filesystem level, e.g. `/docs/10_domains/`. If not, please adjust the number of `../` pointers accordingly.


## Format Images using `img`

In some cases, the image markdown might be too limited and it might be better to use the `img` html tag. To do so, add the following line at the beginning (but after the frontmatter):

```
---
title: "Title of my page"
---

import useBaseUrl from '@docusaurus/useBaseUrl';
```

Where you wish to reference the image, use the `img` html tag in this way:

```
<img align="center" src={useBaseUrl('/img/topics/myImage.png')} alt="My image" />
```


## Dymanic tables

