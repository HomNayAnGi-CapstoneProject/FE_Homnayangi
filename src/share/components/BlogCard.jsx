import React from 'react';
import Image from '../../share/components/Image';
import generateSlug from '../../utils/generateSlug';

import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

//** Assets
import staticFood1 from '../../assets/images/staticFood1.png';
import eyes from '../../assets/images/eyes.png';
import heart from '../../assets/images/heart.png';
import heart_red from '../../assets/images/heart_red.png';
import calendar from '../../assets/ic_calendar_white.svg';

const BlogCard = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${data?.blogId}/${generateSlug(data.title)}`)}
      className="group w-full min-h-[385px]"
    >
      <div className="font-inter rounded-[10px] px-[8px] py-[10px] group-hover:bg-[#FFD8C7] cursor-pointer transition">
        <div className="relative">
          <div className="overflow-hidden border-[2px] border-[#B5B5B5] group-hover:border-white  rounded-[10px]">
            <Image
              alt={data?.title}
              src={data?.imageUrl}
              className={`object-cover group-hover:rotate-[3deg] group-hover:scale-[1.1] duration-[500ms] transition w-full rounded-[10px] h-[215px] `}
            />
          </div>
          {data?.isEvent && (
            <div className="absolute top-0 left-0 w-fit h-fit p-3  bg-gradient-to-r from-rose-400 to-red-500 rounded-tl-[10px] rounded-br-[10px] flex flex-col items-center justify-center">
              <p className="text-[12px] font-medium text-white uppercase">Bài viết Sự kiện</p>
              <div className="flex items-center gap-2 mt-1">
                <img src={calendar} className="w-[16px] h-[16px] object-contain" />
                <div className="flex items-center gap-1">
                  <p className="text-white text-[12px] font-semibold">
                    {new Date(new Date(data?.createdDate).setSeconds(0)).toLocaleDateString()}
                  </p>
                  <p className="text-white font-medium"> - </p>
                  <p className="text-white text-[12px] font-semibold">
                    {new Date(new Date(data?.eventExpiredDate).setSeconds(0)).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="text-[18px] font-medium mt-[10px] text-black line-clamp-1">{data?.title}</p>
        <div
          dangerouslySetInnerHTML={{ __html: data?.description }}
          className="text-black mt-[10px] line-clamp-2"
        ></div>
        <div className="flex w-full mt-[20px] justify-between">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${heart})` }} />
              <p className="text-black text-[14px]">{!data?.reaction ? 0 : data?.reaction}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${eyes})` }} />
              <p className="text-black text-[14px]">{!data?.view ? 0 : data?.view}</p>
            </div>
          </div>

          <div>
            <p className="text-[#585858] text-[14px]"> {moment(data?.createdDate).startOf('hour').fromNow()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
