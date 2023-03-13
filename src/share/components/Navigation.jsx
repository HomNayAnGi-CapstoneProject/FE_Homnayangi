import { useState, useEffect } from 'react';
import MenuModal from './MenuModal';
import styles from '../../style';
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';

// ** Assets
import Logo from '../../assets/images/Logo.png';
import default_user from '../../assets/images/default_user.png';
import {
  ic_nofitication,
  ic_cart,
  ic_caret_down_white,
  ic_nav_menu,
  ic_notification_white,
  ic_cart_white,
} from '../../assets';

// ** Third party libraries
import { NavLink, Link, useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

// ** Redux
import { setOpenMenuModal, setCountrySide } from '../../redux/actionSlice/globalSlice';

const Navigation = (props) => {
  // ** States, Const
  const [openCountry, setOpenCountry] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state.global);
  const [scroll, setScroll] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** Funct
  const handleChangeSide = (id) => {
    dispatch(setCountrySide(id));
    // setCountrySide(id);
    setOpenCountry((prev) => !prev);
  };

  const handleOpenMenu = () => {
    dispatch(setOpenMenuModal(true));
  };

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
    dispatch(setAccountInfo({}));
  };

  // ** Scroll nav
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', null);
    };
  }, []);

  return (
    <>
      {store.openMenuModal && <MenuModal />}
      <nav
        className={`font-inter ${styles.paddingX} ${styles.flexCenter} ${
          scroll ? 'bg-[#f0f0f0] shadow-md rounded-bl-[30px] rounded-br-[30px]' : ''
        } sticky top-0 z-50 w-full transition`}
      >
        <div className={`${styles.container} ${styles.flexBetween}`}>
          <div className="flex gap-[80px]">
            <Link to="/">
              <div
                className="w-[80px] h-[84px] bg-contain bg-center cursor-pointer"
                style={{ backgroundImage: `url(${Logo})` }}
              />
            </Link>

            <ul className="list-none sm:flex hidden justify-center items-center flex-1 gap-11 text-[16px] font-medium">
              <li className={`cursor-pointer`}>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? 'text-primary font-bold relative after:block after:bg-primary after:w-[30px] after:h-[3px] after:absolute after:left-[50%] after:translate-x-[-50%] after:rounded after:bottom-[-8px]'
                      : 'text-black hover:text-primary transition-[1.2s]'
                  }
                  to="/"
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className={`cursor-pointer `}>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? 'text-primary font-bold relative after:block after:bg-primary after:w-[30px] after:h-[3px] after:absolute after:left-[50%] after:translate-x-[-50%] after:rounded after:bottom-[-8px]'
                      : 'text-black hover:text-primary transition-[1.2s]'
                  }
                  to="/recipe"
                >
                  Công thức
                </NavLink>
              </li>
              <li className={`cursor-pointer `}>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? 'text-primary font-bold relative after:block after:bg-primary after:w-[30px] after:h-[3px] after:absolute after:left-[50%] after:translate-x-[-50%] after:rounded after:bottom-[-8px]'
                      : 'text-black hover:text-primary transition-[1.2s]'
                  }
                  to="/shop"
                >
                  Cửa hàng
                </NavLink>
              </li>
              <li className={`cursor-pointer `}>
                <NavLink
                  className={(navData) =>
                    navData.isActive
                      ? 'text-primary font-bold relative after:block after:bg-primary after:w-[30px] after:h-[3px] after:absolute after:left-[50%] after:translate-x-[-50%] after:rounded after:bottom-[-8px]'
                      : 'text-black hover:text-primary  transition-[1.2s]'
                  }
                  to="/about"
                >
                  Giới thiệu
                </NavLink>
              </li>
            </ul>
          </div>

          <div
            onClick={() => handleOpenMenu()}
            className="sm:hidden block w-[34px] h-[25px] bg-cover bg-center bg-no-repeat cursor-pointer"
            style={{ backgroundImage: `url(${ic_nav_menu})` }}
          ></div>

          <div className="sm:flex hidden gap-[25px] items-center">
            {props.isHome == true && (
              <div className="relative">
                <div
                  className="flex py-1 pl-3 pr-1 rounded-[10px] h-fit bg-primary text-white cursor-pointer font-semibold"
                  onClick={() => setOpenCountry((prev) => !prev)}
                >
                  {store.countrySide == 1 && 'Miền Nam'}
                  {store.countrySide == 2 && 'Miền Bắc'}
                  {store.countrySide == 3 && 'Miền Trung'}
                  <div
                    className="w-[24px] h-[24px] bg-cover"
                    style={{ backgroundImage: `url(${ic_caret_down_white})` }}
                  />
                </div>
                <OutsideClickHandler onOutsideClick={() => setOpenCountry(false)}>
                  <ul
                    className={`${
                      openCountry ? 'block' : 'hidden'
                    } w-[130px] py-1.5 bg-white rounded-[5px] absolute z-[99] shadow-md top-10 left-[50%] translate-x-[-50%]`}
                  >
                    <li
                      className={`text-center cursor-pointer hover:bg-secondary py-1 ${
                        store.countrySide == 2 ? 'bg-secondary' : ''
                      }`}
                      onClick={() => handleChangeSide(2)}
                    >
                      Miền Bắc
                    </li>
                    <li
                      className={`text-center cursor-pointer hover:bg-secondary py-1 ${
                        store.countrySide == 3 ? 'bg-secondary' : ''
                      }`}
                      onClick={() => handleChangeSide(3)}
                    >
                      Miền Trung
                    </li>
                    <li
                      className={`text-center cursor-pointer hover:bg-secondary py-1 ${
                        store.countrySide == 1 ? 'bg-secondary' : ''
                      }`}
                      onClick={() => handleChangeSide(1)}
                    >
                      Miền Nam
                    </li>
                  </ul>
                </OutsideClickHandler>
              </div>
            )}
            <div className="relative cursor-pointer">
              <div className="absolute z-[10] rounded-full w-[20px] h-[20px] bg-primary text-white flex items-center justify-center font-semibold text-[11px] top-[-8px] right-[-5px]">
                2
              </div>
              <div
                className="relative bg-cover w-[24px] h-[24px] cursor-pointer"
                style={{ backgroundImage: `url(${ic_cart})` }}
              />
            </div>
            <div
              className="relative bg-cover w-[24px] h-[24px] cursor-pointer"
              style={{ backgroundImage: `url(${ic_nofitication})` }}
            ></div>

            <div
              className="relative bg-cover w-[30px] h-[30px] cursor-pointer rounded-full"
              style={{
                backgroundImage: `url(${
                  accessToken ? (decoded_jwt.Avatar == '' ? default_user : decoded_jwt.Avatar) : default_user
                })`,
              }}
              onClick={() => setOpenUser((prev) => !prev)}
            >
              <OutsideClickHandler onOutsideClick={() => setOpenUser(false)}>
                <ul
                  className={`${
                    openUser ? 'block' : 'hidden'
                  } w-max py-1.5 bg-white rounded-[5px] absolute z-[99] shadow-md top-10 right-[20%]`}
                >
                  {accessToken ? (
                    Object.keys(decoded_jwt)?.length === 0 && decoded_jwt?.constructor === Object ? (
                      <Link to="/login">
                        <li className={`text-center cursor-pointer hover:bg-secondary py-1 px-4`}>Đăng nhập</li>
                      </Link>
                    ) : (
                      <>
                        <div className="text-[14px] font-light w-full px-4 pb-2 border-b">
                          Xin chào {decoded_jwt.Lastname !== '' ? decoded_jwt.Lastname : decoded_jwt.Displayname}{' '}
                          {decoded_jwt.Firstname}
                        </div>
                        <Link to="/user">
                          <li className="cursor-pointer hover:bg-secondary py-1 px-4">Thông tin cá nhân</li>
                        </Link>
                        {decoded_jwt.role === 'Staff' && (
                          <li
                            onClick={() => navigate('/management')}
                            className="cursor-pointer hover:bg-secondary py-1 px-4"
                          >
                            Quản lý
                          </li>
                        )}
                        <li onClick={() => handleLogout()} className=" cursor-pointer hover:bg-secondary py-1 px-4">
                          Đăng xuất
                        </li>
                      </>
                    )
                  ) : (
                    <Link to="/login">
                      <li className={`text-center cursor-pointer hover:bg-secondary py-1 px-4 `}>Đăng nhập</li>
                    </Link>
                  )}
                </ul>
              </OutsideClickHandler>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
