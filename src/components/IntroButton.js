import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "./N4CFeatures.module.css";

export default function IntroButton(props) {
  return (
    <div className={"col " + styles.introCol}>
      <div>
        <a
          href={useBaseUrl(props.url)}
          className={
            "button button--secondary " + styles.featureButtonSecondary
          }
        >
          <div>
            <img src={useBaseUrl(props.imgUrl)} width="120px" />
          </div>
          <div>{props.text}</div>
        </a>
      </div>
    </div>
  );
}
