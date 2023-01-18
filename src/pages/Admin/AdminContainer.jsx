import React, { Suspense } from 'react';
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';
import styles from '../../style';
import Loading from '../../share/components/Loading/Loading';

// ** pages
import Dashboard from './components/Dashboard';
import BlogManagement from './components/BlogManagement';
import OrderManagement from './components/OrderManagement';
import ProductManagement from './components/ProductManagement';
import VoucherManagement from './components/VoucherManagement';
import AwardManagement from './components/AwardManagement';
import AccomplishmentManagement from './components/AccomplishmentManagement';
import TagManagement from './components/TagManagement';
import CustomerManagement from './components/CustomerManagement';

import jwt_decode from 'jwt-decode';
import { Link, useNavigate, Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AdminContainer = (props) => {
  //** Const  */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('ACCOUNT_INFO'));
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  //** handle logout */
  const handleLogout = async () => {
    // const res = await instances.post('/logout')
    navigate('/');
    localStorage.removeItem('accessToken');
    dispatch(setAccountInfo({}));
  };

  return (
    <div className={`${styles.flexCenter}  text-black font-inter w-full`}>
      <div className={`${styles.container} px-10 `}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/">
              <Route index element={<Dashboard />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="order" element={<OrderManagement />} />
              <Route path="product" element={<ProductManagement />} />
              <Route path="voucher" element={<VoucherManagement />} />
              <Route path="award" element={<AwardManagement />} />
              <Route path="accomplishment" element={<AccomplishmentManagement />} />
              <Route path="tag" element={<TagManagement />} />
              <Route path="customer" element={<CustomerManagement />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminContainer;
