// Custom functions

import { RepoButton, FilterButton } from "./LbeElements.js";
import Authors from "./Authors.js";

import { Details } from "@site/src/theme/common/Details";

// Import CSS

import styles from "@site/src/css/lbe.module.css";

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
				<a href={linkpub} target="_blank" rel="noopener noreferrer">
					{doi}
				</a>
				.
			</p>

			<p>
				{myRepos.map((repo) => (
					<FilterButton
						key={repo}
						name={repo}
						type="repo"
						numbered={false}
						funnel
						title={"Filter datasets from " + repo}
						{...{ lbeState, setLbeState }}
					/>
				))}
			</p>

			<hr className={styles.lbeBlockHr} />

			<Details
				className={styles.lbeDetails}
				contentClassName={styles.lbeDetailsCollapsible}
				summary="Description"
			>
				<p>{description}</p>
			</Details>

			<hr className={styles.lbeBlockHr} />

			<Details
				className={styles.lbeDetails}
				contentClassName={styles.lbeDetailsCollapsible}
				summary="Links to datasets"
			>
				<div className={styles.lbeRepos}>
					{linkdata.map((item) => (
						<RepoButton
							key={`${item.name}_${item.url}`}
							{...item}
						/>
					))}
				</div>
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
			{list.map((item) => (
				<LbeBlock
					key={item.title}
					{...item}
					{...{ lbeState, setLbeState }}
				/>
			))}
		</div>
	);
}

export default LbeBody;
