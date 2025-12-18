// Custom functions

import { RepoButton, FilterButton } from "./LbeElements.js";
import Authors from "./Authors.js";

import { Details } from "@site/src/theme/Details";

// Import CSS

import styles from "./lbe.module.css";

// Function for single lbe dataset block

function LbeBlock({
  title,
  authors,
  journal,
  pubyear,
  linkpub,
  linkdata,
  linkcomment,
  description,
  lbeState,
  setLbeState,
}) {
  // Extract DOI from link by cutting right of "doi.org"
  var doi = linkpub.slice(linkpub.indexOf("doi.org") + 8);

  // Define set of repos in this dataset
  var myRepos = Array.from(new Set(linkdata.map((obj) => obj.name)))
    .flat()
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return (
    <div className={styles.lbeBlock}>
      <div className={styles.lbeBlockHeader}>
        <div className={styles.lbeBlockHeaderTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.lbeBlockHeaderLink}>
          <RepoButton name="Permalink" url={"./?doi=".concat(doi)} />
        </div>
      </div>

      <p>
        <em>
          <Authors {...{ authors }} length={10} />
        </em>
      </p>

      <p>
        <em>{journal}</em> <strong>{pubyear}</strong>, DOI:{" "}
        <a href={linkpub} target="_blank">
          {doi}
        </a>
        .
      </p>

      <p>
        {myRepos.map((m, idx) => (
          <FilterButton
            key={idx}
            name={m}
            type="repo"
            numbered={false}
            funnel
            title={"Filter datasets from " + m}
            {...{ lbeState, setLbeState }}
          />
        ))}
      </p>

      <hr className={styles.lbeBlockHr} />

      <Details
        className={styles.lbeDetails}
        contentClassName={styles.lbeDetailsCollapsible}
        summary="Description"
        open={description.length <= 100}
      >
        <p>{description}</p>
      </Details>

      <hr className={styles.lbeBlockHr} />

      <Details
        className={styles.lbeDetails}
        contentClassName={styles.lbeDetailsCollapsible}
        summary="Links to datasets"
        open={linkdata.length <= 3}
      >
        <p>
          {linkdata.map((props, idx) => (
            <RepoButton key={idx} {...props} />
          ))}
        </p>
        <p>
          <em>{linkcomment}</em>
        </p>
      </Details>
    </div>
  );
}

// Render LBE entry list

function LbeBody({ list, lbeState, setLbeState }) {
  return (
    <div className={styles.lbeBody}>
      {list.map((props, idx) => (
        <LbeBlock key={idx} {...props} {...{ lbeState, setLbeState }} />
      ))}
    </div>
  );
}

export default LbeBody;
