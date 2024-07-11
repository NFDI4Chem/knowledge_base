import React, { useState } from "react";

import clsx from "clsx";

import styles from "../Eln.module.css";

function TextSearch({ resultOutput, filter, setFilter }) {
    const handleChange = (e) =>
        setFilter((draft) => {
            draft.text = e.target.value;
        });

    console.log(filter);

    return (
        <div className={styles.eln__searchfilter__search}>
            <span className="navbar__search">
                <input
                    className="navbar__search-input"
                    type="search"
                    placeholder="Type to search"
                    value={filter.text ? filter.text : ""}
                    onChange={handleChange}
                />
                {filter.text ? (
                    <button
                        className={styles.eln__searchfilter__search__button}
                        onClick={() =>
                            setFilter((draft) => {
                                delete draft.text;
                            })
                        }
                    >
                        &#x2715;
                    </button>
                ) : null}
                &ensp;
            </span>
            <em>{resultOutput}</em>
        </div>
    );
}

export default TextSearch;
