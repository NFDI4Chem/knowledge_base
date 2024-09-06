import React, { useState } from "react";

import { RepoButton } from "./LbeElements";

function ShortenButtons(props) {
    const [less, setLess] = useState(true);

    let number = props.number || 3;
    let items = props.items || [];

    if (items.length <= number) {
        return (
            <React.Fragment>
                {items.map((item, idx) => (
                    <RepoButton key={idx} {...item} />
                ))}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {less ? (
                <React.Fragment>
                    {items.map((item, idx) =>
                        idx < number ? <RepoButton key={idx} {...item} /> : null
                    )}
                    <span
                        className="lbe__block__author-trigger"
                        onClick={() => setLess(!less)}
                        style={{ cursor: "pointer" }}
                    >
                        show all &#9205;
                    </span>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {items.map((item, idx) => (
                        <RepoButton key={idx} {...item} />
                    ))}
                    <span
                        className="lbe__block__author-trigger"
                        onClick={() => setLess(!less)}
                        style={{ cursor: "pointer" }}
                    >
                        &#9204; collapse
                    </span>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default ShortenButtons;
