import React from 'react';

// ** components
import ItemVariants from './components/ItemVariants';
import ItemSlider from './components/ItemSlider';

const ItemDetail = (props) => {
  const { detailData } = props;
  return (
    <div className="flex gap-[50px] md:flex-row flex-col rounded-[5px]">
      <ItemSlider productMedia={detailData} />
      <ItemVariants productDetail={detailData} />
    </div>
  );
};

export default ItemDetail;
