import React from 'react';

// ** components
import ItemVariants from './components/ItemVariants';
import ItemSlider from './components/ItemSlider';

const ItemDetail = (props) => {
  const { detailData } = props;
  return (
    <div className="flex gap-[60px] md:flex-row flex-col rounded-[5px] py-3 my-8">
      <ItemSlider productMedia={detailData?.productMedia} />
      <ItemVariants productDetail={detailData?.productDetail} listAgencies={detailData?.listAgencies} />
    </div>
  );
};

export default ItemDetail;
