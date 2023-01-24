import React,{ useState } from 'react';

var table = require('@site/static/assets/polymer_methods.json');        // extract table data
var profiles = require('@site/static/assets/profiles.json');    // extract subdomain profiles
var icon = require('@site/static/img/domains/tick-image.png'); 

export default function PolymerMethods( {defaultProfile} ) {
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
        <><div className="methods__searchfilter"><div className="row methods__searchfilter__row"><div className="methods__searchfilter__filter">Click to filter: {profiles.map((props,idx) => <FilterButton key={idx} {...props} />)}</div>
        <div className="col methods__searchfilter__search"><input className="navbar__search-input" placeholder="Type to search" value={searchFilter} onChange={handleChange} /></div></div></div>
        <div><MethodsTable methods_to_show={resultSet} /></div></>    
    )
}

/* TableHead renders the table header */

function TableHead( {alignment} ) {

    if (alignment == "") {
        alignment = "left"; // default value
    }

    return(
        <thead>
            <tr>
                <th align={alignment}>Analytical method</th>
                <th align={alignment}>Exemplary proprietary file extensions</th>
                <th align={alignment}>Typical size of proprietary file</th>
                <th align={alignment}>Converter to open file format</th>
                <th align={alignment}>Recommendation for open file extension*</th>
                <th align={alignment}>File format</th>
                <th align={alignment}>File size of open format</th>
                <th align={alignment}>Monomer characterization</th>
                <th align={alignment}>Polymer characterization</th>
                <th align={alignment}>Progress of ELN integration</th>
            </tr>
        </thead>
    )
}

/* Entry renders table entries. dangerouslySetInnerHTML required to process links in table */

function Entry({ analytical_method, exemplary_proprietary_file_extensions, typical_size_of_proprietary_file, converter_to_open_file_format, recommendation_for_open_file_extension, file_format, file_size_of_open_format, monomer_characterization, polymer_characterization, progress_of_eln_integration  }) {
    return (
        <tr>
            <td align="left">{analytical_method}</td>
            <td align="left" dangerouslySetInnerHTML={{__html: exemplary_proprietary_file_extensions}}/>
            <td align="left" dangerouslySetInnerHTML={{__html: typical_size_of_proprietary_file}}/>
            <td align="left" dangerouslySetInnerHTML={{__html: converter_to_open_file_format}}/>
            <td align="left" dangerouslySetInnerHTML={{__html: recommendation_for_open_file_extension}}/>
            <td align="left" dangerouslySetInnerHTML={{__html: file_format}}/>
            <td align="left" dangerouslySetInnerHTML={{__html: file_size_of_open_format}}/>
            <td>{monomer_characterization ? <img className="style" src={icon.default} alt="monomer-check" /> : ""}</td>
            <td>{polymer_characterization ? <img className="style" src={icon.default} alt="polymer-check" /> : ""}</td>
            <td align="left" dangerouslySetInnerHTML={{__html: progress_of_eln_integration}}/>
        </tr>
    )
}

/* MethodsTable renders table from array of method shortnames (prop methods_to_show) using function Entry */

function MethodsTable({methods_to_show}) {

    if(methods_to_show[0]==="all"){
        return (
        <table>
            <TableHead alignment={"center"} />
            <tbody>
                {table.map((props, idx) => (
                    <Entry key={idx} {...props} />
                    ))}        
            </tbody>
        </table>
        );
    }

    var found = table.filter(m => methods_to_show.includes(m.shortname));     // generates methods set - is current method contained in methods_to_show array?

    return (
    <table>
        <TableHead alignment={"center"} />
        <tbody>
            {found.map((props, idx) => (
                <Entry key={idx} {...props} />
            ))}
        </tbody>
    </table>
    );
}
