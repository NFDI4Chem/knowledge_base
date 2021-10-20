import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          <div className="col col--2 n4c--logo">
            <img src={useBaseUrl("/img/NFDI4Chem-Logo_einfarbig_weiss_nurGraphik.svg")} width="120" />
          </div>
          <div className="col col--8">
            <h1 className="hero__title text">
              {siteConfig.title}
            </h1>
            <p className="hero__subtitle">
              {siteConfig.tagline}
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx("button button--negative button--lg")}
                to="/docs/intro">
                Get started
              </Link>
            </div>
          </div> 
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A place for all knowledge regarding Research Data Management (RDM) in Chemistry">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
