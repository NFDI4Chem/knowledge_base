import ElnCard from "./ElnCard";
import styles from "./Eln.module.css";

function ElnStack({ elnTable }) {
    return (
        <div className={styles.eln}>
            {elnTable.map((eln, idx) => (
                <ElnCard {...{ eln }} key={idx} />
            ))}
        </div>
    );
}

export default ElnStack;
