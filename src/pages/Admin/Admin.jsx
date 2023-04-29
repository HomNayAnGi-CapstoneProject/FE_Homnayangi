import { useEffect, useState } from 'react';
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';
import StaffContainer from './containers/Staff/StaffContainer';
import AdminContainer from './containers/Admin/AdminContainer';
import ManagerContainer from './containers/Manager/ManagerContainer';
import { AdminLayout } from '../../share/layouts';

//** Third party components*/
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

const Admin = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

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
    // navigate('/');
    window.location.href = '/login';
    localStorage.removeItem('accessToken');
    dispatch(setAccountInfo({}));
  };

  // return <div>Admin</div>;
  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />;
    } else {
      switch (decoded_jwt.role) {
        case 'Customer':
          return <Navigate replace to="/" />;
        case 'Staff':
          return (
            <AdminLayout>
              <StaffContainer />
            </AdminLayout>
          );
        case 'Admin':
          return (
            <AdminLayout>
              <AdminContainer />
            </AdminLayout>
          );
        case 'Manager':
          return (
            <AdminLayout>
              <ManagerContainer />
            </AdminLayout>
          );
        default:
          break;
      }
      // if (decoded_jwt.role === 'Customer') {
      //   return <Navigate replace to="/" />;
      // } else {
      //   return (
      //     <AdminLayout>
      //       <StaffContainer />
      //     </AdminLayout>
      //   );
      // }
    }
  } else {
    return <Navigate replace to="/" />;
  }
};

export default Admin;
