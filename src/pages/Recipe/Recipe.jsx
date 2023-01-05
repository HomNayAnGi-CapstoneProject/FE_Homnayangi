import { useState, useEffect } from 'react';
import BlogCard from '../../share/components/BlogCard';
import MultiSelect from './components/MultiSelectTags/MultiSelect';
import Banner from '../../share/components/Banner';
import CategoryList from './components/Category/CategoryList';
import Filter from './components/Filter/Filter';
import Search from '../../share/components/Search';
import ContentTag from './components/ContentTag/ContentTag';
import ContentCombo from './components/ContentCombo/ContentCombo';

// ** Assets
import styles from '../../style';

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

const Recipe = () => {
  // ** Const
  const [categoryChange, setCategoryChange] = useState(0);

  useEffect(() => {
    console.log(categoryChange);
  }, [categoryChange]);

  return (
    <div>
      <Banner />
      <div className={`${styles.paddingX} ${styles.flexCenter} py-[50px]`}>
        <div className={`${styles.container}`}>
          <div className="flex gap-[60px]">
            <div className="w-[272px]">
              <p className="text-[25px] font-semibold text-black">Danh mục</p>
            </div>

            <div className="flex-1 calc-width">
              <div className="flex justify-between">
                <div>
                  <Search placeholder="Tìm công thức..." />
                </div>
                <div>
                  <Filter />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-[60px]">
            <div className="w-[272px] mt-[15px] pt-[15px] border-t-[2px] border-t-[#D2D2D2]">
              <CategoryList setCategoryChange={setCategoryChange} list={CategoriesList} />
            </div>

            <div className="main-content flex-1 calc-width mt-[15px] pt-[15px] border-t-[2px] border-t-[#D2D2D2]">
              {(categoryChange == 212157 ||
                categoryChange == 212158 ||
                categoryChange == 212159 ||
                categoryChange == 212160 ||
                categoryChange == 212161) && <ContentTag tags={TagsList} />}

              {(categoryChange == 212156 || categoryChange == 212155) && <ContentCombo />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
