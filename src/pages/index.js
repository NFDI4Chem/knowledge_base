import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Features from "@site/src/components/features/Features";

import Translate from "@docusaurus/Translate";

import styles from "./index.module.css";
import clsx from "clsx";

const features = [
  {
    text: <Translate>Domains</Translate>,
    imgUrl: "/img/nfdi4chem_Domains_white.svg",
    alt: "Domains Icon",
    url: "/docs/domain_guide",
  },
  {
    text: <Translate>Roles</Translate>,
    imgUrl: "/img/nfdi4chem_Roles_white.svg",
    alt: "Roles Icon",
    url: "/docs/role_guide",
  },
  {
    text: <Translate>Handling Data</Translate>,
    imgUrl: "/img/nfdi4chem_Handling_Data_white.svg",
    alt: "Handling Data Icon",
    url: "/docs/data_guide",
  },
  {
    text: <Translate>Electronic Lab Notebooks</Translate>,
    imgUrl: "/img/nfdi4chem_SmartLab_white.svg",
    alt: "Electronic Lab Notebooks Icon",
    url: "/docs/smartlab",
  },
  {
    text: <Translate>Data Publishing</Translate>,
    imgUrl: "/img/nfdi4chem_Data_Publication_white.svg",
    alt: "Data Publishing Icon",
    url: "/docs/data_publishing",
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.customFields.description}`}
    >
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <div className="row">
            <div className={clsx("col", "col--8")}>
              <p className={styles.heroSubtitle}>
                <Translate>
                  A place for all knowledge regarding Research Data Management
                  (RDM) in Chemistry
                </Translate>
              </p>
            </div>
            <div className={clsx("col", "col--4", "buttons")}>
              <Link
                className={clsx("button", "button--negative", "button--lg")}
                to="/docs/intro"
              >
                <Translate>Get started</Translate>
              </Link>
            </div>
          </div>
          <Features featureList={features} index />
        </div>
      </div>
    </Layout>
  );
}
