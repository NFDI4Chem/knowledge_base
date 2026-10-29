import React from "react";

// Custom functions

import { TextSearch, FilterButton } from "./LbeElements.js";

// Import CSS

import styles from "@site/src/css/lbe.module.css";

// Assemble buttons for filtering section

function LbeButtons({ repos, subdiscs, journals, lbeState, setLbeState }) {
	return (
		<React.Fragment>
			<div className={styles.lbeSearchfilterSection}>
				<h4>Filter by repositories</h4>
				<p>
					{repos.map((repo) => (
						<FilterButton
							key={repo}
							name={repo}
							type="repo"
							numbered={true}
							{...{ lbeState, setLbeState }}
						/>
					))}
				</p>
			</div>
			<div className={styles.lbeSearchfilterSection}>
				<h4>Filter by subdisciplines</h4>
				<p>
					{subdiscs.map((subdisc) => (
						<FilterButton
							key={subdisc}
							name={subdisc}
							type="subd"
							numbered={true}
							{...{ lbeState, setLbeState }}
						/>
					))}
				</p>
			</div>
			<div className={styles.lbeSearchfilterSection}>
				<h4>Filter by journals</h4>
				<p>
					{journals.map((journal) => (
						<FilterButton
							key={journal}
							name={journal}
							type="journal"
							numbered={true}
							{...{ lbeState, setLbeState }}
						/>
					))}
				</p>
			</div>
		</React.Fragment>
	);
}

function FilterSection({
	repos,
	subdiscs,
	journals,
	lbeState,
	setLbeState,
	resultOutput,
}) {
	return (
		<div className={styles.lbeSearchfilter}>
			<div className={styles.lbeSearchfilterContainer}>
				<TextSearch {...{ lbeState, setLbeState, resultOutput }} />
				<LbeButtons
					{...{ repos, subdiscs, journals, lbeState, setLbeState }}
				/>
			</div>
		</div>
	);
}

export default FilterSection;
