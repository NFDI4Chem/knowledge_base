import React from 'react';

var nfdi4chem_methods = [
        {"name": "example",
        "internal_id": "method000",
        "analytical_method": "",
        "exemplary_proprietary_file_extensions": "",
        "typical_size_of_proprietary_file": "",
        "converter_to_open_file_format": "",
        "recommendation_for_open_file_extension": "",
        "file_format": "",
        "file_size_of_open_format": ""},
        {"name": "nmr_spectroscopy",
        "internal_id": "method001",
        "analytical_method": "NMR spectroscopy",
        "exemplary_proprietary_file_extensions": "*set of files, no typical extension*",
        "typical_size_of_proprietary_file": "<1-50 MB",
        "converter_to_open_file_format": " [nmrium.org](https://www.nmrium.org) ",
        "recommendation_for_open_file_extension": ".jdx, .zip",
        "file_format": "JCAMP-DX (raw), NMReDATA (assignments)",
        "file_size_of_open_format": "<1-50 MB"},
        {"name": "mass_spectroscopy",
        "internal_id": "method002",
        "analytical_method": "Mass spectrometry",
        "exemplary_proprietary_file_extensions": ".raw, .d, .baf",
        "typical_size_of_proprietary_file": "~250 MB",
        "converter_to_open_file_format": "Proteowizard",
        "recommendation_for_open_file_extension": ".mzML",
        "file_format": "mzML",
        "file_size_of_open_format": "~250 MB"}
];
 
export default function NFDI4ChemKBMethodsTable({children, methods_to_show}) {

    if(methods_to_show[0]==="all"){
        return (
        <table><thead><tr><th align="left">Analytical method</th><th align="left">Exemplary proprietary file extensions</th><th align="left">Typical size of proprietary file</th><th align="left">Converter to open file format</th><th align="left">Recommendation for open file extension*</th><th align="left">File format</th><th align="left">File size of open format</th></tr></thead><tbody>
        
        <tr><td align="left">tbd all</td><td align="left">tbd all</td><td align="left">tbd all</td><td align="left">tbd all</td><td align="left">tbd all</td><td align="left">tbd all</td><td align="left">tbd all</td></tr>
        
        </tbody></table>
        );
    }

    let line = "";
    let m = {};
    
    try {
        for(let j in methods_to_show){
            m = nfdi4chem_methods.find(i => i.name===methods_to_show[j]);

            if(m != {}){
                // add line

            };
        }

    } catch (e) {
        line = "error: " + e.toString();
    }
    
    return (
    <table><thead><tr><th align="left">Analytical method</th><th align="left">Exemplary proprietary file extensions</th><th align="left">Typical size of proprietary file</th><th align="left">Converter to open file format</th><th align="left">Recommendation for open file extension*</th><th align="left">File format</th><th align="left">File size of open format</th></tr></thead><tbody>
    
    <tr><td align="left">{m.analytical_method}</td><td align="left">{m.exemplary_proprietary_file_extensions}</td><td align="left">{m.typical_size_of_proprietary_file}</td><td align="left">{m.converter_to_open_file_format}</td><td align="left">{m.recommendation_for_open_file_extension}</td><td align="left">{m.file_format}</td><td align="left">{m.file_size_of_open_format}</td></tr>
    
    </tbody></table>
    );
}
