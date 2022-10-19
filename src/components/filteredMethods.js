import React from 'react';
import MethodsProfileTable from '@site/src/components/MethodsProfile.js';

var profiles = require('@site/static/assets/profiles.json');

export default function FilteredProfile( {children, props } ) {
    var result = [];

    result = profiles.filter(m => props.includes(m.name));

    return (
        <div>{result.map((i,j) => <FButton short={j.name} long={j.longname} />)}</div>
    )
}

function FButton( { children, short, long } ) {
    return (
        <button onClick={execFilter({short})} >{long}</button>
    )
}

function execFilter( {props} ) {
    return (
        <div>{props}</div>
    )
}

/*  */