import React from 'react';
import Image from '../../share/components/Image';

import staticIngredient from '../../assets/images/staticIngredient.png';
import { ic_add_to_cart_white } from '../../assets';

const IngredientCard = () => {
  return (
    <div className="group w-full min-h-[351px]">
      <div className="font-inter rounded-[10px] px-[8px] py-[10px] group-hover:bg-[#FFD8C7] cursor-pointer transition">
        <div className="overflow-hidden border-[2px] border-[#B5B5B5] group-hover:border-white  rounded-[10px]">
          <Image
            alt="ingredient_cover"
            src={staticIngredient}
            className={`object-cover w-full rounded-[10px] h-[215px] `}
          />
        </div>
        <p className="text-[18px] font-medium mt-[10px] text-black">Thịt ba rọi</p>
        <p className="text-[#585858] text-[14px] mt-[10px] uppercase">Đồ tươi sống</p>
        <div className="flex w-full mt-[20px] justify-between items-center">
          <p className="text-redError font-bold">{Intl.NumberFormat().format(43258)}đ</p>

          <div>
            <button className="bg-redError py-2 px-4 rounded-[5px] text-white font-medium">
              <img alt="" src={ic_add_to_cart_white} className="object-cover w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
