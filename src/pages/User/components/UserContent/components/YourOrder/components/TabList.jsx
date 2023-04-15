import { useState, useEffect } from 'react';

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
  const { label, value, iconActive, iconInActive, status, orderCount, ordersList, setOrdersData } = props;
  // ** check tab status
  const getTabStatus = (status) => {
    // console.log(status);
    switch (status) {
      case 'PAYING':
        return ordersList.filter((item) => item.orderStatus == 9);
      case 'NOTPAID':
        return ordersList.filter((item) => item.orderStatus == 1);
      case 'PENDING':
        return ordersList.filter((item) => item.orderStatus == 2);
      case 'SHIPPING':
        return ordersList.filter((item) => item.orderStatus == 5);
      case 'SHIPPED':
        return ordersList.filter((item) => item.orderStatus == 6);
      case 'CANCELED':
        return ordersList.filter(
          (item) =>
            item.orderStatus == 3 ||
            item.orderStatus == 4 ||
            item.orderStatus == 7 ||
            item.orderStatus == 8 ||
            item.orderStatus == 10,
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if (value == status) {
      // console.log('run');
      setOrdersData(getTabStatus(value));
    }
  }, [ordersList]);

  return (
    <div
      onClick={() => setOrdersData(getTabStatus(value))}
      className={`py-2 px-5 relative select-none cursor-pointer w-full  ${
        value == status ? 'border-b-primary border-b-[3px]' : ''
      }`}
    >
      <div className="flex flex-col-reverse items-center justify-center gap-3">
        <p className={`lg:block hidden uppercase ${value == status ? 'text-primary' : 'text-[#898989]'}`}>{label}</p>
        <img alt="" className="object-cover w-[24px] h-[24px]" src={value == status ? iconActive : iconInActive} />
      </div>
      {/* noti */}
      {orderCount > 0 && (
        <div className="w-[20px] h-[20px] rounded-full bg-redError absolute top-[-10px] right-[-5px] text-white flex items-center justify-center">
          <p className="text-[13px] text-center">{orderCount}</p>
        </div>
      )}
    </div>
  );
};

const TabList = (props) => {
  // ** const
  const { status, setStatus, ordersList, setOrdersData } = props;
  const [countPaying, setCountPaying] = useState(0);
  const [countNotPaid, setCountNotPaid] = useState(0);
  const [countAccept, setCountAcccept] = useState(0);
  const [countDelivering, setCountDelivering] = useState(0);
  const [countDelivered, setCountDelivered] = useState(0);
  const [countCancelled, setCountCancelled] = useState(0);

  // ** functs
  const handleChange = (newValue) => {
    setStatus(newValue);
  };

  // ** count order to get notification
  useEffect(() => {
    if (ordersList.length > 0) {
      setCountNotPaid(ordersList.filter((item) => item.orderStatus == 1).length);
      setCountPaying(ordersList.filter((item) => item.orderStatus == 9).length);
      setCountAcccept(ordersList.filter((item) => item.orderStatus == 2).length);
      setCountDelivering(ordersList.filter((item) => item.orderStatus == 5).length);
      setCountDelivered(ordersList.filter((item) => item.orderStatus == 6).length);
      setCountCancelled(
        ordersList.filter(
          (item) =>
            item.orderStatus == 3 ||
            item.orderStatus == 4 ||
            item.orderStatus == 7 ||
            item.orderStatus == 8 ||
            item.orderStatus == 10,
        ).length,
      );
    }
  }, [ordersList]);

  useEffect(() => {
    // setOrdersData(orderStatus);
  }, []);

  return (
    <div className="rounded-[5px] bg-white w-full flex justify-evenly">
      <div className="" onClick={() => handleChange('PAYING')}>
        <Tab
          label="chờ thanh toán"
          status={status}
          value="PAYING"
          iconActive={ic_wait_accept_active}
          iconInActive={ic_wait_accept}
          orderCount={countPaying}
          ordersList={ordersList}
          setOrdersData={setOrdersData}
        />
      </div>
      <div className="" onClick={() => handleChange('NOTPAID')}>
        <Tab
          label="chưa xác nhận"
          status={status}
          value="NOTPAID"
          iconActive={ic_wait_accept_active}
          iconInActive={ic_wait_accept}
          orderCount={countNotPaid}
          ordersList={ordersList}
          setOrdersData={setOrdersData}
        />
      </div>
      <div className="" onClick={() => handleChange('PENDING')}>
        <Tab
          label="đã xác nhận"
          status={status}
          value="PENDING"
          iconActive={ic_wait_accept_active}
          iconInActive={ic_wait_accept}
          ordersList={ordersList}
          orderCount={countAccept}
          setOrdersData={setOrdersData}
        />
      </div>
      <div className="flex-1" onClick={() => handleChange('SHIPPING')}>
        <Tab
          label="đang giao"
          status={status}
          value="SHIPPING"
          iconActive={ic_delivery_active}
          iconInActive={ic_delivery}
          orderCount={countDelivering}
          ordersList={ordersList}
          setOrdersData={setOrdersData}
        />
      </div>
      <div className="flex-1" onClick={() => handleChange('SHIPPED')}>
        <Tab
          label="đã giao"
          status={status}
          value="SHIPPED"
          iconActive={ic_recive_active}
          iconInActive={ic_recive}
          ordersList={ordersList}
          orderCount={countDelivered}
          setOrdersData={setOrdersData}
        />
      </div>
      <div className="flex-1" onClick={() => handleChange('CANCELED')}>
        <Tab
          label="đã hủy"
          status={status}
          value="CANCELED"
          iconActive={ic_cancel_active}
          iconInActive={ic_cancel}
          ordersList={ordersList}
          orderCount={countCancelled}
          setOrdersData={setOrdersData}
        />
      </div>
    </div>
  );
};

export default TabList;
