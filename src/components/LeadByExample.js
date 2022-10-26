import React,{ useState } from "react";

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

  const queryParameters = new URLSearchParams(window.location.search);
  const queryText = queryParameters.get("text");
  const queryTag = queryParameters.get("tag");

  var tagDefault = "All";
  var textDefault = "";
  var switchDefault = "tag";
  
  if ( queryTag !== null ) {
    tagDefault = queryTag;
  }

  if ( queryText !== null ) {
    textDefault = queryText;
    tagDefault = "";
    switchDefault = "text"
  }

  // Define React states for filtering

  const [tagFilter, setTagFilter] = useState(tagDefault);
  const [journalFilter, setJournalFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState(textDefault);
  const [filterSwitch, setFilterSwitch] = useState(switchDefault);



  console.log(queryTag,queryText);


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

    return (
      <div className="col col--12"><div className="block_lbe">

        <div className="row">
          <div className="col col--10"><h3>{title}</h3></div>
          <div className="col col--2"><MultiUrl name="Permalink" url={"./?text=".concat(link_pub.slice(link_pub.indexOf("doi.org")+8))} /></div>
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

            <p><em>{journal}</em> <strong>{pub_year}</strong>, DOI: <a href={link_pub} target="_blank">{link_pub.slice(link_pub.indexOf("doi.org")+8)}</a></p>

            <h4>Links to datasets</h4>

            <p>
              {link_data.map((props, idx) => (
                <MultiUrl key={idx} {...props} />
              ))}
            </p>
            <p><em>{link_comment}</em></p>

          </div>        
        </details>
      </div></div>
    );
  }

  // Assemble buttons for filtering section

  function LbeButtons() {
    return(
      <><h5>Filter subdisciplines</h5><p>{categories.map((props, idx) => <TagButton key={idx} name={props} />)}</p>
      <h5>Filter journals</h5><p>{journals.map((props, idx) => <JournalButton key={idx} name={props} />)}</p></>
    )
  }

  function LbeRender( { list } ) {
    return(
      <div className="row">
        {list.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </div>
    )
  }

  if (tagFilter == "All") {
    return(
      <div className="lbe"><div className="block_filter">
      <LbeButtons />
      <h5>Type to search</h5><p><input value={searchFilter} onChange={handleChange} /></p></div>
      <LbeRender list={lbeTable} /></div>
    )
  }

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
    <div className="lbe"><div className="block_filter">
    <LbeButtons />
    Type to search: <input value={searchFilter} onChange={handleChange} /></div>
    <LbeRender list={result} /></div>
  )
}

