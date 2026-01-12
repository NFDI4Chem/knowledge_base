import React from "react";

import TextSearch from "./TextSearch";
import FilterButton from "./FilterButton";

import styles from "@site/src/components/eln/ElnStyles";

// Assemble buttons for filtering section

function ButtonFilters({ allSubDisc, allLicenses, filter, setFilter }) {
  let subDiscButtons = [];

  if (allSubDisc) {
    subDiscButtons = ["All", ...allSubDisc];
  }
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
      {subDiscButtons.length > 0 && (
        <div className={styles.lbeSearchfilterSection}>
          <h5>Filter by subdisciplines</h5>
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
      )}
      <div className={styles.lbeSearchfilterSection}>
        <h5>Filter by license</h5>
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
    <div className={styles.elnSearchfilter}>
      <div className={styles.elnSearchfilterText}>
        <TextSearch {...{ resultOutput, filter, setFilter }} />
      </div>
      <div className={styles.elnSearchfilterButtons}>
        <ButtonFilters {...{ allSubDisc, allLicenses, filter, setFilter }} />
      </div>
    </div>
  );
}

export default ElnFilter;
