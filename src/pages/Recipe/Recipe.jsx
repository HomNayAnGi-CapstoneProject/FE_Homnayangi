import { useState, useEffect } from 'react';
import instances from '../../utils/plugin/axios';
import BlogCard from '../../share/components/BlogCard';
import MultiSelect from './components/MultiSelectTags/MultiSelect';
import Banner from '../../share/components/Banner';
import CategoryList from './components/Category/CategoryList';
import Filter from './components/Filter/Filter';
import Search from '../../share/components/Search';
import ContentTag from './components/ContentTag/ContentTag';
import ContentCombo from './components/ContentCombo/ContentCombo';
import Modal from '@mui/material/Modal';
import useDebounce from '../../share/hooks/useDebounce';

import { setOpenCategoryMenuModal } from '../../redux/actionSlice/globalSlice';
import { useDispatch, useSelector } from 'react-redux';

// ** Assets
import styles from '../../style';
import { ic_category_white } from '../../assets';

//** data */
const TagsList = [
  { id: 2123, name: 'Giảm cân' },
  { id: 2124, name: 'Tăng cân' },
  { id: 2125, name: 'Sức khỏe' },
  { id: 2126, name: 'Phái mạnh' },
  { id: 2127, name: 'Phái nữ' },
  { id: 2128, name: 'Trẻ em' },
  { id: 2129, name: 'Ăn chay' },
  { id: 2130, name: 'Trẻ em mang thai' },
];

const CategoriesList = [
  { id: 212155, name: 'Thực đơn hôm nay' },
  { id: 212156, name: 'Thực đơn giá rẻ' },
  { id: 212157, name: 'Loại nguyên liệu' },
  { id: 212158, name: 'Phong cách ăn uống' },
  { id: 212159, name: 'Mùa & Dịp lễ' },
  { id: 212160, name: 'Cách thực hiện' },
  { id: 212161, name: 'Đặc trưng vùng miền' },
];

const Recipe = ({ title }) => {
  // ** Const
  const dispatch = useDispatch();
  const store = useSelector((state) => state.global);
  const [categoryChange, setCategoryChange] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [sortValue, setSortValue] = useState(1);
  const [searchInput, setSearchhInput] = useState(null);

  useEffect(() => {
    document.title = title;
  }, [title]);

  // ** call api get category list
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/categories');
      // console.log(res.data.map((item) => item.subCategories));
      setCategoryList(res.data);
    };
    fetch();
  }, []);

  // ** Functs
  const handleOpenMenu = () => {
    dispatch(setOpenCategoryMenuModal(true));
  };

  return (
    <div>
      {store.openCategoryMenuModal && (
        <Modal open={store.openCategoryMenuModal} onClose={() => setOpenCategoryMenuModal(false)}>
          <div>
            <CategoryList
              setSubCategoryList={setSubCategoryList}
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
                  <Search placeholder="Tìm công thức..." setSearchhInput={setSearchhInput} />
                </div>
                <div className="sm:flex-none flex flex-wrap gap-4 justify-between">
                  <Filter setSortValue={setSortValue} />
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
                setSubCategoryList={setSubCategoryList}
                setCategoryChange={setCategoryChange}
                list={categoryList}
              />
            </div>

            <div className="main-content flex-1 calc-width mt-[15px] pt-[15px] border-t-[2px] border-t-[#D2D2D2]">
              {
                <ContentTag
                  subCategoryList={subCategoryList}
                  // subCateId={categoryChange}
                  sortValue={sortValue}
                  tags={TagsList}
                  searchInput={searchInput}
                />
              }

              {/* {(categoryChange == 212156 || categoryChange == 212155) && <ContentCombo />} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
