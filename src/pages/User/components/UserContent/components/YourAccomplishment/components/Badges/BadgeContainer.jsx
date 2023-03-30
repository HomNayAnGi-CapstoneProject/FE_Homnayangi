import { useState, useEffect } from 'react';

// ** components
import BadgeShowCase from './components/BadgeShowCase';

const BadgeContainer = () => {
  return (
    <div className="font-inter w-full h-fit bg-white rounded-[5px] py-5 px-6 mb-5">
      {/* header */}
      <div className="pb-[10px] border-b border-b-[#d1d1d1]">
        <p className="text-black text-[18px] font-medium">Danh Hiệu Của Tôi</p>
        <p className="text-[14px] text-[#929292] italic">
          (danh hiệu đạt được từ quá trình mua hàng, đăng thành quả cá nhân. Danh hiệu càng nhiều phần thưởng càng
          nhiều!)
        </p>
      </div>
      {/* content */}
      <div className="mt-5">
        <BadgeShowCase />
      </div>
    </div>
  );
};

export default BadgeContainer;
