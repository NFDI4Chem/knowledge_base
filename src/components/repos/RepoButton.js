import React from "react";
import Link from "@docusaurus/Link";

import IconExternalLink from "@theme/Icon/ExternalLink";

function RepoButton(props) {
  return (
    <React.Fragment>
      <Link to={props.url} target="_blank">
        <button className="lbe__filterbutton lbe__chip">
          {props.intro ? props.intro + " " : null}
          <strong>{props.name}</strong> <IconExternalLink />
        </button>
      </Link>
    </React.Fragment>
  );
}

export default RepoButton;
