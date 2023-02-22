import { useState } from 'react';

import default_user from '../../../assets/images/default_user.png';
import { ic_menu, ic_caret_gray, ic_nofitication_orange } from '../../../assets';
import { setShowSideBar, clearBlogContent } from '../../../redux/actionSlice/managementSlice';
import { setAccountInfo } from '../../../redux/actionSlice/accountSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

const Header = (props) => {
  //** Const */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useSelector((state) => state.management);
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'));
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
    dispatch(setAccountInfo({}));
  };

  return (
    <div className="sticky top-0 z-50 w-full flex items-center justify-between py-4 px-6 bg-[#f0f0f0]">
      <div className="flex w-full gap-2">
        <div
          onClick={() => {
            props.setOpenSidebar((prev) => !prev);
            store.showSideBar ? dispatch(setShowSideBar(false)) : dispatch(setShowSideBar(true));
          }}
          className="p-2 rounded-full hover:bg-[#e6e6e6] cursor-pointer"
        >
          <img src={ic_menu} />
        </div>
        {location.pathname.split('/').length >= 4 && (
          <button
            onClick={() => {
              history.back();
            }}
            className="text-[#a1a1a1] text-[13px] font-medium uppercase flex items-center gap-1 group"
          >
            <img className="group-hover:translate-x-[-5px] transition duration-200" src={ic_caret_gray} />
            <p>Quay lại</p>
          </button>
        )}
      </div>
      <div className="w-full flex justify-end items-center gap-3">
        <img src={ic_nofitication_orange} />
        <div className="relative " onClick={() => setOpenLogout((prev) => !prev)}>
          <div className="flex items-center gap-3 cursor-pointer">
            <img className="w-[30px] cursor-pointer" src={default_user} />
            <p>
              Hi ✌️ <span className="font-semibold text-[#898989]">{loggedInUser.firstName}</span>
            </p>
          </div>
          <OutsideClickHandler onOutsideClick={() => setOpenLogout(false)}>
            <ul
              className={`${
                openLogout ? 'block' : 'hidden'
              } w-max py-1.5 bg-white rounded-[5px] absolute z-[99] shadow-md top-10 right-[20%]`}
            >
              <li onClick={() => handleLogout()} className=" cursor-pointer hover:bg-secondary py-1 px-4">
                Đăng xuất
              </li>
            </ul>
          </OutsideClickHandler>
        </div>
      </div>
    </div>
  );
};

export default Header;
