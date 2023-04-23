import { useEffect, useState } from 'react';
import instances from '../../utils/plugin/axios';

// ** components
import Banner from '../../share/components/Banner';
import IngredientSection from './components/IngredientSection/IngredientSection';
import BlogSection from './components/BlogSection/BlogSection';
import Search from '../../share/components/Search';
import { Modal } from '@mui/material';
import CategoryList from './components/Category/CategoryList';
import Filter from './components/Filter/Filter';

// ** Assets
import styles from '../../style';
import { ic_category_white } from '../../assets';

import { setOpenCategoryShopModal } from '../../redux/actionSlice/globalSlice';
import { useDispatch, useSelector } from 'react-redux';

const Shop = ({ title }) => {
  const store = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [searchInput, setSearchhInput] = useState(null);
  const [categoryChange, setCategoryChange] = useState(0);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // ** call api get category list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/types/drop-down');
      // console.log(res.data);
      setCategoryList(res.data);
    };
    fetch();
  }, []);

  // ** Functs
  const handleOpenMenu = () => {
    dispatch(setOpenCategoryShopModal(true));
  };

  return (
    <div>
      {store.openCategoryShopModal && (
        <Modal open={store.openCategoryShopModal} onClose={() => setOpenCategoryShopModal(false)}>
          <div>
            <CategoryList
              // setSubCategoryList={setSubCategoryList}
              setCategoryChange={setCategoryChange}
              list={categoryList}
            />
          </div>
        </Modal>
      )}
      <Banner />
      <div className={`${styles.paddingX} ${styles.flexCenter} py-[50px]`}>
        <div className={`${styles.container}`}>
          <div className="flex gap-[60px]">
            <div className="sm:block hidden w-[272px]">
              <p className="text-[25px] font-semibold text-black">Danh mục</p>
            </div>

            <div className="flex-1 calc-width">
              <div className="sm:flex justify-between">
                <div className="sm:mb-0 mb-4">
                  <Search
                    value={searchInput !== null ? searchInput : ''}
                    placeholder="Tìm sản phẩm..."
                    setSearchhInput={setSearchhInput}
                  />
                </div>
                <div className="sm:flex-none flex flex-wrap gap-4 justify-between">
                  {/* <Filter setSortValue={setSortValue} /> */}
                  <div className="sm:hidden block">
                    <div className="flex gap-3 items-center">
                      <p className="text-black font-medium">Danh mục</p>
                      <button onClick={() => handleOpenMenu()} className="bg-primary rounded-[10px] px-3 py-1">
                        <img alt="" className="object-cover w-[20px] h-[20px]" src={ic_category_white} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[60px]">
            <div className="sm:block hidden w-[272px] mt-[15px] pt-[15px] border-t-[2px] border-t-[#D2D2D2]">
              <CategoryList
                // setSubCategoryList={setSubCategoryList}
                setCategoryChange={setCategoryChange}
                list={categoryList}
              />
            </div>
            <div className="main-content flex-1 calc-width mt-[15px] pt-[15px] border-t-[2px] border-t-[#D2D2D2]">
              <IngredientSection searchInput={searchInput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
