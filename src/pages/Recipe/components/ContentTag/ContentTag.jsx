import { useState, useEffect } from 'react';
import instances from '../../../../utils/plugin/axios';
import MultiSelect from '../MultiSelectTags/MultiSelect';
import BlogCard from '../../../../share/components/BlogCard';
import SeeMore from '../../../../share/components/SeeMore';

import useDebounce from '../../../../share/hooks/useDebounce';

import { useSelector } from 'react-redux';

import ic_loading from '../../../../assets/images/sand-clock.png';

const ContentTag = (props) => {
  const { tags, subCategoryList, sortValue, searchInput, isEvent } = props;

  //** const */
  const store = useSelector((state) => state.global);
  const [blogDataList, setBlogDataList] = useState([]);
  const [subCateId, setSubCateId] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(9);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSizeIns, setPageSizeIns] = useState(0);
  const debounced = useDebounce(searchInput, 600);

  // ** reset page size
  useEffect(() => {
    setCurrentPageSize(9);
  }, [store.subCategoryList]);

  // ** call api
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await instances.get('/blogs/category/sub-categories', {
          params: {
            SubCateIds: store.subCategoryList.length > 0 ? (subCateId == 0 ? null : subCateId) : null,
            PageSize: currentPageSize,
            PageNumber: null,
            SearchString: debounced?.trim(),
            sort: sortValue,
            sortDesc: null,
            IsEvent: isEvent,
          },
        });
        // console.log('run');
        setBlogDataList(res.data.resource);
        setTotalCount(res.data.totalCount);
      } catch (error) {
        setBlogDataList([]);
      }
    };
    fetch();
  }, [subCateId, store.subCategoryList, sortValue, pageSizeIns, currentPageSize, debounced, isEvent]);

  return (
    <div>
      <div className="mb-[20px]">
        {store.subCategoryList.length > 0 && <MultiSelect setSubCateId={setSubCateId} tags={store.subCategoryList} />}
      </div>
      <div className="grid sm:grid-cols-2 xxlg:grid-cols-3 xl:grid-cols-3 gap-[6px]">
        {blogDataList?.length > 0 &&
          blogDataList.map((item) => (
            <div key={item.blogId}>
              <BlogCard data={item} />
            </div>
          ))}
      </div>
      {!blogDataList?.length > 0 && (
        <div className="text-center flex justify-center">
          <div className="w-[30px] h-[30px] bg-cover animate-spin" style={{ backgroundImage: `url(${ic_loading})` }} />
        </div>
      )}
      {currentPageSize !== totalCount && blogDataList?.length > 8 && (
        <SeeMore
          increaseSize={6}
          currentSize={currentPageSize}
          setPageSizeIns={setPageSizeIns}
          setCurrentPageSize={setCurrentPageSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

export default ContentTag;
