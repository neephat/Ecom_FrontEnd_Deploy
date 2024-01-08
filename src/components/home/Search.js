import { Button } from "@mui/material";
import React from "react";

const Search = ({ handleSearchInput, handleSearchSubmit }) => {
    return (
        <div className="mb-10 flex justify-center items-center">
            <form onSubmit={handleSearchSubmit}>
                <input
                    className="border border-black w-1/2 p-2 rounded-xl me-4"
                    type="text"
                    placeholder="search"
                    required
                    onChange={handleSearchInput}
                />
                
                <button type="submit" className="p-2 bg-[#FFA500] text-white font-semibold rounded-lg">
                    search
                </button>
                <p className="font-bold">Admin mail: neephat.benazir@gmail.com <br/>
                    Admin Password: 12345678 <br/>
                    Coupon Code: 12345670 for 70% <br/>
                                123450 for 50% <br/>
                                1230 for 30%
                </p>
            </form>
        </div>
    );
};

export default Search;
