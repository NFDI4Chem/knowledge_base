import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import N4CFeatures from "../components/N4CFeatures";
import Translate from "@docusaurus/Translate";

import styles from "./index.module.css";
import clsx from "clsx";

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
          <N4CFeatures feature="entry" />
        </div>
      </div>
    </Layout>
  );
}
