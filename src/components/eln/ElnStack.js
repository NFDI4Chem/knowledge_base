import React from "react";

import ElnCard from "./ElnCard";

function ElnStack({ filteredTable, filter, setFilter }) {
  return (
    <React.Fragment>
      {filteredTable.map((eln, idx) => (
        <ElnCard {...{ eln, filter, setFilter }} key={idx} />
      ))}
    </React.Fragment>
  );
}

export default ElnStack;
