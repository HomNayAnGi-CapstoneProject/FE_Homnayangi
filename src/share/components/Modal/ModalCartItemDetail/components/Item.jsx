import React from 'react';
import Image from '../../../Image';

const Item = (props) => {
  return (
    <div className="w-full h-fit flex gap-4">
      <Image
        src={props.item?.image}
        alt=""
        className="object-cover w-[126px] h-[126px] border-[2px] border-[#B5B5B5] rounded-[5px]"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-medium line-clamp-2 text-black">{props.item?.ingredientName}</p>
          <p className="text-[#897D7D] text-[14px]">Số lượng: {props.item?.quantity}</p>
        </div>
        <p className="text-[18px] text-redError font-bold">{Intl.NumberFormat().format(props.item?.price)}đ</p>
      </div>
    </div>
  );
};

export default Item;
