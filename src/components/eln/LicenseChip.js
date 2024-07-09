import styles from "./Eln.module.css";
import clsx from "clsx";

function LicenseChip({ license }) {
    let style = "lbe__filterbutton lbe__chip";

    if (license === "Open Source") {
        style = clsx(styles["eln__licenseChip--opensource"], style);
    }

    return <button className={style}>{license}</button>;
}

export default LicenseChip;
