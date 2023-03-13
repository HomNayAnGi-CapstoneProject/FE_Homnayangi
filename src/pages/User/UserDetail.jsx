import { useEffect, useState } from 'react';
import styles from '../../style';

// ** components
import UserNavigate from './components/UserNavigate/UserNavigate';
import UserContent from './components/UserContent/UserContent';

// ** Redux
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';

// ** third party
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useNavigate, Navigate } from 'react-router-dom';

const UserDetail = ({ title }) => {
  // ** const
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  useEffect(() => {
    document.title = title;
  }, [title]);

  // ** update user informatio
  useEffect(() => {
    dispatch(setAccountInfo(decoded_jwt));
  }, [decoded_jwt]);

  if (accessToken) {
    return (
      <div className={`md:px-[90px] ${styles.flexCenter} py-16`}>
        <div className={`${styles.container} xx4lg:px-10`}>
          <div className="flex sm:flex-row flex-col font-inter gap-16">
            <div className="sm:w-[280px]">
              <UserNavigate />
            </div>
            <div className="w-full">
              <UserContent />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate replace to="/" />;
  }
};

export default UserDetail;
