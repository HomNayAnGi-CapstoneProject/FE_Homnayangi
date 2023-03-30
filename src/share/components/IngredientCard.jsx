import React from 'react';
import Image from '../../share/components/Image';
import generateSlug from '../../utils/generateSlug';

import staticIngredient from '../../assets/images/staticIngredient.png';
import { ic_add_to_cart_white } from '../../assets';

// ** third party
import { useNavigate } from 'react-router-dom';

const IngredientCard = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/shop/${data.ingredientId}/${generateSlug(data.name)}`)}
      // onClick={() => navigate(`/shop/dc0a73f3-be27-49ea-bc0b-0022c5404972/Mắm tôm`)}
      className="group w-full min-h-[351px]"
    >
      <div className="font-inter rounded-[10px] px-[8px] py-[10px] group-hover:bg-[#FFD8C7] cursor-pointer transition">
        <div className="overflow-hidden border-[2px] border-[#B5B5B5] group-hover:border-white  rounded-[10px]">
          <Image
            alt="ingredient_cover"
            src={data?.picture || staticIngredient}
            className={`object-cover w-full rounded-[10px] h-[215px] `}
          />
        </div>
        <p className="text-[18px] font-medium mt-[10px] text-black">{data?.name}</p>
        <p className="text-[#585858] text-[14px] mt-[5px] uppercase">{data?.typeName}</p>
        <div className="flex w-full mt-[20px] justify-between items-center">
          <p className="text-redError font-bold">{Intl.NumberFormat().format(data?.price)}đ</p>

          {/* <div>
            <button className="bg-redError py-2 px-4 rounded-[5px] text-white font-medium">
              <img alt="" src={ic_add_to_cart_white} className="object-cover w-[20px] h-[20px]" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
