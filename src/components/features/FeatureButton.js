import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

import styles from "@site/src/css/Features.module.css";

import clsx from "clsx";

function FeatureButton({ url, imgUrl, text, ...props }) {
  let classes = clsx("button", props.classes, styles.featureButton);

  console.log(props);

  console.log(classes);

  const width = props?.width ?? "120px";

  return (
    <Link to={url} className={classes}>
      <div className={styles.featureSvg}>
        <img src={useBaseUrl(imgUrl)} width={width} />
      </div>
      <div>{text}</div>
    </Link>
  );
}

export default FeatureButton;
