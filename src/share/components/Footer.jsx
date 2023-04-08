import React from 'react';
import styles from '../../style';

// ** Assets
import footer from '../../assets/images/footer.png';
import logo from '../../assets/images/Logo.png';

// ** Third party libraries
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full h-max font-inter relative mt-20">
      <div
        style={{ backgroundImage: `url(${footer})` }}
        className="w-full md:min-h-[300px] xl:min-h-[420px] bg-cover bg-bottom"
      >
        <div className={`${styles.flexCenter} ${styles.paddingX}`}>
          <div className={`${styles.container}`}>
            <div className="sm:justify-between justify-center xl:pt-[60px] smd:flex-row smd:flex flex-col sm:gap-20">
              <div className="smd:w-[300px] flex flex-col items-center smd:mb-0 mb-20">
                <div
                  className="w-[80px] h-[84px] bg-contain bg-center cursor-pointer sm:mr-10"
                  style={{ backgroundImage: `url(${logo})` }}
                />
                <p className="sm:w-[290px] w-[300px] sm:text-start text-center leading-relaxed">
                  Giải quyết nỗi lo hôm nay phải ăn gì với những món ăn ngon, đa dạng từ khắp các vùng miền Việt Nam.
                </p>
              </div>

              <div className="flex sm:flex-nowrap flex-wrap lg:gap-24 gap-10 mt-5">
                <div>
                  <p className="text-[18px] font-semibold">Danh mục</p>
                  <ul className="mt-5">
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/recipe">Công thức</Link>
                    </li>
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/about">Về chúng tôi</Link>
                    </li>
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/shop">Cửa hàng</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-[18px] font-semibold">Chính sách hỗ trợ</p>
                  <ul className="mt-5">
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/">Chính sách bảo mật</Link>
                    </li>
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/about">Chính sách đổi trả</Link>
                    </li>
                    <li className="hover:text-primary cursor-pointer py-1">
                      <Link to="/recipe">Hình thức thanh toán</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-[18px] font-semibold">Liên hệ</p>
                  <ul className="mt-5">
                    <li className="py-1">
                      <p className="font-semibold">Địa chỉ:</p>
                      <p className="smd:w-[280px] w-full">
                        Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                      </p>
                    </li>
                    <li className="py-1 md:flex gap-1">
                      <p className="font-semibold">Số điện thoại:</p>
                      <p className="">028 7300 5588</p>
                    </li>
                    <li className="py-1 md:flex gap-1">
                      <p className="font-semibold">Email:</p>
                      <p className="">homnayangii.info@gmail.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-center pt-16 pb-2">{year} © Homnayangi. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
