import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Roles',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    link: '/docs/role/guide',
    description: <>Enter via your role</>,
  },
  {
    title: 'Domains',
    Svg: require('../../static/img/domain.svg').default,
    link: '/docs/domains/guide',
    description: <>Enter via your chemical domain</>,
  },
  {
    title: 'Problems',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    link: '/docs/problems/dmp',
    description: <>Enter via presented problems</>,
  },
  {
    title: 'Topics & Concepts',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    link: '/docs/topics/fair',
    description: <>Go directly to topics and concepts</>,
  },
];

function Feature({ Svg, title, link, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        {link ? (
          <Link
            className={clsx('button button--primary button--lg')}
            // ? <Link className={clsx('')}
            to={link}>
            {description}
          </Link>
        ) : (
          <p>{description}</p>
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
