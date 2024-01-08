const RadioBox = ({ prices, handleFilters }) => {
    const handleChange = (e) => {
        handleFilters(e.target.value);
    };

    return prices.map((price) => (
        <div key={price.id} className="">
            <input
                onChange={handleChange}
                value={price.id}
                name="price_filter"
                type="radio"
                className=""
            />
            <label className="">{price.name}</label>
        </div>
    ));
};

export default RadioBox;
