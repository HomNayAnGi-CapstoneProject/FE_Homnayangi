import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';

const Login = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
