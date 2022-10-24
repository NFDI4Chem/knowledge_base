import React,{ useState } from 'react';
import MethodsTable from '@site/src/components/methods.js'

var table = require('@site/static/assets/methods.json');

export default function SearchMethods() {

    const [searchFilter, setSearchFilter] = useState("");
    const handleChange = e => {setSearchFilter(e.target.value)};

    
    var resultSet = [];
    if (searchFilter == "") {
        resultSet = ["all"];
    }
    else {
        var result = table.filter(obj => Object.keys(obj).some(key => obj[key].toLowerCase().includes(searchFilter.toLowerCase())));
        resultSet = result.map(m => m.shortname);
    }

    return (
        <><div className="block_filter">Type to search: <input value={searchFilter} onChange={handleChange} /></div>
        <div><MethodsTable methods_to_show={resultSet} /></div></>    
    )
}
