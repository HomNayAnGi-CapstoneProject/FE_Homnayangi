import { useEffect, useState } from 'react';
import instances from '../../../../../../../../../utils/plugin/axios';

import ModalBadgeInfo from './ModalBadgeInfo/ModalBadgeInfo';

// ** assets
import badge1 from '../../../../../../../../../assets/images/badge1.png';
import badge2 from '../../../../../../../../../assets/images/badge2.png';
import badge3 from '../../../../../../../../../assets/images/badge3.png';
import badge4 from '../../../../../../../../../assets/images/badge4.png';
import badge5 from '../../../../../../../../../assets/images/badge5.png';
import badge6 from '../../../../../../../../../assets/images/badge6.png';

const data = {
  badge1,
  badge2,
  badge3,
  badge4,
  badge5,
  badge6,
};

const BadgesCondition = (props) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [badgeNotEarn, setBadgeNotEarn] = useState([]);

  // ** get badges not get
  useEffect(() => {
    const fetch = async () => {
      const res = await instances.get('/customerbadges/badgeconditions');
      // console.log(res.data);
      setBadgeNotEarn(res.data);
    };
    fetch();
  }, []);

  return (
    <>
      {openDetailModal && (
        <ModalBadgeInfo openDetailModal={openDetailModal} setOpenDetailModal={setOpenDetailModal} data={data} />
      )}
      <div>
        {badgeNotEarn?.length > 0 ? (
          badgeNotEarn?.slice(0, 2)?.map((item) => (
            <div className="flex items-center gap-2 mb-2 px-5 py-1 ">
              <img src={item?.badge?.imageUrl} alt="" className="object-contain w-[30px] h-[30px]" />
              <div>
                <p className="font-semibold text-black">{item?.badge?.name}</p>
                {/* conditions */}
                <div className="flex gap-1">
                  <p className="text-primary font-bold">
                    {item?.orders} <span className="text-[#929292] font-normal">đơn hàng,</span>
                  </p>
                  <p className="text-primary font-bold">
                    {item?.accomplishments || 0} <span className="text-[#929292] font-normal">thành quả cá nhân</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="mb-2 px-5 py-1">Chưa có dữ liệu</div>
        )}
        {/* fake data */}

        <p
          onClick={() => setOpenDetailModal(true)}
          className="underline italic font-medium text-primary cursor-pointer px-5 w-fit"
        >
          Tìm hiểu thêm
        </p>
      </div>
    </>
  );
};

export default BadgesCondition;
