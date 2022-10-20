import React,{ useState } from 'react';
import MethodsProfileTable from '@site/src/components/MethodsProfile.js';

var profiles = require('@site/static/assets/profiles.json');

export default function FilteredProfile( {children, props } ) {

    const [filterProfile, setFilterProfile] = useState("all");

    function FilterButton( { name, longname } ) {
        console.log("11: name:"+name+", longname:"+longname);
    
        return (
            <button 
                onClick={() => setFilterProfile(name)} 
            >
                {longname}
            </button>
        )
    }
    
    var result = [];

    result = profiles.filter(m => props.includes(m.name));
    console.log(result,props);

    console.log("32:");
    console.log(filterProfile);

    return (
        <><div>{result.map((props,idx) => <FilterButton key={idx} {...props} />)}</div>
        <div><MethodsProfileTable profile_to_show={filterProfile} /></div></>    
)
}

