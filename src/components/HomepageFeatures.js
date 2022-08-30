import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Roles',
    Svg: require('../../static/img/nfdi4chem_Roles_white.svg').default,
    link: '/docs/role/guide',
  },
  {
    title: 'Domains',
    Svg: require('../../static/img/nfdi4chem_Domains_white.svg').default,
    link: '/docs/domains/guide',
  },
  {
    title: 'Handling Data',
    Svg: require('../../static/img/nfdi4chem_Handling_Data_white.svg').default,
    link: '/docs/data/dmp',
  },
  {
    title: 'Topics & Concepts',
    Svg: require('../../static/img/nfdi4chem_Topics_and_Concepts_white.svg').default,
    link: '/docs/topics/fair',
  },
  {
    title: 'Lead by Example',
    Svg: require('../../static/img/nfdi4chem_Lead_by_Example_white.svg').default,
    link: '/docs/lead-by-example',
  },
];

function Feature({ Svg, title, link }) {
  return (
    <div className={clsx("col feature--col")}>
      <div className="vertical-center">
        {link ? (
          <Link
            className={clsx("button button--primary button--lg feature--button")}
            // ? <Link className={clsx('')}
            to={link}>
              <Svg className={styles.featureSvg} alt={title} /><br/>
            {title}
          </Link>
        ) : (
          <p>{title}</p>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

