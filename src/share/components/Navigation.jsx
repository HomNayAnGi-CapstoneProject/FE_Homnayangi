import { useState } from 'react';

// ** Assets
import Logo from '../../assets/images/Logo.png';
import default_user from '../../assets/images/default_user.png';
import { ic_nofitication, ic_cart, ic_caret_down_white } from '../../assets';

// ** Third party libraries
import { NavLink, Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

const Navigation = () => {
  // ** States
  const [countrySide, setCountrySide] = useState(1);
  const [openCountry, setOpenCountry] = useState(false);

  // ** Func
  const handleChangeSide = (id) => {
    setCountrySide(id);
    setOpenCountry((prev) => !prev);
  };

  return (
    <nav className="font-inter px-[90px] flex justify-between">
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
                  : 'text-black hover:text-primary  transition-[1.2s]'
              }
              to="/about"
            >
              Giới thiệu
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex gap-[25px] items-center">
        <div className="relative">
          <div
            className="flex py-1 pl-3 pr-1 rounded-[10px] h-fit bg-primary text-white cursor-pointer font-semibold"
            onClick={() => setOpenCountry((prev) => !prev)}
          >
            {countrySide == 1 && 'Miền Nam'}
            {countrySide == 2 && 'Miền Bắc'}
            {countrySide == 3 && 'Miền Trung'}
            <div className="w-[24px] h-[24px] bg-cover" style={{ backgroundImage: `url(${ic_caret_down_white})` }} />
          </div>
          <OutsideClickHandler onOutsideClick={() => setOpenCountry(false)}>
            <ul
              className={`${
                openCountry ? 'block' : 'hidden'
              } w-[130px] py-1.5 bg-white rounded-[5px] absolute shadow-md top-10 left-[50%] translate-x-[-50%]`}
            >
              <li
                className={`text-center cursor-pointer hover:bg-secondary py-1 ${
                  countrySide == 2 ? 'bg-secondary' : ''
                }`}
                onClick={() => handleChangeSide(2)}
              >
                Miền Bắc
              </li>
              <li
                className={`text-center cursor-pointer hover:bg-secondary py-1 ${
                  countrySide == 3 ? 'bg-secondary' : ''
                }`}
                onClick={() => handleChangeSide(3)}
              >
                Miền Trung
              </li>
              <li
                className={`text-center cursor-pointer hover:bg-secondary py-1 ${
                  countrySide == 1 ? 'bg-secondary' : ''
                }`}
                onClick={() => handleChangeSide(1)}
              >
                Miền Nam
              </li>
            </ul>
          </OutsideClickHandler>
        </div>
        <div className="relative cursor-pointer">
          <div className="absolute rounded-full w-[20px] h-[20px] bg-primary text-white flex items-center justify-center text-[10px] top-[-8px] right-[-5px]">
            2
          </div>
          <div className="bg-cover w-[24px] h-[24px] cursor-pointer" style={{ backgroundImage: `url(${ic_cart})` }} />
        </div>
        <div
          className="bg-cover w-[24px] h-[24px] cursor-pointer"
          style={{ backgroundImage: `url(${ic_nofitication})` }}
        ></div>
        <div
          className="bg-cover w-[24px] h-[24px] cursor-pointer"
          style={{ backgroundImage: `url(${default_user})` }}
        ></div>
      </div>
    </nav>
  );
};

export default Navigation;
