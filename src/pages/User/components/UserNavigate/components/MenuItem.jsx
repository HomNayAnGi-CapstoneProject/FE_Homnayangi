import React from 'react';

import { NavLink } from 'react-router-dom';

const MenuItem = (props) => {
  const { active, link, id, url, urlActive, title } = props;
  return (
    <>
      {link ? (
        <NavLink to={`/${link}`}>
          <li
            // onClick={() => {
            //   if (isTablet) {
            //     setOpenSidebar(false);
            //   }
            // }}
            className={`${
              active == id ? 'text-primary bg-[#ffffff]' : 'text-[#898989] hover:bg-[#d7d7d797]'
            } py-[12px] px-4 mb-[8px] rounded-[10px]  text-[15px]  font-medium flex items-center gap-4 select-none`}
          >
            <img src={active == id ? urlActive : url} />
            {title}
          </li>
        </NavLink>
      ) : (
        <li className="py-[12px] px-4 mb-[8px] rounded-[10px] hover:bg-[#d7d7d797] text-[15px] text-[#898989] font-medium flex items-center gap-4 transition select-none">
          <img src={url} />
          {title}
        </li>
      )}
    </>
  );
};

export default MenuItem;
