import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

import styles from "@site/src/css/Features.module.css";

import clsx from "clsx";

function FeatureButton({ url, imgUrl, text, ...props }) {
  let classes = clsx(
    "button",
    { "button--primary": props.index },
    { "button--secondary": !props.index },
    props.classes,
    styles.featureButton,
    { [styles.featureButtonIndex]: props.index },
  );

  const width = props?.width ?? "120px";

  return (
    <Link to={url} className={classes}>
      <div className={styles.featureSvg}>
        <img src={useBaseUrl(imgUrl)} style={{ maxWidth: width }} alt={text} />
      </div>
      <div>{text}</div>
    </Link>
  );
}

export default FeatureButton;
