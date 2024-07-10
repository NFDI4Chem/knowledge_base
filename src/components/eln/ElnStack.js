import React from "react";

import ElnCard from "./ElnCard";

function ElnStack({ filteredTable }) {
    return (
        <React.Fragment>
            {filteredTable.map((eln, idx) => (
                <ElnCard {...{ eln }} key={idx} />
            ))}
        </React.Fragment>
    );
}

export default ElnStack;
