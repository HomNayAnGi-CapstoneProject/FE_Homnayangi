import { useState, useEffect } from 'react';
import styles from '../../style';
import instances from '../../utils/plugin/axios';

// ** components
import ItemDetail from './components/ItemDetail/ItemDetail';
import RelatedItem from './components/RelatedItem/RelatedItem';
import RelatedRecipe from './components/RelatedRecipe/RelatedRecipe';

// ** third party
import { useParams } from 'react-router-dom';

const ShopItemDetail = () => {
  // ** const
  const params = useParams();
  const [detailData, setDetailData] = useState();

  // ** get data
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/ingredients/${params?.id}`);
      setDetailData(res.data.result);
    };
    fetch();
  }, [params?.id]);

  return (
    <div className={`md:px-[90px] ${styles.flexCenter} py-16`}>
      <div className={`${styles.container} xx4lg:px-10`}>
        {/* Item details */}
        <div className="mb-5">
          <ItemDetail detailData={detailData} />
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
