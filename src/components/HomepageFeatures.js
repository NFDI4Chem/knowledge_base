import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Roles',
    Svg: require('../../static/img/role.svg').default,
    link: '/docs/role/guide',
    description: <>Your Role</>,
  },
  {
    title: 'Domains',
    Svg: require('../../static/img/domain.svg').default,
    link: '/docs/domains/guide',
    description: <>Your Chemical Domain</>,
  },
  {
    title: 'Problems',
    Svg: require('../../static/img/problem.svg').default,
    link: '/docs/problems/dmp',
    description: <>Your Problems</>,
  },
  {
    title: 'Topics & Concepts',
    Svg: require('../../static/img/topics.svg').default,
    link: '/docs/topics/fair',
    description: <>Topics & Concepts</>,
  },
];

function Feature({ Svg, title, link, description }) {
  return (
    <div className={clsx('col col--3')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className='text--center padding-horiz--md'>
        {link ? (
          <Link
            className={clsx('button button--primary button--lg')}
            // ? <Link className={clsx('')}
            to={link}>
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
