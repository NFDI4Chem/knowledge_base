import React,{ useState } from "react";

var lbeTable = require('@site/static/assets/lbe.json');
var categories = require('@site/static/assets/lbe_categories.json');

function MultiUrl( {name,url} ) {
  return (
    <button className="lbe_button">
      <a href={url} target="_blank">{name}</a>
    </button>
  )
}

export default function Lbe() {

  const [filterSets, setFilterSets] = useState("All");

  function FilterButton( { name } ) {
      console.log("11: name:"+name+", longname:"+name);
  
      return (
          <button 
              className="lbe_tag"
              onClick={() => setFilterSets(name)} 
          >
              {name}
          </button>
      )
  }

  function Lbeblock( {title, authors, link_pub, link_data, link_comment, description, tags} ) {
    return (
      <div className="col col--4"><div className="block_lbe">

        <h3>{title}</h3>

        <p>{tags.map((tag) => 
          <button 
            className="lbe_tag"
            onClick={() => setFilterSets(tag)} >
            {tag}
          </button>
        )}</p>

        <details className="details_lbe">

          <summary>Details</summary>

          <h4>Authors</h4>
          
          <p><em>{authors}</em></p>

          <h4>Description</h4>

          <p>{description}</p>

          <h4>Links</h4>

          <ul>
            <li><a href={link_pub}>Link to publication</a></li>
            <li>Link(s) to datasets:<br />{
              link_data.map((props, idx) => (
                <MultiUrl key={idx} {...props} />
              ))} <br /><em>{link_comment}</em></li>
          </ul>        
        </details>
      </div></div>

    );
  }


  if (filterSets == "All") {
    return(
      <><div className="block_filter">Click to filter: {categories.map((props) => <FilterButton name={props} />)}</div>
      <div className="row">
        {lbeTable.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </div></>

    )
  }

  var result = lbeTable.filter(n => n.tags.includes(filterSets));

  console.log("72: "+filterSets);
  console.log(result);

  return (
      <><div className="block_filter">Click to filter: {categories.map((props) => <FilterButton name={props} />)}</div>
      <div className="row">
        {result.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </div></>
  )
}

