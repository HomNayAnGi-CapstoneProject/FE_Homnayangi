import React from 'react';
import { useSelector } from 'react-redux';

import {
  ic_blog_active,
  ic_dollar_white,
  ic_order_active,
  ic_order_cancel,
  ic_denied,
} from '../../../../../../../../assets';

const Item = (props) => {
  const { name, value, icon, color } = props;
  return (
    <div className={`font-inter border-r px-8 py-5 flex-1`}>
      <div className={`cursor-pointer w-[40px] h-[40px] ${color} rounded-[10px] mb-3 flex justify-center items-center`}>
        <img alt="" src={icon || ic_dollar_white} />
      </div>
      <p className="mb-2 font-semibold text-[#585858]">{name}</p>
      <p className={`text-[25px] font-semibold`}>{Intl.NumberFormat().format(value)}</p>
    </div>
  );
};

const GeneralInfo = () => {
  const store = useSelector((state) => state.management.reportData);
  return (
    <div className="bg-white drop-shadow-sm rounded-[25px] flex-1">
      <div className="flex justify-between">
        <Item name={'Tổng đơn'} value={store?.totalOrders} color="bg-[#67E8F9]" />
        <Item name={'Đã giao'} value={store?.deliveredOrders} color="bg-[#FDE047]" icon={ic_order_active} />
        <Item name={'Đã hủy'} value={store?.canceledOrders} color="bg-[#FDA4AF]" icon={ic_order_cancel} />
        <Item name={'Từ chối'} value={store?.deniedOrders} color="bg-[#FDBA74]" icon={ic_denied} />
      </div>
    </div>
  );
};

export default GeneralInfo;
