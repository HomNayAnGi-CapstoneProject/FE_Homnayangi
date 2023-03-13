import { useState, useEffect } from 'react';
import instances from '../../../../../../utils/plugin/axios';
import Loading from '../../../../../../share/components/Admin/Loading';

// ** components
import InfoForm from './components/InfoForm/InfoForm';
import Address from './components/Address';

const PersonalInfo = () => {
  // ** const
  const [userData, setUserData] = useState();
  // ** get user detail info
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/personal-customer');
      setUserData(res.data.result);
    };

    fetch();
  }, []);

  return (
    <div>
      <div className="mb-[30px]">{userData ? <InfoForm userData={userData} /> : <Loading />}</div>
      <div>
        <Address />
      </div>
    </div>
  );
};

export default PersonalInfo;
