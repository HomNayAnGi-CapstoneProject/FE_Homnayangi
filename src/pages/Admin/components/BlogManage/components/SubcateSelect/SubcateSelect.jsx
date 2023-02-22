import { useState, useEffect } from 'react';

import { ic_delete_red, ic_delete } from '../../../../../../assets';

import { useParams } from 'react-router-dom';

// ** Redux
import { setContentBlog, getCurrentContent } from '../../../../../../redux/actionSlice/managementSlice';
import { useDispatch, useSelector } from 'react-redux';

import OutsideClickHandler from 'react-outside-click-handler';
import Chip from '@mui/material/Chip';

// ** data
const tagList = [
  { id: 123134, tagName: 'Món chay' },
  { id: 123135, tagName: 'Đồ chua' },
  { id: 123136, tagName: 'Bánh kem' },
  { id: 123137, tagName: 'Bánh bò' },
  { id: 123138, tagName: 'Bánh pía' },
  { id: 123139, tagName: 'Món nước' },
];

const Tag = (props) => {
  return (
    <div className="rounded-full flex items-center gap-1 w-max bg-[#EAD35B] border-[2px] border-[#8F8137] border-solid xs:px-[10px] px-[2px] py-[0px] text-[#525252]">
      {props?.name || 'Tag_name'}
      <div className="p-2 rounded-full bg-gray-400">
        <img className="w-[10px] cursor-pointer" src={ic_delete} />
      </div>
    </div>
  );
};

const Item = (props) => {
  return <div className="text-black py-2 px-4 hover:bg-secondary cursor-pointer">{props?.name || 'Item'}</div>;
};

const SubcateSelect = (props) => {
  // ** Const
  const params = useParams();
  const store = useSelector((state) => state.management);
  const { maxLenght, data, getValue, contentBlog } = props;
  const [openSubCateList, setOpenSubCateList] = useState(false);
  // const [dataList, setDataList] = useState(contentBlog?.subCateDataList || store?.blogSubCategory);
  // const [selectedList, setSelectedList] = useState(contentBlog?.subCategory || []);
  const [dataList, setDataList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store?.blogSubCategory !== undefined) {
      setSelectedList([]);
      if (store?.blogSubCategory?.length > 0) {
        setDataList(store?.blogSubCategory);
      }
    } else {
      setDataList([]);
    }
  }, [store?.blogSubCategory]);

  //** get data to edit */
  useEffect(() => {
    if (store?.blogContent?.subCategory) {
      setSelectedList(store?.blogContent?.subCategory);
    }
  }, [store?.blogContent?.subCategory]);

  // ** Funct
  const handleSeletTag = (item) => {
    if (selectedList?.length < maxLenght) {
      setSelectedList((current) => [...current, item]);
      setDataList((current) => current.filter((tag) => tag.subCategoryId !== item.subCategoryId));
    }
  };

  const handleDelete = (item) => {
    setSelectedList((current) => current.filter((tag) => tag.subCategoryId !== item.subCategoryId));
    setDataList((current) => [...current, item]);
  };

  useEffect(() => {
    console.log(selectedList);
    if (selectedList?.length > 0) {
      // console.log('???');
      dispatch(setContentBlog({ subCategory: selectedList }));
      dispatch(setContentBlog({ subCateDataList: dataList }));
    } else {
      if (params.blogId) {
        dispatch(setContentBlog({ subCategory: selectedList }));
      }
    }
  }, [selectedList]);

  return (
    <div className="font-inter w-full relative">
      <div onClick={() => setOpenSubCateList(true)} className="select-none">
        {selectedList && selectedList?.length > 0 ? (
          <div className="flex items-center gap-2">
            {selectedList?.map((item) => (
              <div key={item.subCategoryId}>
                <Chip
                  sx={{ backgroundColor: '#EAD35B', borderColor: '#8F8137', color: '#525252' }}
                  label={item.name}
                  variant="outlined"
                  onDelete={() => handleDelete(item)}
                />
              </div>
            ))}
            <p className="text-[#a1a1a1]">
              {selectedList?.length == maxLenght ? (
                <span className="text-redError">Đã chọn tối đa</span>
              ) : (
                'Chọn thêm...'
              )}
            </p>
          </div>
        ) : (
          <p className="text-[#a1a1a1]">Chọn danh mục phụ (tối đa {maxLenght})</p>
        )}
      </div>
      {openSubCateList && (
        <OutsideClickHandler onOutsideClick={() => setOpenSubCateList(false)}>
          <div className="absolute top-[35px] z-[50] max-h-[250px] w-[300px] bg-white rounded-[5px] shadow-md overflow-y-scroll scroll-bar">
            {dataList?.length > 0 ? (
              dataList?.map((item) => (
                <div key={item.subCategoryId} onClick={() => handleSeletTag(item)}>
                  <Item name={item.name} />
                </div>
              ))
            ) : (
              <p className="py-1 italic px-2">
                {dataList?.length == 0 && selectedList?.length > 0 ? 'Đã chọn tối đa' : 'Hãy chọn danh mục chính trước'}
              </p>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default SubcateSelect;
