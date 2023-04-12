import { useState, useEffect } from 'react';
import Item from './Item';
import useWindowSize from '../../../../share/hooks/useWindowSize';
import {
  setOpenCategoryShopModal,
  setActiveShopCate,
  setSubCategoryList,
} from '../../../../redux/actionSlice/globalSlice';

import { ic_close_modal } from '../../../../assets';

// ** redux
import { useDispatch, useSelector } from 'react-redux';

const CategoryList = (props) => {
  const { list, setCategoryChange } = props;
  // ** Const
  // const [activeCate, setActiveShopCate] = useState(0);
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.global);

  //** close modal when screen size change */
  useEffect(() => {
    if (width > 768) {
      handleCloseModal();
    }
  }, [width]);

  // ** Funct
  const handleCloseModal = () => {
    dispatch(setOpenCategoryShopModal(false));
  };

  const handleSelectCate = (id) => {
    if (id !== store.activeShopCate) {
      // console.log('category ID:', id);
      setCategoryChange(id);
    }
    dispatch(setActiveShopCate(id));
    dispatch(setOpenCategoryShopModal(false));
    // if (id !== 0) {
    //   dispatch(setSubCategoryList(list.find((item) => item.categoryId == id).subCategories));
    // } else {
    //   dispatch(setSubCategoryList([]));
    // }
  };

  return (
    <div className="sm:sticky top-[100px]">
      <div
        className={`${
          store.openCategoryShopModal ? 'fixed top-0 bottom-0 left-0 z-[9999] bg-white w-full px-[15px]' : ''
        }`}
      >
        {store.openCategoryShopModal && (
          <div className="flex items-center justify-between my-[20px] pb-5 border-b border-b-[#585858]">
            <p className="text-black font-semibold text-[20px]">Danh mục</p>
            <div
              onClick={() => handleCloseModal()}
              className="cursor-pointer bg-cover w-[26px] h-[26px]"
              style={{ backgroundImage: `url(${ic_close_modal})` }}
            />
          </div>
        )}
        <div className="mb-[10px]" onClick={() => handleSelectCate(0)}>
          <Item name={'Tất cả'} id={0} activeCate={store.activeShopCate} />
        </div>
        {list.length > 0 &&
          list.map((item) => (
            <div key={item.typeId} className="mb-[10px] last:mb-0" onClick={() => handleSelectCate(item.typeId)}>
              <Item name={item.typeName} id={item.typeId} activeCate={store.activeShopCate} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
