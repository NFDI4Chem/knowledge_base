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

  const [tagFilter, setTagFilter] = useState("All");
  const [journalFilter, setJournalFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [filterSwitch, setFilterSwitch] = useState("tag");

  console.log(tagFilter,journalFilter,searchFilter,filterSwitch);

  const handleChange = e => {setSearchFilter(e.target.value); setTagFilter(""); setJournalFilter(""); setFilterSwitch("text")};

  if ( useCategoriesList == "true" ) {
    var categories = require('@site/static/assets/lbe_categories.json');
  }
  else {
    var categoriesSet = new Set(lbeTable.map(obj => obj.tags).flat());
    var categories = Array.from(categoriesSet).sort();
    categories.unshift("All");  
  }

  var journalsSet = new Set(lbeTable.map(obj => obj.journal));
  var journals = Array.from(journalsSet).sort();

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

  function Lbeblock( {title, authors, journal, pub_year, link_pub, link_data, link_comment, description, tags} ) {

    return (
      <div className="col col--12"><div className="block_lbe">

        <h3>{title}</h3>

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

  function LbeRender( { list } ) {
    return(
      <div className="lbe"><div className="block_filter">
        Click to filter subdisciplines: {categories.map((props) => <TagButton name={props} />)}<br />
        Click to filter journals: {journals.map((props) => <JournalButton name={props} />)}<br />
        Type to search: <input value={searchFilter} onChange={handleChange} /></div>
      <div className="row">
        {list.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </div></div>  
    )
  }


  if (tagFilter == "All") {
    return(
      <LbeRender list={lbeTable} />
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

  console.log(result);
  
  return (
    <LbeRender list={result} />
  )
}

