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
              {data?.orderStatus == 1 && <span className="text-gray-500 font-semibold uppercase">chờ xác nhận</span>}{' '}
              {data?.orderStatus == 2 && (
                <span className="text-blue-500 font-semibold uppercase">
                  {data?.paymentMethod == 0 ? 'đã xác nhận' : 'đã thanh toán'}
                </span>
              )}{' '}
              {data?.orderStatus == 5 && <span className="text-yellow-500 font-semibold uppercase">đang giao</span>}
              {data?.orderStatus == 10 && <span className="text-rose-800 font-semibold uppercase">đợi hoàn tiền</span>}
            </p>
            <p className="mt-2">
              Phương thức thanh toán:{' '}
              <span className={`${data?.paymentMethod == 1 ? 'text-blue-500' : 'text-primary'} font-semibold`}>
                {data?.paymentMethod == 1 ? 'Online' : 'COD'}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleChangeOrderStatus(data);
                // navigate('/login');
              }}
              className="py-1 px-3 mt-4 bg-primary rounded-[5px] text-white font-medium uppercase"
            >
              Xác nhận và chuyển sang {data?.orderStatus == 1 && 'đã xác nhận'} {data?.orderStatus == 2 && 'giao hàng'}{' '}
              {data?.orderStatus == 10 && 'đã hoàn tiền'}
              {data?.orderStatus == 5 && 'đã giao'}
            </button>
            {/* COD payment */}
            {data?.orderStatus == 1 && (
              <button
                onClick={() => {
                  handleChangeOrderStatus(data, true);
                  // navigate('/login');
                }}
                className="py-1 px-3 mt-4 bg-redError rounded-[5px] text-white font-medium uppercase"
              >
                không xác nhận
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOrderStatus;
