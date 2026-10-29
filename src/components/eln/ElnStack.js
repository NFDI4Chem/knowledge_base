import React from "react";

import ElnCard from "./ElnCard";

function ElnStack({ filteredTable, filter, setFilter }) {
	return (
		<React.Fragment>
			{filteredTable.map((eln) => (
				<ElnCard key={eln.name} {...{ eln, filter, setFilter }} />
			))}
		</React.Fragment>
	);
}

export default ElnStack;
