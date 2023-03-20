import { useEffect } from 'react';
import Banner from '../../share/components/Banner';

// ** Third party library
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ** components
import Address from './components/Address/Address';
import Payments from './components/Payments';
import SideComp from './components/SideComp';

// ** Assets
import styles from '../../style';

const CartAddress = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }
  const accountStore = useSelector((state) => state.account.accountInfo);

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />;
    } else {
      return (
        <div>
          <Banner />
          <div className={`${styles.paddingX} ${styles.flexCenter} py-[50px]`}>
            <div className={`${styles.container}`}>
              <div className="flex md:flex-row flex-col gap-5">
                <div className="text-black md:w-[70%] w-full font-inter">
                  <div>
                    <Address userInfo={accountStore} />
                  </div>
                  <div className="mt-4">
                    <Payments />
                  </div>
                </div>
                <div className="text-black md:w-[30%] w-full h-fit font-inter">
                  <SideComp />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <Navigate replace to="/" />;
  }
};

export default CartAddress;
