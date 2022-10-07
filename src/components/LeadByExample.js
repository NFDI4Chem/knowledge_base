import React from "react";
import styles from "../css/custom.css";

const Lbesets = [
  {
    title: "Linderazulen aus einer invasiven Pflanze - Delphi und sein violettes Wunder",
    authors: "Nils Keltsch, Viola Munzert, Klaus-Peter Zeller, Hans-Ullrich Siehl, Stefan Berger, Dieter Sicker",
    link_pub: "https://doi.org/10.1002/ciuz.201900868",
    link_data: <p>Link(s) to dataset(s): <a href='https://doi.org/10.22000/786' target='_blank' rel='noopener noreferrer'>RADAR4Chem</a>, curated by Tillmann G. Fischer (IPB/NFDI4Chem)</p>,
    description: "The dataset, prepared for publication under the NFDI4Chem stewardship and published in RADAR4Chem contains NMR, MS, UV/VIS and IR data. NMR data are provided in Bruker format, as JCAMP-DX (MNova) and NMRium format including NMReDATA (SDfile). MS data are also available in open format mzML. IR and UV/VIS data are accessible in tabular files and in JCAMP-DX format. The structure information on Linderazulene and further supplementary information are provided as tables and SDfile. The corresponding article does not reference to the dataset."
  }
]


export function Lbeblock( {title, authors, link_pub, link_data, description} ) {
  return (
    <div>
      <h2>{title}</h2>

      <details className="details_node_modules-@docusaurus-theme-common-lib-components-Details-styles-module isBrowser_node_modules-@docusaurus-theme-common-lib-components-Details-styles-module alert alert--info details_node_modules-@docusaurus-theme-classic-lib-theme-Details-styles-module">

      <summary>Details</summary>

      &nbsp;
      <h3>Authors</h3>
      
      <p><em>{authors}</em></p>

      <h3>Description</h3>

      <p>{description}</p>

      <h3>Links</h3>

      <p><a href={link_pub}>Link to publication</a></p>

      {link_data}




      </details>
    </div>
  );
}

export default function Lbe() {
  return (
    <p>
      {Lbesets.map((props, idx) => (
        <Lbeblock key={idx} {...props} />
      ))}
    </p>
  )
}

