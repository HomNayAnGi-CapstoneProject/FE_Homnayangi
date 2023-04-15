import React from 'react';
import VoucherShowCase from './components/VoucherShowCase';

const VouchersContainer = () => {
  return (
    <div className="font-inter w-full h-fit bg-white rounded-[5px] py-5 px-6 mb-5">
      {/* header */}
      <div className="pb-[10px] border-b border-b-[#d1d1d1]">
        <p className="text-black text-[18px] font-medium">Mã Giảm Giá Của Tôi</p>
        <p className="text-[14px] text-[#929292] italic">
          (mã giảm giá sẽ được trao tặng định kỳ khi bạn có được huy hiệu!)
        </p>
      </div>
      {/* content */}
      <div className="mt-5">
        <VoucherShowCase />
      </div>
    </div>
  );
};

export default VouchersContainer;
