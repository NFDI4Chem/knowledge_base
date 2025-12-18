import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import N4CFeatures from "../components/N4CFeatures";
import Translate from "@docusaurus/Translate";

import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.customFields.description}`}
    >
      <div className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className="row">
            <div className="col">
              <h1 className={styles.heroTitle + " text"}>{siteConfig.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col col--8">
              <p className={styles.heroSubtitle}>
                <Translate>
                  A place for all knowledge regarding Research Data Management
                  (RDM) in Chemistry
                </Translate>
              </p>
            </div>
            <div className="col col--2">
              <div className="buttons">
                <Link
                  className="button button--negative button--lg"
                  to="/docs/intro"
                >
                  <Translate>Get started</Translate>
                </Link>
              </div>
            </div>
          </div>
          <N4CFeatures feature="entry" />
        </div>
      </div>
    </Layout>
  );
}
