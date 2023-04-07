import React from 'react';
import moment from 'moment/moment';
import Image from '../../../../../../../../share/components/Image';

import default_user from '../../../../../../../../assets/images/default_user.png';
import heart from '../../../../../../../../assets/images/heart.png';
import heart_red from '../../../../../../../../assets/images/heart_red.png';

const Item = (props) => {
  // ** const
  const { data } = props;
  return (
    <div className="flex gap-5 py-3">
      <img alt="" className="rounded-full w-[40px] h-[40px] object-cover" src={data?.avatar || default_user} />
      <div className="w-full">
        <div className="flex items-center gap-2">
          <p className="text-black font-semibold">{data?.authorFullName}</p>
          <p className="text-[#A9A8A8] text-[14px]">{moment(data?.createdDate).calendar()}</p>
        </div>
        {/* content */}
        <div className="w-[350px] mt-2">
          <textarea
            value={data?.content}
            disabled={true}
            rows="1"
            // className="rounded-[5px] border border-[#C5C5C5] px-3 py-2 w-full"
            className={`p-2.5 w-full text-gray-900 bg-white rounded border border-gray-400 `}
          ></textarea>
        </div>
        {/* preview images */}
        <div className="flex flex-wrap gap-2 mt-3">
          {data?.listImage &&
            data?.listImage.map((item, i) => (
              <Image key={i} className="w-[80px] h-[80px] object-cover rounded" src={item} alt="default-img_list" />
            ))}
        </div>
        {/* preview videos */}
        <div className="flex flex-wrap gap-2 mt-3">
          {data?.listVideo &&
            data?.listVideo.map((item, i) => (
              <video
                controls
                key={i}
                className="w-[220px] h-[120px] object-cover rounded"
                src={item}
                alt="default-img_list"
              />
            ))}
        </div>
        {/* reaction */}
        <div className="mt-3 flex gap-2 items-center">
          <img alt="" className="object-contain w-[20px] h-[20px]" src={heart} />
          <p>{data?.reaction}</p>
        </div>
      </div>
    </div>
  );
};

export default Item;
