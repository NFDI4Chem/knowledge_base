import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Roles',
    Svg: require('../../static/img/role3.svg').default,
    link: '/docs/role/guide',
  },
  {
    title: 'Domains',
    Svg: require('../../static/img/domain3.svg').default,
    link: '/docs/domains/guide',
  },
  {
    title: 'Problems',
    Svg: require('../../static/img/problem3.svg').default,
    link: '/docs/problems/dmp',
  },
  {
    title: 'Topics & Concepts',
    Svg: require('../../static/img/topics3.svg').default,
    link: '/docs/topics/fair',
  },
];

function Feature({ Svg, title, link, description }) {
  return (
    <div className={clsx('col')} style={{
      width: 250,
      padding: 5,
      //backgroundColor: 'red',
    }}>
      <div className='text--center'>
        {link ? (
          <Link
            className={clsx('button button--primary button--lg')} style={{
              width: 250,
            }}
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
