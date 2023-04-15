import { useState, useEffect } from 'react';
import instances from '../../../../../../../../../../utils/plugin/axios';
import { Modal } from '@mui/material';

// ** components
import BadgeConditionExplan from './components/BadgeConditionExplan';
import AwardExplan from './components/AwardExplan';

const ModalBadgeInfo = (props) => {
  const { openDetailModal, setOpenDetailModal, data } = props;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] sm:w-[450px] w-full bg-white rounded-[3px] px-3 py-4"
      >
        {/* header */}
        <div className="pb-2 border-b border-[#b7b7b7]">
          <p className="text-[18px] font-medium">Tìm hiểu về huy hiệu và phần thưởng</p>
        </div>
        {/* body */}
        <div className="mt-5">
          {activeTab == 0 && <BadgeConditionExplan setActiveTab={setActiveTab} data={data} />}
          {activeTab == 1 && <AwardExplan setActiveTab={setActiveTab} data={data} />}
        </div>
        <button
          onClick={() => setOpenDetailModal(false)}
          className="w-full bg-primary px-5 py-1 mt-2 text-white font-medium uppercase rounded-[5px]"
        >
          xác nhận
        </button>
      </div>
    </Modal>
  );
};

export default ModalBadgeInfo;
