import React from 'react';

//** Assets
import staticFood1 from '../../assets/images/staticFood1.png';
import eyes from '../../assets/images/eyes.png';
import heart from '../../assets/images/heart.png';
import heart_red from '../../assets/images/heart_red.png';

const BlogCard = (pros) => {
  return (
    <div className="group w-full min-h-[385px]">
      <div className="font-inter  rounded-[10px] px-[8px] py-[10px] group-hover:bg-[#FFD8C7] cursor-pointer transition">
        <div className="overflow-hidden border-[2px] border-[#B5B5B5] group-hover:border-white  rounded-[10px]">
          <img
            loading="lazy"
            alt="blog_cover"
            src={staticFood1}
            className={`object-cover group-hover:rotate-[3deg] group-hover:scale-[1.1] duration-[500ms] transition w-full rounded-[10px] h-[215px] `}
          />
        </div>
        <p className="text-[18px] font-medium mt-[10px] text-black">Thịt kho tiêu</p>
        <p className="text-black mt-[10px] line-clamp-2">
          Cá lóc kho tộ luôn là món ăn quen thuộc và hấp dẫn trong bữa cơm và hấp dẫn trong bữa cơmvà hấp dẫn trong bữa
          cơm
        </p>
        <div className="flex w-full mt-[20px] justify-between">
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
            <p className="text-[#585858] text-[14px]">1 ngày trước</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
