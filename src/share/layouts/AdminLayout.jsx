import { useState, useEffect } from 'react';
import Header from '../components/Admin/Header';
import SideBar from '../components/Admin/SideBar';
import useWindowSize from '../hooks/useWindowSize';

const AdminLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [width, height] = useWindowSize();
  //** close modal when screen size change */
  useEffect(() => {
    if (width > 1200) {
      if (openSidebar) {
        setOpenSidebar(true);
      }
      setIsTablet(false);
    } else {
      setOpenSidebar(false);
      setIsTablet(true);
    }
  }, [width]);

  return (
    <div className="relative font-inter bg-cover w-full">
      <div className="flex">
        <div
          className={`w-[260px] ${openSidebar ? `block ${isTablet ? 'fixed top-0 left-0 z-[55]' : ''} ` : 'hidden'}`}
        >
          <SideBar isTablet={isTablet} setOpenSidebar={setOpenSidebar} />
        </div>
        <div
          onClick={() => setOpenSidebar(false)}
          className={`${
            openSidebar && isTablet
              ? 'block h-[100vh] fixed top-0 bottom-0 z-[52] left-0 right-0 bg-[rgba(0,0,0,0.5)]'
              : 'hidden'
          }`}
        />
        <div className="flex-1">
          <Header setOpenSidebar={setOpenSidebar} />
          <div className=" relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
