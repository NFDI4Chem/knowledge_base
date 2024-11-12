import clsx from "clsx";

import styles from "../Eln.module.css";

function FilterButton(props) {
    const handleClick = () => {
        if (props.label === "All") {
            props.setFilter((draft) => {
                delete draft[props.type];
            });
        } else {
            props.setFilter((draft) => {
                draft[props.type] = props.label;
            });
        }
    };

    // Conditional styling for button

    let buttonClass = clsx("lbe__filterbutton", {
        [styles["eln__filterbutton--secondary"]]: props.secondary,
        "lbe__filterbutton--active": props.active,
    });

    return (
        <button className={buttonClass} onClick={handleClick}>
            {props.label}
        </button>
    );
}

export default FilterButton;
