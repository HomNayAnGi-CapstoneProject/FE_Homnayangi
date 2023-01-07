import { useEffect } from 'react';
import RegisterForm from './RegisterForm';

const Register = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;
