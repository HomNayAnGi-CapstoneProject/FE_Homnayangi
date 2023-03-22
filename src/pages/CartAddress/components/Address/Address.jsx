import { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import Loading from '../../../../share/components/Admin/Loading';

// ** assets
import { ic_location_black, ic_payment_black, ic_document_black } from '../../../../assets';

// ** third party
import { useSelector } from 'react-redux';
import { Modal } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Address = (props) => {
  // ** const
  const { userInfo } = props;

  const [activeDistricts, setActiveDistricts] = useState('');
  const [districts, setDistricts] = useState([]);

  return (
    <div className="font-inter w-full bg-white rounded-[5px] px-[14px] py-2">
      {/* header */}
      <div className="pb-2 border-b flex items-center gap-2">
        <img alt="" src={ic_location_black} className="object-contain w-[24px] h-[24px]" />
        <p className="uppercase text-black font-medium text-[18px]">Thông tin địa chỉ</p>
      </div>
      {/* body */}
      <div className="mt-5">
        {Object.keys(userInfo).length === 0 && userInfo.constructor === Object ? (
          <Loading />
        ) : (
          <AddressForm userInfo={userInfo} />
        )}
      </div>
    </div>
  );
};

export default Address;
