import React from 'react';
import Modal from '@mui/material/Modal';

const CustomModal = (props) => {
  const { title, description, setOpenModal, openModal } = props;
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
        top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[10px] max-w-[500px]"
      >
        <div className="px-7 pb-2 pt-3 text-black font-semibold border-b">{title}</div>
        <div className="px-7 py-3 mt-2">
          <p>{description}</p>
          <div className="w-full flex justify-end">
            <button
              onClick={() => setOpenModal(false)}
              className="text-white font-medium px-3 py-1 mt-5 bg-primary rounded-[5px]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
