import React from "react";
import { useState, useEffect } from "react";


const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);
    const checkedIds = [...checked];

    //* '''' Closure '''''
    //todo ==> In React, event handlers typically have a specific signature where they receive an event object as a parameter. For example, the onChange event handler for an input element expects an event object. If you want to pass additional data (in this case, the category._id), you need to use a closure to create a new function.

    const handleToggle = (id) => () => {
        // console.log(id);
        //* this indexOf method return -1 when id is not found and return index of the id or first index.
        const foundId = checked.indexOf(id);
        // console.log(foundId);
        if (foundId === -1) {
            checkedIds.push(id);
        } else {
            checkedIds.splice(foundId, 1);
        }
        setChecked(checkedIds);
        handleFilters(checkedIds);
    };
    // console.log("This is checked array: ", checked);
    // console.log("This is checked ids: ", checkedIds);

    // useEffect(() => {
    //     alert(JSON.stringify(checked))
    // }, [checked])

    return categories.map((category) => (
        <li key={category._id}>
            <input
                type="checkbox"
                onChange={handleToggle(category._id)}
                //* the value are 1 and 0 if the box is checked value will be 1 if not value will be 0.
                //!!!!! Problem !!!!!!
                //todo At first the id of the current category will not be in the checked array so the value of category._id === -1 will be true and whenever the the current category is checked this will be false and will show checked. Again whenever the same category will be checked it will look for the index of the that category in checked array and as it is checked previously this  category._id === -1 will return false.So, it will show unchecked in the box.
                value={checked.indexOf(category._id === -1)}
            />
            <label>{category.name}</label>
        </li>
    ));
};

export default CheckBox;
