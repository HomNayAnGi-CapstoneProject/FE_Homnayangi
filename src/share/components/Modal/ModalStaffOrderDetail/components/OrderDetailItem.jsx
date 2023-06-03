import React from 'react';
import Image from '../../../Image';

const OrderDetailItem = (props) => {
  const { data } = props;

  return (
    <div className="font-maven gap-4 py-5 max-h-[275px] scroll-bar overflow-x-hidden overflow-y-scroll">
      {/* recipeDetails */}
      {data?.orderDetailRecipes?.map((item, i) => (
        <div key={item.packageId} className="flex w-full mt-5 first:mt-0">
          <div className="md:w-1/2 flex gap-3">
            <Image alt="" className={'object-cover rounded-[5px] w-[80px] h-[80px]'} src={item?.packageImage} />
            <div className="flex-1">
              <p className="text-[#897D7D] text-[14px]">{item?.packageName}</p>
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col items-end">
            <div className="w-fit text-[14px]">
              <p>
                Đơn giá:{' '}
                <span className="font-semibold">
                  {Intl.NumberFormat().format(data?.isCooked ? item?.packagePrice : item?.packagePrice)}đ
                </span>
              </p>
              <p>
                Số lượng: <span className="font-semibold">{item?.packageQuantity}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
      {/* ingredientDetail */}
      {data?.orderDetailIngredients?.length > 0 &&
        data?.orderDetailIngredients?.map((item) => (
          <div key={item.ingredientId} className="flex w-full mt-5 first:mt-0">
            <div className="md:w-1/2 flex gap-3">
              <Image alt="" className={'object-cover rounded-[5px] w-[80px] h-[80px]'} src={item?.ingredientImage} />
              <div className="flex-1">
                <p className="text-[#897D7D] text-[14px]">{item?.ingredientName}</p>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col items-end">
              <div className="w-fit text-[14px]">
                <p>
                  Đơn giá: <span className="font-semibold">{Intl.NumberFormat().format(item?.price)}đ</span>
                </p>
                <p>
                  Số lượng: <span className="font-semibold">{item?.quantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OrderDetailItem;
