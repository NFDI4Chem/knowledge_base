import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    imageUrl: 'img/chemeln.jpg',
    title: 'Chemotion ELN',
    mainLink: 'http://eln.chemotion.net',
  },

  {
    imageUrl: 'img/chemrepo.png',
    title: 'Repository',
    mainLink: 'https://www.chemotion-repository.net/welcome',
    btnText: 'Enter',
  },

  {
    imageUrl: 'img/chemeln.jpg',
    title: 'SciMotion ELN',
    mainLink: 'http://eln.chemotion.net',
  },

  {
    imageUrl: 'img/spectraviewer.png',
    title: 'ChemSpectra',
    mainLink: 'http://eln.chemotion.net/chemspectra-editor',
    mainTitle: ' Try our ChemSpectra'
  },

  {
    imageUrl: 'img/chemscanner.png',
    title: 'ChemScanner',
    mainLink: 'http://eln.chemotion.net/chemscanner',
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
