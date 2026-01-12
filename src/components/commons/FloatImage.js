import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

import styles from "@site/src/css/FloatImage.module.css";

function FloatImage({ url, alt, ...props }) {
  // Object for custom styles

  let style = {};

  // Populate style object with all props except 'link'

  Object.keys(props).forEach((key) => {
    if (key !== "link") {
      style[key] = props[key];
    }
  });

  // Component for image

  const ThisImg = () => {
    return (
      <img
        className={styles.FloatImage}
        alt={alt}
        src={useBaseUrl(url)}
        style={style}
      />
    );
  };

  // If link prop is given, wrap image in link

  if (props.link && props.link.length > 0) {
    return (
      <Link href={props.link}>
        <ThisImg />
      </Link>
    );
  }

  return <ThisImg />;
}
export default FloatImage;
