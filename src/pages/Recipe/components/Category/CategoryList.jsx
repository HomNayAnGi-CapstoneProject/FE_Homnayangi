import { useState, useEffect } from 'react';
import Item from './Item';
import useWindowSize from '../../../../share/hooks/useWindowSize';
import { setOpenCategoryMenuModal, setActiveCate } from '../../../../redux/actionSlice/globalSlice';

import { ic_close_modal } from '../../../../assets';

// ** redux
import { useDispatch, useSelector } from 'react-redux';

const CategoryList = (props) => {
  // ** Const
  // const [activeCate, setActiveCate] = useState(0);
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
    dispatch(setOpenCategoryMenuModal(false));
  };

  const handleSelectCate = (id) => {
    if (id !== store.activeCate) {
      // console.log('category ID:', id);
      props.setCategoryChange(id);
    }
    dispatch(setActiveCate(id));
    dispatch(setOpenCategoryMenuModal(false));
    // props?.setIsActive((prev) => !prev);
  };

  return (
    <div className="sm:sticky top-[100px]">
      <div
        className={`${
          store.openCategoryMenuModal ? 'fixed top-0 bottom-0 left-0 z-[9999] bg-white w-full px-[15px]' : ''
        }`}
      >
        {store.openCategoryMenuModal && (
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
          <Item name={'Tất cả'} id={0} activeCate={store.activeCate} />
        </div>
        {props?.list.length > 0 &&
          props?.list.map((item) => (
            <div key={item.id} className="mb-[10px] last:mb-0" onClick={() => handleSelectCate(item.id)}>
              <Item name={item.name} id={item.id} activeCate={store.activeCate} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
