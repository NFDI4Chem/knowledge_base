import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "@site/src/css/N4CFeatures.module.css";
import clsx from "clsx";

export default function IntroButton(props) {
  return (
    <div className={clsx("col", styles.introCol)}>
      <div>
        <a
          href={useBaseUrl(props.url)}
          className={clsx(
            "button",
            "button--secondary",
            styles.featureButtonSecondary,
          )}
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
