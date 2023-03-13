import { Suspense, useEffect, useState } from 'react';
import Image from '../../../../share/components/Image';
import MenuItem from './components/MenuItem';

// ** assets
import defaultImage from '../../../../assets/images/default_user.png';
import {
  ic_user,
  ic_user_active,
  ic_userAccom,
  ic_userAccom_active,
  ic_userOrder,
  ic_userOrder_active,
} from '../../../../assets';

// ** third party
import { useNavigate, Navigate, BrowserRouter, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserNavigate = () => {
  // ** const
  const store = useSelector((state) => state.account);
  const [active, setActive] = useState('user');
  const location = useLocation();

  useEffect(() => {
    // console.log(location.pathname.split('/'));
    let locationMenu = location.pathname.split('/');
    if (locationMenu.length == 2) {
      setActive(locationMenu[1]);
    } else {
      setActive(locationMenu[2]);
    }
  }, [location]);
  // ** Funcs

  return (
    <div>
      <div className="flex items-center gap-3">
        <Image alt="" src={store.accountInfo?.Avatar || defaultImage} className="object-cover w-[75px] rounded-full " />
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-[18px] text-black">
            {store.accountInfo?.unique_name !== '' && store.accountInfo?.unique_name}
            {store.accountInfo?.unique_name == '' && store.accountInfo?.Lastname + ' ' + store.accountInfo?.Firstname}
            {store.accountInfo?.Displayname !== '' && store.accountInfo?.Displayname}
          </p>
          <p className="font-medium text-[#898989] uppercase text-[14px]">Khách hàng</p>
        </div>
      </div>
      <div className="mt-6">
        <MenuItem
          link="user"
          title="Tài Khoản Của Tôi"
          id="user"
          url={ic_user}
          urlActive={ic_user_active}
          active={active}
        />
        <MenuItem
          link="user/orders"
          title="Đơn Mua"
          id="orders"
          url={ic_userOrder}
          urlActive={ic_userOrder_active}
          active={active}
        />
        <MenuItem
          link="user/accomplishments"
          title="Thành Quả Của Tôi"
          id="accomplishments"
          url={ic_userAccom}
          urlActive={ic_userAccom_active}
          active={active}
        />
      </div>
    </div>
  );
};

export default UserNavigate;
