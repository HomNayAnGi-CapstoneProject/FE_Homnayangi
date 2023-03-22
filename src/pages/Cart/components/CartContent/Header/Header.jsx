import React from 'react';

const Header = () => {
  return (
    <div className="w-full bg-white rounded-[5px] px-[14px] py-[18px] flex items-center">
      <div className="font-medium text-black w-4/6 ">Sản phẩm/dịch vụ</div>
      <div className="font-medium text-black sm:flex hidden w-1/6 justify-center ">Số lượng</div>
      <div className="font-medium text-black sm:flex hidden w-1/6 justify-end ">Đơn giá</div>
      <div className="font-medium text-black sm:w-1/6 w-2/6 flex justify-end ">Tổng</div>
    </div>
  );
};

export default Header;
