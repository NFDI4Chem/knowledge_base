import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import styles from "@site/src/css/lbe.module.css";
import clsx from "clsx";

function LbeChip({ title }) {
  return (
    <Link to={useBaseUrl("/docs/datasets/?subd=" + title)}>
      <button className={clsx(styles.lbeFilterbutton, styles.lbeChip)}>
        Lead by Example &#9654;<strong>{title}</strong>
      </button>
    </Link>
  );
}

export default LbeChip;
