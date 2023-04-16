import React from 'react';
import staticFood from '../../../assets/images/staticFood1.png';
import eyes from '../../../assets/images/eyes.png';
import heart from '../../../assets/images/heart.png';
import Image from '../../../share/components/Image';
import generateSlug from '../../../utils/generateSlug';

import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

const RelaBlogCard = (props) => {
  const { data } = props;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/recipe/${data?.blogId}/${generateSlug(data?.title)}`)}
      className="font-inter cursor-pointer group transition"
    >
      <div className="group-hover:bg-[#FFD8C7] p-2 rounded-[5px]">
        {/* <div
          className="w-full h-[194px] bg-cover bg-center border-[#B5B5B5] transition group-hover:border-white border-[2px] rounded-[5px]"
          style={{ backgroundImage: `url(${staticFood})` }}
        /> */}
        <Image
          src={data?.imageUrl}
          atl=""
          className="w-full h-[194px] object-cover bg-center border-[#B5B5B5] transition group-hover:border-white border-[2px] rounded-[5px]"
        />
        <p className="line-clamp-2 font-medium text-[18px] mt-[10px]">{data?.title}</p>
        <div className="flex justify-between mt-[15px]">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${heart})` }} />
              <p className="text-black text-[14px]">{data?.reaction}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-cover w-[20px] h-[20px]" style={{ backgroundImage: `url(${eyes})` }} />
              <p className="text-black text-[14px]">{data?.view}</p>
            </div>
          </div>

          <div>
            <p className="text-[#585858] text-[14px]">{moment(data?.createdDate).startOf('day').fromNow()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelaBlogCard;
