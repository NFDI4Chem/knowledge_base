import React from 'react';
import clsx from 'clsx';
import styles from '/src/components/DomainFeatures.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Synthetic Chemistry',
    Svg: require('/img/oc.svg').default,
    link: '/docs/domains/synthetic_chemistry',
  },
  {
    title: 'Analytical Chemistry',
    Svg: require('/img/an.svg').default,
    link: '/docs/domains/analytical_chemistry',
  },
  {
    title: 'Physical Chemistry',
    Svg: require('/img/pc.svg').default,
    link: '/docs/domains/physical_chemistry',
  },
  {
    title: 'Polymer Chemistry',
    Svg: require('/img/polymer.svg').default,
    link: '/docs/domains/polymer_chemistry',
  },
  {
    title: 'Biochemistry',
    Svg: require('/img/bc.svg').default,
    link: '/docs/domains/biochemistry',
  },
  {
    title: 'Pharmaceutical Chemistry',
    Svg: require('/img/pharma.svg').default,
    link: '/docs/domains/pharmaceutical_chemistry',
  },
  {
    title: 'Computational Chemistry',
    Svg: require('/img/comp.svg').default,
    link: '/docs/domains/computational_chemistry',
  },
];

function Feature({ Svg, title, link }) {
    return (
      <div className='col' style={{
        width: 300,
        padding: 8,
        //backgroundColor: 'red',
      }}>
      <div className='text--center'>
        {link ? (
          <Link
            className={clsx('button button--primary button--lg')} style={{
              width: 300,
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

export default function DomainFeatures() {
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