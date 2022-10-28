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
  const queryTag = queryParameters.get("tag");

  var tagDefault = "";
  var textDefault = "";
  var switchDefault = "tag";
  
  if ( queryTag !== null ) {
    tagDefault = queryTag;
  }
  else if ( queryText !== null ) {
    textDefault = queryText;
    tagDefault = "";
    switchDefault = "text"
  }
  else {
    tagDefault = "All";
  }

  // Define React states for filtering

  const [tagFilter, setTagFilter] = useState(tagDefault);
  const [journalFilter, setJournalFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState(textDefault);
  const [filterSwitch, setFilterSwitch] = useState(switchDefault);

  // Handles text input

  const handleChange = e => {setSearchFilter(e.target.value); setTagFilter(""); setJournalFilter(""); setFilterSwitch("text")};

  // Get list of tags

  var categories = Array.from(new Set(lbeTable.map(obj => obj.tags).flat())).sort();
  categories.unshift("All"); // Add "All" option at the beginning
  
  // Get list of journals
  
  var journals = Array.from(new Set(lbeTable.map(obj => obj.journal))).sort();

  // Function for Tag filter buttons

  function TagButton( { name } ) {

      var buttonClass = "lbe_tag";

      if (name == tagFilter) {
        buttonClass = "lbe_tag lbe_tag_active";
      }
  
      return (
          <button 
              className={buttonClass}
              onClick={() => {setTagFilter(name); setJournalFilter(""); setSearchFilter(""); setFilterSwitch("tag")}} 
          >
              {name}
          </button>
      )
  }

  // Function for Journal filter buttons

  function JournalButton( { name } ) {

    var buttonClass = "lbe_tag";

    if (name == journalFilter) {
      buttonClass = "lbe_tag lbe_tag_active";
    }

    return (
        <button 
            className={buttonClass}
            onClick={() => {setJournalFilter(name); setTagFilter(""); setSearchFilter(""); setFilterSwitch("journal")}} 
        >
            {name}
        </button>
    )
  }

  // Function for single lbe dataset block

  function Lbeblock( {title, authors, journal, pub_year, link_pub, link_data, link_comment, description, tags} ) {

  var doi = link_pub.slice(link_pub.indexOf("doi.org")+8); // Extract DOI from link by cutting right of "doi.org"

    return (
      <div className="block_lbe">
        <div className="header_lbe">
          <div className="header_lbe_title"><h3>{title}</h3></div>
          <div className="header_lbe_link"><MultiUrl name="Permalink" url={"./?text=".concat(doi)} /></div>
        </div>

        <p>{tags.map((tag,idx) => 
          <TagButton key={idx} name={tag} />
        )}</p>

        <details className="details_lbe">

          <summary>Details</summary>

          <div className="collapsible_lbe">
            <h4>Authors</h4>
            
            <p><em>{authors}</em></p>

            <h4>Description</h4>

            <p>{description}</p>

            <h4>Publication</h4>

            <p><em>{journal}</em> <strong>{pub_year}</strong>, DOI: <a href={link_pub} target="_blank">{doi}</a></p>

            <h4>Links to datasets</h4>

            <p>
              {link_data.map((props, idx) => (
                <MultiUrl key={idx} {...props} />
              ))}
            </p>
            <p><em>{link_comment}</em></p>

          </div>        
        </details>
      </div>
    );
  }

  // Assemble buttons for filtering section

  function LbeButtons() {
    return(
      <><div className="filter_lbe"><h4>Filter subdisciplines</h4><p>{categories.map((props, idx) => <TagButton key={idx} name={props} />)}</p></div>
      <div className="filter_lbe"><h4>Filter journals</h4><p>{journals.map((props, idx) => <JournalButton key={idx} name={props} />)}</p></div></>
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

  if (tagFilter == "All") {
    return(
      <div className="lbe">
        <div className="col-searchfilter">
          <div className="block_lbe">
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
    case "journal":
      result = lbeTable.filter(n => n.journal.includes(journalFilter));
      break;
    case "text":
      result = lbeTable.filter(obj => JSON.stringify(obj).toLowerCase().includes(searchFilter.toLowerCase()));
    break;
  }
  
  return (
    <div className="lbe">
    <div className="col-searchfilter">
      <div className="block_lbe">
          <div className="search_lbe">
            <input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} />
          </div>
          <LbeButtons />
      </div>
    </div>
    <div className="body_lbe"><LbeRender list={result} /></div> 
  </div>
)
}

