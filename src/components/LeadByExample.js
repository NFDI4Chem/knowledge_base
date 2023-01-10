import React,{ useState, useEffect } from "react";
import { useLocation } from "react-router-dom"


// Custom functions

import FilterSection from "./lbe/FilterSection.js";
import LbeBody from "./lbe/LbeBody.js";


// Import global data

import { lbeTable } from "./lbe/Data.js";


// Main function

function Lbe() {

	// Get URL params
	const location = useLocation()
	const queryParameters = new URLSearchParams(location.search);
	const queryText = queryParameters.get("text");
	const queryDoi = queryParameters.get("doi");


	// Define React state object
	const [lbeState, setLbeState] = useState({});


	// Conditions for initial states

	if (queryText !== null) {
		useEffect(() => {setLbeState({
			search: queryText,
			switch: "text"
		}); },[]);

	} else if (queryDoi !== null) {
		useEffect(() => {setLbeState({
			switch: "doi"
		}); },[]);

	} else {
		useEffect(() => {setLbeState({
			repo: "All",
			subd: "All",
			journal: "All",
			switch: "subd"
		})},[]);
	}


	// Get list of subdisciplines
	var subdiscs = Array.from(new Set(lbeTable.map(obj => obj.subdiscipline).flat())).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
	subdiscs.unshift("All"); // Add "All" option at the beginning


	// Get list of tags
	var categories = Array.from(new Set(lbeTable.map(obj => obj.tags).flat())).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
	categories.unshift("All"); // Add "All" option at the beginning

	
	// Get list of journals
	var journals = Array.from(new Set(lbeTable.map(obj => obj.journal))).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
	journals.unshift("All"); // Add "All" option at the beginning

	
	// Get list of repos
	var repos = Array.from(new Set(lbeTable.map(obj => obj.linkdata.map(obj => obj.name)).flat())).sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));
	repos.unshift("All"); // Add "All" option at the beginning


	var result = [];

	// Render all datasets if "All" is selected

	if (lbeState.repo == "All" || lbeState.subd == "All") {
		result = lbeTable;
	} else {

		// Determine result set based on lbeState.switch states
		switch ( lbeState.switch ) {
			case "tag":
				result = lbeTable.filter(n => n.tags.includes(tagFilter));
				break;
			case "repo":
				result = lbeTable.filter(n => n.linkdata.map(n => n.name).includes(lbeState.repo));
				break;
			case "subd":
				result = lbeTable.filter(n => n.subdiscipline.includes(lbeState.subd));
				break;
			case "journal":
				result = lbeTable.filter(n => n.journal.includes(lbeState.journal));
				break;
			case "search":
				result = lbeTable.filter(obj => JSON.stringify(obj).toLowerCase().includes(lbeState.search.toLowerCase()));   // Squash object with JSON.stringify() for better searchability
				if ( lbeState.search == "" ) {
					var resultOutput = "";
				} else if (result.length == 1) {
					var resultOutput = result.length+" entry found...";
				} else {
					var resultOutput = result.length+" entries found...";
				}
				break;
			case "doi":
				result = lbeTable.filter(n => n.linkpub.includes(queryDoi));  
		}
	}

	return (
		<div className="lbe">
			<FilterSection {...{repos, subdiscs, journals, lbeState, setLbeState, resultOutput}} />
			<LbeBody list={result} {...{lbeState, setLbeState}} /> 
		</div>
	)
}

export default Lbe;