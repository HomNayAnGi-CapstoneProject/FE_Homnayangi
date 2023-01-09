import { useState, useEffect } from 'react';
import instances from '../../../utils/plugin/axios';

import ic_loading from '../../../assets/images/sand-clock.png';

import useDebounce from '../../../share/hooks/useDebounce';

// ** items comp
const ResultSearch = (props) => {
  return (
    <div className="flex items-center justify-between px-[20px] py-1 hover:bg-[#FFD8C7] transition cursor-pointer">
      <p className="line-clamp-1">{props?.name}</p>
      <div>
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
    </div>
  );
};

const HomeSearch = () => {
  // ** Const
  const [searchInput, setSearchhInput] = useState(null);
  const [searchResult, setSearchResult] = useState('');
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(searchInput, 600);

  // ** call api
  useEffect(() => {
    if (debounced !== '') {
      if (!debounced?.trim()) {
        return;
      }

      setLoading(true);
      setSearchResult('');

      const fetch = async () => {
        setSearchResult('');
        const res = await instances.get('/home/blogs/live-searching', {
          params: {
            title: debounced,
          },
        });
        setLoading(false);
        // console.log(res.data.result);
        setSearchResult(res.data.result);
      };
      fetch();

      // console.log(searchInput);
    }
  }, [debounced]);

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
          {loading == false ? (
            <>
              {searchResult !== '' ? (
                searchResult?.slice(0, 4)?.map((item) => (
                  <div key={item.blogId}>
                    <ResultSearch name={item.title} />
                  </div>
                ))
              ) : (
                <div className="text-black px-[20px] text-[14px]">Không tìm thấy kết quả!</div>
              )}
            </>
          ) : (
            <div className="px-[20px] flex justify-center">
              <div
                className="w-[20px] h-[20px] bg-cover animate-spin"
                style={{ backgroundImage: `url(${ic_loading})` }}
              />
            </div>
          )}
        </div>
        {searchResult !== '' && <p className="text-[14px] text-[#878787] px-[20px] py-2 cursor-pointer">Xem thêm...</p>}
      </div>
    </div>
  );
};

export default HomeSearch;
