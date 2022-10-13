import React from 'react';

var table = require('./_methods_table.json');

function Entry({ analytical_method, exemplary_proprietary_file_extensions, typical_size_of_proprietary_file, converter_to_open_file_format, recommendation_for_open_file_extension, file_format, file_size_of_open_format }) {
    return (
        <tr><td align="left">{analytical_method}</td><td align="left">{exemplary_proprietary_file_extensions}</td><td align="left">{typical_size_of_proprietary_file}</td><td align="left">{converter_to_open_file_format}</td><td align="left">{recommendation_for_open_file_extension}</td><td align="left">{file_format}</td><td align="left">{file_size_of_open_format}</td></tr>
    )
}

export default function NFDI4ChemKBMethodsTable({children, methods_to_show}) {

    if(methods_to_show[0]==="all"){
        return (
        <table><thead><tr><th align="left">Analytical method</th><th align="left">Exemplary proprietary file extensions</th><th align="left">Typical size of proprietary file</th><th align="left">Converter to open file format</th><th align="left">Recommendation for open file extension*</th><th align="left">File format</th><th align="left">File size of open format</th></tr></thead><tbody>
        
        {table.map((props, idx) => (
            <Entry key={idx} {...props} />
        ))}

        </tbody></table>
        );
    }

    let line = "";
    let m = {};
    let found = [];
    
    try {
        for(let j in methods_to_show) {
            found.push(
                table.find(function (element) {
                    return element == methods_to_show[j];
                })
            );  
        }
    }
    
    catch (e) {
        line = "error: " + e.toString();
    }
    
    return (
        <table><thead><tr><th align="left">Analytical method</th><th align="left">Exemplary proprietary file extensions</th><th align="left">Typical size of proprietary file</th><th align="left">Converter to open file format</th><th align="left">Recommendation for open file extension*</th><th align="left">File format</th><th align="left">File size of open format</th></tr></thead><tbody>
        
        {found.map((props, idx) => (
                <Entry key={idx} {...props} />
        ))}
        
        </tbody></table>
    );
}
