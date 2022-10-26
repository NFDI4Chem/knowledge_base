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

  const [filterSets, setFilterSets] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");

  const handleChange = e => {setSearchFilter(e.target.value); setFilterSets("")};

  if ( useCategoriesList == "true" ) {
    var categories = require('@site/static/assets/lbe_categories.json');
  }
  else {
    var categoriesSet = new Set(lbeTable.map(obj => obj.tags).flat());
    var categories = Array.from(categoriesSet).sort();
    categories.unshift("All");  
  }

  function FilterButton( { name } ) {

      var buttonClass = "lbe_tag";

      if (name == filterSets) {
        buttonClass = "lbe_tag lbe_tag_active";
      }
  
      return (
          <button 
              className={buttonClass}
              onClick={() => {setFilterSets(name); setSearchFilter("")}} 
          >
              {name}
          </button>
      )
  }

  function Lbeblock( {title, authors, link_pub, link_data, link_comment, description, tags} ) {

    function FilterButton( { name } ) {
      var buttonClass = "lbe_tag";

      if (name == filterSets) {
        buttonClass = "lbe_tag lbe_tag_active";
      }
  
      return (
          <button 
              className={buttonClass}
              onClick={() => {setFilterSets(name); setSearchFilter("")}}
          >
              {name}
          </button>
      )
    }

    return (
      <div className="col col--12"><div className="block_lbe">

        <h3>{title}</h3>

        <p>{tags.map((tag,idx) => 
          <FilterButton key={idx} name={tag} />
        )}</p>

        <details className="details_lbe">

          <summary>Details</summary>

          <div className="collapsible_lbe">
            <h4>Authors</h4>
            
            <p><em>{authors}</em></p>

            <h4>Description</h4>

            <p>{description}</p>

            <h4>Links</h4>

            <ul>
              <li><a href={link_pub} target="_blank">Link to publication</a></li>
              <li>Link(s) to datasets:<br />{
                link_data.map((props, idx) => (
                  <MultiUrl key={idx} {...props} />
                ))} <br /><em>{link_comment}</em></li>
            </ul>
          </div>        
        </details>
      </div></div>

    );
  }

  function LbeRender( { list } ) {
    return(
      <div className="lbe"><div className="block_filter">Click to filter: {categories.map((props) => <FilterButton name={props} />)}<br />
      Type to search: <input value={searchFilter} onChange={handleChange} /></div>
      <div className="row">
        {list.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </div></div>  
    )
  }


  if (filterSets == "All") {
    return(
      <LbeRender list={lbeTable} />
    )
  }

  var result = [];

  if (searchFilter == "") {
    result = lbeTable.filter(n => n.tags.includes(filterSets));
  }
  else {
    result = lbeTable.filter(obj => JSON.stringify(obj).toLowerCase().includes(searchFilter.toLowerCase()));
  }

  return (
    <LbeRender list={result} />
  )
}

