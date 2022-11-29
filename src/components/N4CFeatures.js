import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Feature({ title, svg, link, style }) {

  return (
    <div className='col feature__col'>
    <div className='text--center'>
      {link ? (
        <Link
          className={style} 
          // ? <Link className={clsx('')}
          to={link}>
            <img className="featureSvg" alt={title} src={useBaseUrl(svg)} /><br/>
          {title}
        </Link>
      ) : (
        <p>{title}</p>
      )}
    </div>
    </div>
  );
}

export default function N4CFeatures( { feature } ) {

  var style = "";
  var featureList = require("@site/static/assets/"+feature+".json");;

  if (feature == "entry") {
    style="button button--primary button--lg feature__button";
  } else {
    style="button button--secondary button--lg feature__button--secondary";
  }

  return (
    <section className='features'>
      <div className='container'>
        <div className='row'>
          {featureList.map((props, idx) => (
            <Feature key={idx} {...props} style={style} />
          ))}
        </div>
      </div>
    </section>
  );
}