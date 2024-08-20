import React from "react";


// Custom functions

import { RepoButton, FilterButton } from "./LbeElements.js";
import Authors from "./Authors.js";


// Function for single lbe dataset block

function LbeBlock( { title, authors, journal, pubyear, linkpub, linkdata, linkcomment, description, lbeState, setLbeState } ) {

    // Extract DOI from link by cutting right of "doi.org"
	var doi = linkpub.slice(linkpub.indexOf("doi.org")+8); 

    // Define set of repos in this dataset
	var myRepos = Array.from(new Set(linkdata.map(obj => obj.name))).flat().sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'}));

	return (
        <div className="lbe__block">
            <div className="lbe__block__header">
                <div className="lbe__block__header__title"><h3>{title}</h3></div>
                <div className="lbe__block__header__link"><RepoButton name="Permalink" url={"./?doi=".concat(doi)} /></div>
            </div>

            <p><em><Authors {...{authors}} length={10} /></em></p>

            <p><em>{journal}</em> <strong>{pubyear}</strong>, DOI: <a href={linkpub} target="_blank">{doi}</a>.</p>          

            <p>{myRepos.map((m,idx) => 
                <FilterButton key={idx} name={m} type="repo" numbered={false} {...{lbeState, setLbeState}} />
            )}
            </p>

            <details className="lbe__details">
                <summary>Details</summary>
                <div className="lbe__details--collapsible">
                    <h4>Description</h4>
                    <p>{description}</p>

                    <h4>Links to datasets</h4>
                    <p>{linkdata.map((props, idx) => (
                        <RepoButton key={idx} {...props} />
                    ))}</p>
                    <p><em>{linkcomment}</em></p>
                </div>        
            </details>
        </div>
	);
}


// Render LBE entry list

function LbeBody( { list, lbeState, setLbeState } ) {
    return(
		<div className="lbe__body">
			{list.map((props, idx) => (
        		<LbeBlock key={idx} {...props} {...{lbeState, setLbeState}} />
      		))}
    	</div>
  	)
}

export default LbeBody;