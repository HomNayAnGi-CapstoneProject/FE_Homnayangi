import { useState, useEffect } from 'react';
import styles from '../../style';

// ** components
import ItemDetail from './components/ItemDetail/ItemDetail';
import RelatedItem from './components/RelatedItem/RelatedItem';
import RelatedRecipe from './components/RelatedRecipe/RelatedRecipe';

const ShopItemDetail = () => {
  return (
    <div className={`md:px-[90px] ${styles.flexCenter} py-16`}>
      <div className={`${styles.container} xx4lg:px-10`}>
        {/* Item details */}
        <div className="mb-5">
          <ItemDetail />
        </div>
        {/* Related recipe */}
        <div className="mb-5">
          <RelatedRecipe />
        </div>
        {/* related item */}
        <div className="mb-5">
          <RelatedItem />
        </div>
      </div>
    </div>
  );
};

export default ShopItemDetail;
