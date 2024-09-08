import RepoButton from "@site/src/components/repos/RepoButton";

import FilterButton from "./elnFilter/FilterButton.js";
import ShortenDesc from "../commons/ShortenDesc.js";

import styles from "./Eln.module.css";

function ElnCard({ eln, filter, setFilter }) {
    return (
        <div className={styles.eln__card}>
            <div className={styles.eln__card__header}>
                <h4>{eln.name}</h4>
                <FilterButton
                    secondary={eln.license !== "Open Source"}
                    active={filter.license === eln.license}
                    type="license"
                    label={eln.license}
                    {...{ filter, setFilter }}
                />
            </div>
            <RepoButton url={eln.url} name="Profile Page" />
            <div className={styles.eln__card__desc}>
                <ShortenDesc desc={eln.desc} length={100} />
            </div>
            {eln.subDisc && eln.subDisc.length > 0 && (
                <div className={styles.eln__card__desc}>
                    {eln.subDisc.map((subdisc, idx) => {
                        let isActive = filter.subDisc === subdisc;
                        return (
                            <FilterButton
                                active={isActive}
                                type="subDisc"
                                label={subdisc}
                                key={idx}
                                {...{ filter, setFilter }}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ElnCard;
