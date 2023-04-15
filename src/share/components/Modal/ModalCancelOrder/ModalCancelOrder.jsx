import React from 'react';
import { Modal } from '@mui/material';

const ModalCancelOrder = (props) => {
  const { openModal, setOpenModal, data, handleCancelOrder, canceling } = props;
  console.log(data);

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        {data && (
          <div className="px-7 py-6 sm:w-[400px]">
            <p className="text-[18px] font-medium">Xác nhận hủy đơn hàng?</p>
            {data?.paymentMethod == 1 && data?.orderStatus == 1 ? (
              <p className="mt-2 font-medium text-red-500">
                Bạn sẽ được hoàn lại số tiền đã thanh toán cho đơn hàng này
              </p>
            ) : (
              <></>
            )}
            <div className="mt-5 flex gap-2 sm:flex-row flex-col">
              <button
                disabled={canceling ? true : false}
                onClick={() => handleCancelOrder(data)}
                className={`${
                  canceling ? 'bg-red-300 cursor-not-allowed' : 'bg-redError'
                } w-full py-2 px-3 rounded-[5px] text-white uppercase font-medium`}
              >
                {canceling ? 'Đang hủy đơn...' : 'Xác nhận'}
              </button>
              <button
                disabled={canceling ? true : false}
                onClick={() => setOpenModal(false)}
                className="w-full py-2 bg-gray-400 rounded-[5px] text-white uppercase font-medium"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalCancelOrder;
