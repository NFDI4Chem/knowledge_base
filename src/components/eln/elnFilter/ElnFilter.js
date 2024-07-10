import React from "react";

import TextSearch from "./TextSearch";
import FilterButton from "./FilterButton";

import styles from "../Eln.module.css";

// Assemble buttons for filtering section

function ButtonFilters({ allSubDisc, allLicenses, filter, setFilter }) {
    let subDiscButtons = ["All", ...allSubDisc];
    let licenseButtons = ["All", ...allLicenses];

    // Check if active prop should be handed to FilterButton

    function isActive(type, label) {
        // check if filter value is equal to label

        if (filter[type] === label) {
            return true;
        }

        // check if object is empty and label is "All"

        if (
            (label === "All" && Object.keys(filter).length === 0) ||
            (label === "All" && !filter[type])
        ) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <React.Fragment>
            <div className="lbe__searchfilter__section">
                <h4>Filter by subdisciplines</h4>
                <p>
                    {subDiscButtons.map((subDisc, idx) => (
                        <FilterButton
                            key={idx}
                            label={subDisc}
                            type="subDisc"
                            active={isActive("subDisc", subDisc)}
                            numbered={true}
                            {...{ filter, setFilter }}
                        />
                    ))}
                </p>
            </div>
            <div className="lbe__searchfilter__section">
                <h4>Filter by license</h4>
                <p>
                    {licenseButtons.map((license, idx) => (
                        <FilterButton
                            key={idx}
                            label={license}
                            type="license"
                            active={isActive("license", license)}
                            numbered={true}
                            {...{ filter, setFilter }}
                        />
                    ))}
                </p>
            </div>
        </React.Fragment>
    );
}

function ElnFilter({
    allSubDisc,
    allLicenses,
    filter,
    setFilter,
    resultOutput,
}) {
    return (
        <div className={styles.eln__searchfilter}>
            <div className={styles["eln__searchfilter__text"]}>
                <TextSearch {...{ resultOutput, filter, setFilter }} />
            </div>
            <div className={styles["eln__searchfilter__buttons"]}>
                <ButtonFilters
                    {...{ allSubDisc, allLicenses, filter, setFilter }}
                />
            </div>
        </div>
    );
}

export default ElnFilter;
