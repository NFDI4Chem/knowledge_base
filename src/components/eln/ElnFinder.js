import React, { useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import moment from "moment";

import ShortenDesc from "./ShortenDesc";

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

    const dateDownloaded = moment(elnData.date);
    const relativeDate = moment(dateDownloaded).fromNow();

    console.log(relativeDate);

    try {
        const chemElns = elnData["_embedded"].searchResult["_embedded"].objects;

        chemElns.map((eln) => {
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
            });
        });
    } catch (error) {
        return <em>Failed to process ELN data</em>;
    }

    return (
        <React.Fragment>
            <p>
                <em>
                    Data kindly provided by{" "}
                    <Link to="https://eln-finder.ulb.tu-darmstadt.de/">
                        ELN Finder
                    </Link>{" "}
                    (
                    {relativeDate !== "Invalid date"
                        ? "last updated " + relativeDate
                        : "last update unknown"}
                    ).
                </em>
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>License</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {elnTable.map((eln) => (
                        <tr>
                            <td>
                                <Link to={eln.url}>{eln.name}</Link>
                            </td>
                            <td>{eln.license}</td>
                            <td>
                                <ShortenDesc desc={eln.desc} length={200} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default ElnFinder;
