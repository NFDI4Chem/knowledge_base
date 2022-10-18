import React from 'react';

var table = require('@site/static/assets/methods.json');
var profiles = require('@site/static/assets/profiles.json');


export default function MethodsProfileTable({children, profile_to_show}) {

    let methodsSet = [];

    methodsSet = profiles.filter(m => profile_to_show.includes(m.name));
    
    return (
        <>{methodsSet.map((m,n) => <MethodsTable methods_to_show={m.methods} {...n}/>)}</>
    );
}

function Entry({ analytical_method, exemplary_proprietary_file_extensions, typical_size_of_proprietary_file, converter_to_open_file_format, recommendation_for_open_file_extension, file_format, file_size_of_open_format }) {
    return (
        <tr><td align="left">{analytical_method}</td><td align="left" dangerouslySetInnerHTML={{__html: exemplary_proprietary_file_extensions}}/><td align="left" dangerouslySetInnerHTML={{__html: typical_size_of_proprietary_file}}/><td align="left" dangerouslySetInnerHTML={{__html: converter_to_open_file_format}}/><td align="left" dangerouslySetInnerHTML={{__html: recommendation_for_open_file_extension}}/><td align="left" dangerouslySetInnerHTML={{__html: file_format}}/><td align="left" dangerouslySetInnerHTML={{__html: file_size_of_open_format}}/></tr>
    )
}

export function MethodsTable({children, methods_to_show}) {

    if(methods_to_show[0]==="all"){
        return (
        <table><thead><tr><th align="left">Analytical method</th><th align="left">Exemplary proprietary file extensions</th><th align="left">Typical size of proprietary file</th><th align="left">Converter to open file format</th><th align="left">Recommendation for open file extension*</th><th align="left">File format</th><th align="left">File size of open format</th></tr></thead><tbody>
        
        {table.map((props, idx) => (
            <Entry key={idx} {...props} />
        ))}
        
        </tbody></table>
        );
    }

    let found = [];
    found = table.filter(m => methods_to_show.includes(m.analytical_method) || methods_to_show.includes(m.shortname));

    return (
    <table><thead><tr><th align="left">Analytical method</th><th align="left">Exemplary proprietary file extensions</th><th align="left">Typical size of proprietary file</th><th align="left">Converter to open file format</th><th align="left">Recommendation for open file extension*</th><th align="left">File format</th><th align="left">File size of open format</th></tr></thead><tbody>
    
    {found.map((props, idx) => (
        <Entry key={idx} {...props} />
    ))}
    
    </tbody></table>
    );
}
