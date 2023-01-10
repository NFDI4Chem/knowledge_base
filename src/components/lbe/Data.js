// LBE data

const lbeTable = require('@site/static/assets/lbe.json');

// Lookup for JSON attributes corresponding to type

const filterAttr = {
  "subd": "subdiscipline",
  "journal": "journal",
  "repo": "linkdata",
  "doi": "linkpub"
};

export { lbeTable, filterAttr };