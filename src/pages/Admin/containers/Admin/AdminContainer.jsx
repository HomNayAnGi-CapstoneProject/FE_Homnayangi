import React, { Suspense } from 'react';
import { setAccountInfo } from '../../../../redux/actionSlice/accountSlice';
import styles from '../../../../style';
import Loading from '../../../../share/components/Loading/Loading';

// ** third party libraries
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AdminContainer = () => {
  return (
    <div className={`${styles.flexCenter} mt-[45px] text-black font-inter w-full`}>
      <div className={`${styles.container} px-10 `}>AdminContainer</div>
    </div>
  );
};

export default AdminContainer;
