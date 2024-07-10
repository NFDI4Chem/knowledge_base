function TextSearch({ resultOutput, filter, setFilter }) {
    const handleChange = (e) =>
        setFilter((draft) => {
            draft.text = e.target.value;
        });

    return (
        <div className="lbe__searchfilter__search">
            <input
                type="search"
                className="navbar__search-input"
                placeholder="Type to search"
                value={filter.text}
                onChange={handleChange}
            />
            &ensp;
            <em>{resultOutput}</em>
        </div>
    );
}

export default TextSearch;
