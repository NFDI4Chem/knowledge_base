import React from "react";

var lbeTable = require('../../static/assets/lbe.json');

export function Lbeblock( {title, authors, link_pub, link_data, link_comment, description} ) {
  return (
    <div className="block_lbe">
      <h3 id={title} className="anchor anchorWithStickyNavbar_node_modules-@docusaurus-theme-classic-lib-theme-Heading-styles-module">{title}</h3>

      <details className="details_lbe">

        <summary>Details</summary>

        &nbsp;
        <h4>Authors</h4>
        
        <p><em>{authors}</em></p>

        <h4>Description</h4>

        <p>{description}</p>

        <h4>Links</h4>

        <ul>
          <li><a href={link_pub}>Link to publication</a></li>
          <li><a href={link_data}>Link to data</a> ({link_comment})</li>
        </ul>        
      </details>
    </div>
  );
}

export default function Lbe() {
  return (
    <p>
      {lbeTable.map((props, idx) => (
        <Lbeblock key={idx} {...props} />
      ))}
    </p>
  )
}

