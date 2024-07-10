import React, { useState, useEffect } from "react";
import moment from "moment";
import { useImmer } from "use-immer";

import ElnStatus from "./ElnStatus";
import ElnFilter from "./ElnFilter";
import ElnStack from "./ElnStack";

import styles from "./Eln.module.css";

// const elnData = require("@site/static/assets/eln_test.json");

function ElnFinder() {
    const [elnData, setElnData] = useState(null);
    const [error, setError] = useState(null);

    const [filter, setFilter] = useImmer({});

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
    let allLicenses = [];

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
            allLicenses.push(
                eln["_embedded"].indexableObject.metadata["K.lizenzmodell"][0]
                    .value
            );
            console.log(elnTable);
        });

        allSubDisc = [...new Set(allSubDisc.flat())];
        allLicenses = [...new Set(allLicenses)];
        console.log(allSubDisc);
        console.log(allLicenses);
    } catch (error) {
        console.error(error);
        return <em>Failed to process ELN data.</em>;
    }

    const filteredTable = elnTable.filter((eln) => {
        if (filter.text) {
            return JSON.stringify(eln).toLowerCase().includes(filter.text);
        }

        if (filter.subDisc) {
            return eln.subDisc.includes(filter.subDisc);
        }

        if (filter.license) {
            return eln.license.includes(filter.license);
        } else {
            return true;
        }
    });

    const numberOfResults = filteredTable.length;

    let resultOutput = null;

    switch (numberOfResults) {
        case elnTable.length:
            resultOutput = null;
            break;
        case 0:
            resultOutput = "No results found.";
            break;
        case 1:
            resultOutput = "1 result found.";
            break;
        default:
            resultOutput = numberOfResults + " results found.";
            break;
    }

    return (
        <React.Fragment>
            <ElnStatus {...{ relativeDate }} />
            <div className={styles.eln}>
                <ElnFilter
                    {...{
                        allSubDisc,
                        allLicenses,
                        filter,
                        setFilter,
                        resultOutput,
                    }}
                />
                <ElnStack {...{ filteredTable }} />
            </div>
        </React.Fragment>
    );
}

export default ElnFinder;
