import React from "react";

var lbeTable = require('@site/static/assets/lbe.json');
let k = 0;


export function MultiUrl( {name,url} ) {
  let space = " ";
  return (
    <button className="lbe_button">
      <a href={url} target="_blank">{name}</a>
    </button>
  )
}

export function Lbeblock( {title, authors, link_pub, link_data, link_comment, description} ) {
    return (
        <div className="block_lbe">

          <h3>{title}</h3>

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
          
        </div>
  );
}

export default function Lbe() {
  return (
      <div>
        {lbeTable.map((props, idx) => (
          <Lbeblock key={idx} {...props} />
        ))}
      </div>
  )
}

