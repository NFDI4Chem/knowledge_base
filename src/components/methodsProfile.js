import React from 'react';
import MethodsTable from '@site/src/components/methods.js'

var profiles = require('@site/static/assets/profiles.json');


export default function MethodsProfileTable({ profile_to_show}) {

    let methodsSet = [];

    methodsSet = profiles.filter(m => profile_to_show.includes(m.name));
    
    return (
        <>{methodsSet.map((props, idx) => (<MethodsTable key={idx} methods_to_show={props.methods} />))}</>
    );
}