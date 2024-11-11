import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";

const features = {
    entry: [
        {
            title: <Translate>Domains</Translate>,
            svg: "/img/nfdi4chem_Domains_white.svg",
            link: "/docs/domain_guide",
        },
        {
            title: <Translate>Roles</Translate>,
            svg: "/img/nfdi4chem_Roles_white.svg",
            link: "/docs/role_guide",
        },
        {
            title: <Translate>Handling Data</Translate>,
            svg: "/img/nfdi4chem_Handling_Data_white.svg",
            link: "/docs/data_guide",
        },
        {
            title: <Translate>Electronic Lab Notebooks</Translate>,
            svg: "/img/nfdi4chem_SmartLab_white.svg",
            link: "/docs/smartlab",
        },
        {
            title: <Translate>Data Publishing</Translate>,
            svg: "/img/nfdi4chem_Data_Publication_white.svg",
            link: "/docs/data_publishing",
        },
    ],
    domains: [
        {
            title: <Translate>Synthetic Chemistry</Translate>,
            svg: "/img/nfdi4chem_Synthetic_Chemistry.svg",
            link: "/docs/synthetic_chemistry",
        },
        {
            title: <Translate>Analytical Chemistry</Translate>,
            svg: "/img/nfdi4chem_Analytical_Chemistry.svg",
            link: "/docs/analytical_chemistry",
        },
        {
            title: <Translate>Physical Chemistry</Translate>,
            svg: "/img/nfdi4chem_Physial_Chemistry.svg",
            link: "/docs/physical_chemistry",
        },
        // {
        //   "title": <Translate>Polymer Chemistry</Translate>,
        //   "svg": "/img/nfdi4chem_Polymer_Chemistry.svg",
        //   "link":  "/docs/polymer_chemistry"
        // },
        {
            title: <Translate>Pharmaceutical Chemistry</Translate>,
            svg: "/img/nfdi4chem_Medicinal-Pharmaceutical_Chemistry.svg",
            link: "/docs/pharmaceutical_chemistry",
        },
    ],
    roles: [
        {
            title: <Translate>Research Group Leader</Translate>,
            svg: "/img/nfdi4chem_Research_Group_Leader.svg",
            link: "/docs/research_group_leader",
        },
        {
            title: <Translate>Research Group Member</Translate>,
            svg: "/img/nfdi4chem_Research_Group_Member.svg",
            link: "/docs/research_group_member",
        },
        {
            title: <Translate>Student</Translate>,
            svg: "/img/nfdi4chem_Student.svg",
            link: "/docs/student",
        },
        {
            title: <Translate>Data Steward</Translate>,
            svg: "/img/nfdi4chem_Data_Steward.svg",
            link: "/docs/data_steward",
        },
        {
            title: <Translate>Core Facility Manager</Translate>,
            svg: "/img/nfdi4chem_Core_Facility_Manager.svg",
            link: "/docs/core_facility_manager",
        },
    ],
    stakeholders_data_publishing: [
        {
            title: <Translate>Authors</Translate>,
            svg: "/img/nfdi4chem_Research_Group_Member.svg",
            link: "/docs/publishing_standards_authors",
        },
        {
            title: <Translate>Academic Publishers</Translate>,
            svg: "/img/nfdi4chem_Data_Publication.svg",
            link: "/docs/publishing_standards_publishers",
        },
        {
            title: <Translate>Infrastructure Providers</Translate>,
            svg: "/img/nfdi4chem_Core_Facility_Manager.svg",
            link: "/docs/publishing_standards_infrastructure",
        },
    ],
};

function Feature({ title, svg, link, style }) {
    return (
        <div className="col feature__col">
            <div className="text--center">
                {link ? (
                    <Link
                        className={style}
                        // ? <Link className={clsx('')}
                        to={link}
                    >
                        <img
                            className="featureSvg"
                            alt={title}
                            src={useBaseUrl(svg)}
                        />
                        <br />
                        {title}
                    </Link>
                ) : (
                    <p>{title}</p>
                )}
            </div>
        </div>
    );
}

export default function N4CFeatures({ feature }) {
    var style = "";
    const featureList = features[feature];

    if (feature == "entry") {
        style = "button button--primary feature__button";
    } else {
        style = "button button--secondary feature__button--secondary";
    }

    return (
        <section className="features">
            <div className="container">
                <div className="row">
                    {featureList.map((props, idx) => (
                        <Feature key={idx} {...props} style={style} />
                    ))}
                </div>
            </div>
        </section>
    );
}
