import React,{ useState } from 'react';
import MethodsTable from '@site/src/components/methods.js'

var table = require('@site/static/assets/methods.json');
var profiles = require('@site/static/assets/profiles.json');

export default function SearchMethods() {

    const [filterProfile, setFilterProfile] = useState("all");
    const [searchFilter, setSearchFilter] = useState("");
    const handleChange = e => {setSearchFilter(e.target.value); setFilterProfile("")};

    function FilterButton( { name, longname } ) {

        var buttonClass = "lbe_tag";

        if (name == filterProfile) {
            buttonClass = "lbe_tag_active";
        }
        
        return (
            <button 
                className={buttonClass}
                onClick={() => setFilterProfile(name)} 
            >
                {longname}
            </button>
        )
    }

    var result = [];
    var resultSet = [];

    if (searchFilter == "") {
        result = profiles.filter(m => m.name.includes(filterProfile));
        resultSet = result.map(n => n.methods)[0];
    }
    else {
        result = table.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(searchFilter.toLowerCase())));
        resultSet = result.map(m => m.shortname);
    }

    return (
        <><div className="block_filter">Click to filter: {profiles.map((props,idx) => <FilterButton key={idx} {...props} />)}<br />
        Type to search: <input value={searchFilter} onChange={handleChange} /></div>
        <div><MethodsTable methods_to_show={resultSet} /></div></>    
    )
}
