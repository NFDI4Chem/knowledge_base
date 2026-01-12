import styles from "@site/src/components/eln/ElnStyles";

function TextSearch({ resultOutput, filter, setFilter }) {
  const handleChange = (e) =>
    setFilter((draft) => {
      draft.text = e.target.value;
    });

  return (
    <div className={styles.elnSearchfilterSearch}>
      <span className="navbar__search">
        <input
          className="navbar__search-input"
          type="search"
          placeholder="Type to search"
          value={filter.text ? filter.text : ""}
          onChange={handleChange}
        />
        {filter.text && (
          <button
            className={styles.elnSearchfilterSearchButton}
            onClick={() =>
              setFilter((draft) => {
                delete draft.text;
              })
            }
          >
            &#x2715;
          </button>
        )}
        &ensp;
      </span>
      <em>{resultOutput}</em>
    </div>
  );
}

export default TextSearch;
