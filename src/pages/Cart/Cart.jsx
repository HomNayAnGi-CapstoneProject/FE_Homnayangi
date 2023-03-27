import { useState, useEffect } from 'react';
import instances from '../../utils/plugin/axios';
import Banner from '../../share/components/Banner';

// ** components
import Header from './components/CartContent/Header/Header';
import Body from './components/CartContent/Body/Body';
import SideComp from './components/SideComp/SideComp';
import CartType from './components/CartType/CartType';

// ** Assets
import styles from '../../style';

const Cart = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Banner />
      <div className={`${styles.paddingX} ${styles.flexCenter} py-[50px]`}>
        <div className={`${styles.container}`}>
          <CartType />
          <div className="flex md:flex-row flex-col gap-5">
            <div className="text-black md:w-[70%] w-full font-inter">
              <div>
                <Header />
              </div>
              <div className="mt-4">
                <Body />
              </div>
            </div>
            <div className="text-black md:w-[30%] w-full h-fit font-inter">
              <SideComp />
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden block">
        {/* <FixedBottomNav iniReaction={blogDetail?.reaction} iniView={blogDetail?.view} /> */}
      </div>
    </div>
  );
};

export default Cart;
