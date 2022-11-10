import React,{ useState } from "react";
import { useLocation } from "react-router-dom"

var lbeTable = require('@site/static/assets/lbe.json');

function MultiUrl( {name,url} ) {
  return (
    <button className="lbe_button">
      <a href={url} target="_blank">{name}</a>
    </button>
  )
}

export default function Lbe( {useCategoriesList} ) {

  // Get URL params

  const location = useLocation()
  const queryParameters = new URLSearchParams(location.search);
  const queryText = queryParameters.get("text");
  const queryRepo = queryParameters.get("repo");
  const querySubd = queryParameters.get("subdisc");

  var tagDefault = "";
  var repoDefault = "";
  var subdDefault = "";
  var journalDefault = "";
  var textDefault = "";
  var switchDefault = "subd";
  
  if ( queryRepo !== null ) {
    repoDefault = queryRepo;
  }
  else if ( queryText !== null ) {
    textDefault = queryText;
    tagDefault = "";
    switchDefault = "text"
  }
  else {
    tagDefault = "All";
    subdDefault = "All";
    journalDefault = "All";
    repoDefault = "All";
  }

  // Define React states for filtering

/*   const [tagFilter, setTagFilter] = useState(tagDefault); */
  const [repoFilter, setRepoFilter] = useState(repoDefault);
  const [subdFilter, setSubdFilter] = useState(subdDefault);
  const [journalFilter, setJournalFilter] = useState(journalDefault);
  const [searchFilter, setSearchFilter] = useState(textDefault);
  const [filterSwitch, setFilterSwitch] = useState(switchDefault);

  // Handles text input

  const handleChange = e => {setSearchFilter(e.target.value); setSubdFilter(""); setRepoFilter(""); setJournalFilter(""); setFilterSwitch("text")};

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

  // Function for Tag filter buttons (Currently not in use)

  function TagButton( { name } ) {

    var buttonClass = "lbe_tag lbe_tag_secondary";
    var number = 0;

    // Styling of active button

    if (name == tagFilter) {  
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
      number = lbeTable.filter(m => m.tags.includes(name)).length;
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setTagFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(""); setSubdFilter(""); setTagFilter(name); setSearchFilter(""); setFilterSwitch("tag")
              }
            }}
          >
            {name} ({number})
        </button>
    )
  }

  // Function for Repo button

  function RepoButton( { name } ) {

    var buttonClass = "lbe_tag";
    var number = 0;

    // Styling of active button

    if (name == repoFilter) {  
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
       number = lbeTable.filter(m => m.linkdata.map(m => m.name).includes(name)).length;
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setRepoFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(""); setSubdFilter(""); setRepoFilter(name); setSearchFilter(""); setFilterSwitch("repo")
              }
            }}
          >
            {name} ({number})
        </button>
    )
  }

  function SubdButton( { name,parent } ) {

    var buttonClass = "lbe_tag";
    var number = 0;    
    var label = "";

    // Styling of active button

    if (name == subdFilter) {
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
      number = lbeTable.filter(m => m.subdiscipline.includes(name)).length;
    }

    if (parent == "block") {
      label = name;
    }
    else {
      label = name+" ("+number+")";
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setRepoFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(""); setSubdFilter(name); setRepoFilter(""); setSearchFilter(""); setFilterSwitch("subd")
              }
            }} 
        >
            {label}
        </button>
    )
}

  // Function for Journal filter buttons

  function JournalButton( { name } ) {

    var buttonClass = "lbe_tag";
    var number = 0;

    if (name == journalFilter) {
      buttonClass = "lbe_tag lbe_tag_active";
    }

    // Show number of items

    if (name == "All") {
      number = lbeTable.length;
    } else {
      number = lbeTable.filter(m => m.journal.includes(name)).length;
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {
              if (name == "All") {
                setJournalFilter("All"); setSubdFilter("All"); setRepoFilter("All"); setSearchFilter(""); setFilterSwitch("subd")}
              else {
                setJournalFilter(name); setSubdFilter(""); setRepoFilter(""); setSearchFilter(""); setFilterSwitch("journal")
              }}
            }>
            {name} ({number})
        </button>
    )
  }

  // Function for expandible author list

  function Authors( { authors, length } ) {

    const [listOpen,ToggleListOpen] = useState(false); // Define state for author list, default "false"
    var shortlist = authors.split(", ",length).join(", ");   // List of authors with elements given by length

    // If there are less than {length} authors, do not display button

    if ( shortlist == authors ) {
      return (
        <>{authors}</>
      )
    }

    else if (listOpen) {
      return(
        <>{authors} <button className="lbe_button lbe_button_small" onClick={() => ToggleListOpen(!listOpen)}>&#9650; collapse</button></> 
      )
    }

    else return (
      <>{shortlist}, ... <button className="lbe_button lbe_button_small" onClick={() => ToggleListOpen(!listOpen)}>show all &#9660;</button></>
    )
  }
  
  
  // Function for single lbe dataset block

  function Lbeblock( {title, authors, journal, pubyear, linkpub, linkdata, linkcomment, description, tags, subdiscipline } ) {

  var doi = linkpub.slice(linkpub.indexOf("doi.org")+8); // Extract DOI from link by cutting right of "doi.org"

    return (
      <div className="block_lbe">
        <div className="header_lbe">
          <div className="header_lbe_title"><h3>{title}</h3></div>
          <div className="header_lbe_link"><MultiUrl name="Permalink" url={"./?text=".concat(doi)} /></div>
        </div>

        <p><em><Authors authors={authors} length={3} /></em></p>

        <p><em>{journal}</em> <strong>{pubyear}</strong>, DOI: <a href={linkpub} target="_blank">{doi}</a></p>
        
        <p>{subdiscipline.map((tag,idx) => 
          <SubdButton key={idx} name={tag} parent="block" />
        )}{/* tags.map((tag,idx) => 
          <TagButton key={idx} name={tag} />
        ) */}</p>

        <details className="details_lbe">

          <summary>Details</summary>

          <div className="collapsible_lbe">
            
            <h4>Description</h4>

            <p>{description}</p>

            <h4>Links to datasets</h4>

            <p>
              {linkdata.map((props, idx) => (
                <MultiUrl key={idx} {...props} />
              ))}
            </p>
            <p><em>{linkcomment}</em></p>

          </div>        
        </details>
      </div>
    );
  }

  // Assemble buttons for filtering section

  function LbeButtons() {
    return(
      <>
        <div className="filter_lbe"><h4>Filter by subdisciplines</h4><p>{subdiscs.map((props, idx) => <SubdButton key={idx} name={props} />)}</p></div>
        <div className="filter_lbe"><h4>Filter by journals</h4><p>{journals.map((props, idx) => <JournalButton key={idx} name={props} />)}</p></div>
        <div className="filter_lbe"><h4>Filter by repositories</h4><p>{repos.map((props, idx) => <RepoButton key={idx} name={props} />)}</p></div>
      </>
    )
  }

  // Render LBE section

  function LbeRender( { list } ) {
    return(
      <>
        {list.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </>
    )
  }

  // Render all datasets if "All" is selected

  if (repoFilter == "All" || subdFilter == "All") {
    return(
      <div className="lbe">
        <div className="col-searchfilter">
          <div className="block_lbe-search">
            <div className="search_lbe">
              <input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} />
            </div>
            <LbeButtons />
          </div>
        </div>
        <div className="body_lbe"><LbeRender list={lbeTable} /></div> 
      </div>
    )
  }

  // Determine result set based on filterSwitch states

  var result = [];

  switch ( filterSwitch ) {
    case "tag":
      result = lbeTable.filter(n => n.tags.includes(tagFilter));
      break;
    case "repo":
      result = lbeTable.filter(n => n.linkdata.map(n => n.name).includes(repoFilter));
      break;
    case "subd":
      result = lbeTable.filter(n => n.subdiscipline.includes(subdFilter));
      break;
    case "journal":
      result = lbeTable.filter(n => n.journal.includes(journalFilter));
      break;
    case "text":
      result = lbeTable.filter(obj => JSON.stringify(obj).toLowerCase().includes(searchFilter.toLowerCase()));   // Squash object with JSON.stringify() for better searchability
      if ( searchFilter == "" ) {
        var resultOutput = "";
      } else if (result.length == 1) {
        var resultOutput = result.length+" entry found...";
      } else {
        var resultOutput = result.length+" entries found...";
      }
      break;
  }

  return (
    <div className="lbe">
      <div className="col-searchfilter">
        <div className="block_lbe-search">
            <div className="search_lbe">
              <input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} /> &ensp; <em>{resultOutput}</em>
            </div>
            <LbeButtons />
        </div>
      </div>
      <div className="body_lbe"><LbeRender list={result} /></div> 
    </div>
  )
}

