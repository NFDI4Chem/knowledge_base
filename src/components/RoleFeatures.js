import React from 'react';
import clsx from 'clsx';
import styles from '/src/components/DomainFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Research Group Leader',
    Svg: require('/img/pi_petrol.svg').default,
    link: '/docs/role/research_group_leader/',
  },
  {
    title: 'Research Group Member',
    Svg: require('/img/researcher_petrol.svg').default,
    link: '/docs/role/research_group_member/',
  },
  {
    title: 'Student',
    Svg: require('/img/stud_petrol.svg').default,
    link: '/docs/role/student/',
  },
  {
    title: 'Data Steward',
    Svg: require('/img/datastew_petrol.svg').default,
    link: '/docs/role/data_steward/',
  },
  {
    title: 'Core Facility Manager',
    Svg: require('/img/service_petrol.svg').default,
    link: '/docs/role/core_facility_manager/',
  }
];

function Feature({ Svg, title, link }) {
  return (
    <div className='col feature--col'>
    <div className='text--center'>
      {link ? (
        <Link
          className={clsx('button button--secondary button--lg feature-secondary--button')} 
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

export default function RoleFeatures() {
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
