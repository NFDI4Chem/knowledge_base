import React from 'react';
/*import Extractor from "markdown-tables-to-json";*/

var { Extractor } = require('markdown-tables-to-json');

var table = `
|Analytical method|Exemplary proprietary file extensions|Typical size of proprietary file|Converter to open file format|Recommendation for open file extension*|File format|File size of open format|
|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
|NMR spectroscopy|*set of files, no typical extension*|<1-50 MB| [nmrium.org](https://www.nmrium.org/) |.jdx<br/>.zip<br/>|JCAMP-DX *(raw)*<br/>NMReDATA *(assignments)*|<1-50 MB|
|Mass spectrometry|.raw<br/>.d<br/>.baf|~250 MB|Proteowizard|.mzML|mzML|~250 MB|
|IR spectroscopy|.ispd<br/>.icIR|<1 MB| |.dx|JCAMP-DX|<1 MB|
|Raman spectroscopy|.dpt<br/>.spc<br/>.icRaman<br/>.sps<br/>.acs|<1 MB|proprietary software|.dx|JCAMP-DX|<1 MB|
|UV/vis spectroscopy|.dsw<br/> .str<br/>.bsk<br/>.bkn<br/>.ksd<br/>.jws<br/>.jwb<br/>.str8<br/>.spc<br/>.sre|<1 MB|proprietary software|.csv|comma-separated values|<1 MB|
|Fluorescence spectroscopy|.fds<br/>.fs2f<br/>.jws<br/>.opj|<1 MB|proprietary software|.dx|JCAMP-DX|<1 MB|
|Single crystal XRD|.raw|~1 GB|proprietary software|.cif|crystallographic information file|<1 MB|
|Powder XRD|.raw|<1 MB|proprietary software|.xyd|text file|<1 MB|
|Gas chromatography|.gcd<br/>.d|~2 MB|proprietary software|.txt|text file|<1 MB|
|HPLC|.xls|<1 MB|proprietary software|.csv|comma-separated values|<1 MB|
|Cyclic voltammetry|.nox<br/>.pssession|~8 MB|proprietary software|.txt|text file|<1 MB|
|EPR spectroscopy|.spe|<1 MB|proprietary software|.txt|text file|<1 MB|
|Differential scanning calorimetry|.ngb-dsu<br/>.ngb-taa|<1 MB|proprietary software|.csv|comma-separated values|<1 MB|
|Elemental analysis| | |proprietary software|.txt|text file|<1 MB|
|Physisorption|.smp|<1 MB|proprietary software|.csv|comma-separated values|<1 MB|
`

var nfdi4chem_methods = Extractor.extractObject(table, 'rows', false)

export function DemoTable() {
    return (
        JSON.stringify(nfdi4chem_methods, null, 2)
    )
}

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
