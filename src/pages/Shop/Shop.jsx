import { useEffect } from 'react';

// ** components
import Banner from '../../share/components/Banner';
import IngredientSection from './components/IngredientSection/IngredientSection';
import BlogSection from './components/BlogSection/BlogSection';
import Search from '../../share/components/Search';

// ** Assets
import styles from '../../style';

const Shop = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Banner />
      <div className={`${styles.paddingX} ${styles.flexCenter} py-[50px]`}>
        <div className={`${styles.container}`}>
          <div className="pb-4 border-b border-b-[#d2d2d2]">
            <Search placeholder="Tìm kiếm..." />
          </div>
          <div className="mt-5 mb-8">
            <IngredientSection />
          </div>
          <div className="my-5">
            <BlogSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
