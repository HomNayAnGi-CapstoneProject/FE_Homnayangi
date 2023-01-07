import { useState } from 'react';

// ** items comp
const ResultSearch = (props) => {
  return (
    <div className="flex items-center justify-between px-[20px] py-1 hover:bg-[#FFD8C7] transition cursor-pointer">
      <p>{props?.name}</p>
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-black dark:text-black"
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
    </div>
  );
};

const HomeSearch = () => {
  // ** Const
  const [searchInput, setSearchhInput] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div className="relative">
      <input
        onChange={(e) => setSearchhInput(e.target.value)}
        type="text"
        className="block w-full p-[12px] pl-[23px] text-subText sm:text-md  border border-primary rounded-full bg-[#f0f0f0] focus:outline-primary "
        placeholder="Thịt heo..."
      />
      <button
        onClick={() => {
          if (searchInput !== null && searchInput !== '') {
            console.log(searchInput);
          }
        }}
        className="hover:bg-primaryHover transition flex items-center gap-2 text-white absolute bg-primary rounded-full right-1 bottom-1 font-medium px-4 py-[8.8px]"
      >
        Tìm kiếm
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-white dark:text-white"
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
      </button>

      <div
        className={`${
          searchInput?.length > 0 ? 'block' : 'hidden'
        } absolute top-14 w-full bg-white z-[999] rounded-[5px] drop-shadow-xl py-[10px]`}
      >
        <div>
          <ResultSearch name="Thit kho tieu" />
          <ResultSearch name="Thit kho tieu" />
          <ResultSearch name="Thit kho tieu" />
        </div>
        <p className="text-[14px] text-[#878787] px-[20px] py-2 cursor-pointer">Xem thêm...</p>
      </div>
    </div>
  );
};

export default HomeSearch;
