import React from 'react';
import instances from '../../../../../utils/plugin/axios';
import logo from '../../../../../assets/images/Logo.png';
import { setCurrentOrderStatus } from '../../../../../redux/actionSlice/managementSlice';

import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

const NotifyItem = (props) => {
  const { item, isCustomer, setOpenNotification } = props;
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickNoti = async () => {
    if (isCustomer) {
    } else {
      await instances.put(`/notifications/status`, {
        notificationId: item?.notificationId,
        status: true,
      });
      if (decoded_jwt?.role == 'Staff') {
        navigate('/management/order');
        dispatch(setCurrentOrderStatus(1));
        setOpenNotification(false);
      }
      if (decoded_jwt?.role == 'Manager') {
        navigate('/management');
        setOpenNotification(false);
      }
    }
  };

  return (
    <div onClick={() => handleClickNoti()} className="cursor-pointer hover:bg-gray-100 transition">
      <div className="px-[15px] py-2 flex gap-3">
        {/* logo */}
        <img src={logo} alt="logo" className="object-contain w-[50px] h-[50px] rounded-full" />
        <div className="flex gap-3 items-center">
          {/* message */}
          <div className="flex-1">
            <p
              className={`text-[15px] ${
                item.status == false ? 'text-black font-semibold' : 'text-gray-400 font-normal'
              }`}
            >
              {item.description}
            </p>
            <p className={`${item.status == false ? 'text-primary' : 'text-[#585858]'}  text-[14px]`}>
              {moment(item?.createdDate).startOf('hour').fromNow()}
            </p>
          </div>
          {/* read or not spot */}
          {item.status == false ? <div className="bg-primary w-[10px] h-[10px] rounded-full"></div> : <></>}
        </div>
      </div>
    </div>
  );
};

export default NotifyItem;
