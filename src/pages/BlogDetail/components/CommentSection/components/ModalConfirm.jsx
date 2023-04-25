import React from 'react';
import { Modal } from '@mui/material';

const ModalConfirm = (props) => {
  const { openModal, setOpenModal, title, modalMsg, handleDelele } = props;

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
      top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[5px] sm:w-fit w-full"
      >
        <div className="px-7 py-6">
          {/* header */}
          <div className="pb-2 mb-5 border-b border-[#b7b7b7]">
            <p className="text-[18px] font-medium">{title}</p>
          </div>
          {/* body */}
          <div className="mt-5">
            <p>{modalMsg}</p>
            {/* buttons */}
            <div className="flex gap-2 mt-5 justify-end">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
                className="bg-gray-400 text-white font-medium px-3 py-2 rounded-[5px]"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  setOpenModal(false);
                  handleDelele();
                }}
                className="bg-primary text-white font-medium px-3 py-2 rounded-[5px]"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
