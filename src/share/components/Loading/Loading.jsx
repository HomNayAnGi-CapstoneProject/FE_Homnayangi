import React from 'react';
import Logo from '../../../assets/images/Logo.png';

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center">
      <div
        className="w-[80px] h-[84px] bg-contain bg-center cursor-pointer"
        style={{ backgroundImage: `url(${Logo})` }}
      />
      <p className="text-[18px] font-medium">Đang tải trang đợi xíu... 😘</p>
    </div>
  );
};

export default Loading;
