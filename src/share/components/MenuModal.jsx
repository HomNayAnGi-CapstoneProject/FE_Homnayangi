import { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import NotifyItemCart from './NotifyItemCart';

// ** Assets
import { ic_close_modal } from '../../assets';
import logo from '../../assets//images/Logo.png';
import { ic_nofitication, ic_cart, ic_caret_down_white, ic_caret_right } from '../../assets';
import default_user from '../../assets/images/default_user.png';

// ** Third party libraries
import { NavLink, Link, useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

// ** Redux
import { setOpenMenuModal, setCountrySide } from '../../redux/actionSlice/globalSlice';
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';

const MenuModal = () => {
  // ** States, Const
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.global);
  const cartStore = useSelector((state) => state?.cart);
  const [openCountry, setOpenCountry] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [width, height] = useWindowSize();

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  //** close modal when screen size change */
  useEffect(() => {
    if (width > 768) {
      handleCloseModal();
    }
  }, [width]);

  // ** Funct
  const handleCloseModal = () => {
    dispatch(setOpenMenuModal(false));
  };

  const handleChangeCountrySide = (id) => {
    dispatch(setCountrySide(id));
    setOpenCountry((prev) => !prev);
  };

  const handleLogoutSignin = async () => {
    if (accessToken) {
      localStorage.removeItem('accessToken');
      navigate('/login');
      dispatch(setAccountInfo({}));
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="font-inter fixed top-0 bottom-0 left-0 z-[9999] bg-white w-full px-[15px]">
      <div className="flex items-center justify-between">
        <Link to="/" onClick={() => handleCloseModal()}>
          <div
            className="w-[80px] h-[84px] bg-contain bg-center cursor-pointer"
            style={{ backgroundImage: `url(${logo})` }}
          />
        </Link>
        <div className="flex gap-[25px]">
          {/* <div
            className="bg-cover w-[24px] h-[24px] cursor-pointer"
            style={{ backgroundImage: `url(${default_user})` }}
          ></div> */}
          <div className="relative cursor-pointer">
            {/* <div className="absolute rounded-full w-[20px] h-[20px] bg-primary text-white flex items-center justify-center font-semibold text-[11px] top-[-8px] right-[-5px]">
              2
            </div> */}
            <div
              onClick={() => {
                navigate('/cart');
                dispatch(setOpenMenuModal(false));
              }}
              className="bg-cover w-[28px] h-[28px] cursor-pointer"
              style={{ backgroundImage: `url(${ic_cart})` }}
            />
            <NotifyItemCart decoded_jwt={decoded_jwt} shoppingCart={cartStore?.shoppingCart} />
          </div>
          <div
            onClick={() => handleCloseModal()}
            className="cursor-pointer bg-cover w-[26px] h-[26px]"
            style={{ backgroundImage: `url(${ic_close_modal})` }}
          />
        </div>
      </div>

      <div className="my-3">
        <ul>
          <li className="uppercase font-bold" onClick={() => handleCloseModal()}>
            <NavLink className={(navData) => (navData.isActive ? 'text-primary' : 'text-black')} to="/">
              <div className="flex items-center justify-between border-t py-1">
                <p>Trang chủ</p>
                <div className="bg-cover w-[44px] h-[44px]" style={{ backgroundImage: `url(${ic_caret_right})` }} />
              </div>
            </NavLink>
          </li>
          <li className="uppercase font-bold" onClick={() => handleCloseModal()}>
            <NavLink className={(navData) => (navData.isActive ? 'text-primary' : 'text-black')} to="/recipe">
              <div className="flex items-center justify-between border-t py-1">
                <p>Công thức</p>
                <div className="bg-cover w-[44px] h-[44px]" style={{ backgroundImage: `url(${ic_caret_right})` }} />
              </div>
            </NavLink>
          </li>
          <li className="uppercase font-bold" onClick={() => handleCloseModal()}>
            <NavLink className={(navData) => (navData.isActive ? 'text-primary' : 'text-black')} to="/about">
              <div className="flex items-center justify-between border-t py-1">
                <p>Về chúng tôi</p>
                <div className="bg-cover w-[44px] h-[44px]" style={{ backgroundImage: `url(${ic_caret_right})` }} />
              </div>
            </NavLink>
          </li>
          <li className="uppercase font-bold" onClick={() => handleCloseModal()}>
            <NavLink className={(navData) => (navData.isActive ? 'text-primary' : 'text-black')} to="/shop">
              <div className="flex items-center justify-between border-t py-1">
                <p>Cửa hàng</p>
                <div className="bg-cover w-[44px] h-[44px]" style={{ backgroundImage: `url(${ic_caret_right})` }} />
              </div>
            </NavLink>
          </li>
          <li className="uppercase font-bold" onClick={() => setOpenUser((prev) => !prev)}>
            <div className="flex cursor-pointer items-center justify-between border-t py-1">
              <p>Thông tin tài khoản</p>
              <div
                className={`bg-cover w-[44px] h-[44px] ${openUser ? 'rotate-[90deg] transform' : ''}`}
                style={{ backgroundImage: `url(${ic_caret_right})` }}
              />
            </div>
            <div className={`${openUser ? 'block' : 'hidden'} bg-secondary h-max`}>
              <ul className="px-2">
                {accessToken && (
                  <li
                    onClick={() => {
                      navigate('/user');
                      dispatch(setOpenMenuModal(false));
                    }}
                    className="py-2 cursor-pointer uppercase font-medium"
                  >
                    Thông tin cá nhân
                  </li>
                )}
                <li onClick={() => handleLogoutSignin()} className="cursor-pointer py-2 uppercase font-medium">
                  {accessToken ? 'Đăng xuất' : 'Đăng nhập'}
                </li>
              </ul>
            </div>
          </li>
          <li className="uppercase font-bold cursor-pointer" onClick={() => setOpenCountry((prev) => !prev)}>
            <div className="flex items-center justify-between border-y py-1">
              {store.countrySide == 1 && <p className="text-primary">Miền Nam</p>}
              {store.countrySide == 2 && <p className="text-primary">Miền Bắc</p>}
              {store.countrySide == 3 && <p className="text-primary">Miền Trung</p>}
              <div
                className={`bg-cover w-[44px] h-[44px] ${openCountry ? 'rotate-[90deg] transform' : ''}`}
                style={{ backgroundImage: `url(${ic_caret_right})` }}
              />
            </div>
            <div className={`${openCountry ? 'block' : 'hidden'} bg-secondary h-max`}>
              <ul className="px-2">
                <li onClick={() => handleChangeCountrySide(2)} className="py-2 uppercase font-medium">
                  Miền Bắc
                </li>
                <li onClick={() => handleChangeCountrySide(3)} className="py-2 uppercase font-medium">
                  Miền Trung
                </li>
                <li onClick={() => handleChangeCountrySide(1)} className="py-2 uppercase font-medium">
                  Miền Nam
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div className="footer fixed w-[90%] bottom-5">
        <div className="flex flex-wrap justify-between">
          <div className="xs:mb-0 mb-[5px]">
            <p className="font-bold">Email:</p>
            <p>info.homnayangi@gmail.com</p>
          </div>

          <div>
            <p className="font-bold">Số điện thoại:</p>
            <p>028 7300 5588</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
