import React from "react";

const Ordering = ({ handleOrder }) => {
    return (
        <div>
            <select className="border border-2 p-2 rounded-xl" onChange={handleOrder}>
                <option value="asc">asc</option>
                <option value="desc">desc</option>
            </select>
        </div>
    );
};

export default Ordering;
