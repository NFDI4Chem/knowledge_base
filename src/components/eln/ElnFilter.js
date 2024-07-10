import React from "react";

import TextSearch from "./elnFilter/TextSearch";
import FilterButton from "./elnFilter/FilterButton";

import styles from "./Eln.module.css";

// Assemble buttons for filtering section

function ButtonFilters({ allSubDisc, allLicenses, filter, setFilter }) {
    let subDiscButtons = ["All", ...allSubDisc];
    let licenseButtons = ["All", ...allLicenses];

    return (
        <React.Fragment>
            <div className="lbe__searchfilter__section">
                <h4>Filter by subdisciplines</h4>
                <p>
                    {subDiscButtons.map((props, idx) => (
                        <FilterButton
                            key={idx}
                            label={props}
                            type="subDisc"
                            numbered={true}
                            {...{ filter, setFilter }}
                        />
                    ))}
                </p>
            </div>
            <div className="lbe__searchfilter__section">
                <h4>Filter by license</h4>
                <p>
                    {licenseButtons.map((props, idx) => (
                        <FilterButton
                            key={idx}
                            label={props}
                            type="license"
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
            <TextSearch {...{ resultOutput, filter, setFilter }} />
            <ButtonFilters
                {...{ allSubDisc, allLicenses, filter, setFilter }}
            />
        </div>
    );
}

export default ElnFilter;
