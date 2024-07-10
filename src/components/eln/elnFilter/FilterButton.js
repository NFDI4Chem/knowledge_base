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

    let buttonClass = "lbe__filterbutton";
    if (props.active) {
        buttonClass += " lbe__filterbutton--active";
    }

    return (
        <button className={buttonClass} onClick={handleClick}>
            {props.label}
        </button>
    );
}

export default FilterButton;
