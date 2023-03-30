import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, Navigate } from 'react-router-dom';

// ** components
import TabList from './components/TabList';
import Container from './components/Content/Container';
import BadgeContainer from './components/Badges/BadgeContainer';

const YourAccomplishment = () => {
  const [status, setStatus] = useState('all');

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />;
    } else {
      switch (decoded_jwt.role) {
        case 'Customer':
          return (
            <div className="font-inter">
              <BadgeContainer />
              <TabList setStatus={setStatus} status={status} />
              <Container status={status} />
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
