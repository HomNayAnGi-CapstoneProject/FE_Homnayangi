import React from 'react';
import default_user from '../../../assets/images/default_user.png';
import { useDispatch, useSelector } from 'react-redux';

import { ic_menu } from '../../../assets';

const Header = (props) => {
  const store = useSelector((state) => state.account.accountInfo);
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'));

  return (
    <div className="sticky top-0 z-50 w-full flex items-center justify-between py-4 px-6 bg-[#f0f0f0]">
      <div>
        <div
          onClick={() => props.setOpenSidebar((prev) => !prev)}
          className="p-2 rounded-full hover:bg-[#e6e6e6] cursor-pointer"
        >
          <img src={ic_menu} />
        </div>
      </div>
      <div className="w-full flex justify-end items-center gap-2">
        <img className="w-[30px]" src={default_user} />
        Xin chào, <span className="font-semibold text-[#898989]">{loggedInUser.firstName}</span>
      </div>
    </div>
  );
};

export default Header;
