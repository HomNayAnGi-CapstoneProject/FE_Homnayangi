import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';

import { Link, useNavigate, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// ** components
import TabList from './components/TabList';
import Container from './components/Content/Container';
import BadgeContainer from './components/Badges/BadgeContainer';

const YourAccomplishment = () => {
  const [status, setStatus] = useState('all');
  const [accomsData, setAccomsData] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** get customer accomplishments
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/accomplishments/customer-manage`);
      // console.log(res.data.result);
      setAccomsData(res.data.result);
    };
    fetch();
  }, []);

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />;
    } else {
      switch (decoded_jwt.role) {
        case 'Customer':
          return (
            <div className="font-inter">
              <BadgeContainer />
              <TabList setStatus={setStatus} status={status} accomsData={accomsData} />
              <Container status={status} accomsData={accomsData} />
            </div>
          );
        default:
          return <Navigate replace to="/" />;
      }
    }
  } else {
    return <Navigate replace to="/" />;
  }
};

export default YourAccomplishment;
