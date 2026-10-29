import React, { useState, useEffect } from "react";
import moment from "moment";
import { useImmer } from "use-immer";

import ElnStatus from "./ElnStatus";
import ElnFilter from "./elnFilter/ElnFilter";
import ElnStack from "./ElnStack";

import styles from "@site/src/components/eln/ElnStyles";
// const elnData = require("@site/static/assets/eln_test.json");

function ElnFinder(props) {
	// State for ELN data

	const [elnData, setElnData] = useState(null);

	// State for filtering

	const [filter, setFilter] = useImmer(
		props.subDisc ? { subDisc: props.subDisc } : {},
	);

	// Fetch ELN data

	useEffect(() => {
		const controller = new AbortController();

		fetch("../../assets/elnData.json", { signal: controller.signal })
			.then((response) => response.json())
			.then((data) => {
				setElnData(data);
				console.log(data);
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					console.error(error);
				}
			});

		return () => controller.abort();
	}, []);

	// Catch if fetch is still loading

	if (!elnData) {
		return <em>Loading...</em>;
	}

	// Define working variables

	let elnTable = [];
	let allSubDisc = [];
	let allLicenses = [];

	// Parse timestamp of ELN data

	const dateDownloaded = moment(elnData.date);
	const relativeDate = moment(dateDownloaded).fromNow();

	// Assemble essential ELN data

	try {
		const chemElns = elnData["_embedded"].searchResult["_embedded"].objects;

		chemElns.map((eln) => {
			let subDisc = [];
			eln["_embedded"].indexableObject.metadata["dc.subject"].map(
				(discipline) =>
					discipline.value.startsWith("Chemistry:")
						? subDisc.push(discipline.value.split(":")[1])
						: null,
			);

			elnTable.push({
				name: eln["_embedded"].indexableObject.name,
				url: eln["_embedded"].indexableObject.metadata[
					"dc.identifier.uri"
				][0].value,
				license:
					eln["_embedded"].indexableObject.metadata[
						"K.lizenzmodell"
					][0].value,
				desc: eln["_embedded"].indexableObject.metadata[
					"dc.description.abstract"
				][0].value,
				subDisc: subDisc,
			});
			allSubDisc.push(subDisc);
			allLicenses.push(
				eln["_embedded"].indexableObject.metadata["K.lizenzmodell"][0]
					.value,
			);
		});

		allSubDisc = [...new Set(allSubDisc.flat())];
		allLicenses = [...new Set(allLicenses)];
	} catch (error) {
		console.error(error);
		return <em>Failed to process ELN data.</em>;
	}

	// Filter ELN data based on filter state

	const filteredTable = elnTable.filter((eln) => {
		if (Object.keys(filter).length === 0) {
			return true;
		}

		if (filter.subDisc && !eln.subDisc.includes(filter.subDisc)) {
			return false;
		}

		if (filter.license && eln.license !== filter.license) {
			return false;
		}

		if (
			filter.text &&
			!JSON.stringify(eln)
				.toLowerCase()
				.includes(filter.text.toLowerCase())
		) {
			return false;
		}

		return true;
	});

	// Determine number of results and generate output

	const getResultOutput = (numberOfResults, totalResults) => {
		if (numberOfResults === totalResults) {
			return null;
		}

		if (numberOfResults === 0) {
			return "No results found.";
		}

		if (numberOfResults === 1) {
			return "1 result found.";
		}

		return `${numberOfResults} results found.`;
	};

	const numberOfResults = filteredTable.length;
	const resultOutput = getResultOutput(numberOfResults, elnTable.length);

	// Render ELN Finder component

	return (
		<React.Fragment>
			<ElnStatus {...{ relativeDate }} />
			<div className={styles.eln}>
				<ElnFilter
					{...{
						allSubDisc,
						allLicenses,
						filter,
						setFilter,
						resultOutput,
					}}
				/>
				<ElnStack {...{ filteredTable, filter, setFilter }} />
			</div>
		</React.Fragment>
	);
}

export default ElnFinder;
