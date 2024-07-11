import RepoButton from "@site/src/components/repos/RepoButton";

import { LicenseChip, SubdiscChip } from "./ElnChips.js";
import ShortenDesc from "./ShortenDesc.js";

import styles from "./Eln.module.css";

function ElnCard({ eln }) {
    return (
        <div className={styles.eln__card}>
            <div className={styles.eln__card__header}>
                <h3>{eln.name}</h3>
                <LicenseChip license={eln.license} />
            </div>
            <RepoButton url={eln.url} name="Profile Page" />
            <div className={styles.eln__card__desc}>
                <ShortenDesc desc={eln.desc} length={100} />
            </div>
            <div className={styles.eln__card__desc}>
                {eln.subDisc.length > 0
                    ? eln.subDisc.map((subdisc, idx) => (
                          <SubdiscChip subdisc={subdisc} key={idx} />
                      ))
                    : null}
            </div>
        </div>
    );
}

export default ElnCard;
