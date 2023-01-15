import { useEffect } from 'react';
import RegisterForm from './RegisterForm';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Register = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // return (
  //   <div>
  //     <RegisterForm />
  //   </div>
  // );

  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <RegisterForm />;
    } else {
      if (decoded_jwt.role === 'Staff' || decoded_jwt.role === 'Admin') {
        return <Navigate replace to="/management" />;
      } else {
        return <Navigate replace to="/" />;
      }
    }
  } else {
    return <RegisterForm />;
  }
};

export default Register;
