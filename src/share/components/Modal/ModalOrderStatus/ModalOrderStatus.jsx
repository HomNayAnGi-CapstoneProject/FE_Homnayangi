import React from 'react';
import { Modal } from '@mui/material';

const ModalOrderStatus = (props) => {
  const { openChangeStatusModal, setOpenChangeStatusModal, data, handleChangeOrderStatus } = props;

  return (
    <Modal open={openChangeStatusModal} onClose={() => setOpenChangeStatusModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="flex flex-col px-7 py-6">
          {/* header */}
          <div className="pb-2 border-b border-[#b7b7b7]">
            <p className="text-[18px] font-medium">Đổi trạng thái đơn hàng</p>
          </div>
          {/* body */}
          <div className="mt-2 mb-3">
            <p>
              Trạng thái hiện tại:{' '}
              {data?.orderStatus == 2 && <span className="text-green-500 font-semibold">đã xác nhận</span>}{' '}
              {data?.orderStatus == 5 && <span className="text-yellow-500 font-semibold">đang giao</span>}
            </p>
          </div>
          <button
            onClick={() => {
              handleChangeOrderStatus(data);
              // navigate('/login');
            }}
            className="py-1 px-3 mt-4 bg-primary rounded-[5px] text-white font-medium uppercase"
          >
            Xác nhận và chuyển sang {data?.orderStatus == 2 && 'giao hàng'} {data?.orderStatus == 5 && 'đã giao'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOrderStatus;
