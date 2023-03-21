import React from 'react';

// ** components
import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import YourOrder from './components/YourOrder/YourOrder';
import YourAccomplishment from './components/YourAccomplishment/YourAccomplishment';

// ** third party
import { Route, Routes } from 'react-router-dom';

const UserContent = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/">
          <Route index element={<PersonalInfo />} />
          <Route path="orders/*" element={<YourOrder />} />
          <Route path="accomplishments" element={<YourAccomplishment />} />
        </Route>
      </Routes>
    </div>
  );
};

export default UserContent;
