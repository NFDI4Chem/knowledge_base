import React,{ useState } from "react";

// Function for expandible author list

function Authors( { authors, length } ) {

    const [listOpen,ToggleListOpen] = useState(false); // Define state for author list, default "false"
    var shortlist = authors.split(", ",length).join(", ");   // List of authors with elements given by length
  
    // If there are less than {length} authors, do not display button
  
    if ( shortlist == authors ) {
      return (
        <React.Fragment>{authors}</React.Fragment>
      )
    }
  
    else if (listOpen) {
      return(
        <React.Fragment>{authors} <button className="lbe__block__author-trigger" onClick={() => ToggleListOpen(!listOpen)}>&#9650; collapse</button></React.Fragment> 
      )
    }
  
    else return (
      <React.Fragment>{shortlist}, ... <button className="lbe__block__author-trigger" onClick={() => ToggleListOpen(!listOpen)}>show all &#9660;</button></React.Fragment>
    )
  }

  export default Authors;