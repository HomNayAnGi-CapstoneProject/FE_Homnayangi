import { useState, useEffect } from 'react';

import { ic_delete_red, ic_delete } from '../../../../../../assets';

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
  return <div className="text-black py-2 px-4 hover:bg-secondary cursor-pointer">{props?.tagName || 'Item'}</div>;
};

const SubcateSelect = (props) => {
  // ** Const
  const { maxLenght, data, getValue } = props;
  const [openSubCateList, setOpenSubCateList] = useState(false);
  const [dataList, setDataList] = useState(tagList);
  const [selectedList, setSelectedList] = useState([]);

  // ** Funct
  const handleSeletTag = (item) => {
    if (selectedList?.length < maxLenght) {
      setSelectedList((current) => [...current, item]);
      setDataList((current) => current.filter((tag) => tag.id !== item.id));
    }
  };

  const handleDelete = (item) => {
    setSelectedList((current) => current.filter((tag) => tag.id !== item.id));
    setDataList((current) => [...current, item]);
  };

  return (
    <div className="font-inter w-full relative">
      <div onClick={() => setOpenSubCateList(true)} className="select-none">
        {selectedList?.length > 0 ? (
          <div className="flex items-center gap-2">
            {selectedList?.map((item) => (
              <div key={item.id}>
                <Chip
                  sx={{ backgroundColor: '#EAD35B', borderColor: '#8F8137', color: '#525252' }}
                  label={item.tagName}
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
                <div key={item.id} onClick={() => handleSeletTag(item)}>
                  <Item tagName={item.tagName} />
                </div>
              ))
            ) : (
              <p className="py-1 italic px-2">Hãy chọn danh mục chính trước</p>
            )}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default SubcateSelect;
