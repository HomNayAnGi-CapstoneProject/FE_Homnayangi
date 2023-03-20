import React from 'react';
import { ic_payment_black } from '../../../assets';

const Payments = () => {
  return (
    <div className="font-inter w-full bg-white rounded-[5px] px-[14px] py-2">
      {/* header */}
      <div className="pb-2 border-b flex items-center gap-2">
        <img alt="" src={ic_payment_black} className="object-contain w-[24px] h-[24px]" />
        <p className="uppercase text-black font-medium text-[18px]">Phương thức thanh toán</p>
      </div>
      {/* body */}
      <div></div>
    </div>
  );
};

export default Payments;
