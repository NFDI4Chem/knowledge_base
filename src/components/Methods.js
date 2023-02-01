import React,{ useState } from 'react';

const table = require('@site/static/assets/methods.json');        // extract table data
const profiles = require('@site/static/assets/profiles.json');    // extract subdomain profiles
const headers = table.filter(entry => entry.shortname === "headers")[0];   // extract header names

export default function Methods( {defaultProfile} ) {

    const [filterProfile, setFilterProfile] = useState(defaultProfile);                     // define React state for filtering through subdomain profile, default profile is given by function prop
    const [searchFilter, setSearchFilter] = useState("");                                   // define React state for text filtering
    const handleChange = e => {setSearchFilter(e.target.value); setFilterProfile("")};      // handle text input changes in state

    function FilterButton( { name, longname } ) {

        var buttonClass = "lbe__filterbutton";            // Default style

        if (name == filterProfile) {
            buttonClass = "lbe__filterbutton lbe__filterbutton--active";     // Style if active
        }
        
        return (
            <button 
                className={buttonClass}
                onClick={() => {setFilterProfile(name); setSearchFilter("")}}       // Clicking button sets filter state and resets text search state
                >
                {longname}
            </button>
        )
    }

    var result = [];
    var resultSet = [];

    if (searchFilter == "") {                                                   // decide which state to use for filtering
        result = profiles.filter(m => m.name.includes(filterProfile));
        resultSet = result.map(n => n.methods)[0];                              // create list of methods from profile for table rendering
    }
    else {
        result = table.filter(obj => JSON.stringify(obj).toLowerCase().includes(searchFilter.toLowerCase()));       // JSON.stringify squashes table entry object for string search
        resultSet = result.map(m => m.shortname);
    }

    return (
        <React.Fragment>
            <div className="methods__searchfilter">
                <div className="row methods__searchfilter__row">
                    <div className="methods__searchfilter__filter">Click to filter: {profiles.map((props,idx) => <FilterButton key={idx} {...props} />)}</div>
                    <div className="col methods__searchfilter__search"><input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} /></div>
                </div>
            </div>
            <div><MethodsTable {...{resultSet}} /></div>
        </React.Fragment>    
    )
}

/* TableHead renders the table header */

function TableHead( {alignment, activeHeaders} ) {

    ( alignment === "" ) ? "left" : alignment; // default value

    return(
        <thead>
            <tr>
                {activeHeaders.filter(header => header !== "shortname").map(header => <th key={"header_"+header} align={alignment}>{headers[header]}</th>)}
            </tr>
        </thead>
    )
}

/* Entry renders table entries. dangerouslySetInnerHTML required to process links in table. If field contains boolean true, a check mark is returned */

function Entry({ entry, activeHeaders }) {

    return(
        <tr>
            {activeHeaders.filter(header => header !== "shortname").map(header => {
                if ( entry[header] && entry[header].toString() === "true" ) {
                    return <td key={Math.random()} align="center">&#10004;</td>
                } else {
                    return <td key={Math.random()} align="left" dangerouslySetInnerHTML={{__html: entry[header] }}/>
                }
            })}
        </tr>
    )
}

/* MethodsTable renders table from array of method shortnames (prop methods_to_show) using function Entry */

function MethodsTable({resultSet}) {

    var found = table.filter(m => resultSet.includes(m.shortname));     // generates methods set - is current method contained in methods_to_show array?
    var activeHeaders = (resultSet[0] === "all") ? Object.keys(headers) : Array.from(new Set(found.map(entry => Object.keys(entry).filter(key => key !== "shortname")).flat()));  // Get list of headers required for found set or all headers for all

    if(found.length === 0) {
        return (
            <h4>No methods match your search query. Do you miss something? Contact us via <a href="mailto:helpdesk@nfdi4chem.de">helpdesk@nfdi4chem.de</a>!</h4>
        );
    }

    if(resultSet[0] === "all"){
        return (
        <table>
            <TableHead alignment="center" {...{activeHeaders}} />
            <tbody>
                {table.filter(entry => entry.shortname !== "headers").map((entry, idx) => (
                    <Entry key={"entry_"+idx} {...{entry, activeHeaders}} />
                    ))}        
            </tbody>
        </table>
        );
    }

    return (
    <table>
        <TableHead alignment="center" {...{activeHeaders}} />
        <tbody>
            {found.map((entry, idx) => (
                <Entry key={"entry_"+idx} {...{entry, activeHeaders}} />
            ))}
        </tbody>
    </table>
    );
}
