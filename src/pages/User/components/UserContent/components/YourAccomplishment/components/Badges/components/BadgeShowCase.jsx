import { useState, useEffect } from 'react';
import instances from '../../../../../../../../../utils/plugin/axios';
import BadgesCondition from './BadgesCondition';
import jwt_decode from 'jwt-decode';
import badge1 from '../../../../../../../../../assets/images/badge1.png';

import Tooltip from '@mui/material/Tooltip';

const BadgeShowCase = (props) => {
  const { badgeData } = props;
  const [customerBadges, setCustomerBadges] = useState();
  const accessToken = localStorage.getItem('accessToken');
  let decoded_jwt = {};
  if (accessToken) {
    decoded_jwt = jwt_decode(accessToken);
  }

  // ** get user detail info
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get(`/customerbadges/customer`);
      setCustomerBadges(res.data);
      // console.log(res.data);
    };

    fetch();
  }, []);

  return (
    <div>
      {/* current rank */}
      <div className="flex items-center gap-1">
        <p className="text-[#929292] font-medium">Danh hiệu đã có: </p>
        {/* rank list < 0: none */}
        {customerBadges?.length > 0 ? (
          customerBadges?.map((item) => (
            <div className="flex flex-1 gap-1 flex-wrap">
              <Tooltip title={item?.badge?.name} placement="top">
                <img src={item?.badge?.imageUrl} alt="" className="object-contain w-[30px] h-[30px]" />
              </Tooltip>
            </div>
          ))
        ) : (
          <p className="italic font-medium">bạn chưa sỡ hữu danh hiệu nào</p>
        )}
      </div>
      {/* not earn rank */}
      <div className="mt-2">
        <p className="text-[#929292] font-medium">Danh hiệu chưa đạt: </p>
        <div className="my-3">
          <BadgesCondition />
        </div>
      </div>
    </div>
  );
};

export default BadgeShowCase;
