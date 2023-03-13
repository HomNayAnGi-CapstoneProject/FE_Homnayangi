import React, { useState, useEffect } from 'react';

// ** assets
import {
  ic_wait_accept_active,
  ic_wait_accept,
  ic_delivery_active,
  ic_delivery,
  ic_recive_active,
  ic_recive,
  ic_cancel_active,
  ic_cancel,
} from '../../../../../../../assets';

//** third party libraries*/
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// ** tab component
const Tab = (props) => {
  const { label, value, iconActive, iconInActive, status } = props;
  return (
    <div
      className={`p-5 select-none cursor-pointer w-full  ${value == status ? 'border-b-primary border-b-[3px]' : ''}`}
    >
      <div className="flex items-center justify-center gap-4">
        <p className={`lg:block hidden uppercase ${value == status ? 'text-primary' : 'text-[#898989]'}`}>{label}</p>
        <img alt="" className="object-cover w-[24px] h-[24px]" src={value == status ? iconActive : iconInActive} />
      </div>
    </div>
  );
};

const TabList = (props) => {
  // ** const
  const { status, setStatus } = props;

  // ** functs
  const handleChange = (newValue) => {
    setStatus(newValue);
  };

  return (
    <div className="rounded-[5px] bg-white w-full flex justify-around">
      <div className="flex-1" onClick={() => handleChange('PENDING')}>
        <Tab
          label="chờ xác nhận"
          status={status}
          value="PENDING"
          iconActive={ic_wait_accept_active}
          iconInActive={ic_wait_accept}
        />
      </div>
      <div className="flex-1" onClick={() => handleChange('SHIPPING')}>
        <Tab
          label="đang giao"
          status={status}
          value="SHIPPING"
          iconActive={ic_delivery_active}
          iconInActive={ic_delivery}
        />
      </div>
      <div className="flex-1" onClick={() => handleChange('SHIPPED')}>
        <Tab label="đã giao" status={status} value="SHIPPED" iconActive={ic_recive_active} iconInActive={ic_recive} />
      </div>
      <div className="flex-1" onClick={() => handleChange('CANCELED')}>
        <Tab label="đã hủy" status={status} value="CANCELED" iconActive={ic_cancel_active} iconInActive={ic_cancel} />
      </div>
    </div>
  );
};

export default TabList;
