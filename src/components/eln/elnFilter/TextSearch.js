import styles from "../Eln.module.css";

function TextSearch({ resultOutput, filter, setFilter }) {
    const handleChange = (e) =>
        setFilter((draft) => {
            draft.text = e.target.value;
        });

    console.log(filter);

    return (
        <div className={styles.eln__searchfilter__search}>
            <span>
                <input
                    type="search"
                    className="navbar__search-input"
                    placeholder="Type to search"
                    value={filter.text ? filter.text : ""}
                    onChange={handleChange}
                />
                &nbsp;
            </span>
            <em>{resultOutput}</em>
        </div>
    );
}

export default TextSearch;
