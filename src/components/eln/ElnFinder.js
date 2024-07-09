import React, { useState, useEffect } from "react";
import moment from "moment";

import ElnStack from "./ElnStack";
import ElnStatus from "./ElnStatus";

// const elnData = require("@site/static/assets/eln_test.json");

function ElnFinder() {
    const [elnData, setElnData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("../../assets/elnData.json")
            .then((response) => response.json())
            .then((data) => {
                setElnData(data);
                console.log(data);
            })
            .catch((error) => {
                setError(error);
                console.error(error);
            });
    }, []);

    if (!elnData) {
        return <em>Loading...</em>;
    }

    let elnTable = [];
    let allSubDisc = [];

    const dateDownloaded = moment(elnData.date);
    const relativeDate = moment(dateDownloaded).fromNow();

    try {
        const chemElns = elnData["_embedded"].searchResult["_embedded"].objects;

        chemElns.map((eln) => {
            let subDisc = [];
            eln["_embedded"].indexableObject.metadata["dc.subject"].map(
                (discipline) =>
                    discipline.value.startsWith("Chemistry:")
                        ? subDisc.push(discipline.value.split(":")[1])
                        : null
            );

            elnTable.push({
                name: eln["_embedded"].indexableObject.name,
                url: eln["_embedded"].indexableObject.metadata[
                    "dc.identifier.uri"
                ][0].value,
                license:
                    eln["_embedded"].indexableObject.metadata[
                        "K.lizenzmodell"
                    ][0].value,
                desc: eln["_embedded"].indexableObject.metadata[
                    "dc.description.abstract"
                ][0].value,
                subDisc: subDisc,
            });
            allSubDisc.push(subDisc);
            console.log(elnTable);
        });

        allSubDisc = [...new Set(allSubDisc.flat())];
        console.log(allSubDisc);
    } catch (error) {
        console.error(error);
        return <em>Failed to process ELN data.</em>;
    }

    return (
        <React.Fragment>
            <ElnStatus {...{ relativeDate }} />
            <ElnStack {...{ elnTable }} />
        </React.Fragment>
    );
}

export default ElnFinder;
