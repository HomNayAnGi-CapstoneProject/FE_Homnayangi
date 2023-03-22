import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';
import Loading from '../../../../../../share/components/Admin/Loading';
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

// ** components
import InfoForm from './components/InfoForm/InfoForm';
import Address from './components/Address';

const PersonalInfo = () => {
  // ** const
  const [userData, setUserData] = useState();
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** get user detail info
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/personal-${isCustomer() ? 'customer' : 'user'}`);
      setUserData(res.data.result);
      // console.log(res.data.result);
    };

    fetch();
  }, []);

  // ** check role
  const isCustomer = () => {
    switch (decoded_jwt.role) {
      case 'Customer':
        return true;
      case 'Staff':
        return false;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="mb-[30px]">{userData ? <InfoForm userData={userData} /> : <Loading />}</div>
      <div>{isCustomer() && <Address />}</div>
    </div>
  );
};

export default PersonalInfo;
