import React from 'react';
import staticFood from '../../../assets/images/staticFood1.png';
import eyes from '../../../assets/images/eyes.png';
import heart from '../../../assets/images/heart.png';

import moment from 'moment';

const RelaBlogCard = (props) => {
  return (
    <div className="font-inter cursor-pointer group transition">
      <div className="group-hover:bg-[#FFD8C7] p-2 rounded-[5px]">
        <div
          className="w-full h-[194px] bg-cover bg-center border-[#B5B5B5] transition group-hover:border-white border-[2px] rounded-[5px]"
          style={{ backgroundImage: `url(${staticFood})` }}
        />
        <p className="line-clamp-2 font-medium text-[18px] mt-[10px]">Ca loc kho lmao</p>
        <div className="flex justify-between mt-[15px]">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${heart})` }} />
              <p className="text-black text-[14px]">150</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${eyes})` }} />
              <p className="text-black text-[14px]">150</p>
            </div>
          </div>

          <div>
            <p className="text-[#585858] text-[14px]">{moment('2023-01-10T03:18:10.005Z').calendar()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaBlogCard;
