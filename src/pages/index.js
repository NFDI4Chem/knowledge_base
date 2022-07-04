import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import useBaseUrl from '@docusaurus/useBaseUrl';


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A place for all knowledge regarding Research Data Management (RDM) in Chemistry">
      <div className="hero">
        <div className='container'>
          <div className="row">
            <div className="col">
              <h1 className='hero__title text'>
                {siteConfig.title}
              </h1>
            </div>
          </div>
        <div className="row">
          <div className="col col--8">
            <p className="hero__subtitle vertical-center">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="col col--2">
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                Get started
              </Link>
            </div>
          </div>
        </div>
        <HomepageFeatures />
        </div>
        <div className='hero'></div>
      </div>
    </Layout>
  );
}
