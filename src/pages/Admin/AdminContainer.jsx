import React, { Suspense } from 'react';
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';
import styles from '../../style';
import Loading from '../../share/components/Loading/Loading';

// ** pages
import Dashboard from './components/Dashboard';

import BlogManagement from './components/BlogManage/BlogManagement';
import CreateBlog from './components/BlogManage/components/CreateBlog';

import TagManagement from './components/CateManage/TagManagement';
import CreateCategory from './components/CateManage/components/CreateCategory';
import EditCategory from './components/CateManage/components/EditCategory';
import CreateSubCate from './components/CateManage/components/SubCategory/CreateSubCate';
import EditSubCate from './components/CateManage/components/SubCategory/EditSubCate';

import OrderManagement from './components/OrderManagement';
import VoucherManagement from './components/VoucherManagement';
import AwardManagement from './components/AwardManagement';
import AccomplishmentManagement from './components/AccomplishmentManagement';
import CustomerManagement from './components/CustomerManagement';

import ProductManagement from './components/ProductManage/ProductManagement';
import CreateProduct from './components/ProductManage/components/CreateProduct';
import EditProduct from './components/ProductManage/components/EditProduct';

import ProductTypeManagement from './components/TypeManage/ProductTypeManagement';
import CreateType from './components/TypeManage/components/CreateType';
import EditType from './components/TypeManage/components/EditType';

import UnitManagement from './components/UnitManage/UnitManagement';
import CreateUnit from './components/UnitManage/components/CreateUnit';
import EditUnit from './components/UnitManage/components/EditUnit';

// ** third party libraries

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
    <div className={`${styles.flexCenter} mt-[45px] text-black font-inter w-full`}>
      <div className={`${styles.container} px-10 `}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/">
              <Route index element={<Dashboard />} />
              <Route path="blog">
                <Route index element={<BlogManagement />} />
                <Route path="new" element={<CreateBlog />} />
                <Route path="edit/:blogId" element={<CreateBlog />} />
              </Route>
              <Route path="order" element={<OrderManagement />} />
              <Route path="product">
                <Route index element={<ProductManagement />} />
                <Route path="new" element={<CreateProduct />} />
                <Route path="edit/:ingredientId" element={<EditProduct />} />
              </Route>
              <Route path="voucher" element={<VoucherManagement />} />
              <Route path="award" element={<AwardManagement />} />
              <Route path="accomplishment" element={<AccomplishmentManagement />} />
              <Route path="category">
                <Route index element={<TagManagement />} />
                <Route path="new" element={<CreateCategory />} />
                <Route path="edit/:categoryId" element={<EditCategory />} />
                <Route path="sub-category/new" element={<CreateSubCate />} />
                <Route path="sub-category/edit/:subCategoryId" element={<EditSubCate />} />
              </Route>
              <Route path="customer" element={<CustomerManagement />} />
              <Route path="type">
                <Route index element={<ProductTypeManagement />} />
                <Route path="new" element={<CreateType />} />
                <Route path="edit/:typeId" element={<EditType />} />
              </Route>
              <Route path="unit">
                <Route index element={<UnitManagement />} />
                <Route path="new" element={<CreateUnit />} />
                <Route path="edit/:unitId" element={<EditUnit />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminContainer;
