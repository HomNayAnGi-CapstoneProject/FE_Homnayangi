import React from 'react';
import Image from '../../../../../../../../share/components/Image';
import { ic_user_gray, ic_phone_gray, ic_location_gray, ic_time_gray } from '../../../../../../../../assets';

import moment from 'moment/moment';

const Item = (props) => {
  const { data } = props;
  return (
    <div className="md:flex mt-5">
      {/* thong tin don hang */}
      <div className="md:w-2/4 max-h-[180px] scroll-bar overflow-y-scroll">
        {data?.orders?.map((item, i) => (
          <div key={i} className="flex w-full mt-5 first:mt-0">
            <div className="md:w-1/2 flex gap-3">
              <Image alt="" className={'object-cover rounded-[5px] w-[80px] h-[80px]'} src={item?.img} />
              <div>
                <p className="line-clamp-2 text-black">{item?.name}</p>
                <p className="text-[#897D7D] text-[14px]">{item?.unit}</p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <p>
                {Intl.NumberFormat().format(item?.price)} x{item?.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* thong tin nguoi nhan */}
      <div className="md:w-1/4 flex flex-col">
        <p className="font-medium text-black my-4 md:hidden block">Thông tin người nhận</p>
        <div className="flex flex-col md:bg-white bg-[#FDE9E0] md:p-0 p-3 rounded-[5px]">
          {/* customer name */}
          <div className="flex gap-2">
            <div className="md:w-1/2  flex justify-end">
              <img alt="" className="object-cover w-[24px] h-[24px]" src={ic_user_gray} />
            </div>
            <div className="md:w-1/2 ">
              <p className="text-[#898989] mb-2">{data?.user.name}</p>
            </div>
          </div>
          {/* phonenumber */}
          <div className="flex gap-2">
            <div className="md:w-1/2 flex justify-end">
              <img alt="" className="object-contain w-[24px] h-[24px]" src={ic_phone_gray} />
            </div>
            <div className="md:w-1/2 ">
              <p className="text-[#898989] mb-2">{data?.user.phonenumber}</p>
            </div>
          </div>
          {/* address */}
          <div className="flex gap-2">
            <div className="md:w-1/2  flex justify-end">
              <img alt="" className="object-contain w-[23px] h-[23px]" src={ic_location_gray} />
            </div>
            <div className="md:w-1/2 ">
              <p className="text-[#898989] mb-2">{data?.user.address}</p>
            </div>
          </div>
        </div>
      </div>
      {/* thoi gian dat hang */}
      <div className="md:w-1/4">
        <p className="font-medium text-black my-4 md:hidden block">Thời gian đặt hàng</p>
        <div className="flex gap-2">
          <div className="md:w-1/2  flex justify-end">
            <img alt="" className="object-contain w-[23px] h-[23px]" src={ic_time_gray} />
          </div>
          <div className="md:w-1/2 ">
            <p className="text-[#898989] mb-2">{moment(data?.createDate).format('Do MMM YY')}</p>
          </div>
        </div>
        <div className="flex items-end xlg:h-[80%] md:h-[50%] justify-end">
          <div className="px-5 w-fit py-3 rounded-[2px] border uppercase text-[#D9D9D9] border-[#D9D9D9]">
            chờ xác nhận
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
