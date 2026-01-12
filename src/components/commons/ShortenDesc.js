import React, { useState } from "react";

import styles from "@site/src/css/ShortenDesc.module.css";

// shorten the description of the experiment up to the next blank, comma or period after 100 characters

function ShortenDesc({ desc, length }) {
  const [collapsed, setCollapsed] = useState(true);

  if (desc.length <= length) {
    return <React.Fragment>{desc}</React.Fragment>;
  }

  return (
    <React.Fragment>
      {collapsed ? (
        <span
          title={desc}
          onClick={() => setCollapsed(!collapsed)}
          style={{ cursor: "pointer" }}
        >
          {desc.slice(0, length) +
            desc.slice(length).split(/[\s,\.]/)[0] +
            " ..."}

          <button className={styles.authorTrigger}>expand &#9660;</button>
        </span>
      ) : (
        <span
          onClick={() => setCollapsed(!collapsed)}
          style={{ cursor: "pointer" }}
        >
          {desc}
          <button className={styles.authorTrigger}>collapse &#9650;</button>
        </span>
      )}
    </React.Fragment>
  );
}

export default ShortenDesc;
