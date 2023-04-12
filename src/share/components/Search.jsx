import { useState, useEffect } from 'react';

const Search = (props) => {
  const { setSearchhInput, placeholder } = props;

  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-[#b5b5b5] dark:text-[#b5b5b5] absolute top-[50%] translate-y-[-50%] left-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <input
        onChange={(e) => setSearchhInput(e.target.value)}
        type="text"
        id="search"
        className="block w-full sm:w-[312px] p-[8px] pl-[40px] text-subText sm:text-md  border border-[#b5b5b5] rounded-[10px] bg-[#ffffff] focus:outline-primary "
        placeholder={placeholder || 'Search...'}
      />
    </div>
  );
};

export default Search;
