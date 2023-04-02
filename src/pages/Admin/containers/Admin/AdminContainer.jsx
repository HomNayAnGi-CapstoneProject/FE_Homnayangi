import React, { Suspense } from 'react';
import { setAccountInfo } from '../../../../redux/actionSlice/accountSlice';
import styles from '../../../../style';
import Loading from '../../../../share/components/Loading/Loading';

// ** third party libraries
import jwt_decode from 'jwt-decode';
import { Link, useNavigate, Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ** pages
import BadgeConditionManage from './components/BadgeConditionManage/BadgeConditionManage';
import CreateBadgeCondition from './components/BadgeConditionManage/components/CreateBadgeCondition';
import EditBadgeCondition from './components/BadgeConditionManage/components/EditBadgeCondition';

const AdminContainer = () => {
  return (
    <div className={`${styles.flexCenter} mt-[45px] text-black font-inter w-full`}>
      <div className={`${styles.container} px-10 `}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/">
              <Route index element={<BadgeConditionManage />} />
              <Route path="new-badge-condition" element={<CreateBadgeCondition />} />
              <Route path="edit-badge-condition/:badgeConditionId" element={<EditBadgeCondition />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default AdminContainer;
