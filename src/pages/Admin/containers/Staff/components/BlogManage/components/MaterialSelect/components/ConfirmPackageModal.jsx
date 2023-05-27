import React from 'react';
import Modal from '@mui/material/Modal';

import { useDispatch, useSelector } from 'react-redux';
import { setConfirmPackage, setContentBlog } from '../../../../../../../../../redux/actionSlice/managementSlice';

const ConfirmPackageModal = (props) => {
  const { openModal, setOpenModal } = props;
  const dispatch = useDispatch();
  const store = useSelector((state) => state.management);

  const handleCancleConfirm = () => {
    setOpenModal(false);
    dispatch(setConfirmPackage(false));
    let Packages = [...store.blogContent.Packages];
    let modifiedPac = [Packages[0]];
    dispatch(setContentBlog({ Packages: modifiedPac }));
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <div
        className="fixed left-[50%]
        top-[50%] translate-y-[-50%] translate-x-[-50%] bg-white rounded-[10px] max-w-[500px]"
      >
        <div className="px-7 pb-2 pt-3 text-[20px] text-black font-semibold border-b">Bỏ xác nhận gói nguyên liệu?</div>
        <div className="px-7 py-3">
          <p>Bỏ xác nhận sẽ xóa các gói nguyên liệu khác</p>
          <div className="w-full flex justify-end gap-2">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="text-white font-medium px-3 py-1 mt-5 bg-gray-400 rounded-[5px]"
            >
              Hủy bỏ
            </button>
            <button
              onClick={() => handleCancleConfirm()}
              className="text-white font-medium px-3 py-1 mt-5 bg-primary rounded-[5px]"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPackageModal;
