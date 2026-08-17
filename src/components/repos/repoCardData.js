import Translate from "@docusaurus/Translate";

export const repositoryData = [
    {
        name: "Chemotion Repository",
        url: "/img/data_pub/repos/ChemotionRepo_Logo.svg",
        alt: "Chemotion Repository Logo",
        description:
            <Translate>
                Field-specific sample and reaction-centric repository including analysis data such as NMR, UV-VIS, IR, and MS data.
            </Translate>
    },
    {
        name: "MassBank",
        url: "/img/data_pub/repos/Massbank_logo.svg",
        alt: "Massbank Logo",
        description:
            <Translate>
                Field-specific ecosystem of databases and tools for mass spectrometry reference spectra.*
            </Translate>
    },
    {
        name: "nmrXiv",
        url: "/img/data_pub/repos/nmrXiv.svg",
        alt: "nmrXiv Logo",
        description:
            <Translate>
                Field-specific repository for NMR data.
            </Translate>
    },
    {
        name: "RADAR4Chem",
        url: "/img/data_pub/repos/radar4chem_Logo.svg",
        alt: "RADAR4Chem Logo",
        description:
            <Translate>
                Generic, multidisciplinary repository that offers a free and reliable home for all chemical research data that do not fulfil the specifications of field-specific repositories.
            </Translate>
    },
    {
        name: "STRENDA",
        url: "/img/data_pub/repos/Logo_Beilstein_STRENDA_sRGB.png",
        alt: "Strenda DB Logo",
        description:
            <Translate>
                Field-specific repository for enzymology data, which incorporates the STRENDA Guidelines for reporting enzymology data.
            </Translate>
    },
    {
        name: "Suprabank",
        url: "/img/data_pub/repos/Suprabank_logo.svg",
        alt: "Suprabank Logo",
        description:
            <Translate>
                Field-specific repository for intermolecular interactions data.
            </Translate>
    },
];

export const repositoryStyle = {
    "--ifm-button-size-multiplier": "1",
    flex: "250px",
    fontWeight: "unset",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
};

const imgStyle = { display: "flex", flex: "50%", width: "100%", padding: "0.5rem 0", alignItems: "end", justifyContent: "center" }

const descStyle = {
    display: "flex", flexGrow: 1, flex: "50%", width: "100%", padding: "0.5rem", alignItems: "start", justifyContent: "center"
}

export function RepoDiv(props) {
    return (
        <div style={props.img ? imgStyle : descStyle}>{props.children}</div>
    )
}
