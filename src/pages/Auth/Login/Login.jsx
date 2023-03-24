import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

// ** Third party library
import jwt_decode from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const Login = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  //** States, const */
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'));
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <LoginForm />;
    } else {
      if (decoded_jwt.role === 'Staff' || decoded_jwt.role === 'Admin' || decoded_jwt.role === 'Manager') {
        return <Navigate replace to="/management" />;
      } else {
        return <Navigate replace to="/" />;
      }
    }
  } else {
    return <LoginForm />;
  }
};

export default Login;
