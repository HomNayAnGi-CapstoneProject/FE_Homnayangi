import { useEffect, useState } from 'react';
import { setAccountInfo } from '../../../redux/actionSlice/accountSlice';

import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

// ** Assets
import Logo from '../../../assets/images/Logo.png';
import {
  ic_dashboard,
  ic_dashboard_active,
  ic_order,
  ic_order_active,
  ic_award,
  ic_award_active,
  ic_voucher,
  ic_voucher_active,
  ic_blog,
  ic_blog_active,
  ic_product,
  ic_product_active,
  ic_accomplishment,
  ic_accomplishment_active,
  ic_tag,
  ic_tag_active,
  ic_customer,
  ic_customer_active,
  ic_logout,
  ic_menu,
  ic_pack,
  ic_pack_active,
  ic_unit,
  ic_unit_active,
  ic_config,
  ic_config_active,
} from '../../../assets';

const MenuItem = (props) => {
  return (
    <>
      {props?.link ? (
        <NavLink to={`/${props.link}`}>
          <li
            onClick={() => {
              if (props.isTablet) {
                props.setOpenSidebar(false);
              }
            }}
            className={`${
              props.active == props.id ? 'bg-primary text-white' : 'text-[#898989] hover:bg-[#f5f5f5]'
            } py-[12px] px-4 mb-[8px] rounded-[10px]  text-[15px]  font-medium flex items-center gap-4 select-none`}
          >
            <img src={props.active == props.id ? props.urlActive : props.url} />
            {props.title}
          </li>
        </NavLink>
      ) : (
        <li className="py-[12px] px-4 mb-[8px] rounded-[10px] hover:bg-[#f5f5f5] text-[15px] text-[#898989] font-medium flex items-center gap-4 transition select-none">
          <img src={props.url} />
          {props.title}
        </li>
      )}
    </>
  );
};

const SideBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('management');

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  useEffect(() => {
    // console.log(location.pathname.split('/'));
    let locationMenu = location.pathname.split('/');
    if (locationMenu.length == 2) {
      setActive(locationMenu[1]);
    } else {
      setActive(locationMenu[2]);
    }
  }, [location]);

  // ** check role
  const checkRole = () => {
    if (accessToken) {
      switch (decoded_jwt.role) {
        case 'Staff':
          return 'Staff';
        case 'Admin':
          return 'Admin';
        case 'Manager':
          return 'Manager';
        default:
          break;
      }
    }
  };

  //** handle logout */
  const handleLogout = async () => {
    // const res = await instances.post('/logout')
    navigate('/');
    localStorage.removeItem('accessToken');
    dispatch(setAccountInfo({}));
  };

  return (
    <div className="max-h-[100vh] overflow-y-scroll scroll-bar w-[260px] bg-white shadow-lg px-5 fixed top-0 z-[55] bottom-0">
      <img className="w-[70px]" src={Logo} />
      <div className="mt-[45px]">
        <ul>
          {checkRole() == 'Staff' && (
            <>
              <p className="pb-5 uppercase text-[#c2c2c2]">Bảng điều khiển</p>
              <MenuItem
                link="management"
                active={active}
                id="management"
                url={ic_dashboard}
                urlActive={ic_dashboard_active}
                title="Bảng điều khiển"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              <p className="pt-2 pb-5 uppercase text-[#c2c2c2]">quản lý</p>
              <MenuItem
                link="management/order"
                active={active}
                id="order"
                url={ic_order}
                urlActive={ic_order_active}
                title="Quản lý đơn hàng"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />

              <MenuItem
                link="management/award"
                active={active}
                id="award"
                url={ic_award}
                urlActive={ic_award_active}
                title="Quản lý danh hiệu"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              <MenuItem
                link="management/accomplishment"
                active={active}
                id="accomplishment"
                url={ic_accomplishment}
                urlActive={ic_accomplishment_active}
                title="Quản lý thành tựu"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />

              <MenuItem
                link="management/voucher"
                active={active}
                id="voucher"
                url={ic_voucher}
                urlActive={ic_voucher_active}
                title="Quản lý voucher"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />

              <p className="py-2 pb-5 uppercase text-[#c2c2c2]">nguyên liệu</p>
              <MenuItem
                link="management/product"
                active={active}
                id="product"
                url={ic_product}
                urlActive={ic_product_active}
                title="Quản lý nguyên liệu"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              <MenuItem
                link="management/type"
                active={active}
                id="type"
                url={ic_tag}
                urlActive={ic_tag_active}
                title="Quản lý loại món"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              {/* <MenuItem
            link="management/pack"
            active={active}
            id="pack"
            url={ic_pack}
            urlActive={ic_pack_active}
            title="Quản lý gói NL"
            setOpenSidebar={props.setOpenSidebar}
            isTablet={props.isTablet}
          /> */}
              <MenuItem
                link="management/unit"
                active={active}
                id="unit"
                url={ic_unit}
                urlActive={ic_unit_active}
                title="Quản lý đơn vị"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              <p className="py-2 pb-5 uppercase text-[#c2c2c2]">bài viết</p>
              <MenuItem
                link="management/blog"
                active={active}
                id="blog"
                url={ic_blog}
                urlActive={ic_blog_active}
                title="Quản lý bài viết"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              <MenuItem
                link="management/category"
                active={active}
                id="category"
                url={ic_tag}
                urlActive={ic_tag_active}
                title="Quản lý danh mục"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              {/* <MenuItem
            link="management/sub-tag"
            active={active}
            id="sub-tag"
            url={ic_tag}
            urlActive={ic_tag_active}
            title="Quản lý d/mục phụ"
            setOpenSidebar={props.setOpenSidebar}
            isTablet={props.isTablet}
          /> */}
            </>
          )}

          {checkRole() == 'Manager' && (
            <>
              <p className="pt-2 pb-5 uppercase text-[#c2c2c2]">quản lý</p>
              <MenuItem
                link="management"
                active={active}
                id="management"
                url={ic_blog}
                urlActive={ic_blog_active}
                title="Duyệt bài viết"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
            </>
          )}

          {checkRole() == 'Admin' && (
            <>
              <p className="pt-2 pb-5 uppercase text-[#c2c2c2]">quản lý</p>
              <MenuItem
                link="management"
                active={active}
                id="management"
                url={ic_award}
                urlActive={ic_award_active}
                title="Điều kiện danh hiệu"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
              <MenuItem
                link="management/cronjob"
                active={active}
                id="cronjob"
                url={ic_config}
                urlActive={ic_config_active}
                title="Thiết lập thời gian"
                setOpenSidebar={props.setOpenSidebar}
                isTablet={props.isTablet}
              />
            </>
          )}

          <p className="py-2 pb-5 uppercase text-[#c2c2c2]">khác</p>
          <div className="cursor-pointer" onClick={() => handleLogout()}>
            <MenuItem url={ic_logout} title="Đăng xuất" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
