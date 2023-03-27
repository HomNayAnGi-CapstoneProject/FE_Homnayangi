import React, { Suspense } from 'react';
import { setAccountInfo } from '../../../../redux/actionSlice/accountSlice';
import styles from '../../../../style';
import Loading from '../../../../share/components/Loading/Loading';

// ** third party libraries
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ** pages
import Dashboard from './components/Dashboard/Dashboard';

import BlogApprove from './components/BlogApprove/BlogApprove';
import BlogDetail from './components/BlogApprove/components/BlogDetail';

const ManagerContainer = () => {
  //** Const  */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'));
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  return (
    <div className={`${styles.flexCenter} mt-[45px] text-black font-inter w-full`}>
      <div className={`${styles.container} px-10 `}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/">
              {/* <Route index element={<Dashboard />} /> */}
              {/* <Route path="blog-review"> */}
              <Route index element={<BlogApprove />} />
              <Route path="blog-detail/:blogId" element={<BlogDetail />} />
              {/* </Route> */}
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default ManagerContainer;
