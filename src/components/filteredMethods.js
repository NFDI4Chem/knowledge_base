import React,{ useState } from 'react';
import MethodsProfileTable from '@site/src/components/methodsProfile.js';

var profiles = require('@site/static/assets/profiles.json');

export default function FilteredProfile( { props } ) {

    const [filterProfile, setFilterProfile] = useState("all");

    function FilterButton( { name, longname } ) {
        console.log("11: name:"+name+", longname:"+longname);

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

    return (
        <><div className="block_filter">Click to filter: {profiles.map((props,idx) => <FilterButton key={idx} {...props} />)}</div>
        <div><MethodsProfileTable profile_to_show={filterProfile} /></div></>    
    )
}

