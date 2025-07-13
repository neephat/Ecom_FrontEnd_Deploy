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

        {/* Search Button */}
        <button className="btn btn-ghost btn-circle ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;
