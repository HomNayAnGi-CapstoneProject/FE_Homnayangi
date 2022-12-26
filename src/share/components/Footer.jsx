import React from 'react';

// ** Assets
import footer from '../../assets/images/footer.png';
import logo from '../../assets/images/Logo.png';

// ** Third party libraries
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full font-inter relative">
      <div style={{ backgroundImage: `url(${footer})` }} className="w-full min-h-[300px] bg-cover bg-bottom">
        <div className="flex justify-between px-[90px]">
          <div className="w-[300px] flex flex-col items-center">
            <div
              className="w-[80px] h-[84px] bg-contain bg-center cursor-pointer mr-10"
              style={{ backgroundImage: `url(${logo})` }}
            />
            <p className="w-[290px] leading-relaxed">
              Giải quyết nỗi lo hôm nay phải ăn gì với những món ăn ngon, đa dạng từ khắp các vùng miền Việt Nam.
            </p>
          </div>
          <div className="flex gap-24 mt-5">
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
                  <p className="w-[280px]">
                    Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
                  </p>
                </li>
                <li className="py-1">
                  <p className="font-semibold">Số điện thoại:</p>
                  <p className="w-[280px]">028 7300 5588</p>
                </li>
                <li className="py-1">
                  <p className="font-semibold">Email:</p>
                  <p className="w-[280px]">info.homnayangi@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center pt-16 pb-2">{year} © Homnayangi. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
