import { useEffect, useState } from 'react';
import { setAccountInfo } from '../../redux/actionSlice/accountSlice';

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
    navigate('/');
    localStorage.removeItem('accessToken');
    dispatch(setAccountInfo({}));
  };

  // return <div>Admin</div>;
  if (accessToken) {
    if (Object.keys(decoded_jwt).length === 0 && decoded_jwt.constructor === Object) {
      return <Navigate replace to="/" />;
    } else {
      if (decoded_jwt.role === 'Customer') {
        return <Navigate replace to="/" />;
      } else {
        return (
          <div className="text-black font-inter w-full">
            Role: {decoded_jwt.role}
            <button onClick={() => handleLogout()}>Logout</button>
            {/* <div className="flex w-full">
              <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
            </div>
            <div className="pr-20 pl-[20rem] pt-[6rem] bg-gray-100 w-full min-h-screen">
              <Header role={decoded_jwt.Role} info={loggedInUser} />
              <div className="w-full">
                {decoded_jwt.Role === 'Staff' ? (
                  <>
                    {activeTab === 0 && <StaffOrder />}
                    {activeTab === 1 && <StaffCreateOrder />}
                  </>
                ) : (
                  <>
                    {activeTab === 0 && <Dashboard setActiveTab={setActiveTab} activeTab={activeTab} />}
                    {activeTab === 1 && <Product />}
                    {activeTab === 2 && <Account />}
                    {activeTab === 3 && <TurnOver />}
                  </>
                )}
              </div>
            </div> */}
          </div>
        );
      }
    }
  } else {
    return <Navigate replace to="/" />;
  }
};

export default Admin;
