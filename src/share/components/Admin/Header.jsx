import React from 'react';

import default_user from '../../../assets/images/default_user.png';
import { ic_menu, ic_caret_gray, ic_nofitication_orange } from '../../../assets';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = (props) => {
  //** Const */
  const location = useLocation();
  const store = useSelector((state) => state.management);
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'));

  return (
    <div className="sticky top-0 z-50 w-full flex items-center justify-between py-4 px-6 bg-[#f0f0f0]">
      <div className="flex w-full gap-2">
        <div
          onClick={() => props.setOpenSidebar((prev) => !prev)}
          className="p-2 rounded-full hover:bg-[#e6e6e6] cursor-pointer"
        >
          <img src={ic_menu} />
        </div>
        {location.pathname.split('/').length == 4 && (
          <button
            onClick={() => history.back()}
            className="text-[#a1a1a1] text-[13px] font-medium uppercase flex items-center gap-1 group"
          >
            <img className="group-hover:translate-x-[-5px] transition duration-200" src={ic_caret_gray} />
            <p>Quay lại</p>
          </button>
        )}
      </div>
      <div className="w-full flex justify-end items-center gap-3">
        <img src={ic_nofitication_orange} />
        <img className="w-[30px]" src={default_user} />
        <p>
          Hi ✌️ <span className="font-semibold text-[#898989]">{loggedInUser.firstName}</span>
        </p>
      </div>
    </div>
  );
};

export default Header;
